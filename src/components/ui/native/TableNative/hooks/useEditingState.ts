/**
 * Editing state management: all state variables for the editing system.
 */
import { useState } from 'react';

import { isValueDefined } from '@/utils/is';

import { useEditingQueries } from './useEditingQueries';

import type { EditingCell } from './editingUtils';

interface EditingStateConfig {
  data: Array<Record<string, unknown>>;
  rowKeyField: string;
}

interface EditingStateResult {
  editingRowId: unknown;
  editingCell: EditingCell | null;
  editValues: Record<string, unknown>;
  isDialogOpen: boolean;
  dirtyCells: Map<string, unknown>;
  dirtyRows: Set<unknown>;
  batchAdded: Array<Record<string, unknown>>;
  batchDeleted: Set<unknown>;
  isEditing: boolean;
  setEditingRowId: (v: unknown) => void;
  setEditingCell: (v: EditingCell | null) => void;
  setEditValues: (v: Record<string, unknown>) => void;
  setIsDialogOpen: (v: boolean) => void;
  setDirtyCells: (fn: (prev: Map<string, unknown>) => Map<string, unknown>) => void;
  setDirtyRows: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
  setBatchAdded: (fn: (prev: Array<Record<string, unknown>>) => Array<Record<string, unknown>>) => void;
  setBatchDeleted: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
  getCellValue: (rowId: unknown, field: string) => unknown;
  isCellDirty: (rowId: unknown, field: string) => boolean;
  isRowDeleted: (rowId: unknown) => boolean;
}

export function useEditingState({
  data, rowKeyField,
}: EditingStateConfig): EditingStateResult {
  const [editingRowId, setEditingRowId] = useState<unknown>(null);
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValues, setEditValues] = useState<Record<string, unknown>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dirtyCells, setDirtyCells] = useState<Map<string, unknown>>(new Map());
  const [dirtyRows, setDirtyRows] = useState<Set<unknown>>(new Set());
  const [batchAdded, setBatchAdded] = useState<Array<Record<string, unknown>>>([]);
  const [batchDeleted, setBatchDeleted] = useState<Set<unknown>>(new Set());
  const isEditing = isValueDefined(editingRowId) || isValueDefined(editingCell);

  const queries = useEditingQueries({ data, rowKeyField, dirtyCells, batchDeleted });

  return {
    editingRowId, editingCell, editValues, isDialogOpen,
    dirtyCells, dirtyRows, batchAdded, batchDeleted, isEditing,
    setEditingRowId, setEditingCell, setEditValues, setIsDialogOpen,
    setDirtyCells, setDirtyRows, setBatchAdded, setBatchDeleted,
    ...queries,
  };
}
