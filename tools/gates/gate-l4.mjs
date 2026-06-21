import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module01_launch';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };
// DEMO: cylinder force vs motor torque, both actuators present, ports
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson04_actuator_types.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  ok('default cylinder mode -> 19.6 kN force', d.getElementById('outV').textContent==='19.6' && d.getElementById('outU').textContent==='kN', d.getElementById('outV').textContent);
  d.getElementById('mMot').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('motor mode -> 79.6 N·m torque', d.getElementById('outV').textContent==='79.6' && d.getElementById('outU').textContent==='N·m', d.getElementById('outV').textContent);
  ok('motor mode shows motor group, hides cylinder', d.getElementById('motGroup').style.display!=='none' && d.getElementById('cylGroup').style.display==='none');
  ok('drum spins in motor mode', d.getElementById('drum').classList.contains('spinning'));
  d.getElementById('mCyl').dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('back to cylinder -> 19.6 kN', d.getElementById('outV').textContent==='19.6');
  ok('real machine + ports (power unit, gauge, both actuators)', ['needle','cylGroup','motGroup','drum'].every(id=>d.getElementById(id)));
}
// QUIZ
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson04_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document,W=dom.window; const cards=d.querySelectorAll('.q');
  ok('quiz 5 questions', cards.length===5);
  const KEY=[1,0,0,1,0]; cards.forEach((c,i)=>c.querySelectorAll('.opt')[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})));
  ok('quiz scores 5/5', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
}
// LESSON: 12 DoD + guards + Technology Coverage (rotary motor present)
{
  const L=readFileSync(B+'/04_real_industrial_machines.md','utf8');
  ok('DoD1 machine->problem->decision before math', /decision/i.test(L.split('## 2.')[0]) && !/\\\[/.test(L.split('## 2.')[0]));
  ok('DoD2 states the decision', /decision you can now make/i.test(L));
  ok('DoD3 learner language', !/\b(artifact|benchmark|competency|pipeline|workcell)\b|\btwin\b|Physical AI/i.test(L));
  ok('DoD4 rendered math, dollar-delimited (renders on site + github.com)', L.includes('$$') && !/\[\s*F\s*=\s*p\s*[x×]\s*A\s*\]/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  for(const k of ['**Given**','**Find**','**Assumptions**','**Solution**','**Result**','**Engineering Interpretation**'])
    ok('DoD5 worked template '+k, L.includes(k));
  ok('DoD6/7 references reviewed SVG', L.includes('assets/m01-l4-machine-family.svg'));
  ok('DoD8 links demo', L.includes('demos/lesson04_actuator_types.html'));
  ok('DoD9 links quiz', L.includes('quizzes/lesson04_quiz.html'));
  ok('DoD10 reinforces lift platform', /lift platform|the platform/i.test(L));
  ok('DoD11 advances narrative (links L03/L02 + Module 02)', /Lesson 03|Lesson 02/.test(L) && /Module 02/.test(L));
  ok('Technology Coverage: rotary motor as supporting example', /hydraulic motor|rotary/i.test(L) && /winch|conveyor/i.test(L));
  ok('AI companion deepens not summarizes', L.includes('**Deepen**')&&L.includes('**Challenge**')&&!/summari[sz]e the lesson/i.test(L));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
}
// PREVIEW: composites + pre-rendered SVG math
{
  const h=readFileSync(B+'/lesson04_preview.html','utf8');
  ok('preview has ZERO external deps (cdn/module/mermaid)', !h.includes('cdn.') && !h.includes('type="module"') && !h.includes('class="mermaid"'));
  ok('preview has no invalid <p><div> nesting', !h.includes('<p><div class="figure"'));
  { const ifr=[...h.matchAll(/srcdoc="(.*?)"><\/iframe>/gs)].map(x=>x[1]);
    const dec=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#39;/g,"'");
    ok('preview iframes are complete self-contained docs', ifr.length===2 && ifr.every(x=>{const t=dec(x).trim(); return t.startsWith('<!DOCTYPE') && t.endsWith('</html>') && !t.includes('cdn.');})); } const d=new JSDOM(h).window.document;
  ok('preview composites (figure img + 2 widgets + worked card)', d.querySelector('.figure img')&&d.querySelectorAll('iframe.widget').length===2&&d.querySelector('.worked'));
  ok('preview math + figure are PNG <img>, ZERO inline SVG in main page', h.includes('<div class="figure"><img') && h.includes('<img class="mjx-eq"') && !h.replace(/srcdoc="[\s\S]*?"/g,'srcdoc=""').includes('<svg') && !h.includes('class="arithmatex"') && !h.includes('<mjx-container') && !h.includes('cdn.jsdelivr.net/npm/mathjax'));
}
console.log(fail?('\n[gate-l4] FAIL '+fail):'\n[gate-l4] PASS  M01 L04 meets all 12 Definition-of-Done checks + math/port/coverage discipline');
process.exit(fail?1:0);
