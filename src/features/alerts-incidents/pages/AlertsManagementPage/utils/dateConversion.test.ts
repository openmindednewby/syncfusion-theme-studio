import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { toIsoWithOffset } from './dateConversion';

// Mock timezone offset to +02:00 (UTC+2 = -120 minutes from getTimezoneOffset)
const MOCK_TZ_OFFSET = -120;

beforeEach(() => {
  vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(MOCK_TZ_OFFSET);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('toIsoWithOffset', () => {
  it('returns start-of-day ISO for a date string', () => {
    const result = toIsoWithOffset('2026-02-25');
    expect(result).toBe('2026-02-25T00:00:00.000+02:00');
  });

  it('returns end-of-day ISO when endOfDay is true', () => {
    const result = toIsoWithOffset('2026-02-26', true);
    expect(result).toBe('2026-02-26T23:59:00.000+02:00');
  });

  it('pads single-digit months and days', () => {
    const result = toIsoWithOffset('2026-01-05');
    expect(result).toBe('2026-01-05T00:00:00.000+02:00');
  });
});
