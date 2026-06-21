// MkDocs Material — MathJax config compatible with pymdownx.arithmatex (generic: true)
// Renders \( ... \) inline and \[ ... \] display, the same delimiters the lessons use.
window.MathJax = {
  tex: {
    inlineMath:  [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]]
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};
// Re-typeset on MkDocs Material's instant-navigation page loads
if (typeof document$ !== "undefined") {
  document$.subscribe(() => { if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise(); });
}
