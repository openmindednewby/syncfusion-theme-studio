/** Pure helper functions for Syncfusion playground state derivation. */
import type { SelectionSettingsModel } from '@syncfusion/ej2-react-grids';

import { GridDensity } from '@/components/ui/shared/GridDensity';
import { GRID_DENSITY_ROW_HEIGHT } from '@/components/ui/shared/gridDensityMap';
import { AggregateType } from '@/lib/grid/types';
import type { AggregateRowConfig } from '@/lib/grid/types';
import { isNullOrUndefined, isValueDefined } from '@/utils/is';

import type { StateEntry } from '../../../shared/InteractiveControls';

/** Normalize Syncfusion row event data (single row or batch array). */
export function toEmployeeRows<T>(row: T): T[] {
  return Array.isArray(row) ? row : [row];
}

export function getSelectedNames<T extends { id: number; name: string }>(data: T[], ids: Set<number>): string {
  const ZERO = 0;
  return ids.size === ZERO ? '' : data.filter((e) => ids.has(e.id)).map((e) => e.name).join(', ');
}

/** Extract requestType string from Syncfusion grid action args. */
export function getActionType(args: unknown): string | undefined {
  const isObject = isValueDefined(args) && typeof args === 'object';
  if (!isObject) return undefined;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- guarded by isValueDefined+typeof above
  const obj = args as Record<string, unknown>;
  if (!('requestType' in obj)) return undefined;
  const val = obj['requestType'];
  return typeof val === 'string' ? val : undefined;
}

/** Extract a nested Record field from Syncfusion grid action args. */
export function getActionRecord(args: unknown, key: string): Record<string, unknown> | undefined {
  const isObject = isValueDefined(args) && typeof args === 'object';
  if (!isObject) return undefined;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- guarded by isValueDefined+typeof above
  const obj = args as Record<string, unknown>;
  if (!(key in obj)) return undefined;
  const val = obj[key];
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrowed below
  return isValueDefined(val) && typeof val === 'object' ? val as Record<string, unknown> : undefined;
}

export const DENSITY_MAP: Record<string, GridDensity> = {
  low: GridDensity.Low, medium: GridDensity.Medium, high: GridDensity.High,
};

/** Reverse map: row-height px → density string (e.g. 40 → 'medium'). */
export const ROW_HEIGHT_TO_DENSITY: Record<number, string> = Object.fromEntries(
  Object.entries(GRID_DENSITY_ROW_HEIGHT).map(([d, h]) => [h, d]),
);

export { GRID_DENSITY_ROW_HEIGHT };

const SF_SEL_TYPE_MAP: Record<string, 'Single' | 'Multiple'> = { Single: 'Single', Multiple: 'Multiple' };
const SF_SEL_MODE_MAP: Record<string, 'Cell' | 'Row' | 'Both'> = { Row: 'Row', Cell: 'Cell', Both: 'Both' };

const AGGREGATE_TYPE_MAP: Record<string, AggregateType> = {
  Sum: AggregateType.Sum, Average: AggregateType.Average, Count: AggregateType.Count,
  Min: AggregateType.Min, Max: AggregateType.Max,
};

/** Build Syncfusion aggregate config from playground controls. */
export function buildPlaygroundAggregates(enabled: boolean, aggregateType: string): AggregateRowConfig[] | undefined {
  if (!enabled) return undefined;
  const type = AGGREGATE_TYPE_MAP[aggregateType];
  if (isNullOrUndefined(type)) return undefined;
  return [{
    columns: [
      { field: 'id', type: AggregateType.Count, footerTemplate: 'Count: ${Count}' },
      { field: 'salary', type, format: 'C0', footerTemplate: `${aggregateType}: \${${aggregateType}}` },
    ],
  }];
}

interface SelectionParams { type: string; mode: string; checkboxOnly: boolean }
interface StateParams { density: string; sorting: boolean; filtering: boolean; paginationMode: string; selectionType: string; grouping: boolean; virtualization: boolean; frozenColumns: string; dataLength: number; selectedCount: number; selectedNames: string; actionsColumn: boolean; customColumn: boolean; customComponentType: string; selectionToolbar: boolean; aggregatesEnabled: boolean; aggregateType: string }

export function buildSelectionSettings(p: SelectionParams): SelectionSettingsModel | undefined {
  const mappedType = SF_SEL_TYPE_MAP[p.type];
  if (isNullOrUndefined(mappedType)) return undefined;
  const settings: SelectionSettingsModel = { type: mappedType, mode: SF_SEL_MODE_MAP[p.mode] ?? 'Row' };
  if (p.checkboxOnly) settings.checkboxOnly = true;
  return settings;
}

export function buildStateEntries(p: StateParams): StateEntry[] {
  const PG = 'components.gridShowcase.playground';
  return [
    { labelKey: `${PG}.density`, value: p.density },
    { labelKey: `${PG}.sorting`, value: p.sorting ? 'ON' : 'OFF' },
    { labelKey: `${PG}.filtering`, value: p.filtering ? 'ON' : 'OFF' },
    { labelKey: `${PG}.paginationMode`, value: p.paginationMode },
    { labelKey: `${PG}.selectionType`, value: p.selectionType },
    { labelKey: `${PG}.grouping`, value: p.grouping ? 'ON' : 'OFF' },
    { labelKey: `${PG}.virtualization`, value: p.virtualization ? `ON (${String(p.dataLength)} rows)` : 'OFF' },
    { labelKey: `${PG}.frozenColumns`, value: p.frozenColumns },
    { labelKey: `${PG}.selectedRows`, value: p.selectedCount > 0 ? `${String(p.selectedCount)} (${p.selectedNames})` : '0' },
    { labelKey: `${PG}.selectionToolbar`, value: p.selectionToolbar ? 'ON' : 'OFF' },
    { labelKey: `${PG}.actionsColumn`, value: p.actionsColumn ? 'ON' : 'OFF' },
    { labelKey: `${PG}.customColumn`, value: p.customColumn ? p.customComponentType : 'OFF' },
    { labelKey: `${PG}.aggregatesEnabled`, value: p.aggregatesEnabled ? `ON (${p.aggregateType})` : 'OFF' },
  ];
}
