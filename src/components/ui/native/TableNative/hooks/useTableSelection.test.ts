import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useTableSelection } from './useTableSelection';

const MOCK_DATA = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Diana', age: 28 },
  { id: 5, name: 'Eve', age: 32 },
];

const NO_MODIFIERS = { ctrlKey: false, shiftKey: false, metaKey: false };
const CTRL_MODIFIER = { ctrlKey: true, shiftKey: false, metaKey: false };
const SHIFT_MODIFIER = { ctrlKey: false, shiftKey: true, metaKey: false };
const META_MODIFIER = { ctrlKey: false, shiftKey: false, metaKey: true };

describe('useTableSelection', () => {
  describe('single selection', () => {
    it('selects a row on click', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Single' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });

      expect(result.current.isRowSelected(1)).toBe(true);
      expect(result.current.selectedRowIds.size).toBe(1);
    });

    it('deselects a row on second click', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Single' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      expect(result.current.isRowSelected(1)).toBe(true);

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      expect(result.current.isRowSelected(1)).toBe(false);
    });

    it('replaces selection when clicking a different row', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Single' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[1]!, 1, NO_MODIFIERS);
      });

      expect(result.current.isRowSelected(1)).toBe(false);
      expect(result.current.isRowSelected(2)).toBe(true);
      expect(result.current.selectedRowIds.size).toBe(1);
    });

    it('calls onRowSelected callback', () => {
      const onRowSelected = vi.fn();
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Single', onRowSelected }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });

      expect(onRowSelected).toHaveBeenCalledWith(MOCK_DATA[0]);
    });

    it('calls onRowDeselected callback', () => {
      const onRowDeselected = vi.fn();
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Single', onRowDeselected }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });

      expect(onRowDeselected).toHaveBeenCalledWith(MOCK_DATA[0]);
    });
  });

  describe('multiple selection', () => {
    it('replaces selection with plain click', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[1]!, 1, NO_MODIFIERS);
      });

      expect(result.current.selectedRowIds.size).toBe(1);
      expect(result.current.isRowSelected(2)).toBe(true);
    });

    it('toggles with Ctrl+click', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, CTRL_MODIFIER);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[1]!, 1, CTRL_MODIFIER);
      });

      expect(result.current.selectedRowIds.size).toBe(2);
      expect(result.current.isRowSelected(1)).toBe(true);
      expect(result.current.isRowSelected(2)).toBe(true);
    });

    it('toggles with Meta+click', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, META_MODIFIER);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[1]!, 1, META_MODIFIER);
      });

      expect(result.current.isRowSelected(1)).toBe(true);
      expect(result.current.isRowSelected(2)).toBe(true);
    });

    it('deselects with Ctrl+click on already selected row', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, CTRL_MODIFIER);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[1]!, 1, CTRL_MODIFIER);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, CTRL_MODIFIER);
      });

      expect(result.current.selectedRowIds.size).toBe(1);
      expect(result.current.isRowSelected(1)).toBe(false);
      expect(result.current.isRowSelected(2)).toBe(true);
    });

    it('selects range with Shift+click', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[3]!, 3, SHIFT_MODIFIER);
      });

      expect(result.current.isRowSelected(1)).toBe(true);
      expect(result.current.isRowSelected(2)).toBe(true);
      expect(result.current.isRowSelected(3)).toBe(true);
      expect(result.current.isRowSelected(4)).toBe(true);
      expect(result.current.isRowSelected(5)).toBe(false);
    });
  });

  describe('checkbox mode', () => {
    it('toggles without Ctrl in checkbox mode', () => {
      const { result } = renderHook(() =>
        useTableSelection({
          data: MOCK_DATA,
          selectionType: 'Multiple',
          checkboxEnabled: true,
        }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });
      act(() => {
        result.current.handleRowClick(MOCK_DATA[1]!, 1, NO_MODIFIERS);
      });

      expect(result.current.selectedRowIds.size).toBe(2);
    });
  });

  describe('select all', () => {
    it('selects all rows', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleSelectAll();
      });

      expect(result.current.isAllSelected).toBe(true);
      expect(result.current.selectedRowIds.size).toBe(5);
    });

    it('deselects all when already all selected', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleSelectAll();
      });
      act(() => {
        result.current.handleSelectAll();
      });

      expect(result.current.isAllSelected).toBe(false);
      expect(result.current.selectedRowIds.size).toBe(0);
    });

    it('returns false for isAllSelected with empty data', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: [], selectionType: 'Multiple' }),
      );

      expect(result.current.isAllSelected).toBe(false);
    });
  });

  describe('cell selection', () => {
    it('selects a cell when mode is Cell', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionMode: 'Cell' }),
      );

      act(() => {
        result.current.handleCellClick(MOCK_DATA[0]!, 'name', NO_MODIFIERS);
      });

      expect(result.current.isCellSelected(1, 'name')).toBe(true);
    });

    it('toggles cell selection', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionMode: 'Cell' }),
      );

      act(() => {
        result.current.handleCellClick(MOCK_DATA[0]!, 'name', NO_MODIFIERS);
      });
      act(() => {
        result.current.handleCellClick(MOCK_DATA[0]!, 'name', NO_MODIFIERS);
      });

      expect(result.current.isCellSelected(1, 'name')).toBe(false);
    });

    it('ignores cell click when mode is Row', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionMode: 'Row' }),
      );

      act(() => {
        result.current.handleCellClick(MOCK_DATA[0]!, 'name', NO_MODIFIERS);
      });

      expect(result.current.selectedCells.size).toBe(0);
    });

    it('ignores row click when mode is Cell', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionMode: 'Cell' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, NO_MODIFIERS);
      });

      expect(result.current.selectedRowIds.size).toBe(0);
    });
  });

  describe('clearSelection', () => {
    it('clears all row and cell selections', () => {
      const { result } = renderHook(() =>
        useTableSelection({ data: MOCK_DATA, selectionMode: 'Both', selectionType: 'Multiple' }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, CTRL_MODIFIER);
        result.current.handleCellClick(MOCK_DATA[1]!, 'name', NO_MODIFIERS);
      });
      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedRowIds.size).toBe(0);
      expect(result.current.selectedCells.size).toBe(0);
    });
  });

  describe('onSelectionChange', () => {
    it('fires with selected row objects', () => {
      const onSelectionChange = vi.fn();
      const { result } = renderHook(() =>
        useTableSelection({
          data: MOCK_DATA,
          selectionType: 'Multiple',
          onSelectionChange,
        }),
      );

      act(() => {
        result.current.handleRowClick(MOCK_DATA[0]!, 0, CTRL_MODIFIER);
      });

      expect(onSelectionChange).toHaveBeenCalledWith([MOCK_DATA[0]]);
    });
  });
});
