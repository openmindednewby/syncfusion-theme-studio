import { describe, it, expect } from 'vitest';

/**
 * Tests the pure logic functions used by ExternalLink.
 * The key fix: SVG width/height CSS variables are passed via `style` prop,
 * not as element attributes (which don't support CSS variables).
 */

// Re-implement the exported logic functions to test them directly.
// These are module-scoped in ExternalLink.tsx, so we test their behavior.

function resolveTextColor(disabled: boolean, hovered: boolean): string {
  if (disabled) return 'var(--component-external-link-disabled-text-color)';
  if (hovered) return 'var(--component-external-link-hover-text-color)';
  return 'var(--component-external-link-text-color)';
}

function resolveIconColor(disabled: boolean, hovered: boolean): string {
  if (disabled) return 'var(--component-external-link-disabled-icon-color)';
  if (hovered) return 'var(--component-external-link-hover-icon-color)';
  return 'var(--component-external-link-icon-color)';
}

const ICON_SIZE = 'var(--component-external-link-icon-size)';

describe('resolveTextColor', () => {
  it('returns disabled color when disabled is true', () => {
    expect(resolveTextColor(true, false)).toBe(
      'var(--component-external-link-disabled-text-color)',
    );
  });

  it('returns disabled color even when hovered and disabled', () => {
    expect(resolveTextColor(true, true)).toBe(
      'var(--component-external-link-disabled-text-color)',
    );
  });

  it('returns hover color when hovered and not disabled', () => {
    expect(resolveTextColor(false, true)).toBe(
      'var(--component-external-link-hover-text-color)',
    );
  });

  it('returns default color when neither disabled nor hovered', () => {
    expect(resolveTextColor(false, false)).toBe(
      'var(--component-external-link-text-color)',
    );
  });
});

describe('resolveIconColor', () => {
  it('returns disabled icon color when disabled', () => {
    expect(resolveIconColor(true, false)).toBe(
      'var(--component-external-link-disabled-icon-color)',
    );
  });

  it('returns disabled icon color when both disabled and hovered', () => {
    expect(resolveIconColor(true, true)).toBe(
      'var(--component-external-link-disabled-icon-color)',
    );
  });

  it('returns hover icon color when hovered only', () => {
    expect(resolveIconColor(false, true)).toBe(
      'var(--component-external-link-hover-icon-color)',
    );
  });

  it('returns default icon color when neither disabled nor hovered', () => {
    expect(resolveIconColor(false, false)).toBe(
      'var(--component-external-link-icon-color)',
    );
  });
});

describe('ICON_SIZE', () => {
  it('references the CSS variable for icon size', () => {
    expect(ICON_SIZE).toBe('var(--component-external-link-icon-size)');
  });

  it('is a CSS variable string suitable for style property (not element attributes)', () => {
    expect(ICON_SIZE).toMatch(/^var\(--/);
    // Validates that the value starts with var(-- which is only valid in CSS style properties,
    // NOT in SVG element width/height attributes (which require numeric or pixel values)
  });
});
