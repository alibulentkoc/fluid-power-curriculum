import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module01_launch';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: bore-sizing force = p x A; lifts only when force >= load
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson03_bore_sizing.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('default 50mm/100bar -> 19.6 kN', d.getElementById('fOut').textContent==='19.6', d.getElementById('fOut').textContent);
  ok('default status lifts 2 t', d.getElementById('statusTile').className.includes('ok'));
  const Bd=d.getElementById('b'); Bd.value='30'; Bd.dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('30mm bore too small (status not ok)', d.getElementById('statusTile').className.includes('no'), d.getElementById('statusTile').className);
  Bd.value='50'; Bd.dispatchEvent(new W.Event('input',{bubbles:true}));
  const P=d.getElementById('p'); P.value='60'; P.dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('50mm at 60 bar too weak', d.getElementById('statusTile').className.includes('no'));
  ok('demo is a real machine + ports (power unit, gauge, cap-port hose, cylinder)', ['barrel','piston','needle','capFluid'].every(id=>d.getElementById(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson03_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,1,1,1,0]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON: 12 Definition-of-Done items + math guard
{
  const L=readFileSync(B+'/03_force_multiplication.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]) && /platform/i.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, no raw brackets', L.includes('\\[') && !/\[\s*F\s*=\s*p\s*[x×]\s*A\s*\]/.test(L));
  ok('GUARD no double-backslash math', !/\\\\[\[\](]|\\\\(times|frac|text|approx|pi)/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG', L.includes('assets/m01-l3-force-multiplication.svg'));
  ok('DoD8 links demo', L.includes('demos/lesson03_bore_sizing.html'));
  ok('DoD9 links quiz', L.includes('quizzes/lesson03_quiz.html'));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (Lesson 02 -> Lesson 04)', /Lesson 02/.test(L) && /Lesson 04/.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW
{
  const h=readFileSync(B+'/lesson03_preview.html','utf8');
  ok('preview has ZERO external deps (cdn/module/mermaid)', !h.includes('cdn.') && !h.includes('type="module"') && !h.includes('class="mermaid"'));
  ok('preview has no invalid <p><div> nesting', !h.includes('<p><div class="figure"'));
  { const ifr=[...h.matchAll(/srcdoc="(.*?)"><\/iframe>/gs)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('preview iframes are complete self-contained docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  ok('preview math + figure are PNG <img>, ZERO inline SVG in main page', h.includes('<div class="figure"><img') && h.includes('<img class="mjx-eq"') && !h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""').includes('<svg') && !h.includes('class="arithmatex"') && !h.includes('<mjx-container') && !h.includes('cdn.jsdelivr.net/npm/mathjax'));
  ok('preview has no raw \\[ or \\( delimiters in body', !/>\s*\\[\[(]/.test(h.split('</style>')[1]||h)); const d=new JSDOM(h).window.document;
  ok('preview composites (figure img + 2 widgets + worked card)', d.querySelector('.figure img')&&d.querySelectorAll('iframe.widget').length===2&&d.querySelector('.worked'));
}
console.log(fail?('\n[gate-l3] FAIL '+fail):'\n[gate-l3] PASS  M01 L03 meets all 12 Definition-of-Done checks + math/port discipline');
process.exit(fail?1:0);
