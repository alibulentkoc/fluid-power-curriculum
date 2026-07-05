import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module06_metering';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: hydraulic power P = p*Q
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson04_metering.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true});
  const d=dom.window.document,W=dom.window; const $=id=>d.getElementById(id);
  const set=v=>{$('cmdRange').value=v;$('cmdRange').dispatchEvent(new W.Event('input'));};
  const S=()=>$('speedOut').textContent, F=()=>$('flowOut').textContent, O=()=>$('openOut').textContent, cls=()=>$('note').className;
  set(100); ok('100% command: 7.6 mm2, 10 L/min, ~85 mm/s (full speed)', O()==='7.6' && F()==='10.0' && S()==='84.9', O()+'/'+F()+'/'+S());
  set(50);  ok('50% command: flow and speed halve (proportional)', F()==='5.0' && S()==='42.5', F()+'/'+S());
  set(5);   ok('5% command: ~4 mm/s creep for the last mm', S()==='4.2', S());
  $('bIn').dispatchEvent(new W.Event('click'));  ok('meter-in on a lowering load: runaway (unsafe)', /bad/.test(cls()), cls());
  $('bOut').dispatchEvent(new W.Event('click')); ok('meter-out on a lowering load: controlled', /ok/.test(cls()), cls());
  ok('speed bar + command slider + meter-mode buttons + readouts present', ['viz','speedBar','cmdRange','openOut','flowOut','speedOut','bIn','bOut','note'].every(id=>$(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson04_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,1,1,1,1]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click')));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON
{
  const L=readFileSync(B+'/04_metering_flow_the_proportional_valve.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\$\$/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG in <figure markdown>', L.includes('assets/m06-l4-metering.svg') && /<figure markdown>/.test(L));
  ok('DoD8 demo embedded (iframe) + open-in-tab link', /<iframe[^>]*demos\/lesson04_metering\.html/.test(L) && /\]\(demos\/lesson04_metering\.html\)/.test(L));
  ok('DoD9 quiz embedded (iframe) + open-in-tab link', /<iframe[^>]*quizzes\/lesson04_quiz\.html/.test(L) && /\]\(quizzes\/lesson04_quiz\.html\)/.test(L));
  ok('STYLE breadcrumb is an !!! abstract admonition', /!!! abstract "You are here"/.test(L));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (Lesson 03 in, counterbalance/Lesson 05 out)', /Lesson 03|Module 06/.test(L) && /Lesson 05|counterbalance|overrunning/.test(L));
  ok('metering decision present (proportional + meter-out)', /proportional|meter/i.test(L) && /command|speed|meter.?out|1 ?mm/i.test(L));
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
console.log(fail?('\n[gate-m6l4] FAIL '+fail):'\n[gate-m6l4] PASS  M06 L04 meets all Definition-of-Done checks + power demo/quiz + crisp vector preview');
process.exit(fail?1:0);
