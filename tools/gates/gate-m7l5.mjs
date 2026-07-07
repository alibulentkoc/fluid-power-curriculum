import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module07_failsafe';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: hydraulic power P = p*Q
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson05_failsafe.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true});
  const d=dom.window.document,W=dom.window; const $=id=>d.getElementById(id);
  const pk=k=>{const b=[...d.querySelectorAll('.row button')].find(x=>x.dataset.k===k);b.dispatchEvent(new W.Event('click'));};
  pk('burst');    ok('burst: counterbalance ring lit, load HELD', $('hl-cbv').style.opacity==='1' && $('hl-rel').style.opacity==='0' && /HELD/.test($('status').textContent));
  pk('power');    ok('power loss: DCV + CBV rings lit', $('hl-dcv').style.opacity==='1' && $('hl-cbv').style.opacity==='1');
  pk('overload'); ok('overload: relief ring lit, pressure CAPPED', $('hl-rel').style.opacity==='1' && /CAPPED/.test($('status').textContent));
  pk('runaway');  ok('runaway: counterbalance ring lit, descent METERED', $('hl-cbv').style.opacity==='1' && /METERED/.test($('status').textContent));
  ok('circuit + protection rings + status present', ['c','status','note','hl-cbv','hl-dcv','hl-rel'].every(id=>$(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson05_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,1,1,1,1]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click')));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON
{
  const L=readFileSync(B+'/05_the_complete_fail_safe_circuit.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\$\$/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG in <figure markdown>', L.includes('assets/m07-l5-failsafe.svg') && /<figure markdown>/.test(L));
  ok('DoD8 demo embedded (iframe) + open-in-tab link', /<iframe[^>]*demos\/lesson05_failsafe\.html/.test(L) && /\]\(demos\/lesson05_failsafe\.html\)/.test(L));
  ok('DoD9 quiz embedded (iframe) + open-in-tab link', /<iframe[^>]*quizzes\/lesson05_quiz\.html/.test(L) && /\]\(quizzes\/lesson05_quiz\.html\)/.test(L));
  ok('STYLE breadcrumb is an !!! abstract admonition', /!!! abstract "You are here"/.test(L));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 closes module (Lesson 04 in, Module 08 out)', /Lesson 04|budget/.test(L) && /Module 08/.test(L));
  ok('fail-safe decision present (failure->protection)', /burst|power loss|overload|runaway/i.test(L) && /counterbalance|relief|spring/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW (crisp vector)
{
  const h=readFileSync(B+'/lesson05_preview.html','utf8');
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
console.log(fail?('\n[gate-m7l5] FAIL '+fail):'\n[gate-m7l5] PASS  M07 L05 meets all Definition-of-Done checks + power demo/quiz + crisp vector preview');
process.exit(fail?1:0);
