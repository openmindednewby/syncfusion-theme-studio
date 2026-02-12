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

  describe('custom pageCount', () => {
    it('pageCount=3 shows fewer buttons before ellipsis', () => {
      const result = generatePageNumbers(1, 10, 3);
      expect(result[0]).toBe(1);
      expect(result).toContain(ELLIPSIS);
      expect(result[result.length - 1]).toBe(10);
      // With pageCount=3, edge shows only 1 extra page (pageCount-2=1)
      const numbersBeforeEllipsis = result.slice(0, result.indexOf(ELLIPSIS));
      expect(numbersBeforeEllipsis.length).toBeLessThanOrEqual(2);
    });

    it('pageCount=7 shows more buttons before ellipsis', () => {
      const result = generatePageNumbers(1, 20, 7);
      expect(result[0]).toBe(1);
      expect(result).toContain(ELLIPSIS);
      expect(result[result.length - 1]).toBe(20);
      // With pageCount=7, edge shows 5 extra pages (pageCount-2=5), so 1..6 ... 20
      const numbersBeforeEllipsis = result.slice(0, result.indexOf(ELLIPSIS));
      expect(numbersBeforeEllipsis.length).toBe(6);
    });

    it('pageCount larger than totalPages shows all pages', () => {
      const result = generatePageNumbers(3, 5, 10);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('pageCount=7 at the end shows trailing pages', () => {
      const result = generatePageNumbers(19, 20, 7);
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(ELLIPSIS);
      expect(result[result.length - 1]).toBe(20);
      // Trailing pages: totalPages - edgeEndCount .. totalPages = 15..20
      const numbersAfterEllipsis = result.slice(result.lastIndexOf(ELLIPSIS) + 1);
      expect(numbersAfterEllipsis.length).toBe(6);
    });

    it('pageCount=3 middle position shows prev/current/next', () => {
      const result = generatePageNumbers(5, 10, 3);
      expect(result).toContain(4);
      expect(result).toContain(5);
      expect(result).toContain(6);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(10);
    });
  });
});
