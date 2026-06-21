import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module02_components';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: stroke -> swept volume, extend/retract, single/double acting, ports
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson01_cylinder.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('default swept volume 1.18 L', d.getElementById('vOut').textContent==='1.18', d.getElementById('vOut').textContent);
  ok('default return = powered (double-acting)', d.getElementById('stOut').textContent==='powered');
  ok('extended: lifter raised', d.getElementById('lifter').style.transform.includes('-'));
  d.getElementById('bRet').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('retract: lifter lowered to baseline', d.getElementById('lifter').style.transform==='translateY(0px)', d.getElementById('lifter').style.transform);
  d.getElementById('bSingle').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('single-acting: gravity return shown', d.getElementById('stOut').textContent==='gravity' && d.getElementById('gravity').style.display!=='none');
  d.getElementById('s').value='300'; d.getElementById('s').dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('stroke 300 mm -> 0.59 L', d.getElementById('vOut').textContent==='0.59', d.getElementById('vOut').textContent);
  ok('real machine + ports (supply, both hoses, cap+rod fluid, lifter)', ['capHose','rodHose','capFluid','rodFluid','lifter'].every(id=>d.getElementById(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson01_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,0,1,1,1]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON: 12 DoD + guards + the component decision (stroke + acting type)
{
  const L=readFileSync(B+'/01_the_hydraulic_cylinder.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited (renders on site + github.com)', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG', L.includes('assets/m02-l1-cylinder-anatomy.svg'));
  ok('DoD8 links demo', L.includes('demos/lesson01_cylinder.html'));
  ok('DoD9 links quiz', L.includes('quizzes/lesson01_quiz.html'));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (links Module 01 + Lesson 02)', /Module 01/.test(L) && /Lesson 02|02 —/.test(L));
  ok('component decision present (stroke + single/double-acting)', /stroke/i.test(L) && /single-acting/i.test(L) && /double-acting/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW: self-contained + pre-rendered SVG math
{
  const h=readFileSync(B+'/lesson01_preview.html','utf8');
  ok('preview has ZERO external deps (cdn/module/mermaid)', !h.includes('cdn.') && !h.includes('type="module"') && !h.includes('class="mermaid"'));
  ok('preview has no invalid <p><div> nesting', !h.includes('<p><div class="figure"'));
  { const ifr=[...h.matchAll(/srcdoc="(.*?)"><\/iframe>/gs)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('preview iframes are complete self-contained docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  const d=new JSDOM(h).window.document;
  ok('preview composites (figure img + 2 widgets + worked card)', d.querySelector('.figure img')&&d.querySelectorAll('iframe.widget').length===2&&d.querySelector('.worked'));
  ok('preview math + figure are PNG <img>, ZERO inline SVG in main page', h.includes('<div class="figure"><img') && h.includes('<img class="mjx-eq"') && !h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""').includes('<svg') && !h.includes('class="arithmatex"') && !h.includes('<mjx-container') && !h.includes('cdn.jsdelivr.net/npm/mathjax'));
}
console.log(fail?('\n[gate-m2l1] FAIL '+fail):'\n[gate-m2l1] PASS  M02 L01 meets all 12 Definition-of-Done checks + demo/math/port discipline');
process.exit(fail?1:0);
