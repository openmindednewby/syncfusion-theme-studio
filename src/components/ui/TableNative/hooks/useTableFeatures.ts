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
  selectionConfig?: SelectionConfig | undefined;
  onRowSelected?: ((row: Record<string, unknown>) => void) | undefined;
  onRowDeselected?: ((row: Record<string, unknown>) => void) | undefined;
  onSelectionChange?: ((rows: Array<Record<string, unknown>>) => void) | undefined;
  groupConfig?: GroupingConfig | undefined;
  onGroupChange?: ((columns: string[]) => void) | undefined;
  aggregates?: AggregateRowDef[] | undefined;
  editConfig?: EditingConfig | undefined;
  onSave?: ((edited: Record<string, unknown>, original: Record<string, unknown>) => void) | undefined;
  onDelete?: ((row: Record<string, unknown>) => void) | undefined;
  onAdd?: ((row: Record<string, unknown>) => void) | undefined;
  onBatchSave?: ((changes: { added: Array<Record<string, unknown>>; edited: Array<Record<string, unknown>>; deleted: Array<Record<string, unknown>> }) => void) | undefined;
}

interface UseTableFeaturesResult {
  flags: FeatureFlags;
  selection: ReturnType<typeof useTableSelection>;
  grouping: ReturnType<typeof useTableGrouping>;
  aggregateResult: ReturnType<typeof useTableAggregates>;
  editing: ReturnType<typeof useTableEditing>;
}

/** Wire up all table feature hooks from config */
export function useTableFeatures(props: UseTableFeaturesProps): UseTableFeaturesResult {
  const flags = computeFeatureFlags(props.selectionConfig, props.editConfig, props.groupConfig);
  const selection = useTableSelection({
    data: props.processedData,
    selectionType: props.selectionConfig?.type,
    selectionMode: props.selectionConfig?.mode,
    checkboxEnabled: flags.showCheckbox,
    onRowSelected: props.onRowSelected,
    onRowDeselected: props.onRowDeselected,
    onSelectionChange: props.onSelectionChange,
  });
  const grouping = useTableGrouping({
    data: props.processedData,
    groupColumns: props.groupConfig?.columns,
    onGroupChange: props.onGroupChange,
  });
  const aggregateResult = useTableAggregates({
    data: props.processedData, aggregates: props.aggregates,
  });
  const editing = useTableEditing({
    data: props.processedData, columns: props.columns,
    editMode: props.editConfig?.mode, allowAdding: props.editConfig?.allowAdding,
    allowEditing: flags.allowEditing, allowDeleting: flags.allowDeleting,
    onSave: props.onSave, onDelete: props.onDelete,
    onAdd: props.onAdd, onBatchSave: props.onBatchSave,
  });
  return { flags, selection, grouping, aggregateResult, editing };
}

export type { FeatureFlags };
