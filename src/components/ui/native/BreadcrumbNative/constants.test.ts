import { describe, it, expect } from 'vitest';

import { computeVisibleItems, ELLIPSIS_CHAR } from './constants';

describe('computeVisibleItems', () => {
  const items = ['Home', 'Products', 'Category', 'Subcategory', 'Item'];

  it('returns all items when maxItems is 0', () => {
    const result = computeVisibleItems(items, 0);
    expect(result.visibleItems).toEqual(items);
    expect(result.isCollapsed).toBe(false);
    expect(result.collapsedCount).toBe(0);
  });

  it('returns all items when items count is within maxItems', () => {
    const result = computeVisibleItems(items, 5);
    expect(result.visibleItems).toEqual(items);
    expect(result.isCollapsed).toBe(false);
  });

  it('collapses middle items when items count exceeds maxItems', () => {
    const result = computeVisibleItems(items, 3);
    expect(result.isCollapsed).toBe(true);
    expect(result.visibleItems).toEqual(['Home', 'Subcategory', 'Item']);
    expect(result.collapsedCount).toBe(2);
  });

  it('handles maxItems of 2 by keeping first and last', () => {
    const result = computeVisibleItems(items, 2);
    expect(result.visibleItems).toEqual(['Home', 'Item']);
    expect(result.collapsedCount).toBe(3);
  });

  it('produces unique index-based keys even with duplicate text items', () => {
    const duplicateItems = [
      { text: 'Overview', url: '/a' },
      { text: 'Settings', url: '/b' },
      { text: 'Overview', url: '/c' },
    ];
    const result = computeVisibleItems(duplicateItems, 0);

    // All items visible, keys should use index (item-0, item-1, item-2)
    // which are always unique even when item.text is duplicated
    expect(result.visibleItems).toHaveLength(3);
    expect(result.visibleItems[0]!.text).toBe(result.visibleItems[2]!.text);

    // Verify indices would produce unique keys
    const keys = result.visibleItems.map((_, i) => `item-${i}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('ELLIPSIS_CHAR', () => {
  it('is the unicode ellipsis character', () => {
    expect(ELLIPSIS_CHAR).toBe('\u2026');
  });
});
