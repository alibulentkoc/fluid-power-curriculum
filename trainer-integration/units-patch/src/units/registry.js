// src/units/registry.js
// Unit definitions by dimension, each with an EXACT multiplicative factor to its SI base unit.
// Temperature is affine (offset) and is intentionally NOT here -- it is handled separately so an
// offset can never be silently dropped. Factors are defined exact values, not approximations.

export const DIMENSIONS = {
  length:   { base: 'm',     units: { m: 1, mm: 1e-3, cm: 1e-2, in: 0.0254, ft: 0.3048 } },
  force:    { base: 'N',     units: { N: 1, kN: 1e3, lbf: 4.4482216152605 } },
  mass:     { base: 'kg',    units: { kg: 1, g: 1e-3, lb: 0.45359237 } },
  pressure: { base: 'Pa',    units: { Pa: 1, kPa: 1e3, MPa: 1e6, bar: 1e5, psi: 4.4482216152605 / (0.0254 ** 2), psia: 4.4482216152605 / (0.0254 ** 2) } },
  area:     { base: 'm2',    units: { m2: 1, mm2: 1e-6, cm2: 1e-4, in2: 0.0254 ** 2 } },
  volume:   { base: 'm3',    units: { m3: 1, L: 1e-3, mL: 1e-6, in3: 0.0254 ** 3, gal: 3.785411784e-3 } },
  velocity: { base: 'm/s',   units: { 'm/s': 1, 'mm/s': 1e-3, 'in/s': 0.0254, 'ft/s': 0.3048 } },
  flow:     { base: 'm3/s',  units: { 'm3/s': 1, 'L/min': 1e-3 / 60, gpm: 3.785411784e-3 / 60 } },
  density:  { base: 'kg/m3', units: { 'kg/m3': 1, 'lb/ft3': 0.45359237 / (0.3048 ** 3) } },
  power:    { base: 'W',     units: { W: 1, kW: 1e3, MW: 1e6, HP: 745.6998715822702 } },
  torque:   { base: 'N.m',   units: { 'N.m': 1, 'lb-in': 0.1129848290276167, 'lb-ft': 1.3558179483314004 } },
};

// Affine temperature units, routed away from the multiplicative path.
export const TEMP_UNITS = new Set(['C', 'F', 'degC', 'degF']);
