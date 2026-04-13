/**
 * Tests for DropdownTrigger aria-label prop.
 *
 * Validates the logic for when ariaLabel should be passed:
 * - When SelectNative has no visible label, ariaLabel provides the accessible name
 * - When SelectNative has a visible label, ariaLabel should be undefined (label serves as name)
 */
import { describe, it, expect } from 'vitest';

import { isValueDefined } from '@/utils/is';

/**
 * Replicates the SelectNative logic for deciding whether to pass
 * ariaLabel to DropdownTrigger.
 */
function resolveAriaLabel(
  label: string | undefined,
  ariaLabel: string | undefined,
): string | undefined {
  return !isValueDefined(label) ? ariaLabel : undefined;
}

describe('DropdownTrigger ariaLabel resolution', () => {
  it('returns ariaLabel when no visible label exists', () => {
    expect(resolveAriaLabel(undefined, 'Density')).toBe('Density');
  });

  it('returns undefined when visible label exists', () => {
    expect(resolveAriaLabel('Choose option', 'Density')).toBeUndefined();
  });

  it('returns undefined when both label and ariaLabel are undefined', () => {
    expect(resolveAriaLabel(undefined, undefined)).toBeUndefined();
  });

  it('returns undefined when label exists but ariaLabel is undefined', () => {
    expect(resolveAriaLabel('My Label', undefined)).toBeUndefined();
  });
});
