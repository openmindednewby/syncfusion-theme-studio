/**
 * Read-only query helpers for the editing system:
 * getCellValue, isCellDirty, isRowDeleted.
 */
import { useCallback, useMemo } from 'react';

import { buildCellKey, findRowByKey } from './editingUtils';

interface EditingQueryDeps {
  data: Array<Record<string, unknown>>;
  rowKeyField: string;
  dirtyCells: Map<string, unknown>;
  batchDeleted: Set<unknown>;
}

interface EditingQueries {
  getCellValue: (rowId: unknown, field: string) => unknown;
  isCellDirty: (rowId: unknown, field: string) => boolean;
  isRowDeleted: (rowId: unknown) => boolean;
}

export function useEditingQueries({
  data, rowKeyField, dirtyCells, batchDeleted,
}: EditingQueryDeps): EditingQueries {
  const getCellValue = useMemo(() => {
    return (rowId: unknown, field: string): unknown => {
      const cellKey = buildCellKey(rowId, field);
      if (dirtyCells.has(cellKey)) return dirtyCells.get(cellKey);
      return findRowByKey(data, rowKeyField, rowId)?.[field];
    };
  }, [dirtyCells, data, rowKeyField]);

  const isCellDirty = useCallback(
    (rowId: unknown, field: string): boolean => dirtyCells.has(buildCellKey(rowId, field)),
    [dirtyCells],
  );

  const isRowDeleted = useCallback(
    (rowId: unknown): boolean => batchDeleted.has(rowId),
    [batchDeleted],
  );

  return { getCellValue, isCellDirty, isRowDeleted };
}
