/** Pure helper functions for Native playground state derivation. */
import type { AggregateRowDef, EditingConfig, SelectionConfig } from '@/components/ui/native';
import { AggregateType } from '@/components/ui/native';
import { GridDensity } from '@/components/ui/shared/GridDensity';
import type { GridConfig } from '@/lib/grid/types';
import { FilterType } from '@/lib/grid/types';
import { isNullOrUndefined } from '@/utils/is';

import type { StateEntry } from '../../../shared/InteractiveControls';

export const DENSITY_MAP: Record<string, GridDensity> = {
  low: GridDensity.Low, medium: GridDensity.Medium, high: GridDensity.High,
};

const formatCurrency = (v: number): string => `$${v.toLocaleString()}`;

const FILTER_TYPE_MAP: Record<string, FilterType> = {
  Menu: FilterType.Menu, FilterBar: FilterType.FilterBar, Excel: FilterType.Excel,
};
const SELECTION_CONFIG_MAP: Record<string, SelectionConfig['type']> = { Single: 'Single', Multiple: 'Multiple' };
const SELECTION_MODE_MAP: Record<string, SelectionConfig['mode']> = { Row: 'Row', Cell: 'Cell', Both: 'Both' };
const EDIT_MODE_MAP: Record<string, EditingConfig['mode']> = { Normal: 'Normal', Dialog: 'Dialog', Batch: 'Batch' };

const NATIVE_AGGREGATE_TYPE_MAP: Record<string, AggregateType> = {
  Sum: AggregateType.Sum, Average: AggregateType.Average, Count: AggregateType.Count,
  Min: AggregateType.Min, Max: AggregateType.Max,
};

/** Build native aggregate config from playground controls. */
export function buildNativePlaygroundAggregates(enabled: boolean, aggregateType: string): AggregateRowDef[] | undefined {
  if (!enabled) return undefined;
  const type = NATIVE_AGGREGATE_TYPE_MAP[aggregateType];
  if (isNullOrUndefined(type)) return undefined;
  return [{
    columns: [
      { field: 'id', type: AggregateType.Count },
      { field: 'salary', type, format: formatCurrency },
      { field: 'age', type },
    ],
  }];
}

interface SelectionParams { type: string; mode: string; checkbox: boolean }
interface GridConfigParams { filterEnabled: boolean; filterType: string; paginationMode: string; pageSize: string; columnMenu: boolean }
interface StateParams { density: string; selectionType: string; selectedRows: number; editMode: string; filterEnabled: boolean; paginationMode: string; groupEnabled: boolean; columnMenu: boolean; actionsColumn: boolean; customColumn: boolean; customComponentType: string; selectionToolbar: boolean; aggregatesEnabled: boolean; aggregateType: string }

export function buildSelectionConfig(p: SelectionParams): SelectionConfig | undefined {
  const mappedType = SELECTION_CONFIG_MAP[p.type];
  if (isNullOrUndefined(mappedType)) return undefined;
  const config: SelectionConfig = { type: mappedType, mode: SELECTION_MODE_MAP[p.mode] ?? 'Row' };
  const needsCheckbox = p.checkbox || mappedType === 'Single';
  if (needsCheckbox) config.checkbox = true;
  return config;
}

export function buildEditConfig(editMode: string, showCommandColumn = true): EditingConfig | undefined {
  const mode = EDIT_MODE_MAP[editMode];
  if (isNullOrUndefined(mode)) return undefined;
  return { mode, allowAdding: true, allowEditing: true, allowDeleting: true, ...(!showCommandColumn ? { showCommandColumn: false } : {}) };
}

export function buildGridConfig(p: GridConfigParams): GridConfig {
  const config: GridConfig = {};
  if (p.filterEnabled) config.filter = { enabled: true, type: FILTER_TYPE_MAP[p.filterType] ?? FilterType.Menu };
  if (p.paginationMode === 'BuiltIn') config.pagination = { enabled: true, pageSize: Number(p.pageSize) };
  if (p.columnMenu) config.columnMenu = { enabled: true };
  return config;
}

export function buildNativeStateEntries(p: StateParams): StateEntry[] {
  const PG = 'components.gridShowcase.playground';
  return [
    { labelKey: `${PG}.density`, value: p.density },
    { labelKey: `${PG}.selectionType`, value: p.selectionType },
    { labelKey: `${PG}.selectedRows`, value: String(p.selectedRows) },
    { labelKey: `${PG}.selectionToolbar`, value: p.selectionToolbar ? 'ON' : 'OFF' },
    { labelKey: `${PG}.editMode`, value: p.editMode },
    { labelKey: `${PG}.filterEnabled`, value: p.filterEnabled ? 'ON' : 'OFF' },
    { labelKey: `${PG}.paginationMode`, value: p.paginationMode },
    { labelKey: `${PG}.groupEnabled`, value: p.groupEnabled ? 'ON' : 'OFF' },
    { labelKey: `${PG}.showColumnMenu`, value: p.columnMenu ? 'ON' : 'OFF' },
    { labelKey: `${PG}.actionsColumn`, value: p.actionsColumn ? 'ON' : 'OFF' },
    { labelKey: `${PG}.customColumn`, value: p.customColumn ? p.customComponentType : 'OFF' },
    { labelKey: `${PG}.aggregatesEnabled`, value: p.aggregatesEnabled ? `ON (${p.aggregateType})` : 'OFF' },
  ];
}
