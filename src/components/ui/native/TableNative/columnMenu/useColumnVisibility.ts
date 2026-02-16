import { useState, useCallback, useMemo } from 'react';

import type { TableColumn } from '../types';

interface ColumnVisibilityState {
  visibleColumns: TableColumn[];
  hiddenFields: Set<string>;
  toggleColumn: (field: string) => void;
}

/** Tracks hidden columns and provides a filtered visible columns array. */
export function useColumnVisibility(columns: TableColumn[]): ColumnVisibilityState {
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());

  const visibleColumns = useMemo(
    () => columns.filter((col) => !hiddenFields.has(col.field)),
    [columns, hiddenFields],
  );

  const toggleColumn = useCallback((field: string): void => {
    setHiddenFields((prev) => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
  }, []);

  return { visibleColumns, hiddenFields, toggleColumn };
}
