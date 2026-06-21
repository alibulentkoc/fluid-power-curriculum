#!/usr/bin/env python3
"""Final robustness pass: replace every MAIN-PAGE inline <svg> (the figure and the
   pre-rendered formulas) with a PNG <img> data-URI carrying EXPLICIT width/height.
   PNG <img> renders in any HTML viewer with no inline-SVG dependency (no namespace,
   no height:auto collapse, no gradient/url() resolution). Interactive demo/quiz stay
   as iframes (isolated documents). Run LAST, after prerender-math + clean."""
import re, base64, sys, cairosvg
f=sys.argv[1]; h=open(f).read()

# 1) stash iframe srcdocs so we never touch the interactive widgets
frames=[]
def stash(m): frames.append(m.group(0)); return f'@@FRAME{len(frames)-1}@@'
h=re.sub(r'<iframe class="widget"[\s\S]*?</iframe>', stash, h)

def uri(svg, scale):
    png=cairosvg.svg2png(bytestring=svg.encode('utf-8'), scale=scale)  # transparent bg
    return 'data:image/png;base64,'+base64.b64encode(png).decode()

# 2) figure -> PNG img (explicit intrinsic size via PNG; width:100% is safe on <img>)
nfig=[0]
def repl_fig(m):
    nfig[0]+=1
    return f'<div class="figure"><img alt="figure" src="{uri(m.group(1),2.0)}" style="display:block;width:100%;height:auto"/></div>'
h=re.sub(r'<div class="figure">(<svg[\s\S]*?</svg>)\s*</div>', repl_fig, h)

# 3) formulas -> PNG img with explicit width/height (+ keep baseline for inline)
neq=[0]
def repl_eq(m):
    svg=m.group(0); neq[0]+=1
    w=re.search(r'width="([\d.]+)"',svg); ht=re.search(r'height="([\d.]+)"',svg)
    va=re.search(r'vertical-align:\s*([-\d.]+)ex',svg)
    inline='mjx-inline' in svg
    style=(f'vertical-align:{va.group(1)}ex;' if (va and inline) else '')
    cls='mjx-eq mjx-inline' if inline else 'mjx-eq'
    W=f'{float(w.group(1)):.0f}' if w else ''; H=f'{float(ht.group(1)):.0f}' if ht else ''
    return f'<img class="{cls}" alt="equation" src="{uri(svg,3.0)}" width="{W}" height="{H}" style="{style}"/>'
h=re.sub(r'<svg class="mjx-eq[\s\S]*?</svg>', repl_eq, h)

for i,fr in enumerate(frames): h=h.replace(f'@@FRAME{i}@@', fr)
open(f,'w').write(h)

main=re.sub(r'srcdoc="(.*?)"','srcdoc=""',h,flags=re.S)
print(f"{f.split('/')[-1]}: figure->png={nfig[0]} formulas->png={neq[0]} | inline <svg left in main page: {len(re.findall(r'<svg', main))} (must be 0)")
