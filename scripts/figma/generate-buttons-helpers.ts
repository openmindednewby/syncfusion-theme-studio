// Color utilities, hover derivation, and danger synthesis for button generation.
// Low-level helpers used by generate-buttons.ts and generate-buttons-dark.ts.

// ── ButtonVariantOverride type (shared across button generation modules) ──

/** Fields that belong in ButtonStateColors (per-variant) */
export interface ButtonVariantOverride {
  background?: string;
  backgroundHover?: string;
  backgroundActive?: string;
  textColor?: string;
  textColorHover?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  disabledBackground?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  disabledOpacity?: string;
}

// ── Color utility helpers ──────────────────────────────────────────

const BRIGHTNESS_THRESHOLD = 128;
const CLAMP_MIN = 0;
const CLAMP_MAX = 255;

function parseRgb(color: string): [number, number, number] | null {
  if (!color || color === 'transparent') return null;
  const parts = color.split(' ').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return parts as [number, number, number];
}

function brightness(r: number, g: number, b: number): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function clamp(v: number): number {
  return Math.max(CLAMP_MIN, Math.min(CLAMP_MAX, Math.round(v)));
}

export function isColorDark(color: string): boolean {
  const rgb = parseRgb(color);
  if (!rgb) return false;
  return brightness(...rgb) < BRIGHTNESS_THRESHOLD;
}

export function isTransparentOrMissing(color: string | undefined): boolean {
  return !color || color === 'transparent';
}

function lightenRgb(color: string, amount: number): string {
  const rgb = parseRgb(color);
  if (!rgb) return color;
  return `${clamp(rgb[0] + amount)} ${clamp(rgb[1] + amount)} ${clamp(rgb[2] + amount)}`;
}

function darkenRgb(color: string, amount: number): string {
  const rgb = parseRgb(color);
  if (!rgb) return color;
  return `${clamp(rgb[0] - amount)} ${clamp(rgb[1] - amount)} ${clamp(rgb[2] - amount)}`;
}

// ── Hover derivation ───────────────────────────────────────────────

const LIGHTEN_AMOUNT = 15;
const DARKEN_AMOUNT = 10;
const HOVER_BG_LIGHT = '243 244 246';

/**
 * Derive meaningful hover states when Figma doesn't provide them.
 * Mutates the override in place:
 *   - Dark bg (primary): lighten by ~15 RGB steps
 *   - Light bg (secondary): darken by ~10 RGB steps
 *   - Transparent bg (ghost/outline): add subtle gray bg on hover
 */
export function deriveHoverFromDefault(override: ButtonVariantOverride): void {
  const bg = override.background;

  if (isTransparentOrMissing(bg)) {
    override.backgroundHover = HOVER_BG_LIGHT;
    override.textColorHover = override.textColor;
  } else if (bg && isColorDark(bg)) {
    override.backgroundHover = lightenRgb(bg, LIGHTEN_AMOUNT);
    override.textColorHover = override.textColor;
  } else if (bg) {
    override.backgroundHover = darkenRgb(bg, DARKEN_AMOUNT);
    override.textColorHover = override.textColor;
  }
}

// ── Danger synthesis ───────────────────────────────────────────────

const DANGER_BG = '220 38 38';
const DANGER_HOVER_BG = '185 28 28';
const DANGER_ACTIVE_BG = '153 27 27';
const DANGER_TEXT = '255 255 255';
export const DEFAULT_DISABLED_OPACITY = '0.25';

/**
 * Synthesize a danger variant from primary's shape if Figma didn't include one.
 * Uses red-600 bg with red-700 hover, inheriting primary's border shape.
 */
export function synthesizeDangerIfMissing(
  overrides: Record<string, ButtonVariantOverride>,
): void {
  if (overrides.danger) return;

  const primary = overrides.primary;
  if (!primary) return;

  overrides.danger = {
    background: DANGER_BG,
    textColor: DANGER_TEXT,
    borderColor: 'transparent',
    borderRadius: primary.borderRadius,
    borderWidth: primary.borderWidth,
    backgroundHover: DANGER_HOVER_BG,
    textColorHover: DANGER_TEXT,
    backgroundActive: DANGER_ACTIVE_BG,
    disabledBackground: DANGER_BG,
    disabledTextColor: DANGER_TEXT,
    disabledBorderColor: 'transparent',
    disabledOpacity: primary.disabledOpacity ?? DEFAULT_DISABLED_OPACITY,
  };
}
