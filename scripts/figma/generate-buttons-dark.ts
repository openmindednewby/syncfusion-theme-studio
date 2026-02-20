// Dark mode derivation for button generation.
// Classifies each light variant by its bg/text pattern and synthesizes dark counterparts.

import type { ButtonVariantOverride } from './generate-buttons-helpers';
import {
  DEFAULT_DISABLED_OPACITY,
  isColorDark,
  isTransparentOrMissing,
} from './generate-buttons-helpers';

export function modesAreIdentical(
  light: Record<string, ButtonVariantOverride>,
  dark: Record<string, ButtonVariantOverride>,
): boolean {
  return JSON.stringify(light) === JSON.stringify(dark);
}

/**
 * Derive dark theme button overrides from light theme data.
 * Routes danger to its own derivation (stays red), other variants by bg/text pattern:
 *   - Dark bg + Light text (Primary) → Invert: white bg, dark text
 *   - Light bg + Dark text (Secondary) → Dark surface bg, light text
 *   - Transparent bg + Dark text (Ghost/Outline) → Keep transparent, lighten text
 */
export function deriveDarkOverrides(
  light: Record<string, ButtonVariantOverride>,
): Record<string, ButtonVariantOverride> {
  const dark: Record<string, ButtonVariantOverride> = {};

  for (const [variant, lightData] of Object.entries(light)) {
    dark[variant] =
      variant === 'danger'
        ? deriveDangerDark(lightData)
        : deriveDarkVariant(lightData);
  }

  return dark;
}

// ── Per-pattern derivation ─────────────────────────────────────────

function deriveDarkVariant(light: ButtonVariantOverride): ButtonVariantOverride {
  const bg = light.background;
  const text = light.textColor;

  if (isTransparentOrMissing(bg)) {
    return deriveTransparentDark(light);
  }
  if (bg && text && isColorDark(bg) && !isColorDark(text)) {
    return deriveDarkBgLightTextDark(light);
  }
  return deriveLightBgDarkTextDark(light);
}

// ── Dark primary (inverted) palette ────────────────────────────────

const DARK_PRIMARY_BG = '255 255 255';
const DARK_PRIMARY_TEXT = '17 19 25';
const DARK_PRIMARY_HOVER_BG = '229 231 235';
const DARK_PRIMARY_ACTIVE_BG = '209 213 219';
const DARK_PRIMARY_DISABLED_TEXT = '156 163 175';

/** Dark bg + Light text (e.g., Primary) → Invert to white bg, dark text */
function deriveDarkBgLightTextDark(light: ButtonVariantOverride): ButtonVariantOverride {
  return {
    background: DARK_PRIMARY_BG,
    textColor: DARK_PRIMARY_TEXT,
    borderColor: 'transparent',
    borderRadius: light.borderRadius,
    borderWidth: light.borderWidth,
    backgroundHover: DARK_PRIMARY_HOVER_BG,
    textColorHover: DARK_PRIMARY_TEXT,
    backgroundActive: DARK_PRIMARY_ACTIVE_BG,
    disabledBackground: DARK_PRIMARY_BG,
    disabledTextColor: DARK_PRIMARY_DISABLED_TEXT,
    disabledBorderColor: 'transparent',
    disabledOpacity: light.disabledOpacity ?? DEFAULT_DISABLED_OPACITY,
  };
}

// ── Dark secondary palette ─────────────────────────────────────────

const DARK_SECONDARY_BG = '55 65 81';
const DARK_SECONDARY_TEXT = '229 231 235';
const DARK_SECONDARY_BORDER = '75 85 99';
const DARK_SECONDARY_HOVER_TEXT = '249 250 251';
const DARK_SECONDARY_ACTIVE_BG = '107 114 128';
const DARK_SECONDARY_DISABLED_TEXT = '107 114 128';

/** Light bg + Dark text (e.g., Secondary) → Dark surface bg, light text */
function deriveLightBgDarkTextDark(light: ButtonVariantOverride): ButtonVariantOverride {
  return {
    background: DARK_SECONDARY_BG,
    textColor: DARK_SECONDARY_TEXT,
    borderColor: DARK_SECONDARY_BORDER,
    borderRadius: light.borderRadius,
    borderWidth: light.borderWidth,
    backgroundHover: DARK_SECONDARY_BORDER,
    textColorHover: DARK_SECONDARY_HOVER_TEXT,
    backgroundActive: DARK_SECONDARY_ACTIVE_BG,
    disabledBackground: DARK_SECONDARY_BG,
    disabledTextColor: DARK_SECONDARY_DISABLED_TEXT,
    disabledBorderColor: DARK_SECONDARY_BORDER,
    disabledOpacity: light.disabledOpacity ?? DEFAULT_DISABLED_OPACITY,
  };
}

// ── Dark transparent palette ───────────────────────────────────────

const DARK_TRANSPARENT_TEXT = '209 213 219';
const DARK_TRANSPARENT_BORDER = '156 163 175';
const DARK_TRANSPARENT_HOVER_BG = '55 65 81';
const DARK_TRANSPARENT_HOVER_TEXT = '249 250 251';

/** Transparent bg + Dark text (Ghost/Outline) → Keep transparent, lighten text */
function deriveTransparentDark(light: ButtonVariantOverride): ButtonVariantOverride {
  const hasBorder = !isTransparentOrMissing(light.borderColor);

  return {
    background: 'transparent',
    textColor: DARK_TRANSPARENT_TEXT,
    borderColor: hasBorder ? DARK_TRANSPARENT_BORDER : 'transparent',
    borderWidth: light.borderWidth,
    borderRadius: light.borderRadius,
    backgroundHover: DARK_TRANSPARENT_HOVER_BG,
    textColorHover: DARK_TRANSPARENT_HOVER_TEXT,
  };
}

// ── Danger-specific dark derivation ────────────────────────────────

const DANGER_DARK_BG = '239 68 68';
const DANGER_DARK_HOVER_BG = '248 113 113';
const DANGER_DARK_ACTIVE_BG = '252 165 165';
const DANGER_DARK_TEXT = '255 255 255';
const DANGER_DARK_DISABLED_TEXT = '156 163 175';

/** Danger stays red in dark mode (lighter red for dark surfaces) */
function deriveDangerDark(light: ButtonVariantOverride): ButtonVariantOverride {
  return {
    background: DANGER_DARK_BG,
    textColor: DANGER_DARK_TEXT,
    borderColor: 'transparent',
    borderRadius: light.borderRadius,
    borderWidth: light.borderWidth,
    backgroundHover: DANGER_DARK_HOVER_BG,
    textColorHover: DANGER_DARK_TEXT,
    backgroundActive: DANGER_DARK_ACTIVE_BG,
    disabledBackground: DANGER_DARK_BG,
    disabledTextColor: DANGER_DARK_DISABLED_TEXT,
    disabledBorderColor: 'transparent',
    disabledOpacity: light.disabledOpacity ?? DEFAULT_DISABLED_OPACITY,
  };
}
