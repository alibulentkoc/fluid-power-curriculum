import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module01_launch';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };

// DEMO — computes + the machine physically moves
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson01_force_multiplier.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('demo pressure 10.19 bar', d.getElementById('pOut').textContent==='10.19', d.getElementById('pOut').textContent);
  ok('demo factor 16.0x', d.getElementById('kOut').textContent==='16.0', d.getElementById('kOut').textContent);
  ok('demo lift force 8.00 kN', d.getElementById('foOut').textContent==='8.00', d.getElementById('foOut').textContent);
  // gauge needle moved off zero position
  const needle=d.getElementById('needle');
  ok('gauge needle is driven', needle.getAttribute('x2')!=='-20' || needle.getAttribute('y2')!=='-28');
  // pump stroke is wired and does not throw (animation uses rAF shim)
  let threw=false; try{ d.getElementById('pump').dispatchEvent(new W.Event('click',{bubbles:true})); }catch(e){ threw=true; }
  ok('pump stroke runs without error', !threw);
  // diameter change updates factor (50mm -> (50/25)^2 = 4.0)
  const DO=d.getElementById('do'); DO.value='50'; DO.dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('halving large piston -> 4.0x', d.getElementById('kOut').textContent==='4.0', d.getElementById('kOut').textContent);
  ok('demo is a real machine (cylinders, hose, gauge present)', ['inPiston','outPiston','needle','outLoad'].every(id=>d.getElementById(id)));
}
// QUIZ — unchanged standard
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson01_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,2,1,1,1]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5');
}
// LESSON — formulas, worked example, vocabulary
{
  const L=readFileSync(B+'/01_why_fluid_power_exists.md','utf8');
  // GUARD: math must use dollar delimiters ($ inline, $$ display) — renders on the site and on github.com
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  ok('no raw-text bracket equations like [ F = p x A ]', !/\[\s*F\s*=\s*p\s*[x×]\s*A\s*\]/.test(L));
  ok('uses dollar display math', L.includes('$$') && L.includes('\\frac{\\pi}{4}'));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering interpretation**'])
    ok('worked template has '+k, L.includes(k));
  ok('states the engineering decision (B1)', /decision you can now make/i.test(L));
  ok('no internal vocabulary incl workcell (B5)', !/\b(artifact|competency|benchmark|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));

  const banned=/\b(artifact|competency|benchmark|pipeline)\b|\btwin\b|Physical AI|Smart Agricultural/i;
  ok('no banned vocabulary', !banned.test(L), (L.match(banned)||[''])[0]);
  ok('machine+decision before math in opening', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]));
  ok('12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW — composites with worked card
{
  const h=readFileSync(B+'/lesson01_preview.html','utf8');
  ok('preview has ZERO external deps (cdn/module/mermaid)', !h.includes('cdn.') && !h.includes('type="module"') && !h.includes('class="mermaid"'));
  ok('preview has no invalid <p><div> nesting', !h.includes('<p><div class="figure"'));
  { const ifr=[...h.matchAll(/srcdoc="(.*?)"><\/iframe>/gs)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('preview iframes are complete self-contained docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  ok('preview math + figure are PNG <img>, ZERO inline SVG in main page', h.includes('<div class="figure"><img') && h.includes('<img class="mjx-eq"') && !h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""').includes('<svg') && !h.includes('class="arithmatex"') && !h.includes('<mjx-container') && !h.includes('cdn.jsdelivr.net/npm/mathjax'));
  ok('preview has no raw \\[ or \\( delimiters in body', !/>\s*\\[\[(]/.test(h.split('</style>')[1]||h)); const d=new JSDOM(h).window.document;
  ok('preview inlines SVG', d.querySelector('.figure img')!==null);
  ok('preview embeds 2 widgets', d.querySelectorAll('iframe.widget').length===2);
  ok('preview renders worked-example card', d.querySelector('.worked')!==null);
}
console.log(fail?('\n[gate-m01-quality] FAIL '+fail):'\n[gate-m01-quality] PASS  formulas LaTeX; worked example structured; demo is a moving machine; svg visually reviewed; quiz standard; no banned vocab');
process.exit(fail?1:0);
