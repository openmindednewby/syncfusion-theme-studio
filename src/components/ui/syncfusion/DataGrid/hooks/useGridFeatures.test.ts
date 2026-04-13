import { describe, it, expect } from 'vitest';

import type { GridConfig } from '@/lib/grid/types';

import {
  AVAILABLE_PAGE_SIZES,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SETTINGS,
  DEFAULT_PAGE_SIZE,
} from '../constants';
import { computePageSettings } from './useGridFeatures';

// ---------------------------------------------------------------------------
// DEFAULT_PAGE_SETTINGS constant
// ---------------------------------------------------------------------------
describe('DEFAULT_PAGE_SETTINGS', () => {
  it('includes pageCount of 5', () => {
    expect(DEFAULT_PAGE_SETTINGS.pageCount).toBe(5);
  });

  it('includes pageSize of DEFAULT_PAGE_SIZE', () => {
    expect(DEFAULT_PAGE_SETTINGS.pageSize).toBe(DEFAULT_PAGE_SIZE);
  });

  it('includes pageSizes matching AVAILABLE_PAGE_SIZES', () => {
    expect(DEFAULT_PAGE_SETTINGS.pageSizes).toEqual(AVAILABLE_PAGE_SIZES);
  });

  it('has the expected shape with all three keys', () => {
    expect(DEFAULT_PAGE_SETTINGS).toEqual({
      pageSize: DEFAULT_PAGE_SIZE,
      pageCount: DEFAULT_PAGE_COUNT,
      pageSizes: AVAILABLE_PAGE_SIZES,
    });
  });
});

// ---------------------------------------------------------------------------
// computePageSettings
// ---------------------------------------------------------------------------
describe('computePageSettings', () => {
  const fallback = DEFAULT_PAGE_SETTINGS;

  describe('when gridConfig has no pagination', () => {
    it('returns fallback values with capped pageCount when gridConfig is undefined', () => {
      const result = computePageSettings(undefined, fallback, true, 100);
      expect(result.pageSize).toBe(fallback.pageSize);
      expect(result.pageSizes).toEqual(fallback.pageSizes);
      expect(result.pageCount).toBe(5);
    });

    it('returns fallback values with capped pageCount when gridConfig has no pagination key', () => {
      const config: GridConfig = {};
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageSize).toBe(fallback.pageSize);
      expect(result.pageCount).toBe(5);
    });

    it('caps pageCount to totalPages when data fits in fewer pages than default', () => {
      const result = computePageSettings(undefined, fallback, true, 10);
      // 10 items / pageSize 10 = 1 page, so pageCount capped to 1
      expect(result.pageCount).toBe(1);
    });
  });

  describe('when pagination threshold is not exceeded', () => {
    const config: GridConfig = {
      pagination: { enabled: true, threshold: 50 },
    };

    it('sets pageSize to dataLength when data is at or below threshold', () => {
      const result = computePageSettings(config, fallback, true, 30);
      expect(result.pageSize).toBe(30);
    });

    it('sets pageSize to dataLength when data equals threshold', () => {
      const result = computePageSettings(config, fallback, true, 50);
      expect(result.pageSize).toBe(50);
    });

    it('preserves fallback properties beyond pageSize', () => {
      const result = computePageSettings(config, fallback, true, 30);
      expect(result.pageSizes).toEqual(fallback.pageSizes);
      expect(result.pageCount).toBe(fallback.pageCount);
    });
  });

  describe('when paging is disabled', () => {
    const config: GridConfig = {
      pagination: { enabled: true, threshold: 10 },
    };

    it('sets pageSize to dataLength even if data exceeds threshold', () => {
      const result = computePageSettings(config, fallback, false, 100);
      expect(result.pageSize).toBe(100);
    });
  });

  describe('when pagination is active (threshold exceeded)', () => {
    const config: GridConfig = {
      pagination: { enabled: true, threshold: 20, pageSize: 15 },
    };

    it('uses pageSize from config', () => {
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageSize).toBe(15);
    });

    it('defaults pageCount to DEFAULT_PAGE_COUNT (5) when not specified', () => {
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageCount).toBe(DEFAULT_PAGE_COUNT);
      expect(result.pageCount).toBe(5);
    });

    it('defaults pageSizes to AVAILABLE_PAGE_SIZES when not specified', () => {
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageSizes).toEqual(AVAILABLE_PAGE_SIZES);
    });

    it('returns an object with exactly pageSize, pageCount, and pageSizes', () => {
      const result = computePageSettings(config, fallback, true, 100);
      expect(Object.keys(result)).toEqual(
        expect.arrayContaining(['pageSize', 'pageCount', 'pageSizes']),
      );
    });
  });

  describe('when custom values are provided in config', () => {
    it('uses custom pageCount from config', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 10, pageCount: 7 },
      };
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageCount).toBe(7);
    });

    it('uses custom pageSizes from config', () => {
      const customSizes = [5, 20, 40];
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 10, pageSizes: customSizes },
      };
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageSizes).toEqual(customSizes);
    });

    it('uses custom pageSize from config', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 10, pageSize: 25 },
      };
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageSize).toBe(25);
    });
  });

  describe('defaults when config omits optional fields', () => {
    it('defaults pageSize to DEFAULT_PAGE_SIZE when not in config', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 10 },
      };
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageSize).toBe(DEFAULT_PAGE_SIZE);
    });

    it('defaults all three fields when config only has enabled and threshold', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 5 },
      };
      const result = computePageSettings(config, fallback, true, 100);
      expect(result).toEqual({
        pageSize: DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
        pageSizes: AVAILABLE_PAGE_SIZES,
      });
    });
  });

  describe('threshold edge cases', () => {
    it('treats missing threshold as 0 (always shows pagination)', () => {
      const config: GridConfig = {
        pagination: { enabled: true },
      };
      const result = computePageSettings(config, fallback, true, 1);
      // dataLength (1) > threshold (0) is true, so pagination is active
      expect(result.pageSize).toBe(DEFAULT_PAGE_SIZE);
      // 1 item / pageSize 10 = 1 page, so pageCount capped to 1
      expect(result.pageCount).toBe(1);
    });

    it('hides pagination when dataLength is 0 and threshold is 0', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 0 },
      };
      const result = computePageSettings(config, fallback, true, 0);
      // dataLength (0) > threshold (0) is false
      expect(result.pageSize).toBe(0);
    });
  });

  describe('pageCount capping to actual total pages', () => {
    it('caps pageCount when data has fewer pages than desired pageCount', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 0, pageSize: 10 },
      };
      // 20 items / 10 pageSize = 2 pages, pageCount should be min(5, 2) = 2
      const result = computePageSettings(config, fallback, true, 20);
      expect(result.pageCount).toBe(2);
    });

    it('keeps full pageCount when data has more pages than desired', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 0, pageSize: 10 },
      };
      // 100 items / 10 pageSize = 10 pages, pageCount should be min(5, 10) = 5
      const result = computePageSettings(config, fallback, true, 100);
      expect(result.pageCount).toBe(5);
    });

    it('caps custom pageCount to total pages', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 0, pageSize: 25, pageCount: 10 },
      };
      // 50 items / 25 pageSize = 2 pages, pageCount should be min(10, 2) = 2
      const result = computePageSettings(config, fallback, true, 50);
      expect(result.pageCount).toBe(2);
    });

    it('returns pageCount of 1 when all data fits in one page', () => {
      const config: GridConfig = {
        pagination: { enabled: true, threshold: 0, pageSize: 50 },
      };
      // 10 items / 50 pageSize = 1 page
      const result = computePageSettings(config, fallback, true, 10);
      expect(result.pageCount).toBe(1);
    });

    it('caps fallback pageCount when no gridConfig pagination', () => {
      // 25 items / 10 pageSize = 3 pages, fallback pageCount (5) should be capped to 3
      const result = computePageSettings(undefined, fallback, true, 25);
      expect(result.pageCount).toBe(3);
    });
  });
});
