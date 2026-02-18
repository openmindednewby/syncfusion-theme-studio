import { describe, it, expect } from 'vitest';

import { CYBERWATCH_THEME } from './cyberWatch';
import { themePresets } from '../presets';

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const STATUS_SHADES = ['50', '100', '200', '500', '700'] as const;
const STATUS_KEYS = ['success', 'warning', 'error', 'info'] as const;
const RGB_PATTERN = /^\d{1,3}\s\d{1,3}\s\d{1,3}$/;

describe('CyberWatch Theme Preset', () => {
  it('has correct id and name', () => {
    expect(CYBERWATCH_THEME.id).toBe('cyberWatch');
    expect(CYBERWATCH_THEME.name).toBe('CyberWatch');
  });

  it('has cyan primary 500 color', () => {
    expect(CYBERWATCH_THEME.primary['500']).toBe('0 188 212');
  });

  it('has violet secondary 500 color', () => {
    expect(CYBERWATCH_THEME.secondary['500']).toBe('139 92 246');
  });

  it('has all 10 primary color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(CYBERWATCH_THEME.primary[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all 10 secondary color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(CYBERWATCH_THEME.secondary[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all 10 neutral color shades in RGB format', () => {
    COLOR_SHADES.forEach((shade) => {
      expect(CYBERWATCH_THEME.neutral[shade]).toMatch(RGB_PATTERN);
    });
  });

  it('has all status colors with correct shades', () => {
    STATUS_KEYS.forEach((key) => {
      STATUS_SHADES.forEach((shade) => {
        expect(CYBERWATCH_THEME.status[key][shade]).toMatch(RGB_PATTERN);
      });
    });
  });

  it('has complete light mode config', () => {
    const { light } = CYBERWATCH_THEME;
    expect(light.backgrounds.page).toMatch(RGB_PATTERN);
    expect(light.text.primary).toMatch(RGB_PATTERN);
    expect(light.borders.default).toMatch(RGB_PATTERN);
  });

  it('has complete dark mode config', () => {
    const { dark } = CYBERWATCH_THEME;
    expect(dark.backgrounds.page).toBe('11 17 32');
    expect(dark.backgrounds.surface).toBe('17 24 39');
    expect(dark.backgrounds.surfaceElevated).toBe('26 34 56');
  });

  it('has custom sidebar activeItemBackground', () => {
    expect(CYBERWATCH_THEME.components.dark.sidebar.activeItemBackground).toBe('59 130 246');
    expect(CYBERWATCH_THEME.components.light.sidebar.activeItemBackground).toBe('59 130 246');
  });

  it('uses default dark dataGrid colors (matches Default Blue)', () => {
    const dg = CYBERWATCH_THEME.components.dark.dataGrid;
    expect(dg.headerBackground).toBe('31 41 55');
    expect(dg.rowEvenBackground).toBe('17 24 39');
  });

  it('is registered in themePresets array', () => {
    const preset = themePresets.find((p) => p.id === 'cyberWatch');
    expect(preset).toBeDefined();
    expect(preset?.name).toBe('CyberWatch');
    expect(preset?.theme).toBe(CYBERWATCH_THEME);
  });

  it('has correct preview colors from 500 shades', () => {
    const preset = themePresets.find((p) => p.id === 'cyberWatch');
    expect(preset?.previewColors).toEqual([
      CYBERWATCH_THEME.primary['500'],
      CYBERWATCH_THEME.secondary['500'],
      CYBERWATCH_THEME.neutral['500'],
    ]);
  });
});
