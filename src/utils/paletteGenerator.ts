/**
 * Palette Generator Utility
 *
 * Generates a full color palette (50-900 shades) from a single base color (500).
 * Uses HSL color space for natural-looking shade progression.
 */

import type { ColorScale, ColorShade } from '@/stores/theme/types';

// Color conversion constants
const RGB_MAX = 255;
const HUE_MAX = 360;
const HUE_SEGMENT = 6;
const LIGHTNESS_MID = 0.5;
const HUE_THIRD = 3;
const HUE_OFFSET = 4;
const HEX_BASE = 16;

// Shade blending constants
const BLEND_FACTOR_LIGHT = 0.7;
const BLEND_FACTOR_DARK = 0.8;
const LIGHT_BLEND_MULT = 0.3;
const DARK_BLEND_MULT = 0.5;

// Hex parsing positions
const HEX_R_START = 0;
const HEX_R_END = 2;
const HEX_G_START = 2;
const HEX_G_END = 4;
const HEX_B_START = 4;
const HEX_B_END = 6;

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Shade names for iteration */
const SHADE_NAMES: ColorShade[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

/** Parse RGB string "r g b" to RGB object */
function parseRgbString(rgb: string): RGB {
  const parts = rgb.split(' ').map(Number);
  return { r: parts[0] ?? 0, g: parts[1] ?? 0, b: parts[2] ?? 0 };
}

/** Convert RGB object to "r g b" string format */
function rgbToString(rgb: RGB): string {
  return `${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)}`;
}

/** Convert RGB to HSL */
function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / RGB_MAX;
  const g = rgb.g / RGB_MAX;
  const b = rgb.b / RGB_MAX;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l };

  const d = max - min;
  const s = l > LIGHTNESS_MID ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? HUE_SEGMENT : 0)) / HUE_SEGMENT;
  else if (max === g) h = ((b - r) / d + 2) / HUE_SEGMENT;
  else h = ((r - g) / d + HUE_OFFSET) / HUE_SEGMENT;

  return { h: h * HUE_MAX, s, l };
}

/** Convert HSL to RGB */
function hslToRgb(hsl: HSL): RGB {
  const { h, s, l } = hsl;
  const hNorm = h / HUE_MAX;

  if (s === 0) {
    const gray = Math.round(l * RGB_MAX);
    return { r: gray, g: gray, b: gray };
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / HUE_SEGMENT) return p + (q - p) * HUE_SEGMENT * tNorm;
    if (tNorm < LIGHTNESS_MID) return q;
    if (tNorm < 2 / HUE_THIRD) return p + (q - p) * (2 / HUE_THIRD - tNorm) * HUE_SEGMENT;
    return p;
  };

  const q = l < LIGHTNESS_MID ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, hNorm + 1 / HUE_THIRD) * RGB_MAX),
    g: Math.round(hue2rgb(p, q, hNorm) * RGB_MAX),
    b: Math.round(hue2rgb(p, q, hNorm - 1 / HUE_THIRD) * RGB_MAX),
  };
}

/** Shade configuration for palette generation */
const SHADE_CONFIG: Record<ColorShade, { lightness: number; saturationMult: number }> = {
  '50': { lightness: 0.97, saturationMult: 0.3 },
  '100': { lightness: 0.94, saturationMult: 0.5 },
  '200': { lightness: 0.86, saturationMult: 0.7 },
  '300': { lightness: 0.76, saturationMult: 0.85 },
  '400': { lightness: 0.64, saturationMult: 0.95 },
  '500': { lightness: 0.5, saturationMult: 1.0 },
  '600': { lightness: 0.42, saturationMult: 1.0 },
  '700': { lightness: 0.34, saturationMult: 0.95 },
  '800': { lightness: 0.26, saturationMult: 0.9 },
  '900': { lightness: 0.18, saturationMult: 0.85 },
};

/** Generate a shade from a base HSL color */
function generateShade(baseHsl: HSL, shade: ColorShade): RGB {
  const config = SHADE_CONFIG[shade];
  const baseLightness = baseHsl.l;
  const targetLightness = config.lightness;

  const isLighter = targetLightness > LIGHTNESS_MID;
  const blendFactor = isLighter ? BLEND_FACTOR_LIGHT : BLEND_FACTOR_DARK;
  const blendMult = isLighter ? LIGHT_BLEND_MULT : DARK_BLEND_MULT;

  const newLightness =
    shade === '500' ? baseLightness : targetLightness * blendFactor + baseLightness * (1 - blendFactor) * blendMult;

  const newSaturation = Math.min(1, baseHsl.s * config.saturationMult);

  return hslToRgb({
    h: baseHsl.h,
    s: newSaturation,
    l: Math.max(0, Math.min(1, newLightness)),
  });
}

/**
 * Generate a full color palette from a base 500 color
 * @param baseColor - The base color in "r g b" format (e.g., "59 130 246")
 */
export function generatePaletteFromBase(baseColor: string): ColorScale {
  const baseRgb = parseRgbString(baseColor);
  const baseHsl = rgbToHsl(baseRgb);

  const palette: ColorScale = {
    '50': '', '100': '', '200': '', '300': '', '400': '',
    '500': baseColor,
    '600': '', '700': '', '800': '', '900': '',
  };

  for (const shade of SHADE_NAMES) {
    if (shade === '500') continue;
    const rgb = generateShade(baseHsl, shade);
    palette[shade] = rgbToString(rgb);
  }

  return palette;
}

/**
 * Convert hex color to RGB string format
 * @param hex - Hex color (e.g., "#3b82f6" or "3b82f6")
 */
export function hexToRgbString(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(HEX_R_START, HEX_R_END), HEX_BASE);
  const g = parseInt(cleanHex.substring(HEX_G_START, HEX_G_END), HEX_BASE);
  const b = parseInt(cleanHex.substring(HEX_B_START, HEX_B_END), HEX_BASE);
  return `${r} ${g} ${b}`;
}

/**
 * Convert RGB string to hex color
 * @param rgb - RGB string (e.g., "59 130 246")
 */
export function rgbStringToHex(rgb: string): string {
  const { r, g, b } = parseRgbString(rgb);
  const toHex = (n: number): string => n.toString(HEX_BASE).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Derived component colors from primary palette */
export interface DerivedComponentColors {
  buttons: {
    primary: {
      background: string;
      backgroundHover: string;
      textColor: string;
    };
  };
  sidebar: {
    activeBg: string;
    activeText: string;
  };
  inputs: {
    borderFocus: string;
  };
}

/** Generate derived component colors from a primary palette
 * Returns raw RGB values (e.g., "37 99 235") - the componentInjector adds rgb() wrapper
 */
export function generateDerivedColors(primaryPalette: ColorScale): DerivedComponentColors {
  return {
    buttons: {
      primary: {
        background: primaryPalette['600'],
        backgroundHover: primaryPalette['700'],
        textColor: '255 255 255',
      },
    },
    sidebar: {
      activeBg: primaryPalette['500'],
      activeText: '255 255 255',
    },
    inputs: {
      borderFocus: primaryPalette['500'],
    },
  };
}
