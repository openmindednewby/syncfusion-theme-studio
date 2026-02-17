/**
 * Composite hook that wires up all TableNative feature hooks
 * (selection, grouping, aggregates, editing) from config objects.
 *
 * Reduces complexity in the TableContent component by centralizing
 * feature flag computation and hook orchestration.
 */
import { isValueDefined } from '@/utils/is';

import { useTableAggregates } from './useTableAggregates';
import { useTableEditing } from './useTableEditing';
import { useTableGrouping } from './useTableGrouping';
import { useTableSelection } from './useTableSelection';

import type { AggregateRowDef } from './useTableAggregates';
import type { EditingConfig, GroupingConfig, SelectionConfig, TableColumn } from '../types';

interface FeatureFlags {
  selectionEnabled: boolean;
  showCheckbox: boolean;
  groupingEnabled: boolean;
  showDropArea: boolean;
  editingEnabled: boolean;
  showCommandColumn: boolean;
  allowEditing: boolean;
  allowDeleting: boolean;
}

/** Compute feature flags from config objects */
function computeFeatureFlags(
  selectionConfig?: SelectionConfig, editConfig?: EditingConfig, groupConfig?: GroupingConfig,
): FeatureFlags {
  const editingEnabled = isValueDefined(editConfig);
  return {
    selectionEnabled: isValueDefined(selectionConfig),
    showCheckbox: selectionConfig?.checkbox ?? false,
    groupingEnabled: isValueDefined(groupConfig),
    showDropArea: groupConfig?.showDropArea ?? false,
    editingEnabled,
    showCommandColumn: editingEnabled,
    allowEditing: editConfig?.allowEditing ?? true,
    allowDeleting: editConfig?.allowDeleting ?? false,
  };
}

interface UseTableFeaturesProps {
  processedData: Array<Record<string, unknown>>;
  columns: TableColumn[];
  selectionConfig?: SelectionConfig;
  onRowSelected?: (row: Record<string, unknown>) => void;
  onRowDeselected?: (row: Record<string, unknown>) => void;
  onSelectionChange?: (rows: Array<Record<string, unknown>>) => void;
  groupConfig?: GroupingConfig;
  onGroupChange?: (columns: string[]) => void;
  aggregates?: AggregateRowDef[];
  editConfig?: EditingConfig;
  onSave?: (edited: Record<string, unknown>, original: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  onAdd?: (row: Record<string, unknown>) => void;
  onBatchSave?: (changes: { added: Array<Record<string, unknown>>; edited: Array<Record<string, unknown>>; deleted: Array<Record<string, unknown>> }) => void;
}

interface UseTableFeaturesResult {
  flags: FeatureFlags;
  selection: ReturnType<typeof useTableSelection>;
  grouping: ReturnType<typeof useTableGrouping>;
  aggregateResult: ReturnType<typeof useTableAggregates>;
  editing: ReturnType<typeof useTableEditing>;
}

/** Build optional selection props, omitting undefined keys */
function buildSelectionProps(props: UseTableFeaturesProps, showCheckbox: boolean): Parameters<typeof useTableSelection>[0] {
  const selCfg = props.selectionConfig;
  return {
    data: props.processedData,
    checkboxEnabled: showCheckbox,
    ...(isValueDefined(selCfg?.type) ? { selectionType: selCfg.type } : {}),
    ...(isValueDefined(selCfg?.mode) ? { selectionMode: selCfg.mode } : {}),
    ...(isValueDefined(props.onRowSelected) ? { onRowSelected: props.onRowSelected } : {}),
    ...(isValueDefined(props.onRowDeselected) ? { onRowDeselected: props.onRowDeselected } : {}),
    ...(isValueDefined(props.onSelectionChange) ? { onSelectionChange: props.onSelectionChange } : {}),
  };
}

/** Build optional editing props, omitting undefined keys */
function buildEditingProps(props: UseTableFeaturesProps, flags: FeatureFlags): Parameters<typeof useTableEditing>[0] {
  const editCfg = props.editConfig;
  return {
    data: props.processedData, columns: props.columns,
    allowEditing: flags.allowEditing, allowDeleting: flags.allowDeleting,
    ...(isValueDefined(editCfg?.mode) ? { editMode: editCfg.mode } : {}),
    ...(isValueDefined(editCfg?.allowAdding) ? { allowAdding: editCfg.allowAdding } : {}),
    ...(isValueDefined(props.onSave) ? { onSave: props.onSave } : {}),
    ...(isValueDefined(props.onDelete) ? { onDelete: props.onDelete } : {}),
    ...(isValueDefined(props.onAdd) ? { onAdd: props.onAdd } : {}),
    ...(isValueDefined(props.onBatchSave) ? { onBatchSave: props.onBatchSave } : {}),
  };
}

/** Wire up all table feature hooks from config */
export function useTableFeatures(props: UseTableFeaturesProps): UseTableFeaturesResult {
  const flags = computeFeatureFlags(props.selectionConfig, props.editConfig, props.groupConfig);
  const selection = useTableSelection(buildSelectionProps(props, flags.showCheckbox));
  const grouping = useTableGrouping({
    data: props.processedData,
    ...(isValueDefined(props.groupConfig?.columns) ? { groupColumns: props.groupConfig.columns } : {}),
    ...(isValueDefined(props.onGroupChange) ? { onGroupChange: props.onGroupChange } : {}),
  });
  const aggregateResult = useTableAggregates({
    data: props.processedData,
    ...(isValueDefined(props.aggregates) ? { aggregates: props.aggregates } : {}),
  });
  const editing = useTableEditing(buildEditingProps(props, flags));
  return { flags, selection, grouping, aggregateResult, editing };
}

export type { FeatureFlags, UseTableFeaturesProps };
