#!/usr/bin/env python3
"""Make a lesson preview fully self-contained and valid:
   - remove mermaid (CDN ESM module + .mermaid div) -> the inline SVG figure carries the visual
   - strip any other external CDN <script>/<link>
   - unwrap invalid <p> around block-level <div class=figure> and <iframe class=widget>
   Run BEFORE prerender-math.mjs. Mermaid stays in the lesson .md for the deployed MkDocs site."""
import re, sys
f=sys.argv[1]; h=open(f).read()
before=dict(mermaid_div=h.count('class="mermaid"'), module=h.count('type="module"'), cdn=h.count('cdn.jsdelivr'))

# 1) remove mermaid module loader script(s)
h=re.sub(r'<script type="module">[\s\S]*?mermaid[\s\S]*?</script>', '', h)
# 2) remove mermaid divs (with or without a wrapping <p>)
h=re.sub(r'<p>\s*<div class="mermaid">[\s\S]*?</div>\s*</p>', '', h)
h=re.sub(r'<div class="mermaid">[\s\S]*?</div>', '', h)
# 3) remove any remaining external CDN scripts/links/preloads
h=re.sub(r'<script[^>]*src="https?://[^"]*"[^>]*>\s*</script>', '', h)
h=re.sub(r'<link[^>]*href="https?://[^"]*"[^>]*>', '', h)
# 4) unwrap invalid <p> around block elements
h=re.sub(r'<p>\s*(<div class="figure">[\s\S]*?</div>)\s*</p>', r'\1', h)
h=re.sub(r'<p>\s*(<iframe class="widget"[\s\S]*?</iframe>)\s*</p>', r'\1', h)

open(f,'w').write(h)
after=dict(mermaid_div=h.count('class="mermaid"'), module=h.count('type="module"'), cdn=h.count('cdn.jsdelivr'), p_div=len(re.findall(r'<p>\s*<div class="figure"',h)))
print(f"{f.split('/')[-1]}: {before} -> {after}")
