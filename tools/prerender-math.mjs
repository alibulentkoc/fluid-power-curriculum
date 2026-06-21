import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { readFileSync, writeFileSync } from 'node:fs';

// Pre-render every equation to a PLAIN, self-contained <svg> — inline glyph paths
// (fontCache:'none' => no <use>/xlink), no <mjx-container> custom element, explicit px
// size and fill colour, zero CSS dependency. Renders exactly like the figure SVGs.
const file = process.argv[2];
const adaptor = liteAdaptor(); RegisterHTMLHandler(adaptor);
const tex = new TeX({ packages: AllPackages });
const svg = new SVG({ fontCache: 'none' });
const mjdoc = mathjax.document('', { InputJax: tex, OutputJax: svg });
const dec = s => s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const EX = 8.2;   // ex -> px (deterministic; ~ a browser's ex at the body font size)

function plain(t, display){
  const out = adaptor.outerHTML(mjdoc.convert(dec(t).trim(), { display }));
  let s = (out.match(/<svg[\s\S]*<\/svg>/) || [''])[0];
  s = s.replace(/width="([\d.]+)ex"/,  (m,v)=>`width="${(+v*EX).toFixed(1)}"`)
       .replace(/height="([\d.]+)ex"/, (m,v)=>`height="${(+v*EX).toFixed(1)}"`)
       .replace(/currentColor/g, '#13314A');
  // keep vertical-align (in ex) for inline baseline; tag class for styling hooks
  s = s.replace('<svg ', display ? '<svg class="mjx-eq" ' : '<svg class="mjx-eq mjx-inline" ');
  return display ? `<div class="mjx-disp">${s}</div>` : s;
}

let html = readFileSync(file, 'utf8');
let nDisp=0, nInline=0;
html = html.replace(/<div class="arithmatex">\s*\\\[([\s\S]*?)\\\]\s*<\/div>/g, (m,t)=>{nDisp++; return plain(t,true);});
html = html.replace(/<span class="arithmatex">\s*\\\(([\s\S]*?)\\\)\s*<\/span>/g, (m,t)=>{nInline++; return plain(t,false);});
// remove any client-side MathJax leftovers if a template still carried them
html = html.replace(/<script>window\.MathJax=[\s\S]*?<\/script>\s*/, '');
html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/mathjax@3[^"]*"[^>]*><\/script>\s*/, '');
writeFileSync(file, html);

const leftover = (html.match(/class="arithmatex"/g)||[]).length;
const container = (html.match(/<mjx-container/g)||[]).length;
const usexlink = (html.match(/xlink:href/g)||[]).length;
console.log(`${file.split('/').pop()}: ${nDisp} display + ${nInline} inline -> plain inline SVG | arithmatex=${leftover} mjx-container=${container} xlink-use=${usexlink}`);
process.exit((leftover||container||usexlink) ? 1 : 0);
