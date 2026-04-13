import { describe, it, expect } from 'vitest';

import { THEMESTUDIO_THEME } from './themeStudio';
import { themePresets } from '../utils/presets';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const STATUS_SHADES = ['50', '100', '200', '500', '700'] as const;
const STATUS_KEYS = ['success', 'warning', 'error', 'info'] as const;
const RGB_PATTERN = /^\d{1,3}\s\d{1,3}\s\d{1,3}$/;

describe('ThemeStudio Theme Preset', () => {
  it('has correct id and name', () => {
    expect(THEMESTUDIO_THEME.id).toBe('themeStudio');
    expect(THEMESTUDIO_THEME.name).toBe('Theme Studio');
  });

  it('has cyan primary 500 color', () => {
    expect(THEMESTUDIO_THEME.primary['500']).toBe('0 188 212');
  });

  it('has violet secondary 500 color', () => {
    expect(THEMESTUDIO_THEME.secondary['500']).toBe('139 92 246');
  });

  it('has all 10 primary color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(THEMESTUDIO_THEME.primary[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all 10 secondary color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(THEMESTUDIO_THEME.secondary[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all 10 neutral color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(THEMESTUDIO_THEME.neutral[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all status colors with correct shades', () => {
    STATUS_KEYS.forEach((key) => {
      STATUS_SHADES.forEach((shade) => {
        expect(THEMESTUDIO_THEME.status[key][shade]).toMatch(RGB_PATTERN);
      });
    });
  });

  it('has complete light mode config', () => {
    const { light } = THEMESTUDIO_THEME;
    expect(light.backgrounds.page).toMatch(RGB_PATTERN);
    expect(light.text.primary).toMatch(RGB_PATTERN);
    expect(light.borders.default).toMatch(RGB_PATTERN);
  });

  it('has complete dark mode config', () => {
    const { dark } = THEMESTUDIO_THEME;
    expect(dark.backgrounds.page).toBe('27 32 41');
    expect(dark.backgrounds.surface).toBe('17 24 39');
    expect(dark.backgrounds.surfaceElevated).toBe('26 34 56');
  });

  it('has custom sidebar activeItemBackground', () => {
    expect(THEMESTUDIO_THEME.components.dark.sidebar.activeItemBackground).toBe('0 181 226');
    expect(THEMESTUDIO_THEME.components.light.sidebar.activeItemBackground).toBe('0 83 104');
  });

  it('has custom sidebar fontFamily and itemBorderRadius', () => {
    expect(THEMESTUDIO_THEME.components.light.sidebar.fontFamily).toBe("'Fira Sans'");
    expect(THEMESTUDIO_THEME.components.light.sidebar.itemBorderRadius).toBe('7px');
    expect(THEMESTUDIO_THEME.components.dark.sidebar.fontFamily).toBe("'Fira Sans'");
    expect(THEMESTUDIO_THEME.components.dark.sidebar.itemBorderRadius).toBe('7px');
  });

  it('uses default dark dataGrid colors (matches Default Blue)', () => {
    const dg = THEMESTUDIO_THEME.components.dark.dataGrid;
    expect(dg.headerBackground).toBe('31 41 55');
    expect(dg.rowEvenBackground).toBe('17 24 39');
  });

  it('is registered in themePresets array', () => {
    const preset = themePresets.find((p) => p.id === 'themeStudio');
    expect(preset).toBeDefined();
    expect(preset?.name).toBe('Theme Studio');
    expect(preset?.theme).toBe(THEMESTUDIO_THEME);
  });

  it('has correct preview colors from 500 shades', () => {
    const preset = themePresets.find((p) => p.id === 'themeStudio');
    expect(preset?.previewColors).toEqual([
      THEMESTUDIO_THEME.primary['500'],
      THEMESTUDIO_THEME.secondary['500'],
      THEMESTUDIO_THEME.neutral['500'],
    ]);
  });
});
