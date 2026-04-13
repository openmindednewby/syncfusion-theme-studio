import { describe, it, expect } from 'vitest';

import { getStockStatus } from './sections';

import { filterInventory, getCategories } from './index';

import type { InventoryItemWithId } from './sections';

const MOCK_ITEMS: InventoryItemWithId[] = [
  {
    id: 1,
    sku: 'SKU-001',
    name: 'Widget A',
    category: 'Widgets',
    quantityInStock: 50,
    reorderLevel: 10,
    unitPrice: 9.99,
    isActive: true,
  },
  {
    id: 2,
    sku: 'SKU-002',
    name: 'Gadget B',
    category: 'Gadgets',
    quantityInStock: 5,
    reorderLevel: 10,
    unitPrice: 24.99,
    isActive: true,
  },
  {
    id: 3,
    sku: 'SKU-003',
    name: 'Widget C',
    category: 'Widgets',
    quantityInStock: 0,
    reorderLevel: 5,
    unitPrice: 4.99,
    isActive: false,
  },
];

describe('getStockStatus', () => {
  it('returns outOfStock when qty is 0', () => {
    expect(getStockStatus(0, 5)).toBe('outOfStock');
  });

  it('returns lowStock when qty is at reorder level', () => {
    expect(getStockStatus(5, 5)).toBe('lowStock');
  });

  it('returns lowStock when qty is below reorder level', () => {
    expect(getStockStatus(3, 10)).toBe('lowStock');
  });

  it('returns inStock when qty exceeds reorder level', () => {
    expect(getStockStatus(50, 10)).toBe('inStock');
  });

  it('returns inStock when qty is one above reorder level', () => {
    expect(getStockStatus(6, 5)).toBe('inStock');
  });
});

describe('filterInventory', () => {
  it('returns all when search and category are empty', () => {
    expect(filterInventory(MOCK_ITEMS, '', '')).toHaveLength(3);
  });

  it('filters by search term (sku)', () => {
    const result = filterInventory(MOCK_ITEMS, 'SKU-001', '');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(1);
  });

  it('filters by search term (name)', () => {
    const result = filterInventory(MOCK_ITEMS, 'widget', '');
    expect(result).toHaveLength(2);
  });

  it('filters by category', () => {
    const result = filterInventory(MOCK_ITEMS, '', 'Gadgets');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(2);
  });

  it('combines search and category filters', () => {
    const result = filterInventory(MOCK_ITEMS, 'widget', 'Widgets');
    expect(result).toHaveLength(2);
  });

  it('returns empty when no match', () => {
    expect(filterInventory(MOCK_ITEMS, 'zzz', '')).toHaveLength(0);
  });
});

describe('getCategories', () => {
  it('returns unique categories sorted', () => {
    const cats = getCategories(MOCK_ITEMS);
    expect(cats).toEqual(['Gadgets', 'Widgets']);
  });

  it('returns empty array for empty items', () => {
    expect(getCategories([])).toEqual([]);
  });
});
