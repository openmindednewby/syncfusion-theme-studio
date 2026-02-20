import { describe, it, expect } from 'vitest';

import { FREMEN_THEME } from './fremen';
import { themePresets } from '../utils/presets';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const STATUS_SHADES = ['50', '100', '200', '500', '700'] as const;
const STATUS_KEYS = ['success', 'warning', 'error', 'info'] as const;
const RGB_PATTERN = /^\d{1,3}\s\d{1,3}\s\d{1,3}$/;

describe('Fremen Theme Preset', () => {
  it('has correct id and name', () => {
    expect(FREMEN_THEME.id).toBe('fremen');
    expect(FREMEN_THEME.name).toBe('Fremen');
  });

  it('has teal primary 500 color', () => {
    expect(FREMEN_THEME.primary['500']).toBe('0 188 212');
  });

  it('has violet secondary 500 color', () => {
    expect(FREMEN_THEME.secondary['500']).toBe('139 92 246');
  });

  it('has all 10 primary color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(FREMEN_THEME.primary[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all 10 secondary color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(FREMEN_THEME.secondary[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all 10 neutral color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(FREMEN_THEME.neutral[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all status colors with correct shades', () => {
    STATUS_KEYS.forEach((key) => {
      STATUS_SHADES.forEach((shade) => {
        expect(FREMEN_THEME.status[key][shade]).toMatch(RGB_PATTERN);
      });
    });
  });

  it('has complete light mode config', () => {
    const { light } = FREMEN_THEME;
    expect(light.backgrounds.page).toMatch(RGB_PATTERN);
    expect(light.backgrounds.surface).toMatch(RGB_PATTERN);
    expect(light.backgrounds.surfaceElevated).toMatch(RGB_PATTERN);
    expect(light.backgrounds.surfaceSunken).toMatch(RGB_PATTERN);
    expect(light.backgrounds.overlay).toMatch(RGB_PATTERN);
    expect(light.text.primary).toMatch(RGB_PATTERN);
    expect(light.text.secondary).toMatch(RGB_PATTERN);
    expect(light.text.muted).toMatch(RGB_PATTERN);
    expect(light.text.disabled).toMatch(RGB_PATTERN);
    expect(light.text.inverse).toMatch(RGB_PATTERN);
    expect(light.text.link).toMatch(RGB_PATTERN);
    expect(light.text.linkHover).toMatch(RGB_PATTERN);
    expect(light.borders.default).toMatch(RGB_PATTERN);
    expect(light.borders.strong).toMatch(RGB_PATTERN);
    expect(light.borders.subtle).toMatch(RGB_PATTERN);
    expect(light.borders.focus).toMatch(RGB_PATTERN);
    expect(light.borders.divider).toMatch(RGB_PATTERN);
  });

  it('has complete dark mode config', () => {
    const { dark } = FREMEN_THEME;
    expect(dark.backgrounds.page).toMatch(RGB_PATTERN);
    expect(dark.backgrounds.surface).toMatch(RGB_PATTERN);
    expect(dark.backgrounds.surfaceElevated).toMatch(RGB_PATTERN);
    expect(dark.backgrounds.surfaceSunken).toMatch(RGB_PATTERN);
    expect(dark.backgrounds.overlay).toMatch(RGB_PATTERN);
    expect(dark.text.primary).toMatch(RGB_PATTERN);
    expect(dark.text.secondary).toMatch(RGB_PATTERN);
    expect(dark.text.muted).toMatch(RGB_PATTERN);
    expect(dark.text.disabled).toMatch(RGB_PATTERN);
    expect(dark.text.inverse).toMatch(RGB_PATTERN);
    expect(dark.text.link).toMatch(RGB_PATTERN);
    expect(dark.text.linkHover).toMatch(RGB_PATTERN);
    expect(dark.borders.default).toMatch(RGB_PATTERN);
    expect(dark.borders.strong).toMatch(RGB_PATTERN);
    expect(dark.borders.subtle).toMatch(RGB_PATTERN);
    expect(dark.borders.focus).toMatch(RGB_PATTERN);
    expect(dark.borders.divider).toMatch(RGB_PATTERN);
  });

  it('uses shared default layout, spacing, and typography configs', () => {
    expect(FREMEN_THEME.layout).toBeDefined();
    expect(FREMEN_THEME.spacing).toBeDefined();
    expect(FREMEN_THEME.borderRadius).toBeDefined();
    expect(FREMEN_THEME.shadows).toBeDefined();
    expect(FREMEN_THEME.typography).toBeDefined();
    expect(FREMEN_THEME.transitions).toBeDefined();
    expect(FREMEN_THEME.components).toBeDefined();
  });

  it('is registered in the themePresets array', () => {
    const fremenPreset = themePresets.find((p) => p.id === 'fremen');
    expect(fremenPreset).toBeDefined();
    expect(fremenPreset?.name).toBe('Fremen');
    expect(fremenPreset?.theme).toBe(FREMEN_THEME);
  });

  it('is the first preset in the list', () => {
    expect(themePresets[0]?.id).toBe('fremen');
  });

  it('has correct preview colors from 500 shades', () => {
    const fremenPreset = themePresets.find((p) => p.id === 'fremen');
    expect(fremenPreset?.previewColors).toEqual([
      FREMEN_THEME.primary['500'],
      FREMEN_THEME.secondary['500'],
      FREMEN_THEME.neutral['500'],
    ]);
  });
});
