import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module09_validation';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: hydraulic power P = p*Q
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson04_validation.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true});
  const d=dom.window.document,W=dom.window; const $=id=>d.getElementById(id);
  ok('initial pure-oil model (12 Hz) mismatches measured 8 Hz', /12\.[0-9] Hz/.test($('rfn').textContent) && $('verdict').className.includes('bad'));
  $('auto').dispatchEvent(new W.Event('click'));
  ok('snapping to identified beta_eff (0.77 GPa) validates (8 Hz, low error)', /8\.0 Hz/.test($('rfn').textContent) && parseFloat($('rerr').textContent)<0.03 && $('verdict').className.includes('ok'));
  const setb=v=>{$('beta').value=v;$('beta').dispatchEvent(new W.Event('input'));};
  setb(2.0); ok('over-stiff beta rings too fast, mismatches', parseFloat($('rfn').textContent)>12);
  ok('validation widgets present', ['beta','zeta','auto','rfn','rerr','verdict','meas','model'].every(id=>$(id)) && $('model').getAttribute('points').length>0);
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
  const L=readFileSync(B+'/04_validating_the_model.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\$\$/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG in <figure markdown>', L.includes('assets/m09-l4-validation.svg') && /<figure markdown>/.test(L));
  ok('DoD8 demo embedded (iframe) + open-in-tab link', /<iframe[^>]*demos\/lesson04_validation\.html/.test(L) && /\]\(demos\/lesson04_validation\.html\)/.test(L));
  ok('DoD9 quiz embedded (iframe) + open-in-tab link', /<iframe[^>]*quizzes\/lesson04_quiz\.html/.test(L) && /\]\(quizzes\/lesson04_quiz\.html\)/.test(L));
  ok('STYLE breadcrumb is an !!! abstract admonition', /!!! abstract "You are here"/.test(L));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances (Lesson 03 in, Lesson 05/mission out)', /Lesson 03|numeric|solv/i.test(L) && /Lesson 05|mission/i.test(L));
  ok('validation decision present (compare, identify parameters)', /validat|identif/i.test(L) && /parameter|measured|resonance/i.test(L) && /beta_eff|0\.77|8 Hz|bulk modulus/i.test(L));
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
console.log(fail?('\n[gate-m9l4] FAIL '+fail):'\n[gate-m9l4] PASS  M09 L04 meets all Definition-of-Done checks + power demo/quiz + crisp vector preview');
process.exit(fail?1:0);
