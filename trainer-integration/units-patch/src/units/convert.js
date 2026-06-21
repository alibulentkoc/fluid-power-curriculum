// src/units/convert.js
// Pure, exact, fail-loud unit conversion. Refuses unknown units, dimension mismatches, non-finite
// values, and temperature via the multiplicative path (affine -> use convertTemperature).

import { DIMENSIONS, TEMP_UNITS } from './registry.js';

function dimensionOf(unit) {
  for (const [dim, spec] of Object.entries(DIMENSIONS)) if (unit in spec.units) return dim;
  return null;
}

export function convert(value, from, to) {
  if (TEMP_UNITS.has(from) || TEMP_UNITS.has(to)) {
    throw new Error(`temperature is affine; use convertTemperature (got ${from} -> ${to})`);
  }
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`non-finite value not convertible: ${value}`);
  }
  const df = dimensionOf(from), dt = dimensionOf(to);
  if (!df) throw new Error(`unknown unit '${from}'`);
  if (!dt) throw new Error(`unknown unit '${to}'`);
  if (df !== dt) throw new Error(`cannot convert ${df} -> ${dt} (${from} -> ${to})`);
  return (value * DIMENSIONS[df].units[from]) / DIMENSIONS[dt].units[to];
}

export function convertTemperature(value, from, to) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`non-finite temperature not convertible: ${value}`);
  }
  const norm = (u) => (u === 'degC' ? 'C' : u === 'degF' ? 'F' : u);
  const F = norm(from), T = norm(to);
  if (!['C', 'F'].includes(F) || !['C', 'F'].includes(T)) {
    throw new Error(`unknown temperature unit (${from} -> ${to})`);
  }
  if (F === T) return value;
  return F === 'F' ? ((value - 32) * 5) / 9 : (value * 9) / 5 + 32;
}
