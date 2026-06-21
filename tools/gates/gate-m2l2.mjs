import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module02_components';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: flow -> speed/time/power, run/reset, ports
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson02_power_unit.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('default Q=10 -> 84.9 mm/s', d.getElementById('vOut').textContent==='84.9', d.getElementById('vOut').textContent);
  ok('default lift time 7.1 s', d.getElementById('tOut').textContent==='7.1', d.getElementById('tOut').textContent);
  ok('default motor power 1.67 kW', d.getElementById('pOut').textContent==='1.67', d.getElementById('pOut').textContent);
  d.getElementById('bRun').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('Run raises platform with timed transition', d.getElementById('lifter').style.transform.includes('-134') && d.getElementById('lifter').style.transitionDuration.startsWith('7'), d.getElementById('lifter').style.transitionDuration);
  d.getElementById('bReset').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('Reset returns to baseline', d.getElementById('lifter').style.transform==='translateY(0px)');
  d.getElementById('q').value='20'; d.getElementById('q').dispatchEvent(new W.Event('input',{bubbles:true}));
  ok('Q=20 -> 169.8 mm/s, 3.5 s, 3.33 kW', d.getElementById('vOut').textContent==='169.8' && d.getElementById('tOut').textContent==='3.5' && d.getElementById('pOut').textContent==='3.33', d.getElementById('vOut').textContent+'/'+d.getElementById('tOut').textContent+'/'+d.getElementById('pOut').textContent);
  ok('real machine + ports (pressure line, cap fluid, lifter)', ['pline','capFluid','lifter'].every(id=>d.getElementById(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson02_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[0,1,1,0,0]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON
{
  const L=readFileSync(B+'/02_the_power_unit.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, single-backslash display', L.includes('\\['));
  ok('GUARD no double-backslash math', !/\\\\[\[\](]|\\\\(times|frac|text|approx|pi)/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG', L.includes('assets/m02-l2-power-unit.svg'));
  ok('DoD8 links demo', L.includes('demos/lesson02_power_unit.html'));
  ok('DoD9 links quiz', L.includes('quizzes/lesson02_quiz.html'));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (Lesson 01 + Lesson 03)', /Lesson 01|Module 01/.test(L) && /Lesson 03|03 —/.test(L));
  ok('component decision present (pump flow + motor power)', /flow/i.test(L) && /pump/i.test(L) && /motor power/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
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
  const d=new JSDOM(h).window.document;
  ok('preview composites (figure img + 2 widgets + worked card)', d.querySelector('.figure img')&&d.querySelectorAll('iframe.widget').length===2&&d.querySelector('.worked'));
  ok('preview math + figure are PNG <img>, ZERO inline SVG in main page', h.includes('<div class="figure"><img') && h.includes('<img class="mjx-eq"') && !h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""').includes('<svg') && !h.includes('class="arithmatex"') && !h.includes('<mjx-container') && !h.includes('cdn.jsdelivr.net/npm/mathjax'));
}
console.log(fail?('\n[gate-m2l2] FAIL '+fail):'\n[gate-m2l2] PASS  M02 L02 meets all 12 Definition-of-Done checks + demo/math/port discipline');
process.exit(fail?1:0);
