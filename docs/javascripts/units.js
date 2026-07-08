/* Site-wide SI <-> US Customary units panel for the Fluid Power curriculum.
   Non-invasive: a floating button + panel with the platform spec in both unit
   systems and a live multi-unit converter. Does not alter any lesson content. */
(function () {
  "use strict";

  // Canonical platform spec: [quantity, SI, US Customary]
  var SPEC = [
    ["Bore diameter", "50 mm", "1.969 in"],
    ["Rod diameter", "28 mm", "1.102 in"],
    ["Cap area (A_cap)", "1963.5 mm\u00b2", "3.043 in\u00b2"],
    ["Rod-side area (A_rod)", "1347.7 mm\u00b2", "2.089 in\u00b2"],
    ["Stroke", "600 mm", "23.62 in"],
    ["Working pressure", "100 bar", "1450 psi"],
    ["Relief setting", "115 bar", "1668 psi"],
    ["Counterbalance set", "130 bar", "1885 psi"],
    ["Pump flow", "10 L/min", "2.64 gpm"],
    ["Extend force", "19.6 kN", "4406 lbf (2.20 tonf)"],
    ["Load mass", "2000 kg", "4409 lb"],
    ["Extend speed", "85 mm/s", "3.35 in/s"],
    ["Retract speed", "124 mm/s", "4.88 in/s"],
    ["Position tolerance", "\u00b11 mm", "\u00b10.039 in (\u00b139 mil)"],
    ["Oil (ISO VG46)", "46 cSt", "46 cSt (unit-agnostic)"],
    ["Oil-spring resonance", "\u224812 Hz", "\u224812 Hz"]
  ];

  // Multi-unit converter. Each quantity has an ordered unit list.
  // A unit is either a linear factor to the base, or {to, from} functions (affine, e.g. temperature).
  var QTY = {
    "Pressure": { units: [
      ["bar", 1e5], ["mbar", 1e2], ["Pa", 1], ["kPa", 1e3], ["MPa", 1e6],
      ["psi", 6894.75729], ["atm", 101325], ["kgf/cm\u00b2", 98066.5]
    ]},
    "Force": { units: [
      ["N", 1], ["kN", 1e3], ["MN", 1e6], ["kgf", 9.80665],
      ["lbf", 4.44822162], ["ozf", 0.278013851], ["tonf (US)", 8896.443], ["tonf (metric)", 9806.65]
    ]},
    "Flow (volumetric)": { units: [
      ["L/min", 1], ["L/s", 60], ["mL/min", 1e-3], ["m\u00b3/h", 16.666667], ["m\u00b3/min", 1000],
      ["gpm (US)", 3.7854118], ["gpm (UK)", 4.54609], ["cfm (ft\u00b3/min)", 28.316847], ["in\u00b3/s", 0.98322381]
    ]},
    "Length": { units: [
      ["mm", 1], ["cm", 10], ["m", 1000], ["\u00b5m", 1e-3], ["km", 1e6],
      ["in", 25.4], ["mil (thou)", 0.0254], ["ft", 304.8], ["yd", 914.4]
    ]},
    "Speed": { units: [
      ["mm/s", 1], ["cm/s", 10], ["m/s", 1000], ["m/min", 16.666667], ["km/h", 277.77778],
      ["in/s", 25.4], ["ft/s", 304.8], ["ft/min", 5.08], ["mph", 447.04]
    ]},
    "Mass": { units: [
      ["kg", 1], ["g", 1e-3], ["t (tonne)", 1000], ["lb", 0.45359237], ["oz", 0.0283495231], ["slug", 14.593903]
    ]},
    "Volume": { units: [
      ["L", 1], ["mL", 1e-3], ["cm\u00b3", 1e-3], ["m\u00b3", 1000],
      ["gal (US)", 3.7854118], ["gal (UK)", 4.54609], ["in\u00b3", 0.0163870640], ["ft\u00b3", 28.316847]
    ]},
    "Torque": { units: [
      ["N\u00b7m", 1], ["N\u00b7mm", 1e-3], ["kN\u00b7m", 1e3], ["kgf\u00b7m", 9.80665],
      ["lbf\u00b7ft", 1.35581795], ["lbf\u00b7in", 0.112984829], ["ozf\u00b7in", 0.00706155181]
    ]},
    "Power": { units: [
      ["W", 1], ["kW", 1e3], ["MW", 1e6], ["hp (mech)", 745.699872], ["PS (metric hp)", 735.49875],
      ["BTU/h", 0.293071], ["ft\u00b7lbf/s", 1.35581795]
    ]},
    "Kinematic viscosity": { units: [
      ["cSt", 1], ["mm\u00b2/s", 1], ["St", 100], ["m\u00b2/s", 1e6]
    ]},
    "Temperature": { units: [
      ["\u00b0C", { to: function (c) { return c + 273.15; }, from: function (k) { return k - 273.15; } }],
      ["\u00b0F", { to: function (f) { return (f - 32) * 5 / 9 + 273.15; }, from: function (k) { return (k - 273.15) * 9 / 5 + 32; } }],
      ["K", { to: function (k) { return k; }, from: function (k) { return k; } }]
    ]}
  };

  var SVG_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h9l-2-2 1.4-1.4L19.8 8l-4.4 4.4L14 11l2-2H7V7zm10 10H8l2 2-1.4 1.4L4.2 16l4.4-4.4L10 13l-2 2h9v2z"/></svg>';

  function toBase(unit, x) { return (typeof unit[1] === "number") ? x * unit[1] : unit[1].to(x); }
  function fromBase(unit, b) { return (typeof unit[1] === "number") ? b / unit[1] : unit[1].from(b); }

  function fmt(x) {
    if (x === null || x === undefined || isNaN(x) || !isFinite(x)) return "";
    if (x === 0) return "0";
    var a = Math.abs(x);
    if (a < 1e-4 || a >= 1e7) return x.toExponential(4);
    return parseFloat(x.toPrecision(6)).toString();
  }

  function build() {
    if (document.getElementById("units-fab")) return; // guard against double-inject

    var fab = document.createElement("button");
    fab.id = "units-fab";
    fab.className = "units-fab";
    fab.setAttribute("aria-label", "Open unit converter (SI and US Customary)");
    fab.innerHTML = SVG_ICON + "<span>Units</span>";

    var overlay = document.createElement("div");
    overlay.className = "units-overlay";

    var panel = document.createElement("div");
    panel.className = "units-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Units: SI and US Customary");

    var rows = SPEC.map(function (r) {
      return '<tr><td class="qty">' + r[0] + '</td><td class="si">' + r[1] + '</td><td class="us">' + r[2] + '</td></tr>';
    }).join("");

    var opts = Object.keys(QTY).map(function (k) {
      return '<option value="' + k + '">' + k + "</option>";
    }).join("");

    panel.innerHTML =
      '<button class="up-close" aria-label="Close">\u00d7</button>' +
      "<h3>Units \u2014 SI \u2194 US Customary</h3>" +
      '<p class="up-sub">The curriculum is authored in SI. This is a reference and converter \u2014 it does not change the lesson text.</p>' +
      '<div class="up-tabs">' +
        '<button data-tab="spec" class="active">Platform spec</button>' +
        '<button data-tab="conv">Converter</button>' +
      "</div>" +
      '<div class="up-section active" data-sec="spec">' +
        '<table class="up-table"><thead><tr><th>Quantity</th><th>SI</th><th>US Customary</th></tr></thead>' +
        "<tbody>" + rows + "</tbody></table>" +
        '<p class="up-note">Frequencies (e.g. the ~12 Hz oil-spring resonance) and viscosity in cSt are unit-agnostic. Areas convert as length\u00b2.</p>' +
      "</div>" +
      '<div class="up-section" data-sec="conv">' +
        '<div class="up-conv-row"><select id="up-qty" aria-label="Quantity">' + opts + "</select></div>" +
        '<div class="up-conv-row">' +
          '<input id="up-val" type="number" inputmode="decimal" placeholder="Enter a value" style="flex:2 1 0;">' +
          '<select id="up-from" aria-label="From unit" style="flex:1 1 0;"></select>' +
        "</div>" +
        '<table class="up-table up-results"><tbody id="up-out"></tbody></table>' +
        '<p class="up-note">Enter a value in any unit \u2014 it converts to every unit in that category at once.</p>' +
      "</div>";

    document.body.appendChild(fab);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    function open() { overlay.classList.add("open"); panel.classList.add("open"); }
    function close() { overlay.classList.remove("open"); panel.classList.remove("open"); }
    fab.addEventListener("click", open);
    overlay.addEventListener("click", close);
    panel.querySelector(".up-close").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    panel.querySelectorAll(".up-tabs button").forEach(function (b) {
      b.addEventListener("click", function () {
        panel.querySelectorAll(".up-tabs button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        panel.querySelectorAll(".up-section").forEach(function (s) {
          s.classList.toggle("active", s.getAttribute("data-sec") === b.getAttribute("data-tab"));
        });
      });
    });

    var qty = panel.querySelector("#up-qty");
    var val = panel.querySelector("#up-val");
    var from = panel.querySelector("#up-from");
    var out = panel.querySelector("#up-out");

    function fillFrom() {
      var units = QTY[qty.value].units;
      from.innerHTML = units.map(function (u, i) {
        return '<option value="' + i + '">' + u[0] + "</option>";
      }).join("");
    }
    function compute() {
      var units = QTY[qty.value].units;
      var fromU = units[parseInt(from.value, 10) || 0];
      var v = parseFloat(val.value);
      if (isNaN(v)) { out.innerHTML = '<tr><td class="up-hint" colspan="2">Enter a value to see every unit.</td></tr>'; return; }
      var base = toBase(fromU, v);
      out.innerHTML = units.map(function (u) {
        var isFrom = (u[0] === fromU[0]);
        return '<tr' + (isFrom ? ' class="up-src"' : '') + '><td class="qty">' + u[0] + '</td><td class="us">' + fmt(fromBase(u, base)) + "</td></tr>";
      }).join("");
    }
    qty.addEventListener("change", function () { fillFrom(); compute(); });
    from.addEventListener("change", compute);
    val.addEventListener("input", compute);
    fillFrom(); compute();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(build);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
