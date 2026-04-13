import { describe, expect, it } from 'vitest';

import { collectGroupKeys, groupDataByColumns } from './groupingUtils';

import type { GroupedData, GroupingConfig } from './groupingUtils';

function makeConfig(overrides: Partial<GroupingConfig> = {}): GroupingConfig {
  return {
    columns: [],
    collapsedGroups: new Set<string>(),
    level: 0,
    parentKey: '',
    ...overrides,
  };
}

const SAMPLE_DATA = [
  { category: 'A', status: 'active', value: 1 },
  { category: 'A', status: 'inactive', value: 2 },
  { category: 'B', status: 'active', value: 3 },
  { category: 'B', status: 'active', value: 4 },
];

// ── groupDataByColumns ────────────────────────────────────────────────

describe('groupDataByColumns', () => {
  it('returns empty array when columns list is empty', () => {
    const result = groupDataByColumns(SAMPLE_DATA, makeConfig());
    expect(result).toEqual([]);
  });

  it('groups by a single column', () => {
    const result = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category'] }),
    );
    expect(result).toHaveLength(2);
    expect(result[0]!.field).toBe('category');
    expect(result[0]!.value).toBe('A');
    expect(result[0]!.count).toBe(2);
    expect(result[1]!.value).toBe('B');
    expect(result[1]!.count).toBe(2);
  });

  it('groups recursively by two columns', () => {
    const result = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category', 'status'] }),
    );
    expect(result).toHaveLength(2);

    const groupA = result[0]!;
    expect(groupA.value).toBe('A');
    const nestedA = groupA.items as GroupedData[];
    expect(nestedA).toHaveLength(2);
    expect(nestedA[0]!.field).toBe('status');

    const groupB = result[1]!;
    const nestedB = groupB.items as GroupedData[];
    expect(nestedB).toHaveLength(1);
    expect(nestedB[0]!.value).toBe('active');
    expect(nestedB[0]!.count).toBe(2);
  });

  it('handles empty data array', () => {
    const result = groupDataByColumns(
      [],
      makeConfig({ columns: ['category'] }),
    );
    expect(result).toEqual([]);
  });

  it('treats null/undefined field values as "null" string', () => {
    const data = [
      { category: null, value: 1 },
      { category: undefined, value: 2 },
      { value: 3 },
    ];
    const result = groupDataByColumns(
      data as Array<Record<string, unknown>>,
      makeConfig({ columns: ['category'] }),
    );
    expect(result).toHaveLength(1);
    expect(result[0]!.value).toBe('null');
    expect(result[0]!.count).toBe(3);
  });

  it('sets correct level on nested groups', () => {
    const result = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category', 'status'] }),
    );
    expect(result[0]!.level).toBe(0);
    const nested = result[0]!.items as GroupedData[];
    expect(nested[0]!.level).toBe(1);
  });

  it('builds hierarchical group keys', () => {
    const result = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category', 'status'] }),
    );
    expect(result[0]!.key).toBe('category:A');
    const nested = result[0]!.items as GroupedData[];
    expect(nested[0]!.key).toBe('category:A|status:active');
  });

  it('marks collapsed groups from the set', () => {
    const collapsed = new Set(['category:A']);
    const result = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category'], collapsedGroups: collapsed }),
    );
    expect(result[0]!.isCollapsed).toBe(true);
    expect(result[1]!.isCollapsed).toBe(false);
  });
});

// ── collectGroupKeys ──────────────────────────────────────────────────

describe('collectGroupKeys', () => {
  it('returns empty array for empty groups', () => {
    expect(collectGroupKeys([])).toEqual([]);
  });

  it('collects keys from a flat group list', () => {
    const groups = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category'] }),
    );
    const keys = collectGroupKeys(groups);
    expect(keys).toContain('category:A');
    expect(keys).toContain('category:B');
    expect(keys).toHaveLength(2);
  });

  it('collects keys from nested groups recursively', () => {
    const groups = groupDataByColumns(
      SAMPLE_DATA,
      makeConfig({ columns: ['category', 'status'] }),
    );
    const keys = collectGroupKeys(groups);
    expect(keys).toContain('category:A');
    expect(keys).toContain('category:A|status:active');
    expect(keys).toContain('category:A|status:inactive');
    expect(keys).toContain('category:B');
    expect(keys).toContain('category:B|status:active');
  });

  it('collects keys from three levels of nesting', () => {
    const data = [
      { a: '1', b: '2', c: '3' },
      { a: '1', b: '2', c: '4' },
    ];
    const groups = groupDataByColumns(
      data,
      makeConfig({ columns: ['a', 'b', 'c'] }),
    );
    const keys = collectGroupKeys(groups);
    expect(keys).toContain('a:1');
    expect(keys).toContain('a:1|b:2');
    expect(keys).toContain('a:1|b:2|c:3');
    expect(keys).toContain('a:1|b:2|c:4');
  });
});
