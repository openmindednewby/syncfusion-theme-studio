import { describe, expect, it } from 'vitest';

import { formatDate, getBorderColor, getTypeColor } from './NotificationsList';

describe('formatDate', () => {
  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(formatDate('')).toBe('');
  });

  it('returns a formatted date string for a valid ISO string', () => {
    const result = formatDate('2026-03-03T08:00:00.000Z');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('getTypeColor', () => {
  it('returns default color for undefined type', () => {
    expect(getTypeColor(undefined)).toBe('bg-primary-500');
  });

  it('returns info color for info type', () => {
    expect(getTypeColor('info')).toBe('bg-info-500');
  });

  it('returns warning color for warning type', () => {
    expect(getTypeColor('warning')).toBe('bg-warning-500');
  });

  it('returns error color for error type', () => {
    expect(getTypeColor('error')).toBe('bg-error-500');
  });

  it('returns success color for success type', () => {
    expect(getTypeColor('success')).toBe('bg-success-500');
  });

  it('returns default color for unknown type', () => {
    expect(getTypeColor('unknown-type')).toBe('bg-primary-500');
  });

  it('handles PascalCase types from API (e.g. Info)', () => {
    expect(getTypeColor('Info')).toBe('bg-info-500');
    expect(getTypeColor('Warning')).toBe('bg-warning-500');
    expect(getTypeColor('Error')).toBe('bg-error-500');
    expect(getTypeColor('Success')).toBe('bg-success-500');
  });
});

describe('getBorderColor', () => {
  it('returns default border for undefined type', () => {
    expect(getBorderColor(undefined)).toBe('border-l-primary-500');
  });

  it('returns error border for error type', () => {
    expect(getBorderColor('error')).toBe('border-l-error-500');
  });

  it('returns warning border for warning type', () => {
    expect(getBorderColor('warning')).toBe('border-l-warning-500');
  });

  it('returns info border for info type', () => {
    expect(getBorderColor('info')).toBe('border-l-info-500');
  });

  it('returns success border for success type', () => {
    expect(getBorderColor('success')).toBe('border-l-success-500');
  });

  it('returns default border for unknown type', () => {
    expect(getBorderColor('unknown')).toBe('border-l-primary-500');
  });

  it('handles PascalCase types', () => {
    expect(getBorderColor('Error')).toBe('border-l-error-500');
    expect(getBorderColor('Warning')).toBe('border-l-warning-500');
  });
});
