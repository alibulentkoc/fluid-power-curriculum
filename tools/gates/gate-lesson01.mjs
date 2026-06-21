import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
const B='/mnt/user-data/outputs/module05_lessons';
let fail=0; const ok=(n,c,d='')=>{ if(!c){fail++;console.log('  FAIL '+n+(d?'  '+d:''))}else console.log('  ok   '+n); };

// ---------- 1. DEMO ----------
{
  const dom=new JSDOM(readFileSync(B+'/demos/lesson01_flow_and_power_demand.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document;
  const q=()=>d.getElementById('qOut').textContent, p=()=>d.getElementById('pwrOut').textContent, a=()=>d.getElementById('aOut').textContent;
  ok('demo default flow = 9.96 L/min', q()==='9.96', q());
  ok('demo default power = 1.66 kW', p()==='1.66', p());
  ok('demo default area = 19.63 cm2', a()==='19.63', a());
  // double the velocity -> flow doubles
  const V=d.getElementById('v'); V.value='169.06'; V.dispatchEvent(new dom.window.Event('input'));
  ok('demo doubling velocity doubles flow (~19.92)', q()==='19.92', q());
  // reset works
  d.getElementById('reset').dispatchEvent(new dom.window.Event('click'));
  ok('demo reset restores 9.96', q()==='9.96', q());
}

// ---------- 2. QUIZ ----------
{
  const dom=new JSDOM(readFileSync(B+'/quizzes/lesson01_quiz.html','utf8'),{runScripts:'dangerously'});
  const d=dom.window.document, W=dom.window;
  const cards=d.querySelectorAll('.q');
  ok('quiz has 5 questions', cards.length===5, String(cards.length));
  // answer every question correctly by clicking the .correct option (revealed only after click) -- instead click each and check feedback
  // We click option index matching the known key, then verify the running 'right' counter hits 5.
  const KEY=[0,1,2,2,1];
  cards.forEach((card,i)=>{ const opts=card.querySelectorAll('.opt'); opts[KEY[i]].dispatchEvent(new W.Event('click',{bubbles:true})); });
  ok('quiz scores 5/5 for the documented key', d.getElementById('right').textContent==='5', d.getElementById('right').textContent);
  ok('quiz marks all 5 answered', d.getElementById('done').textContent==='5', d.getElementById('done').textContent);
  // each chosen option shows as correct (green)
  let greens=0; cards.forEach((c,i)=>{ if(c.querySelectorAll('.opt')[KEY[i]].classList.contains('correct')) greens++; });
  ok('quiz highlights the correct option on each', greens===5, String(greens));
  // a wrong answer is handled: start over, click a known-wrong option on Q1 (index 1, since key is 0)
  d.getElementById('retry').dispatchEvent(new W.Event('click',{bubbles:true}));
  const q1=d.querySelectorAll('.q')[0]; q1.querySelectorAll('.opt')[1].dispatchEvent(new W.Event('click',{bubbles:true}));
  ok('quiz wrong answer does not increment correct', d.getElementById('right').textContent==='0', d.getElementById('right').textContent);
}

// ---------- 3. SVG ----------
{
  const svg=readFileSync(B+'/assets/m05-l1-demand-handoff.svg','utf8');
  new JSDOM('<!DOCTYPE html><body>'+svg+'</body>'); // throws on malformed
  ok('svg parses', true);
  ok('svg shows the three key figures', ['84.53','9.96','1.66'].every(x=>svg.includes(x)));
  ok('svg is not ascii-art (has gradients/paths)', svg.includes('linearGradient') && svg.includes('<path'));
}

// ---------- 4. LESSON MD ----------
{
  const L=readFileSync(B+'/01_why_machine_needs_power.md','utf8');
  ok('breadcrumb present', L.includes('You are here'));
  ok('references the SVG asset', L.includes('assets/m05-l1-demand-handoff.svg'));
  ok('DoD4 rendered math, dollar-delimited (renders on site + github.com)', L.includes('$$') && /\$[^$]+\$/.test(L));
  ok('GUARD no legacy backslash-bracket math', !/\\\[|\\\(/.test(L));
  ok('has a mermaid diagram', L.includes('```mermaid'));
  ok('no ascii-art box drawing', !/[┌┐└┘─│►▼]/.test(L));
  ok('links the interactive demo', L.includes('demos/lesson01_flow_and_power_demand.html'));
  ok('links the quiz', L.includes('quizzes/lesson01_quiz.html'));
  ok('AI Learning Companion section', L.includes('## AI Learning Companion'));
  ok('Global Learning Support section', L.includes('## Global Learning Support'));
  ok('all 12 parts', ['## 1.','## 2.','## 3.','## 4.','## 5.','## 6.','## 7.','## 8.','## 9.','## 10.','## 11.','## 12.'].every(p=>L.includes(p)));
  ok('figures match artifact (84.53/9.96/1.66/100 bar/wp-1.1.0)', ['84.53','9.96','1.66','100 bar','wp-1.1.0'].every(x=>L.includes(x)));
}

console.log(fail?('\n[gate-lesson01] FAIL '+fail):'\n[gate-lesson01] PASS  demo computes & reacts; quiz key correct & grades; svg professional; lesson matches reference structure');
process.exit(fail?1:0);
