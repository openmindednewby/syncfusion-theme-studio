import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useTableEditing } from './useTableEditing';

const COLUMNS = [
  { field: 'id', headerText: 'ID' },
  { field: 'name', headerText: 'Name' },
  { field: 'salary', headerText: 'Salary' },
];

const MOCK_DATA = [
  { id: 1, name: 'Alice', salary: 80000 },
  { id: 2, name: 'Bob', salary: 60000 },
  { id: 3, name: 'Charlie', salary: 90000 },
];

describe('useTableEditing', () => {
  describe('initial state', () => {
    it('starts with no editing active', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS }),
      );

      expect(result.current.isEditing).toBe(false);
      expect(result.current.editingRowId).toBeNull();
      expect(result.current.editingCell).toBeNull();
      expect(result.current.isDialogOpen).toBe(false);
    });
  });

  describe('normal (inline) editing', () => {
    it('starts editing a row', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS }),
      );

      act(() => {
        result.current.startEdit(1);
      });

      expect(result.current.isEditing).toBe(true);
      expect(result.current.editingRowId).toBe(1);
      expect(result.current.editValues).toEqual({ id: 1, name: 'Alice', salary: 80000 });
    });

    it('does not start edit when allowEditing is false', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS, allowEditing: false }),
      );

      act(() => {
        result.current.startEdit(1);
      });

      expect(result.current.isEditing).toBe(false);
    });

    it('updates edit values', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS }),
      );

      act(() => {
        result.current.startEdit(1);
      });
      act(() => {
        result.current.updateEditValue('name', 'Alice Updated');
      });

      expect(result.current.editValues['name']).toBe('Alice Updated');
    });

    it('saves edit and calls onSave callback', () => {
      const onSave = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS, onSave }),
      );

      act(() => {
        result.current.startEdit(1);
      });
      act(() => {
        result.current.updateEditValue('name', 'Alice Updated');
      });
      act(() => {
        result.current.saveEdit();
      });

      expect(onSave).toHaveBeenCalledWith(
        { id: 1, name: 'Alice Updated', salary: 80000 },
        { id: 1, name: 'Alice', salary: 80000 },
      );
      expect(result.current.isEditing).toBe(false);
    });

    it('cancels edit and resets state', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS }),
      );

      act(() => {
        result.current.startEdit(1);
      });
      act(() => {
        result.current.updateEditValue('name', 'Alice Updated');
      });
      act(() => {
        result.current.cancelEdit();
      });

      expect(result.current.isEditing).toBe(false);
      expect(result.current.editingRowId).toBeNull();
      expect(result.current.editValues).toEqual({});
    });
  });

  describe('cell editing', () => {
    it('starts editing a specific cell', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS }),
      );

      act(() => {
        result.current.startCellEdit(1, 'name');
      });

      expect(result.current.isEditing).toBe(true);
      expect(result.current.editingCell).toEqual({ rowId: 1, field: 'name' });
      expect(result.current.editValues).toEqual({ name: 'Alice' });
    });
  });

  describe('dialog editing', () => {
    it('opens dialog when mode is Dialog', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS, editMode: 'Dialog' }),
      );

      act(() => {
        result.current.startEdit(1);
      });

      expect(result.current.isDialogOpen).toBe(true);
    });

    it('closes dialog on cancel', () => {
      const { result } = renderHook(() =>
        useTableEditing({ data: MOCK_DATA, columns: COLUMNS, editMode: 'Dialog' }),
      );

      act(() => {
        result.current.startEdit(1);
      });
      act(() => {
        result.current.cancelEdit();
      });

      expect(result.current.isDialogOpen).toBe(false);
    });
  });

  describe('row deletion', () => {
    it('calls onDelete callback in normal mode', () => {
      const onDelete = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          allowDeleting: true,
          onDelete,
        }),
      );

      act(() => {
        result.current.deleteRow(1);
      });

      expect(onDelete).toHaveBeenCalledWith(MOCK_DATA[0]);
    });

    it('does not delete when allowDeleting is false', () => {
      const onDelete = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          allowDeleting: false,
          onDelete,
        }),
      );

      act(() => {
        result.current.deleteRow(1);
      });

      expect(onDelete).not.toHaveBeenCalled();
    });

    it('tracks deleted rows in batch mode', () => {
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
          allowDeleting: true,
        }),
      );

      act(() => {
        result.current.deleteRow(1);
      });

      expect(result.current.isRowDeleted(1)).toBe(true);
      expect(result.current.isRowDeleted(2)).toBe(false);
    });
  });

  describe('adding rows', () => {
    it('calls onAdd callback in normal mode', () => {
      const onAdd = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          allowAdding: true,
          onAdd,
        }),
      );

      act(() => {
        result.current.addNewRow();
      });

      expect(onAdd).toHaveBeenCalledWith({ id: '', name: '', salary: '' });
    });

    it('does not add when allowAdding is false', () => {
      const onAdd = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          allowAdding: false,
          onAdd,
        }),
      );

      act(() => {
        result.current.addNewRow();
      });

      expect(onAdd).not.toHaveBeenCalled();
    });

    it('accumulates added rows in batch mode', () => {
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
          allowAdding: true,
        }),
      );

      act(() => {
        result.current.addNewRow();
        result.current.addNewRow();
      });

      expect(result.current.batchAdded.length).toBe(2);
    });
  });

  describe('batch editing', () => {
    it('tracks dirty cells in batch mode', () => {
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
        }),
      );

      act(() => {
        result.current.startCellEdit(1, 'name');
      });
      act(() => {
        result.current.updateEditValue('name', 'Alice Updated');
      });

      expect(result.current.isCellDirty(1, 'name')).toBe(true);
      expect(result.current.dirtyRows.has(1)).toBe(true);
    });

    it('calls onBatchSave with all changes', () => {
      const onBatchSave = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
          allowAdding: true,
          allowDeleting: true,
          onBatchSave,
        }),
      );

      // Edit a cell
      act(() => {
        result.current.startCellEdit(1, 'name');
      });
      act(() => {
        result.current.updateEditValue('name', 'Alice Updated');
      });
      act(() => {
        result.current.saveEdit(); // commits cell edit in batch mode
      });

      // Delete a row
      act(() => {
        result.current.deleteRow(2);
      });

      // Add a row
      act(() => {
        result.current.addNewRow();
      });

      // Save batch
      act(() => {
        result.current.saveBatch();
      });

      expect(onBatchSave).toHaveBeenCalledTimes(1);
      const changes = onBatchSave.mock.calls[0]![0]!;
      expect(changes.edited.length).toBe(1);
      expect(changes.deleted.length).toBe(1);
      expect(changes.added.length).toBe(1);
    });

    it('resets all batch state on cancelBatch', () => {
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
          allowAdding: true,
          allowDeleting: true,
        }),
      );

      act(() => {
        result.current.startCellEdit(1, 'name');
      });
      act(() => {
        result.current.updateEditValue('name', 'Changed');
      });
      act(() => {
        result.current.deleteRow(2);
        result.current.addNewRow();
      });
      act(() => {
        result.current.cancelBatch();
      });

      expect(result.current.dirtyRows.size).toBe(0);
      expect(result.current.dirtyCells.size).toBe(0);
      expect(result.current.batchAdded.length).toBe(0);
      expect(result.current.batchDeleted.size).toBe(0);
    });
  });

  describe('getCellValue', () => {
    it('returns dirty value when cell has been edited', () => {
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
        }),
      );

      act(() => {
        result.current.startCellEdit(1, 'name');
      });
      act(() => {
        result.current.updateEditValue('name', 'Alice Modified');
      });

      expect(result.current.getCellValue(1, 'name')).toBe('Alice Modified');
    });

    it('returns original value when cell is not dirty', () => {
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          editMode: 'Batch',
        }),
      );

      expect(result.current.getCellValue(1, 'name')).toBe('Alice');
    });
  });

  describe('does not save when no row found', () => {
    it('saveEdit does nothing when editingRowId has no matching row', () => {
      const onSave = vi.fn();
      const { result } = renderHook(() =>
        useTableEditing({
          data: MOCK_DATA,
          columns: COLUMNS,
          onSave,
        }),
      );

      // Force an invalid editing state
      act(() => {
        result.current.startEdit(999);
      });

      expect(result.current.isEditing).toBe(false);
      expect(onSave).not.toHaveBeenCalled();
    });
  });
});
