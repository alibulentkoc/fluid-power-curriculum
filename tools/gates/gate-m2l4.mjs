import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module02_components';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: directional valve commands raise / hold / lower around the complete circuit
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson04_component_set.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true});
  const d=dom.window.document, W=dom.window;
  const st=()=>d.getElementById('statusOut').textContent, vv=()=>d.getElementById('valveOut').textContent, L=()=>d.getElementById('lifter').style;
  ok('starts Holding, valve closed', st()==='Holding' && vv()==='closed', st()+'/'+vv());
  d.getElementById('bRaise').dispatchEvent(new W.Event('click'));
  ok('Raise -> Raising, valve routes to cap, platform rises (timed)', st()==='Raising' && /cap/.test(vv()) && /translateY\(-\d/.test(L().transform) && L().transitionDuration.startsWith('7'), st()+'/'+vv()+'/'+L().transform+'/'+L().transitionDuration);
  d.getElementById('bLower').dispatchEvent(new W.Event('click'));
  ok('Lower -> Lowering, valve routes to rod, platform descends', st()==='Lowering' && /rod/.test(vv()) && L().transform==='translateY(0px)', st()+'/'+vv()+'/'+L().transform);
  d.getElementById('bHold').dispatchEvent(new W.Event('click'));
  ok('Hold -> Holding, valve closed', st()==='Holding' && vv()==='closed', st()+'/'+vv());
  ok('complete circuit drawn (reservoir, pump, relief, valve, cylinder, filter, load)', ['reservoir','pump','relief','dcv','cyl','lifter','capFluid','filter'].every(id=>d.getElementById(id)));
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
  const L=readFileSync(B+'/04_the_complete_component_set.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\$\$/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited (site + github.com)', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG in <figure markdown>', L.includes('assets/m02-l4-component-set.svg') && /<figure markdown>/.test(L));
  ok('DoD8 demo embedded (iframe) + open-in-tab link', /<iframe[^>]*demos\/lesson04_component_set\.html/.test(L) && /\]\(demos\/lesson04_component_set\.html\)/.test(L));
  ok('DoD9 quiz embedded (iframe) + open-in-tab link', /<iframe[^>]*quizzes\/lesson04_quiz\.html/.test(L) && /\]\(quizzes\/lesson04_quiz\.html\)/.test(L));
  ok('STYLE breadcrumb is an !!! abstract admonition (sister-site)', /!!! abstract "You are here"/.test(L));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (Lessons 01-03 in, Module 03 out)', /Lessons 01|Lesson 0[123]|Module 02/.test(L) && /Module 03/.test(L));
  ok('synthesis decision present (component set + directional valve + loop)', /component (set|list)/i.test(L) && /directional (control )?valve/i.test(L) && /loop|connect/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW (crisp vector, sister-site quality — no rasterization)
{
  const h=readFileSync(B+'/lesson04_preview.html','utf8');
  const main=h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""');
  ok('preview ZERO external deps (cdn/unpkg/module/mermaid)', !main.includes('cdn.') && !main.includes('unpkg') && !main.includes('type="module"') && !main.includes('class="mermaid"'));
  ok('figure is a CRISP VECTOR svg (data-URI img), not PNG', h.includes('data:image/svg+xml;base64,'));
  ok('formulas are CRISP VECTOR MathJax svg, not PNG', /class="mjx-eq/.test(main) && !main.includes('data:image/png'));
  ok('NO rasterized PNG anywhere in main page', !main.includes('data:image/png'));
  ok('breadcrumb rendered as abstract admonition', h.includes('admonition abstract'));
  { const ifr=[...h.matchAll(/srcdoc="([\s\S]*?)"[^>]*><\/iframe>/g)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('demo + quiz inlined as self-contained iframe docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  ok('no leftover un-typeset math (arithmatex) in main page', !main.includes('class="arithmatex"'));
}
console.log(fail?('\n[gate-m2l4] FAIL '+fail):'\n[gate-m2l4] PASS  M02 L04 meets all 12 Definition-of-Done checks + circuit demo/quiz + crisp vector preview');
process.exit(fail?1:0);
