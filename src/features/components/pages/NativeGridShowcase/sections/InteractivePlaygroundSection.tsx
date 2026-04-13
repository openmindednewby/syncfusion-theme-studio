/**
 * InteractivePlaygroundSection - Native Grid playground with
 * live controls, state display, and dynamic code snippet.
 */
import { memo, useCallback, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { GridSelectionToolbar, TableNative } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import { NativePagination } from '@/features/components/shared/NativePagination';
import { PaginationVariant } from '@/features/components/shared/NativePagination/types';
import { buildNativeCustomTemplate, getNativeCustomColumnMeta } from '@/features/components/shared/playgroundCustomTemplates';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import { PlaygroundActionsCell } from '../../SyncfusionGridShowcase/components/PlaygroundActionsCell';
import { PlaygroundDialogs } from '../../SyncfusionGridShowcase/components/PlaygroundDialogs';
import { usePlaygroundActions } from '../../SyncfusionGridShowcase/hooks/usePlaygroundActions';
import { InlineAwareActionsCell } from '../components/InlineAwareActionsCell';
import { NativePlaygroundControls } from '../components/NativePlaygroundControls';
import { useNativePlaygroundState } from '../hooks/useNativePlaygroundState';
import { ACTIONS_COLUMN, EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';
import { buildNativeCodeSnippet } from '../utils/nativePlaygroundConfig';

const PG = 'components.gridShowcase.playground';
const PAGE_SIZE_SMALL = 5; const PAGE_SIZE_MEDIUM = 10; const PAGE_SIZE_LARGE = 20;
const PAGE_SIZES = [PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];
const VARIANT_MAP: Record<string, PaginationVariant> = {
  default: PaginationVariant.Default, noPageSize: PaginationVariant.NoPageSize, compact: PaginationVariant.Compact,
};

export const InteractivePlaygroundSection = memo((): JSX.Element => {
  const state = useNativePlaygroundState(EMPLOYEES.length);
  const actions = usePlaygroundActions(EMPLOYEES);
  const isNativePagination = state.paginationMode === 'NativePagination';
  const pageSizeNum = Number(state.pageSize);
  const radioClassName = state.selectionType === 'Single' ? 'native-radio-selection' : '';
  const showSelectionToolbar = state.selectionToolbar && state.selectionType !== 'None';
  const isInlineEdit = state.playgroundEditMode === 'inline';

  const footerOverrides = useMemo(() => (state.aggregatesEnabled ? {
    footerBorderWidth: state.footerBorderWidth, footerFontSize: state.footerFontSize,
    footerFontWeight: state.footerFontWeight, footerPadding: state.footerPadding,
  } : undefined), [state.aggregatesEnabled, state.footerBorderWidth, state.footerFontSize, state.footerFontWeight, state.footerPadding]);

  const tableData = useMemo(
    () => (isNativePagination
      ? actions.rows.slice((state.currentPage - 1) * pageSizeNum, state.currentPage * pageSizeNum)
      : actions.rows),
    [isNativePagination, state.currentPage, pageSizeNum, actions.rows],
  );

  const { handleArchive, handleDelete: handleDeleteAction, handleEdit: handleEditAction, handleExport, handleView } = actions;

  const actionsTemplate = useCallback(
    (row: Record<string, unknown>) => (isInlineEdit ? (
      <InlineAwareActionsCell
        row={row}
        showArchive={state.actionArchive} showDelete={state.actionDelete} showEdit={state.actionEdit}
        showExport={state.actionExport} showKebab={state.actionKebab} showView={state.actionView}
        onArchive={() => handleArchive(row)} onDelete={() => handleDeleteAction(row)}
        onEdit={() => handleEditAction(row)} onExport={() => handleExport(row)} onView={() => handleView(row)}
      />
    ) : (
      <PlaygroundActionsCell
        showArchive={state.actionArchive} showDelete={state.actionDelete} showEdit={state.actionEdit}
        showExport={state.actionExport} showKebab={state.actionKebab} showView={state.actionView}
        onArchive={() => handleArchive(row)} onDelete={() => handleDeleteAction(row)}
        onEdit={() => handleEditAction(row)}
        onExport={() => handleExport(row)} onView={() => handleView(row)}
      />
    )),
    [isInlineEdit, state.actionEdit, state.actionDelete, state.actionKebab, state.actionView, state.actionExport, state.actionArchive, handleArchive, handleDeleteAction, handleEditAction, handleExport, handleView],
  );

  const customTemplate = useMemo(() => (state.customColumn ? buildNativeCustomTemplate(state.customComponentType) : undefined), [state.customColumn, state.customComponentType]);

  const columns = useMemo<TableColumn[]>(() => {
    let cols: TableColumn[] = EMPLOYEE_COLUMNS;
    if (state.customColumn && customTemplate) {
      const meta = getNativeCustomColumnMeta(state.customComponentType);
      cols = cols.map((col) => (col.field === meta.field ? { ...col, template: customTemplate } : col));
    }
    if (state.actionsColumn) cols = [...cols, { ...ACTIONS_COLUMN, template: actionsTemplate }];
    return cols;
  }, [state.actionsColumn, actionsTemplate, state.customColumn, state.customComponentType, customTemplate]);

  const codeSnippet = useMemo(() => buildNativeCodeSnippet({
    density: state.density, striped: state.striped, hoverable: state.hoverable, compact: state.compact,
    selectionType: state.selectionType, selectionMode: state.selectionMode, checkbox: state.checkbox,
    editMode: state.editMode, filterEnabled: state.filterEnabled, filterType: state.filterType,
    paginationMode: state.paginationMode, paginationVariant: state.paginationVariant,
    pageSize: state.pageSize, columnMenu: state.columnMenu, groupEnabled: state.groupEnabled,
    actionsColumn: state.actionsColumn, actionEdit: state.actionEdit, actionDelete: state.actionDelete,
    actionView: state.actionView, actionExport: state.actionExport, actionArchive: state.actionArchive,
    customColumn: state.customColumn, customComponentType: state.customComponentType,
    selectionToolbar: state.selectionToolbar,
    aggregatesEnabled: state.aggregatesEnabled, aggregateType: state.aggregateType,
    footerBorderWidth: state.footerBorderWidth, footerFontSize: state.footerFontSize,
    footerFontWeight: state.footerFontWeight, footerPadding: state.footerPadding,
    playgroundEditMode: state.playgroundEditMode,
  }), [
    state.density, state.striped, state.hoverable, state.compact,
    state.selectionType, state.selectionMode, state.checkbox,
    state.editMode, state.filterEnabled, state.filterType,
    state.paginationMode, state.paginationVariant, state.pageSize,
    state.columnMenu, state.groupEnabled, state.actionsColumn, state.actionEdit, state.actionDelete,
    state.actionView, state.actionExport, state.actionArchive,
    state.customColumn, state.customComponentType, state.selectionToolbar,
    state.aggregatesEnabled, state.aggregateType,
    state.footerBorderWidth, state.footerFontSize, state.footerFontWeight, state.footerPadding,
    state.playgroundEditMode,
  ]);

  return (
    <ShowcaseSection descriptionKey="gridShowcase.interactivePlaygroundDescription" testId="native-grid-playground" titleKey="gridShowcase.interactivePlaygroundTitle">
      <div className="space-y-4">
        <NativePlaygroundControls state={state} />
        {showSelectionToolbar ? (
          <GridSelectionToolbar
            showCheckIcon
            selectedCount={state.selectedItems.length}
            selectedItems={state.selectedItems}
            testId="pg-native-sel-toolbar"
            onClearAll={state.handleClearAllSelected}
            onRemoveItem={state.handleRemoveSelectedItem}
          />
        ) : null}
        <TableNative
          {...(state.aggregates ? { aggregates: state.aggregates } : {})}
          ariaLabel={FM('components.gridShowcase.playground.title')} className={radioClassName}
          columns={columns} compact={state.compact} data={tableData} density={state.density}
          gridConfig={state.gridConfig} hoverable={state.hoverable} showColumnMenu={state.columnMenu}
          striped={state.striped} testId="pg-native-table"
          {...(footerOverrides ? { themeOverrides: footerOverrides } : {})}
          {...(state.editConfig ? { editConfig: state.editConfig } : {})}
          {...(isInlineEdit ? { onSave: (edited: Record<string, unknown>) => actions.handleInlineSave(edited), onDelete: (row: Record<string, unknown>) => actions.handleInlineDelete(row) } : {})}
          {...(state.groupConfig ? { groupConfig: state.groupConfig } : {})}
          {...(state.selectionConfig ? { selectionConfig: state.selectionConfig, onSelectionChange: state.handleSelectionChange } : {})}
        />
        {isNativePagination ? (
          <NativePagination
            currentPage={state.currentPage} pageSize={pageSizeNum} pageSizes={PAGE_SIZES}
            testId="pg-native-native-pagination" totalItems={actions.rows.length} totalPages={state.totalPages}
            variant={VARIANT_MAP[state.paginationVariant] ?? PaginationVariant.Default}
            onPageChange={state.handlePageChange} onPageSizeChange={state.handlePageSizeChange}
          />
        ) : null}
        <div className="rounded-lg border border-border bg-surface-secondary p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase text-text-secondary">{FM(`${PG}.currentState`)}</h4>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs sm:grid-cols-3" data-testid="pg-native-state">
            {state.stateEntries.map((entry) => (
              <div key={entry.labelKey} className="flex min-w-0 justify-between gap-2">
                <dt className="shrink-0 text-text-secondary">{FM(entry.labelKey)}</dt>
                <dd className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-text-primary">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CopyableCodeSnippet code={codeSnippet} testId="pg-native-code" />
        <PlaygroundDialogs actions={actions} testPrefix="pg-native" />
      </div>
    </ShowcaseSection>
  );
});

InteractivePlaygroundSection.displayName = 'InteractivePlaygroundSection';
