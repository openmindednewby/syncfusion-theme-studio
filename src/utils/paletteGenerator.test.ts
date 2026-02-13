import { describe, it, expect } from 'vitest';

import { generatePaletteFromBase, hexToRgbString, rgbStringToHex } from './paletteGenerator';

describe('hexToRgbString', () => {
  it('converts valid hex with # prefix', () => {
    expect(hexToRgbString('#3b82f6')).toBe('59 130 246');
  });

  it('converts valid hex without # prefix', () => {
    expect(hexToRgbString('3b82f6')).toBe('59 130 246');
  });

  it('returns fallback for invalid hex characters', () => {
    expect(hexToRgbString('#XYZ123')).toBe('0 0 0');
  });

  it('returns fallback for too-short hex', () => {
    expect(hexToRgbString('#FF')).toBe('0 0 0');
  });

  it('returns fallback for empty string', () => {
    expect(hexToRgbString('')).toBe('0 0 0');
  });

  it('converts black correctly', () => {
    expect(hexToRgbString('#000000')).toBe('0 0 0');
  });

  it('converts white correctly', () => {
    expect(hexToRgbString('#ffffff')).toBe('255 255 255');
  });

  it('is case-insensitive', () => {
    expect(hexToRgbString('#AABBCC')).toBe(hexToRgbString('#aabbcc'));
  });
});

describe('rgbStringToHex', () => {
  it('converts RGB string to hex', () => {
    expect(rgbStringToHex('59 130 246')).toBe('#3b82f6');
  });

  it('converts black', () => {
    expect(rgbStringToHex('0 0 0')).toBe('#000000');
  });

  it('converts white', () => {
    expect(rgbStringToHex('255 255 255')).toBe('#ffffff');
  });

  it('round-trips with hexToRgbString', () => {
    const hex = '#3b82f6';
    const rgb = hexToRgbString(hex);
    expect(rgbStringToHex(rgb)).toBe(hex);
  });
});

describe('generatePaletteFromBase', () => {
  it('returns all ten shade keys', () => {
    const palette = generatePaletteFromBase('59 130 246');
    const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

    for (const key of shadeKeys) {
      expect(palette[key as keyof typeof palette]).toBeDefined();
      expect(palette[key as keyof typeof palette]).not.toBe('');
    }
  });

  it('preserves the base color as shade 500', () => {
    const baseColor = '59 130 246';
    const palette = generatePaletteFromBase(baseColor);
    expect(palette['500']).toBe(baseColor);
  });

  it('produces lighter shades for lower numbers', () => {
    const palette = generatePaletteFromBase('59 130 246');
    // Shade 50 should be lighter (higher total RGB) than shade 500
    const parse = (rgb: string): number => rgb.split(' ').map(Number).reduce((a, b) => a + b, 0);
    expect(parse(palette['50'])).toBeGreaterThan(parse(palette['500']));
  });

  it('produces darker shades for higher numbers', () => {
    const palette = generatePaletteFromBase('59 130 246');
    // Shade 900 should be darker (lower total RGB) than shade 500
    const parse = (rgb: string): number => rgb.split(' ').map(Number).reduce((a, b) => a + b, 0);
    expect(parse(palette['900'])).toBeLessThan(parse(palette['500']));
  });

  it('produces valid RGB values (0-255 range) for all shades', () => {
    const palette = generatePaletteFromBase('59 130 246');

    for (const shade of Object.values(palette)) {
      const parts = shade.split(' ').map(Number);
      for (const val of parts) {
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(255);
      }
    }
  });
});
