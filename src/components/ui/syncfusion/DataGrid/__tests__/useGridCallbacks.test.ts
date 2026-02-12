/**
 * Unit tests for useGridCallbacks - callback memoization and conditional wiring.
 * Focuses on logic: callbacks fire correctly and undefined callbacks are not wired.
 */
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useGridCallbacks } from '../useGridCallbacks';

import type { DataGridProps } from '../types';

/** Create minimal props with optional callback overrides */
function createProps(
  overrides: Partial<DataGridProps<Record<string, unknown>>> = {},
): DataGridProps<Record<string, unknown>> {
  return {
    data: [],
    columns: [],
    ...overrides,
  };
}

describe('useGridCallbacks', () => {
  describe('handleRowSelected', () => {
    it('calls onRowSelected with row data when provided', () => {
      const onRowSelected = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onRowSelected })),
      );

      const mockRowData = { id: 1, name: 'Test' };
result.current.handleRowSelected({ data: mockRowData } as never);

      expect(onRowSelected).toHaveBeenCalledWith(mockRowData);
    });

    it('does not throw when onRowSelected is not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));

      expect(() => {
    result.current.handleRowSelected({ data: { id: 1 } } as never);
      }).not.toThrow();
    });

    it('does not call onRowSelected when row data is undefined', () => {
      const onRowSelected = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onRowSelected })),
      );

result.current.handleRowSelected({ data: undefined } as never);

      expect(onRowSelected).not.toHaveBeenCalled();
    });
  });

  describe('handleRowDeselected', () => {
    it('calls onRowDeselected with row data when provided', () => {
      const onRowDeselected = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onRowDeselected })),
      );

      const mockRowData = { id: 2, name: 'Test2' };
result.current.handleRowDeselected({ data: mockRowData } as never);

      expect(onRowDeselected).toHaveBeenCalledWith(mockRowData);
    });
  });

  describe('optional callbacks return undefined when not provided', () => {
    it('returns undefined for handleActionBegin when not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));
      expect(result.current.handleActionBegin).toBeUndefined();
    });

    it('returns undefined for handleActionComplete when not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));
      expect(result.current.handleActionComplete).toBeUndefined();
    });

    it('returns undefined for handleToolbarClick when not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));
      expect(result.current.handleToolbarClick).toBeUndefined();
    });

    it('returns undefined for handleContextMenuClick when not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));
      expect(result.current.handleContextMenuClick).toBeUndefined();
    });

    it('returns undefined for handleRowDrag when not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));
      expect(result.current.handleRowDrag).toBeUndefined();
    });

    it('returns undefined for handleRowDrop when not provided', () => {
      const { result } = renderHook(() => useGridCallbacks(createProps()));
      expect(result.current.handleRowDrop).toBeUndefined();
    });
  });

  describe('optional callbacks fire when provided', () => {
    it('fires handleActionBegin when provided', () => {
      const onActionBegin = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onActionBegin })),
      );

      expect(result.current.handleActionBegin).toBeDefined();
      result.current.handleActionBegin?.({ requestType: 'save' });

      expect(onActionBegin).toHaveBeenCalledWith({ requestType: 'save' });
    });

    it('fires handleActionComplete when provided', () => {
      const onActionComplete = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onActionComplete })),
      );

      result.current.handleActionComplete?.({ requestType: 'save' });

      expect(onActionComplete).toHaveBeenCalledWith({ requestType: 'save' });
    });

    it('fires handleToolbarClick when provided', () => {
      const onToolbarClick = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onToolbarClick })),
      );

      result.current.handleToolbarClick?.({ item: { id: 'export' } });

      expect(onToolbarClick).toHaveBeenCalledWith({ item: { id: 'export' } });
    });

    it('fires handleContextMenuClick when provided', () => {
      const onContextMenuClick = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onContextMenuClick })),
      );

      result.current.handleContextMenuClick?.({ item: { id: 'copy' } });

      expect(onContextMenuClick).toHaveBeenCalledWith({ item: { id: 'copy' } });
    });

    it('fires handleRowDrag when provided', () => {
      const onRowDrag = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onRowDrag })),
      );

      result.current.handleRowDrag?.({ fromIndex: 0 });

      expect(onRowDrag).toHaveBeenCalledWith({ fromIndex: 0 });
    });

    it('fires handleRowDrop when provided', () => {
      const onRowDrop = vi.fn();
      const { result } = renderHook(() =>
        useGridCallbacks(createProps({ onRowDrop })),
      );

      result.current.handleRowDrop?.({ dropIndex: 2 });

      expect(onRowDrop).toHaveBeenCalledWith({ dropIndex: 2 });
    });
  });
});
