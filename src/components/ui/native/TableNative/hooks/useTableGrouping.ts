/**
 * Grouping hook for TableNative.
 *
 * Groups data by one or more columns, supports nested groups,
 * collapse/expand of individual groups, and item counts.
 */
import { useCollapseActions } from './useCollapseActions';
import { useGroupColumnActions } from './useGroupColumnActions';

import type { GroupedData } from './groupingUtils';
import type { UseTableGroupingResult } from './useGroupColumnActions';

interface UseTableGroupingProps {
  data: Array<Record<string, unknown>>;
  groupColumns?: string[];
  onGroupChange?: (columns: string[]) => void;
}

export function useTableGrouping({
  data,
  groupColumns: initialGroupColumns = [],
  onGroupChange,
}: UseTableGroupingProps): UseTableGroupingResult {
  const colActions = useGroupColumnActions(initialGroupColumns, onGroupChange);
  const collapse = useCollapseActions(data, colActions.groupColumns);

  return {
    ...colActions, ...collapse,
    isGrouped: colActions.groupColumns.length > 0,
  };
}

export type { GroupedData, UseTableGroupingProps, UseTableGroupingResult };
