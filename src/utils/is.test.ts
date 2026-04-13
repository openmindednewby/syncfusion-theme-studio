import { describe, it, expect } from 'vitest';

import { isValueDefined, isNullOrUndefined, isNotEmptyString, isNotEmptyArray } from './is';

describe('isValueDefined', () => {
  describe('returns true for defined values', () => {
    it('returns true for number 0', () => {
      expect(isValueDefined(0)).toBe(true);
    });

    it('returns true for empty string', () => {
      expect(isValueDefined('')).toBe(true);
    });

    it('returns true for non-empty string', () => {
      expect(isValueDefined('hello')).toBe(true);
    });

    it('returns true for false boolean', () => {
      expect(isValueDefined(false)).toBe(true);
    });

    it('returns true for true boolean', () => {
      expect(isValueDefined(true)).toBe(true);
    });

    it('returns true for empty array', () => {
      expect(isValueDefined([])).toBe(true);
    });

    it('returns true for empty object', () => {
      expect(isValueDefined({})).toBe(true);
    });

    it('returns true for NaN', () => {
      expect(isValueDefined(NaN)).toBe(true);
    });

    it('returns true for Infinity', () => {
      expect(isValueDefined(Infinity)).toBe(true);
    });
  });

  describe('returns false for null and undefined', () => {
    it('returns false for null', () => {
      expect(isValueDefined(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isValueDefined(undefined)).toBe(false);
    });
  });

  describe('type narrowing', () => {
    it('narrows type correctly for string', () => {
      const value: string | null | undefined = 'test';
      if (isValueDefined(value)) 
        // TypeScript should know value is string here
        expect(value.toUpperCase()).toBe('TEST');
      
    });

    it('narrows type correctly for number', () => {
      const value: number | null | undefined = 42;
      if (isValueDefined(value)) 
        // TypeScript should know value is number here
        expect(value.toFixed(2)).toBe('42.00');
      
    });
  });
});

describe('isNullOrUndefined', () => {
  describe('returns true for null and undefined', () => {
    it('returns true for null', () => {
      expect(isNullOrUndefined(null)).toBe(true);
    });

    it('returns true for undefined', () => {
      expect(isNullOrUndefined(undefined)).toBe(true);
    });
  });

  describe('returns false for defined values', () => {
    it('returns false for number 0', () => {
      expect(isNullOrUndefined(0)).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isNullOrUndefined('')).toBe(false);
    });

    it('returns false for non-empty string', () => {
      expect(isNullOrUndefined('hello')).toBe(false);
    });

    it('returns false for false boolean', () => {
      expect(isNullOrUndefined(false)).toBe(false);
    });

    it('returns false for true boolean', () => {
      expect(isNullOrUndefined(true)).toBe(false);
    });

    it('returns false for empty array', () => {
      expect(isNullOrUndefined([])).toBe(false);
    });

    it('returns false for empty object', () => {
      expect(isNullOrUndefined({})).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(isNullOrUndefined(NaN)).toBe(false);
    });
  });
});

describe('isNotEmptyString', () => {
  describe('returns true for non-empty strings', () => {
    it('returns true for single character', () => {
      expect(isNotEmptyString('a')).toBe(true);
    });

    it('returns true for multiple characters', () => {
      expect(isNotEmptyString('hello world')).toBe(true);
    });

    it('returns true for string with only whitespace', () => {
      expect(isNotEmptyString('   ')).toBe(true);
    });

    it('returns true for string with newline', () => {
      expect(isNotEmptyString('\n')).toBe(true);
    });
  });

  describe('returns false for empty string, null, and undefined', () => {
    it('returns false for empty string', () => {
      expect(isNotEmptyString('')).toBe(false);
    });

    it('returns false for null', () => {
      expect(isNotEmptyString(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isNotEmptyString(undefined)).toBe(false);
    });
  });

  describe('type narrowing', () => {
    it('narrows type correctly', () => {
      const value: string | null | undefined = 'test';
      if (isNotEmptyString(value)) 
        // TypeScript should know value is string here
        expect(value.toUpperCase()).toBe('TEST');
      
    });
  });
});

describe('isNotEmptyArray', () => {
  describe('returns true for non-empty arrays', () => {
    it('returns true for array with one element', () => {
      expect(isNotEmptyArray([1])).toBe(true);
    });

    it('returns true for array with multiple elements', () => {
      expect(isNotEmptyArray([1, 2, 3])).toBe(true);
    });

    it('returns true for array with null element', () => {
      expect(isNotEmptyArray([null])).toBe(true);
    });

    it('returns true for array with undefined element', () => {
      expect(isNotEmptyArray([undefined])).toBe(true);
    });

    it('returns true for array of strings', () => {
      expect(isNotEmptyArray(['a', 'b', 'c'])).toBe(true);
    });

    it('returns true for array of objects', () => {
      expect(isNotEmptyArray([{ id: 1 }, { id: 2 }])).toBe(true);
    });
  });

  describe('returns false for empty array, null, and undefined', () => {
    it('returns false for empty array', () => {
      expect(isNotEmptyArray([])).toBe(false);
    });

    it('returns false for null', () => {
      expect(isNotEmptyArray(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isNotEmptyArray(undefined)).toBe(false);
    });
  });

  describe('type narrowing', () => {
    it('narrows type correctly for number array', () => {
      const value: number[] | null | undefined = [1, 2, 3];
      if (isNotEmptyArray(value)) 
        // TypeScript should know value is number[] here
        expect(value.map((x) => x * 2)).toEqual([2, 4, 6]);
      
    });

    it('narrows type correctly for string array', () => {
      const value: string[] | null | undefined = ['a', 'b'];
      if (isNotEmptyArray(value)) 
        // TypeScript should know value is string[] here
        expect(value.join('-')).toBe('a-b');
      
    });
  });
});
