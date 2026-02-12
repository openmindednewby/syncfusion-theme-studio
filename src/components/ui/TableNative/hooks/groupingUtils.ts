/**
 * Shared utility functions and types for the table grouping system.
 */
import { isValueDefined } from '@/utils/is';

const GROUP_KEY_SEPARATOR = '|';

interface GroupedData {
  key: string;
  field: string;
  value: unknown;
  count: number;
  items: Array<Record<string, unknown>> | GroupedData[];
  isCollapsed: boolean;
  level: number;
}

interface GroupingConfig {
  columns: string[];
  collapsedGroups: Set<string>;
  level: number;
  parentKey: string;
}

/** Build a unique group key from parent key and current value */
function buildGroupKey(parentKey: string, field: string, value: unknown): string {
  const valueStr = String(value ?? 'null');
  if (parentKey === '') return `${field}:${valueStr}`;
  return `${parentKey}${GROUP_KEY_SEPARATOR}${field}:${valueStr}`;
}

/** Partition rows into groups by a column field value */
function partitionByField(
  data: Array<Record<string, unknown>>,
  field: string,
): Map<string, Array<Record<string, unknown>>> {
  const groups = new Map<string, Array<Record<string, unknown>>>();
  for (const row of data) {
    const value = String(row[field] ?? 'null');
    const existing = groups.get(value);
    if (isValueDefined(existing)) existing.push(row);
    else groups.set(value, [row]);
  }
  return groups;
}

/** Build a single GroupedData entry */
function buildGroupEntry(
  valueStr: string,
  rows: Array<Record<string, unknown>>,
  field: string,
  config: GroupingConfig,
): GroupedData {
  const { collapsedGroups, level, parentKey } = config;
  const groupKey = buildGroupKey(parentKey, field, valueStr);
  const remainingColumns = config.columns.slice(1);
  const hasNestedGroups = remainingColumns.length > 0;
  const nestedConfig: GroupingConfig = {
    columns: remainingColumns, collapsedGroups,
    level: level + 1, parentKey: groupKey,
  };
  const items = hasNestedGroups
    ? groupDataByColumns(rows, nestedConfig)
    : rows;

  return {
    key: groupKey, field, value: valueStr,
    count: rows.length, items,
    isCollapsed: collapsedGroups.has(groupKey), level,
  };
}

/** Recursively group data by the provided column fields */
function groupDataByColumns(
  data: Array<Record<string, unknown>>,
  config: GroupingConfig,
): GroupedData[] {
  if (config.columns.length === 0) return [];
  const currentField = config.columns[0];
  if (!isValueDefined(currentField)) return [];

  const groups = partitionByField(data, currentField);
  const result: GroupedData[] = [];
  for (const [valueStr, rows] of groups)
    result.push(buildGroupEntry(valueStr, rows, currentField, config));

  return result;
}

/** Type guard to check if an item is a GroupedData node */
function isGroupedDataItem(item: unknown): item is GroupedData {
  return isValueDefined(item) && typeof item === 'object'
    && isValueDefined(item) && 'key' in item && 'field' in item;
}

/** Check if an items array contains nested GroupedData nodes */
function isNestedGroupArray(
  items: Array<Record<string, unknown>> | GroupedData[],
): items is GroupedData[] {
  if (items.length === 0) return false;
  const firstItem = items[0];
  return isGroupedDataItem(firstItem);
}

/** Collect all group keys from a grouped data tree */
function collectGroupKeys(groups: GroupedData[]): string[] {
  const keys: string[] = [];
  for (const group of groups) {
    keys.push(group.key);
    if (isNestedGroupArray(group.items))
      keys.push(...collectGroupKeys(group.items));
  }
  return keys;
}

export { groupDataByColumns, collectGroupKeys };
export type { GroupedData, GroupingConfig };
