import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module04_actuators';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: hydraulic power P = p*Q
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson04_cushioning.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true});
  const d=dom.window.document,W=dom.window; const $=id=>d.getElementById(id);
  const setL=v=>{$('lcRange').value=v;$('lcRange').dispatchEvent(new W.Event('input'));};
  const F=()=>$('forceOut').textContent, P=()=>$('pcOut').textContent, H=()=>$('hardOut').textContent;
  setL(25); ok('extend, 25 mm cushion: 289 N at 1.5 bar vs 7.2 kN hard stop', F()==='289' && P()==='1.5' && H()==='7.2', F()+'/'+P()+'/'+H());
  $('bRet').dispatchEvent(new W.Event('click')); setL(25);
  ok('retract (worst case), 25 mm: 615 N at 3.1 bar vs 15.4 kN hard stop', F()==='615' && H()==='15.4', F()+'/'+H());
  $('bExt').dispatchEvent(new W.Event('click')); setL(50);
  ok('longer cushion (50 mm) halves the force to ~145 N', F()==='145', F());
  ok('force-vs-length curve + toggle + readouts present', ['chart','curve','dot','vline','lcRange','bExt','bRet','forceOut','pcOut','hardOut','note'].every(id=>$(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson04_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,1,1,1,2]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click')));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON
{
  const L=readFileSync(B+'/04_cushioning_and_end_of_stroke.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\$\$/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG in <figure markdown>', L.includes('assets/m04-l4-cushioning.svg') && /<figure markdown>/.test(L));
  ok('DoD8 demo embedded (iframe) + open-in-tab link', /<iframe[^>]*demos\/lesson04_cushioning\.html/.test(L) && /\]\(demos\/lesson04_cushioning\.html\)/.test(L));
  ok('DoD9 quiz embedded (iframe) + open-in-tab link', /<iframe[^>]*quizzes\/lesson04_quiz\.html/.test(L) && /\]\(quizzes\/lesson04_quiz\.html\)/.test(L));
  ok('STYLE breadcrumb is an !!! abstract admonition', /!!! abstract "You are here"/.test(L));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (Lesson 03 in, motion/Lesson 05 out)', /Lesson 03|Module 04/.test(L) && /Lesson 05|in motion|dynamic/i.test(L));
  ok('cushioning decision present (cushion length + gentle stop)', /cushion/i.test(L) && /L_c|length|25\s*mm/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW (crisp vector)
{
  const h=readFileSync(B+'/lesson04_preview.html','utf8');
  const main=h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""');
  ok('preview ZERO external deps', !main.includes('cdn.') && !main.includes('unpkg') && !main.includes('type="module"') && !main.includes('class="mermaid"'));
  ok('figure is a CRISP VECTOR svg (data-URI img), not PNG', h.includes('data:image/svg+xml;base64,'));
  ok('formulas are CRISP VECTOR MathJax svg, not PNG', /class="mjx-eq/.test(main) && !main.includes('data:image/png'));
  ok('NO rasterized PNG anywhere in main page', !main.includes('data:image/png'));
  ok('breadcrumb rendered as abstract admonition', h.includes('admonition abstract'));
  { const ifr=[...h.matchAll(/srcdoc="([\s\S]*?)"[^>]*><\/iframe>/g)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('demo + quiz inlined as self-contained iframe docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  ok('no leftover un-typeset math (arithmatex) in main page', !main.includes('class="arithmatex"'));
}
console.log(fail?('\n[gate-m4l4] FAIL '+fail):'\n[gate-m4l4] PASS  M04 L04 meets all Definition-of-Done checks + power demo/quiz + crisp vector preview');
process.exit(fail?1:0);
