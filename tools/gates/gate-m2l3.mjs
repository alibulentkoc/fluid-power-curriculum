import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module02_components';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: bore -> velocity / pressure-loss / choke, run/reset, ports
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson03_lines_ports.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('default 8 mm -> 3.3 m/s', d.getElementById('vOut').textContent==='3.3', d.getElementById('vOut').textContent);
  ok('default 8 mm -> 0.9 bar lost', d.getElementById('dpOut').textContent==='0.9', d.getElementById('dpOut').textContent);
  ok('default 8 mm -> status OK', d.getElementById('statusOut').textContent==='OK', d.getElementById('statusOut').textContent);
  d.getElementById('d').value='5'; d.getElementById('d').dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('5 mm -> 8.5 m/s, 6.0 bar, CHOKED', d.getElementById('vOut').textContent==='8.5' && d.getElementById('dpOut').textContent==='6.0' && d.getElementById('statusOut').textContent==='CHOKED', d.getElementById('vOut').textContent+'/'+d.getElementById('dpOut').textContent+'/'+d.getElementById('statusOut').textContent);
  d.getElementById('d').value='16'; d.getElementById('d').dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('16 mm -> 0.8 m/s, OK (suction-sized, calm)', d.getElementById('vOut').textContent==='0.8' && d.getElementById('statusOut').textContent==='OK', d.getElementById('vOut').textContent+'/'+d.getElementById('statusOut').textContent);
  d.getElementById('bRun').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('Run raises platform with timed transition', d.getElementById('lifter').style.transform.includes('-170') && d.getElementById('lifter').style.transitionDuration.startsWith('7'), d.getElementById('lifter').style.transitionDuration);
  d.getElementById('bReset').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('Reset returns to baseline', d.getElementById('lifter').style.transform==='translateY(0px)');
  ok('real machine + ports (pressure line, cap fluid, lifter)', ['pline','capFluid','lifter'].every(id=>d.getElementById(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson03_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[0,1,1,1,1]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON
{
  const L=readFileSync(B+'/03_lines_fittings_and_ports.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited (renders on site + github.com)', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG in <figure markdown>', L.includes('assets/m02-l3-lines-ports.svg') && /<figure markdown>/.test(L));
  ok('DoD8 demo embedded (iframe) + open-in-tab link', /<iframe[^>]*demos\/lesson03_lines_ports\.html/.test(L) && /\]\(demos\/lesson03_lines_ports\.html\)/.test(L));
  ok('DoD9 quiz embedded (iframe) + open-in-tab link', /<iframe[^>]*quizzes\/lesson03_quiz\.html/.test(L) && /\]\(quizzes\/lesson03_quiz\.html\)/.test(L));
  ok('STYLE breadcrumb is an !!! abstract admonition (sister-site)', /!!! abstract "You are here"/.test(L));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (Lesson 02 + Lesson 04)', /Lesson 02|Module 02/.test(L) && /Lesson 04|04 —/.test(L));
  ok('component decision present (bore + velocity + line)', /bore/i.test(L) && /velocity/i.test(L) && /line/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW (crisp vector, sister-site quality — no rasterization)
{
  const h=readFileSync(B+'/lesson03_preview.html','utf8');
  const main=h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""');   // ignore embedded widget docs
  ok('preview has ZERO external deps (cdn/unpkg/module/mermaid)', !main.includes('cdn.') && !main.includes('unpkg') && !main.includes('type="module"') && !main.includes('class="mermaid"'));
  ok('figure is a CRISP VECTOR svg (data-URI img), not PNG', h.includes('data:image/svg+xml;base64,'));
  ok('formulas are CRISP VECTOR MathJax svg, not PNG', /class="mjx-eq/.test(main) && !main.includes('data:image/png'));
  ok('NO rasterized PNG of figure or math anywhere in main page', !main.includes('data:image/png'));
  ok('breadcrumb rendered as abstract admonition', h.includes('admonition abstract'));
  { const ifr=[...h.matchAll(/srcdoc="([\s\S]*?)"[^>]*><\/iframe>/g)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('demo + quiz inlined as self-contained iframe docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); }
  ok('no leftover un-typeset math (arithmatex) in main page', !main.includes('class="arithmatex"'));
}
console.log(fail?('\n[gate-m2l3] FAIL '+fail):'\n[gate-m2l3] PASS  M02 L03 meets all 12 Definition-of-Done checks + demo/math/port discipline');
process.exit(fail?1:0);
