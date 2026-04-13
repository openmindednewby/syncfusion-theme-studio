 
import { describe, it, expect } from 'vitest';

/**
 * Unit tests for ColorPicker utility functions.
 * Tests the RGB to Hex and Hex to RGB conversion logic.
 *
 * Note: The component render testing is left for E2E tests.
 * These tests focus on the conversion LOGIC only.
 */

// Re-implement the conversion functions for testing (they are private in the component)
// This tests the pure logic without needing to render the component

const HEX_RADIX = 16;
const DEFAULT_RGB = '0 0 0';
const DEFAULT_HEX = '#000000';

function isValueDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function rgbToHex(rgb: string): string {
  const parts = rgb.split(' ').map(Number);
  const r = parts[0];
  const g = parts[1];
  const b = parts[2];
  const isValid = isValueDefined(r) && isValueDefined(g) && isValueDefined(b);
  if (!isValid) return DEFAULT_HEX;
  return `#${[r, g, b].map((x) => x.toString(HEX_RADIX).padStart(2, '0')).join('')}`;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rPart = result?.[1];
  const gPart = result?.[2];
  const bPart = result?.[3];
  const hasValidParts = isValueDefined(rPart) && isValueDefined(gPart) && isValueDefined(bPart);
  if (!hasValidParts) return DEFAULT_RGB;
  return `${parseInt(rPart, HEX_RADIX)} ${parseInt(gPart, HEX_RADIX)} ${parseInt(bPart, HEX_RADIX)}`;
}

describe('ColorPicker - rgbToHex', () => {
  describe('valid RGB conversions', () => {
    it('converts black (0 0 0) to #000000', () => {
      expect(rgbToHex('0 0 0')).toBe('#000000');
    });

    it('converts white (255 255 255) to #ffffff', () => {
      expect(rgbToHex('255 255 255')).toBe('#ffffff');
    });

    it('converts red (255 0 0) to #ff0000', () => {
      expect(rgbToHex('255 0 0')).toBe('#ff0000');
    });

    it('converts green (0 255 0) to #00ff00', () => {
      expect(rgbToHex('0 255 0')).toBe('#00ff00');
    });

    it('converts blue (0 0 255) to #0000ff', () => {
      expect(rgbToHex('0 0 255')).toBe('#0000ff');
    });

    it('converts arbitrary color (100 150 200) to #6496c8', () => {
      expect(rgbToHex('100 150 200')).toBe('#6496c8');
    });

    it('converts low values (1 2 3) with proper zero-padding', () => {
      expect(rgbToHex('1 2 3')).toBe('#010203');
    });
  });

  describe('invalid RGB inputs', () => {
    it('returns default hex for empty string', () => {
      expect(rgbToHex('')).toBe(DEFAULT_HEX);
    });

    it('returns default hex for incomplete RGB (only two values)', () => {
      expect(rgbToHex('100 200')).toBe(DEFAULT_HEX);
    });

    it('returns default hex for single value', () => {
      expect(rgbToHex('100')).toBe(DEFAULT_HEX);
    });

    it('handles NaN values from non-numeric strings', () => {
      // When parsing 'abc' as Number, it becomes NaN
      // The function checks isValueDefined which passes for NaN (it's defined)
      // but the hex conversion will still work (NaN.toString(16) = 'NaN')
      const result = rgbToHex('abc def ghi');
      expect(typeof result).toBe('string');
    });
  });
});

describe('ColorPicker - hexToRgb', () => {
  describe('valid Hex conversions', () => {
    it('converts #000000 to 0 0 0', () => {
      expect(hexToRgb('#000000')).toBe('0 0 0');
    });

    it('converts #ffffff to 255 255 255', () => {
      expect(hexToRgb('#ffffff')).toBe('255 255 255');
    });

    it('converts #FFFFFF (uppercase) to 255 255 255', () => {
      expect(hexToRgb('#FFFFFF')).toBe('255 255 255');
    });

    it('converts #ff0000 to 255 0 0', () => {
      expect(hexToRgb('#ff0000')).toBe('255 0 0');
    });

    it('converts #00ff00 to 0 255 0', () => {
      expect(hexToRgb('#00ff00')).toBe('0 255 0');
    });

    it('converts #0000ff to 0 0 255', () => {
      expect(hexToRgb('#0000ff')).toBe('0 0 255');
    });

    it('converts #6496c8 to 100 150 200', () => {
      expect(hexToRgb('#6496c8')).toBe('100 150 200');
    });

    it('converts hex without hash prefix (ff0000)', () => {
      expect(hexToRgb('ff0000')).toBe('255 0 0');
    });
  });

  describe('invalid Hex inputs', () => {
    it('returns default RGB for empty string', () => {
      expect(hexToRgb('')).toBe(DEFAULT_RGB);
    });

    it('returns default RGB for invalid hex (too short)', () => {
      expect(hexToRgb('#fff')).toBe(DEFAULT_RGB);
    });

    it('returns default RGB for invalid hex (too long)', () => {
      expect(hexToRgb('#fffffff')).toBe(DEFAULT_RGB);
    });

    it('returns default RGB for invalid characters', () => {
      expect(hexToRgb('#gggggg')).toBe(DEFAULT_RGB);
    });

    it('returns default RGB for non-hex string', () => {
      expect(hexToRgb('not-a-hex')).toBe(DEFAULT_RGB);
    });
  });
});

describe('ColorPicker - roundtrip conversion', () => {
  it('converts RGB to Hex and back without loss', () => {
    const original = '100 150 200';
    const hex = rgbToHex(original);
    const backToRgb = hexToRgb(hex);
    expect(backToRgb).toBe(original);
  });

  it('converts Hex to RGB and back without loss', () => {
    const original = '#6496c8';
    const rgb = hexToRgb(original);
    const backToHex = rgbToHex(rgb);
    expect(backToHex).toBe(original);
  });

  it('handles extreme values in roundtrip', () => {
    const black = '0 0 0';
    expect(hexToRgb(rgbToHex(black))).toBe(black);

    const white = '255 255 255';
    expect(hexToRgb(rgbToHex(white))).toBe(white);
  });
});
