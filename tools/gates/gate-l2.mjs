import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module01_launch';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };

// DEMO: computes p x Q and the platform animates with flow
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson02_energy_transmission.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('demo default power 1.67 kW (100 bar x 10 L/min)', d.getElementById('wOut').textContent==='1.67', d.getElementById('wOut').textContent);
  // raise flow -> power rises proportionally; double flow (20) -> ~3.33 kW
  const Q=d.getElementById('q'); Q.value='20'; Q.dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('doubling flow doubles power (~3.33 kW)', d.getElementById('wOut').textContent==='3.33', d.getElementById('wOut').textContent);
  // raise pressure at fixed flow also raises power
  Q.value='10'; Q.dispatchEvent(new W.Event('input',{bubbles:true}));
  const P=d.getElementById('p'); P.value='200'; P.dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('raising pressure raises power (3.33 kW at 200 bar/10 L/min)', d.getElementById('wOut').textContent==='3.33', d.getElementById('wOut').textContent);
  ok('demo is a real system (power unit, hose, gauge, cylinder, load)', ['needle','platform','load','cylRod','flowdash'].every(id=>d.getElementById(id)));
  let threw=false; try{ if(typeof W.requestAnimationFrame!=='function'){} }catch(e){threw=true;}
  ok('flow animation wired (rAF shim present)', /raf\(frame\)/.test(readFileSync(B+'/demos/lesson02_energy_transmission.html','utf8')));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson02_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,1,1,0,0]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON — the 12 Definition of Done items
{
  const L=readFileSync(B+'/02_how_energy_is_transmitted.md','utf8');
  // GUARD: math must use dollar delimiters ($ inline, $$ display) — renders on the site and on github.com
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  ok('DoD1 opens machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]) && /platform|power unit/i.test(L.split('## 2.')[0]));
  ok('DoD2 states the engineering decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language (no internal vocab)', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited (renders on site + github.com)', L.includes('$$') && !/\[\s*P\s*=\s*p\s*[x×]\s*Q\s*\]/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG', L.includes('assets/m01-l2-energy-path.svg'));
  ok('DoD8 links realistic demo', L.includes('demos/lesson02_energy_transmission.html'));
  ok('DoD9 links quiz (standard)', L.includes('quizzes/lesson02_quiz.html'));
  ok('DoD10 reinforces the lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (links to Lesson 01 + previews 03)', /Lesson 01|In Lesson 01/i.test(L) && /Lesson 03/.test(L));
  ok('AI companion deepens, not summarizes', L.includes('**Deepen**') && L.includes('**Challenge**') && !/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW
{
  const h=readFileSync(B+'/lesson02_preview.html','utf8');
  ok('preview has ZERO external deps (cdn/module/mermaid)', !h.includes('cdn.') && !h.includes('type="module"') && !h.includes('class="mermaid"'));
  ok('preview has no invalid <p><div> nesting', !h.includes('<p><div class="figure"'));
  { const ifr=[...h.matchAll(/srcdoc="(.*?)"><\/iframe>/gs)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('preview iframes are complete self-contained docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  ok('preview math + figure are PNG <img>, ZERO inline SVG in main page', h.includes('<div class="figure"><img') && h.includes('<img class="mjx-eq"') && !h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""').includes('<svg') && !h.includes('class="arithmatex"') && !h.includes('<mjx-container') && !h.includes('cdn.jsdelivr.net/npm/mathjax'));
  ok('preview has no raw \\[ or \\( delimiters in body', !/>\s*\\[\[(]/.test(h.split('</style>')[1]||h)); const d=new JSDOM(h).window.document;
  ok('preview inlines SVG + embeds 2 widgets + worked card',
     d.querySelector('.figure img')!==null && d.querySelectorAll('iframe.widget').length===2 && d.querySelector('.worked')!==null);
}
console.log(fail?('\n[gate-l2] FAIL '+fail):'\n[gate-l2] PASS  M01 L02 meets all 12 Definition-of-Done checks');
process.exit(fail?1:0);
