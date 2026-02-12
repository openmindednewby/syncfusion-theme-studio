import { describe, it, expect } from 'vitest';

import { generatePageNumbers, ELLIPSIS } from './utils';

describe('generatePageNumbers', () => {
  it('returns all pages when totalPages <= 5', () => {
    expect(generatePageNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(generatePageNumbers(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns single page for totalPages = 1', () => {
    expect(generatePageNumbers(1, 1)).toEqual([1]);
  });

  it('shows ellipsis at end when current page is near the start', () => {
    const result = generatePageNumbers(2, 10);
    expect(result[0]).toBe(1);
    expect(result).toContain(ELLIPSIS);
    expect(result[result.length - 1]).toBe(10);
  });

  it('shows ellipsis at start when current page is near the end', () => {
    const result = generatePageNumbers(9, 10);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(ELLIPSIS);
    expect(result[result.length - 1]).toBe(10);
  });

  it('shows ellipsis on both sides when current page is in the middle', () => {
    const result = generatePageNumbers(5, 10);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(ELLIPSIS);
    expect(result).toContain(5);
    expect(result[result.length - 2]).toBe(ELLIPSIS);
    expect(result[result.length - 1]).toBe(10);
  });

  it('includes current page and neighbors in middle position', () => {
    const result = generatePageNumbers(6, 12);
    expect(result).toContain(5);
    expect(result).toContain(6);
    expect(result).toContain(7);
  });

  it('always includes page 1 and last page', () => {
    for (let current = 1; current <= 10; current++) {
      const result = generatePageNumbers(current, 10);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(10);
    }
  });
});
