/**
 * Group column management: add, remove, reorder grouped columns.
 */
import { useState, useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import type { GroupedData } from './groupingUtils';

export interface UseTableGroupingResult {
  groupedData: GroupedData[] | null;
  groupColumns: string[];
  collapsedGroups: Set<string>;
  addGroup: (field: string) => void;
  removeGroup: (field: string) => void;
  reorderGroups: (columns: string[]) => void;
  toggleCollapse: (groupKey: string) => void;
  collapseAll: () => void;
  expandAll: () => void;
  isGrouped: boolean;
}

interface GroupColumnActions {
  groupColumns: string[];
  addGroup: (field: string) => void;
  removeGroup: (field: string) => void;
  reorderGroups: (columns: string[]) => void;
}

export function useGroupColumnActions(
  initialGroupColumns: string[],
  onGroupChange?: ((columns: string[]) => void) | undefined,
): GroupColumnActions {
  const [groupColumns, setGroupColumns] = useState<string[]>(initialGroupColumns);

  const updateGroupColumns = useCallback(
    (nextColumns: string[]) => {
      setGroupColumns(nextColumns);
      if (isValueDefined(onGroupChange)) onGroupChange(nextColumns);
    },
    [onGroupChange],
  );

  const addGroup = useCallback(
    (field: string) => {
      if (groupColumns.includes(field)) return;
      updateGroupColumns([...groupColumns, field]);
    },
    [groupColumns, updateGroupColumns],
  );

  const removeGroup = useCallback(
    (field: string) => updateGroupColumns(groupColumns.filter((c) => c !== field)),
    [groupColumns, updateGroupColumns],
  );

  const reorderGroups = useCallback(
    (columns: string[]) => updateGroupColumns(columns),
    [updateGroupColumns],
  );

  return { groupColumns, addGroup, removeGroup, reorderGroups };
}
