/**
 * Collapse/expand actions and grouped data computation.
 *
 * Manages which group keys are collapsed and computes
 * the grouped data structure from raw data and group columns.
 */
import { useState, useCallback, useMemo } from 'react';

import { isValueDefined } from '@/utils/is';

import { groupDataByColumns, collectGroupKeys } from './groupingUtils';

import type { GroupedData } from './groupingUtils';

interface CollapseResult {
  groupedData: GroupedData[] | null;
  collapsedGroups: Set<string>;
  toggleCollapse: (groupKey: string) => void;
  collapseAll: () => void;
  expandAll: () => void;
}

export function useCollapseActions(
  data: Array<Record<string, unknown>>,
  groupColumns: string[],
): CollapseResult {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const isGrouped = groupColumns.length > 0;

  const groupedData = useMemo<GroupedData[] | null>(() => {
    if (!isGrouped) return null;
    return groupDataByColumns(data, {
      columns: groupColumns, collapsedGroups,
      level: 0, parentKey: '',
    });
  }, [data, groupColumns, collapsedGroups, isGrouped]);

  const toggleCollapse = useCallback((groupKey: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) next.delete(groupKey);
      else next.add(groupKey);
      return next;
    });
  }, []);

  const collapseAll = useCallback(() => {
    if (!isValueDefined(groupedData)) return;
    setCollapsedGroups(new Set(collectGroupKeys(groupedData)));
  }, [groupedData]);

  const expandAll = useCallback(() => setCollapsedGroups(new Set()), []);

  return { groupedData, collapsedGroups, toggleCollapse, collapseAll, expandAll };
}
