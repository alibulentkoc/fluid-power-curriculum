// src/units/format.js
// Display-mode mapping + formatting. Maps each quantity to the unit shown in each display mode and
// renders value+label. This is the ONLY place a display unit is chosen; conversion happens here, at
// the boundary, never in the engine/scorers/stores/hash.

import { convert, convertTemperature } from './convert.js';

export const MODES = ['customary', 'SI'];

// Which unit to DISPLAY for each quantity, per mode. customary is the default (matches the engine UI).
export const DISPLAY = {
  length:      { customary: 'in',   SI: 'mm' },
  pressure:    { customary: 'psi',  SI: 'bar' },
  force:       { customary: 'lbf',  SI: 'N' },
  flow:        { customary: 'gpm',  SI: 'L/min' },
  velocity:    { customary: 'in/s', SI: 'mm/s' },
  volume:      { customary: 'gal',  SI: 'L' },
  temperature: { customary: 'F',    SI: 'C' },
};

/** Convert a native value into the active display mode's unit. Returns { value, unit, text }. */
export function displayValue(value, nativeUnit, quantity, mode, digits = 2) {
  const map = DISPLAY[quantity];
  if (!map) throw new Error(`no display mapping for quantity '${quantity}'`);
  const target = map[mode];
  if (!target) throw new Error(`no display unit for ${quantity} in mode '${mode}'`);
  const out = quantity === 'temperature'
    ? convertTemperature(value, nativeUnit, target)
    : convert(value, nativeUnit, target);
  return { value: out, unit: target, text: `${out.toFixed(digits)} ${target}` };
}

export function isMode(m) { return MODES.includes(m); }
