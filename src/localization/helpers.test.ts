import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FM, FD } from './helpers';
import i18n from './i18n';

// Mock isValueDefined FIRST
vi.mock('../utils/is', () => {
  // Define check inline to avoid any hoisting issues
  function checkDefined<T>(value: T | null | undefined): value is T {
     
    return value !== null && value !== undefined;
  }
  return { isValueDefined: checkDefined };
});

// Mock the i18n module
vi.mock('./i18n', () => ({
  default: {
    t: vi.fn((id: string, options?: Record<string, string | undefined>) => {
      let result = id;
      const p1 = options?.['p1'];
      const p2 = options?.['p2'];
      // Simple undefined check
      if (p1 !== undefined && p1 !== '') result = `${result} ${p1}`;
      if (p2 !== undefined && p2 !== '') result = `${result} ${p2}`;
      return result;
    }),
    language: 'en',
  },
}));

describe('FM (Format Message)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('without parameters', () => {
    it('returns the translation key when no parameters provided', () => {
      const result = FM('hello');
      expect(i18n.t).toHaveBeenCalledWith('hello', {});
      expect(result).toBe('hello');
    });

    it('handles keys with dots', () => {
      const result = FM('common.buttons.save');
      expect(i18n.t).toHaveBeenCalledWith('common.buttons.save', {});
      expect(result).toBe('common.buttons.save');
    });
  });

  describe('with p1 parameter', () => {
    it('passes p1 to the translation function', () => {
      const result = FM('deleteSuccess', '5');
      expect(i18n.t).toHaveBeenCalledWith('deleteSuccess', { p1: '5' });
      expect(result).toContain('5');
    });

    it('handles empty string as p1', () => {
      const result = FM('message', '');
      expect(i18n.t).toHaveBeenCalledWith('message', { p1: '' });
      expect(result).toBe('message');
    });

    it('does not pass undefined p1', () => {
      const result = FM('message', undefined);
      expect(i18n.t).toHaveBeenCalledWith('message', {});
      expect(result).toBe('message');
    });
  });

  describe('with p1 and p2 parameters', () => {
    it('passes both p1 and p2 to the translation function', () => {
      const result = FM('moveSuccess', '10', 'archive');
      expect(i18n.t).toHaveBeenCalledWith('moveSuccess', { p1: '10', p2: 'archive' });
      expect(result).toContain('10');
      expect(result).toContain('archive');
    });

    it('handles p1 with undefined p2', () => {
      const result = FM('message', 'value1', undefined);
      expect(i18n.t).toHaveBeenCalledWith('message', { p1: 'value1' });
      expect(result).toContain('value1');
    });

    it('handles numeric strings for both parameters', () => {
      const result = FM('stats', '100', '200');
      expect(i18n.t).toHaveBeenCalledWith('stats', { p1: '100', p2: '200' });
      expect(result).toContain('100');
      expect(result).toContain('200');
    });
  });
});

describe('FD (Format Date)', () => {
  describe('with valid date', () => {
    it('formats a valid Date object', () => {
      const date = new Date('2024-06-15T12:00:00Z');
      const result = FD(date);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('formats date with custom options', () => {
      const date = new Date('2024-06-15T12:00:00Z');
      const result = FD(date, { year: 'numeric', month: 'long' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('formats date with day only', () => {
      const date = new Date('2024-06-15T12:00:00Z');
      const result = FD(date, { day: 'numeric' });
      expect(result).toMatch(/\d+/);
    });

    it('formats date with weekday', () => {
      const date = new Date('2024-06-15T12:00:00Z');
      const result = FD(date, { weekday: 'long' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('with null or undefined', () => {
    it('returns empty string for null', () => {
      const result = FD(null);
      expect(result).toBe('');
    });

    it('returns empty string for undefined', () => {
      const result = FD(undefined);
      expect(result).toBe('');
    });

    it('returns empty string when called without arguments', () => {
      const result = FD();
      expect(result).toBe('');
    });
  });

  describe('edge cases', () => {
    it('handles epoch date (1970-01-01)', () => {
      const date = new Date(0);
      const result = FD(date);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles future dates', () => {
      const date = new Date('2099-06-15T12:00:00Z');
      const result = FD(date);
      expect(typeof result).toBe('string');
      expect(result).toContain('2099');
    });

    it('handles date with time options', () => {
      const date = new Date('2024-06-15T14:30:00Z');
      const result = FD(date, { hour: 'numeric', minute: 'numeric' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
