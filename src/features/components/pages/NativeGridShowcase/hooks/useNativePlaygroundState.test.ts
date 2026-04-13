import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useNativePlaygroundState } from './useNativePlaygroundState';

const DATA_LENGTH = 25;

describe('useNativePlaygroundState', () => {
  describe('handleSelectionChange', () => {
    it('updates selectedRows count when called with rows', () => {
      const { result } = renderHook(() =>
        useNativePlaygroundState(DATA_LENGTH),
      );

      expect(result.current.selectedRows).toBe(0);
      expect(result.current.selectedItems).toEqual([]);

      act(() => {
        result.current.handleSelectionChange([
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]);
      });

      expect(result.current.selectedRows).toBe(2);
      expect(result.current.selectedItems).toEqual([
        { key: '1', label: 'Alice' },
        { key: '2', label: 'Bob' },
      ]);
    });

    it('updates stateEntries with new selectedRows count', () => {
      const { result } = renderHook(() =>
        useNativePlaygroundState(DATA_LENGTH),
      );

      const initialEntry = result.current.stateEntries.find(
        (e) => e.labelKey === 'components.gridShowcase.playground.selectedRows',
      );
      expect(initialEntry?.value).toBe('0');

      act(() => {
        result.current.handleSelectionChange([{ id: 1, name: 'Alice' }]);
      });

      const updatedEntry = result.current.stateEntries.find(
        (e) => e.labelKey === 'components.gridShowcase.playground.selectedRows',
      );
      expect(updatedEntry?.value).toBe('1');
    });

    it('handles clearing selection', () => {
      const { result } = renderHook(() =>
        useNativePlaygroundState(DATA_LENGTH),
      );

      act(() => {
        result.current.handleSelectionChange([{ id: 1, name: 'Alice' }]);
      });
      expect(result.current.selectedRows).toBe(1);

      act(() => {
        result.current.handleClearAllSelected();
      });
      expect(result.current.selectedRows).toBe(0);
      expect(result.current.selectedItems).toEqual([]);
    });

    it('handles removing a single selected item', () => {
      const { result } = renderHook(() =>
        useNativePlaygroundState(DATA_LENGTH),
      );

      act(() => {
        result.current.handleSelectionChange([
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]);
      });
      expect(result.current.selectedRows).toBe(2);

      act(() => {
        result.current.handleRemoveSelectedItem('1');
      });
      expect(result.current.selectedRows).toBe(1);
      expect(result.current.selectedItems).toEqual([{ key: '2', label: 'Bob' }]);
    });

    it('returns correct selectionConfig for Multiple + checkbox', () => {
      const { result } = renderHook(() =>
        useNativePlaygroundState(DATA_LENGTH),
      );

      act(() => {
        result.current.setSelectionType('Multiple');
      });
      act(() => {
        result.current.setCheckbox(true);
      });

      expect(result.current.selectionConfig).toEqual({
        type: 'Multiple',
        mode: 'Row',
        checkbox: true,
      });
    });
  });
});
