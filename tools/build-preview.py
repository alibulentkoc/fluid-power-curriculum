#!/usr/bin/env python3
"""Reusable lesson-preview generator -> self-contained from the start.
   Drops mermaid (kept in the .md for the deployed site), inlines the figure SVG,
   embeds demo + quiz as iframe srcdoc, outputs arithmatex spans (converted to inline
   SVG by prerender-math.mjs), with NO external CDN scripts and valid (unwrapped) HTML.
   Usage: build-preview.py <md> <svg> <demo_html> <quiz_html> <out_html> <fig_basename> <demo_href> <quiz_href> <title>"""
import re, html, markdown, sys
md_p, svg_p, demo_p, quiz_p, out_p, fig_base, demo_href, quiz_href, title = sys.argv[1:10]
md=open(md_p).read(); svg=open(svg_p).read(); demo=open(demo_p).read(); quiz=open(quiz_p).read()
md=re.sub(r'```mermaid\n.*?```','',md,flags=re.S)                       # mermaid stays in the .md, not the preview
body=markdown.markdown(md, extensions=['extra','tables','sane_lists','pymdownx.arithmatex'],
                       extension_configs={'pymdownx.arithmatex':{'generic':True}})
fig='<div class="figure">'+svg+'</div>'
body=re.sub(r'<p>\s*<img[^>]*'+re.escape(fig_base)+r'[^>]*/?>\s*</p>', fig, body)   # unwrap <p>
body=re.sub(r'<img[^>]*'+re.escape(fig_base)+r'[^>]*/?>', fig, body)
def embed(b,href,src,h):
    ifr='<iframe class="widget" style="height:%dpx" srcdoc="%s"></iframe>'%(h,html.escape(src,quote=True))
    return re.sub(r'<p>(<a href="'+re.escape(href)+r'"[^<]*</a>[^<]*)</p>', lambda m:'<p>'+m.group(1)+'</p>'+ifr, b)
body=embed(body,demo_href,demo,820); body=embed(body,quiz_href,quiz,900)
page=f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{title} (rendered preview)</title>
<style>
:root{{--ink:#0C2235;--slate:#566573;--teal:#0E7E8C;--line:#E2E8EE;--bg:#FCFDFE}}
body{{margin:0;background:var(--bg);color:var(--ink);font-family:'IBM Plex Sans','Segoe UI',system-ui,sans-serif;line-height:1.65}}
.page{{max-width:860px;margin:0 auto;padding:40px 28px 80px}}
.crumb{{font-size:12px;color:var(--slate);border-bottom:1px solid var(--line);padding-bottom:14px;margin-bottom:8px}}
h1{{font-size:30px;line-height:1.2;margin:18px 0 10px}}
h2{{font-size:21px;margin:38px 0 12px;padding-top:14px;border-top:1px solid var(--line);color:#13314A}}
blockquote{{background:#F1F8F8;border-left:4px solid var(--teal);margin:18px 0;padding:14px 18px;border-radius:0 10px 10px 0;color:#234}}
code{{background:#EEF3F7;padding:1px 6px;border-radius:5px;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:.88em}}
pre{{background:#0C2235;color:#E7EEF4;padding:16px 18px;border-radius:12px;overflow:auto;font-size:13.5px}}
pre code{{background:none;color:inherit;padding:0}}
a{{color:var(--teal);font-weight:600}}
.figure{{margin:18px 0;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}}
.figure svg{{display:block;width:100%;height:auto}}
.widget{{width:100%;border:1px solid var(--line);border-radius:16px;margin:10px 0 6px;background:#fff}}
.worked{{background:#F5FAFA;border:1px solid #BFE3E0;border-left:4px solid var(--teal);border-radius:0 12px 12px 0;padding:8px 22px 4px;margin:18px 0}}
.worked strong:first-child,.worked p strong{{color:#0C6A74}}
table{{border-collapse:collapse;width:100%;margin:14px 0;font-size:14px}}
th,td{{border:1px solid var(--line);padding:8px 12px;text-align:left}}th{{background:#F2F6F9}}
.mjx-disp{{overflow-x:auto;margin:14px 0}}.mjx-disp .mjx-eq{{display:block}}.mjx-eq{{vertical-align:middle}}
.preview-tag{{position:fixed;top:10px;right:10px;background:#0C2235;color:#fff;font-size:11px;padding:6px 12px;border-radius:20px;font-family:'IBM Plex Mono',monospace;opacity:.85}}
</style></head>
<body><div class="preview-tag">rendered preview · one file</div><div class="page">{body}</div></body></html>"""
open(out_p,'w').write(page)
print(f"{out_p.split('/')[-1]}: arithmatex={body.count('class=\"arithmatex\"')}, figure_inlined={'<div class=\"figure\">' in body}, widgets={body.count('iframe class=\"widget\"')}")
