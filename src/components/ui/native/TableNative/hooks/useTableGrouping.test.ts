import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useTableGrouping } from './useTableGrouping';

import type { GroupedData } from './useTableGrouping';

const MOCK_DATA = [
  { id: 1, name: 'Alice', department: 'Engineering', role: 'Senior' },
  { id: 2, name: 'Bob', department: 'Engineering', role: 'Junior' },
  { id: 3, name: 'Charlie', department: 'Marketing', role: 'Senior' },
  { id: 4, name: 'Diana', department: 'Marketing', role: 'Junior' },
  { id: 5, name: 'Eve', department: 'Engineering', role: 'Senior' },
];

describe('useTableGrouping', () => {
  describe('initial state', () => {
    it('returns not grouped when no columns provided', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA }),
      );

      expect(result.current.isGrouped).toBe(false);
      expect(result.current.groupedData).toBeNull();
    });

    it('starts grouped when initial columns provided', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      expect(result.current.isGrouped).toBe(true);
      expect(result.current.groupedData).not.toBeNull();
    });
  });

  describe('single column grouping', () => {
    it('groups data by a single column', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      const groups = result.current.groupedData!;
      expect(groups.length).toBe(2);

      const engineeringGroup = groups.find((g) => g.value === 'Engineering');
      const marketingGroup = groups.find((g) => g.value === 'Marketing');

      expect(engineeringGroup).toBeDefined();
      expect(marketingGroup).toBeDefined();
      expect(engineeringGroup!.count).toBe(3);
      expect(marketingGroup!.count).toBe(2);
    });

    it('sets correct field and level on groups', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      const groups = result.current.groupedData!;
      for (const group of groups) {
        expect(group.field).toBe('department');
        expect(group.level).toBe(0);
      }
    });

    it('contains correct items in each group', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      const engineeringGroup = result.current.groupedData!.find(
        (g) => g.value === 'Engineering',
      )!;
      const items = engineeringGroup.items as Array<Record<string, unknown>>;
      const names = items.map((item) => item['name']);

      expect(names).toContain('Alice');
      expect(names).toContain('Bob');
      expect(names).toContain('Eve');
    });
  });

  describe('nested grouping', () => {
    it('groups by multiple columns with nesting', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department', 'role'] }),
      );

      const groups = result.current.groupedData!;
      expect(groups.length).toBe(2); // Engineering, Marketing

      const engineeringGroup = groups.find((g) => g.value === 'Engineering')!;
      const nestedGroups = engineeringGroup.items as GroupedData[];

      expect(nestedGroups.length).toBe(2); // Senior, Junior
      const seniorGroup = nestedGroups.find((g) => g.value === 'Senior');
      expect(seniorGroup).toBeDefined();
      expect(seniorGroup!.count).toBe(2); // Alice, Eve
      expect(seniorGroup!.level).toBe(1);
    });
  });

  describe('addGroup', () => {
    it('adds a column to group by', () => {
      const onGroupChange = vi.fn();
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, onGroupChange }),
      );

      act(() => {
        result.current.addGroup('department');
      });

      expect(result.current.isGrouped).toBe(true);
      expect(result.current.groupColumns).toEqual(['department']);
      expect(onGroupChange).toHaveBeenCalledWith(['department']);
    });

    it('does not add duplicate column', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      act(() => {
        result.current.addGroup('department');
      });

      expect(result.current.groupColumns).toEqual(['department']);
    });
  });

  describe('removeGroup', () => {
    it('removes a column from grouping', () => {
      const onGroupChange = vi.fn();
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department', 'role'], onGroupChange }),
      );

      act(() => {
        result.current.removeGroup('department');
      });

      expect(result.current.groupColumns).toEqual(['role']);
      expect(onGroupChange).toHaveBeenCalledWith(['role']);
    });
  });

  describe('reorderGroups', () => {
    it('reorders group columns', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department', 'role'] }),
      );

      act(() => {
        result.current.reorderGroups(['role', 'department']);
      });

      expect(result.current.groupColumns).toEqual(['role', 'department']);
    });
  });

  describe('collapse/expand', () => {
    it('toggles collapse on a group', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      const groupKey = result.current.groupedData![0]!.key;

      act(() => {
        result.current.toggleCollapse(groupKey);
      });

      expect(result.current.collapsedGroups.has(groupKey)).toBe(true);

      act(() => {
        result.current.toggleCollapse(groupKey);
      });

      expect(result.current.collapsedGroups.has(groupKey)).toBe(false);
    });

    it('collapses all groups', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      act(() => {
        result.current.collapseAll();
      });

      const groupCount = result.current.groupedData!.length;
      expect(result.current.collapsedGroups.size).toBe(groupCount);
    });

    it('expands all groups', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: MOCK_DATA, groupColumns: ['department'] }),
      );

      act(() => {
        result.current.collapseAll();
      });
      act(() => {
        result.current.expandAll();
      });

      expect(result.current.collapsedGroups.size).toBe(0);
    });
  });

  describe('empty data', () => {
    it('handles empty data array', () => {
      const { result } = renderHook(() =>
        useTableGrouping({ data: [], groupColumns: ['department'] }),
      );

      expect(result.current.groupedData).toEqual([]);
    });
  });

  describe('null values', () => {
    it('groups null/undefined values as "null"', () => {
      const dataWithNulls = [
        { id: 1, name: 'Alice', department: null },
        { id: 2, name: 'Bob', department: undefined },
        { id: 3, name: 'Charlie', department: 'Engineering' },
      ];

      const { result } = renderHook(() =>
        useTableGrouping({ data: dataWithNulls, groupColumns: ['department'] }),
      );

      const groups = result.current.groupedData!;
      const nullGroup = groups.find((g) => g.value === 'null');
      expect(nullGroup).toBeDefined();
      expect(nullGroup!.count).toBe(2);
    });
  });
});
