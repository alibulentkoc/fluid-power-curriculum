#!/usr/bin/env python3
"""Crisp, self-contained lesson preview — VECTOR throughout (no rasterization).
   Matches the sister site's rendering quality: figure stays a vector SVG (data-URI img),
   every formula is rendered to inline vector MathJax SVG by prerender-math.mjs, and the
   demo + quiz are inlined as self-contained <iframe srcdoc> documents. Material-like CSS,
   admonitions, <figure>, and the worked card all styled. Zero external dependencies.

   Pipeline:  build-preview-vector.py <md> <svg> <demo> <quiz> <out>  ->  prerender-math.mjs <out>  ->  clean-preview.py <out>
   (No rasterize-embed step — vectors render crisply in any modern browser.)
"""
import re, html, base64, markdown, sys
md_p, svg_p, demo_p, quiz_p, out_p = sys.argv[1:6]
md   = open(md_p).read()
svg  = open(svg_p).read()
demo = open(demo_p).read()
quiz = open(quiz_p).read()

md = re.sub(r'```mermaid\n.*?```', '', md, flags=re.S)   # mermaid stays in the .md for the site
body = markdown.markdown(
    md,
    extensions=['extra', 'admonition', 'attr_list', 'md_in_html', 'tables',
                'sane_lists', 'pymdownx.arithmatex'],
    extension_configs={'pymdownx.arithmatex': {'generic': True}})

# figure -> crisp vector SVG as a base64 data-URI <img> (self-contained, no namespace issues)
fig_uri = 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode('utf-8')).decode()
body = re.sub(r'<img([^>]*?)src="assets/[^"]*\.svg"([^>]*?)>',
              lambda m: f'<img{m.group(1)}src="{fig_uri}"{m.group(2)}>', body)

# demo + quiz <iframe src="..."> -> self-contained <iframe srcdoc="...">
def inline_iframe(html_body, src_needle, content):
    esc = html.escape(content, quote=True)
    return re.sub(r'(<iframe\b[^>]*?)\ssrc="' + re.escape(src_needle) + r'"([^>]*?>)',
                  lambda m: m.group(1) + ' srcdoc="' + esc + '"' + m.group(2),
                  html_body)
import os
body = inline_iframe(body, 'demos/' + os.path.basename(demo_p), demo)
body = inline_iframe(body, 'quizzes/' + os.path.basename(quiz_p), quiz)

page = f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Lesson 03 — Lines, fittings, and ports (rendered preview)</title>
<style>
:root{{--ink:#0C2235;--slate:#566573;--teal:#0E7E8C;--teal-d:#0C6A74;--green:#1B8A5A;
  --line:#E2E8EE;--bg:#FFFFFF;--soft:#F1F8F8}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.7;font-size:16px}}
.page{{max-width:820px;margin:0 auto;padding:32px 24px 96px}}
h1{{font-size:32px;line-height:1.2;margin:8px 0 8px;font-weight:700;letter-spacing:-.01em}}
h2{{font-size:22px;margin:40px 0 12px;padding-bottom:6px;border-bottom:2px solid var(--soft);color:#0F2C44;font-weight:600}}
p,li{{font-size:16px}}
blockquote{{background:var(--soft);border-left:4px solid var(--teal);margin:18px 0;padding:14px 18px;border-radius:0 8px 8px 0;color:#234}}
code{{background:#EEF3F7;padding:1px 6px;border-radius:5px;font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace;font-size:.86em}}
pre{{background:#0C2235;color:#E7EEF4;padding:16px 18px;border-radius:12px;overflow:auto;font-size:13.5px;line-height:1.5}}
pre code{{background:none;color:inherit;padding:0}}
a{{color:var(--teal-d);font-weight:600;text-decoration:none}}a:hover{{text-decoration:underline}}
/* admonition (Material-like) */
.admonition{{border:1px solid var(--line);border-left:4px solid var(--teal);border-radius:8px;
  padding:2px 18px;margin:18px 0;background:#F7FBFB}}
.admonition.abstract{{border-left-color:#5B8DEF;background:#F4F8FE}}
.admonition-title{{font-weight:700;margin:12px 0 6px;font-size:13.5px;letter-spacing:.02em;color:#0F2C44}}
/* figure */
figure{{margin:22px 0;text-align:center}}
figure img{{max-width:100%;height:auto;border:1px solid var(--line);border-radius:14px;background:#fff}}
/* worked card */
.worked{{background:#F5FAFA;border:1px solid #BFE3E0;border-left:4px solid var(--teal);
  border-radius:0 12px 12px 0;padding:6px 22px;margin:18px 0}}
.worked p strong:first-child,.worked>p>strong{{color:var(--teal-d)}}
/* embedded widgets */
iframe{{display:block;width:100%;background:#fff}}
/* tables */
table{{border-collapse:collapse;width:100%;margin:14px 0;font-size:14.5px}}
th,td{{border:1px solid var(--line);padding:8px 12px;text-align:left}}th{{background:#F2F6F9}}
/* math */
.mjx-disp{{overflow-x:auto;overflow-y:hidden;margin:16px 0;text-align:center}}
.mjx-eq{{vertical-align:middle}}
hr{{border:none;border-top:1px solid var(--line);margin:26px 0}}
.tag{{position:fixed;top:10px;right:10px;background:#0C2235;color:#fff;font-size:11px;
  padding:6px 12px;border-radius:20px;font-family:ui-monospace,monospace;opacity:.85}}
</style></head>
<body><div class="tag">rendered preview · vector · one file</div>
<div class="page">{body}</div></body></html>"""
open(out_p, 'w').write(page)
print(f"{out_p.split('/')[-1]}: figure_vector_datauri=1, "
      f"arithmatex={body.count('arithmatex')}, "
      f"iframes_inlined={body.count('srcdoc=')}")
