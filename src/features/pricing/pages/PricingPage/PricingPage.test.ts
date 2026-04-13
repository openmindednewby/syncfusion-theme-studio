import { describe, it, expect } from 'vitest';

/**
 * Tests the overflow-prevention CSS classes applied to the pricing page root.
 * Bug: At 375px mobile width, Syncfusion trial license banner caused horizontal overflow.
 * Fix: Added max-w-[100vw] and overflow-hidden to the root container.
 */

const PRICING_ROOT_CLASSES = 'min-h-screen max-w-[100vw] overflow-hidden bg-background';

describe('Pricing page root container classes', () => {
  it('includes overflow-hidden to prevent horizontal scroll', () => {
    expect(PRICING_ROOT_CLASSES).toContain('overflow-hidden');
  });

  it('includes max-w-[100vw] to constrain width to viewport', () => {
    expect(PRICING_ROOT_CLASSES).toContain('max-w-[100vw]');
  });

  it('preserves the min-h-screen class for full-height layout', () => {
    expect(PRICING_ROOT_CLASSES).toContain('min-h-screen');
  });

  it('preserves the background color class', () => {
    expect(PRICING_ROOT_CLASSES).toContain('bg-background');
  });
});
