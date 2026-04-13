/**
 * InteractivePlaygroundSection - Syncfusion DataGrid playground with
 * live controls, state display, and dynamic code snippet.
 */
import { memo, useCallback, useMemo, useRef } from 'react';

import type { GridComponent } from '@syncfusion/ej2-react-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { GridSelectionToolbar } from '@/components/ui/native';
import { DataGrid } from '@/components/ui/syncfusion';
import { NativePagination } from '@/features/components/shared/NativePagination';
import { PaginationVariant } from '@/features/components/shared/NativePagination/types';
import { buildSyncfusionCustomTemplate, getSyncfusionCustomColumnMeta } from '@/features/components/shared/playgroundCustomTemplates';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { PlaygroundActionsCell } from '../components/PlaygroundActionsCell';
import { PlaygroundDialogs } from '../components/PlaygroundDialogs';
import { SyncfusionPlaygroundControls } from '../components/SyncfusionPlaygroundControls';
import { EMPLOYEES } from '../data/data';
import { usePlaygroundActions } from '../hooks/usePlaygroundActions';
import { useSyncfusionPlaygroundState } from '../hooks/useSyncfusionPlaygroundState';
import { buildSyncfusionCodeSnippet } from '../utils/syncfusionPlaygroundConfig';
import { getActionRecord, getActionType } from '../utils/syncfusionPlaygroundHelpers';

const PG = 'components.gridShowcase.playground';
const PAGE_SIZE_SMALL = 5; const PAGE_SIZE_MEDIUM = 10; const PAGE_SIZE_LARGE = 20;
const PAGE_SIZES = [PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];
const VARIANT_MAP: Record<string, PaginationVariant> = {
  default: PaginationVariant.Default, noPageSize: PaginationVariant.NoPageSize, compact: PaginationVariant.Compact,
};
const INITIAL_DATA: Array<Record<string, unknown>> = EMPLOYEES.map((e) => ({ ...e }));

export const InteractivePlaygroundSection = memo((): JSX.Element => {
  const state = useSyncfusionPlaygroundState();
  const actions = usePlaygroundActions(INITIAL_DATA);
  const isNativePagination = state.paginationMode === 'NativePagination';
  const gridRef = useRef<GridComponent | undefined>(undefined);
  const showSelectionToolbar = state.selectionToolbar && state.selectionType !== 'None';
  const { handleClearAllSelected } = state;

  const handleClearAll = useCallback(() => {
    gridRef.current?.clearSelection();
    handleClearAllSelected();
  }, [handleClearAllSelected]);

  const themeOverrides = useMemo(() => ({
    rowHeight: `${state.rowHeight}px`,
    ...(state.aggregatesEnabled ? {
      footerBorderWidth: state.footerBorderWidth,
      footerFontSize: state.footerFontSize,
      footerFontWeight: state.footerFontWeight,
      footerPadding: state.footerPadding,
    } : {}),
  }), [state.rowHeight, state.aggregatesEnabled, state.footerBorderWidth, state.footerFontSize, state.footerFontWeight, state.footerPadding]);
  const pageSettings = useMemo(() => ({ pageSize: Number(state.pageSize) }), [state.pageSize]);
  const radioClassName = state.selectionType === 'Single' ? 'sf-radio-selection' : '';

  const isInlineEdit = state.playgroundEditMode === 'inline';

  const editSettings = useMemo(() => {
    const hasNoEditActions = !state.actionsColumn || (!state.actionEdit && !state.actionDelete);
    if (hasNoEditActions || !isInlineEdit) return { allowEditing: false, allowDeleting: false, allowAdding: false };
    return { allowEditing: state.actionEdit, allowDeleting: state.actionDelete, mode: 'Normal' as const };
  }, [state.actionsColumn, state.actionEdit, state.actionDelete, isInlineEdit]);

  const { handleArchive, handleDelete: handleDeleteAction, handleEdit: handleEditAction, handleExport, handleView, handleInlineSave, handleInlineDelete } = actions;

  const handleActionComplete = useCallback((args: unknown) => {
    const type = getActionType(args);
    const data = getActionRecord(args, 'data');
    if (type === 'save' && isValueDefined(data)) handleInlineSave(data);
    else if (type === 'delete' && isValueDefined(data)) handleInlineDelete(data);
  }, [handleInlineSave, handleInlineDelete]);

  /** Syncfusion command column commands for inline edit mode. */
  const inlineCommands = useMemo(() => {
    const cmds = [];
    if (state.actionEdit) cmds.push({ type: 'Edit' as const, buttonOption: { cssClass: 'e-flat', content: FM('common.edit') } });
    if (state.actionDelete) cmds.push({ type: 'Delete' as const, buttonOption: { cssClass: 'e-flat', content: FM('common.delete') } });
    cmds.push({ type: 'Save' as const, buttonOption: { cssClass: 'e-flat e-primary', iconCss: 'e-icons e-check' } });
    cmds.push({ type: 'Cancel' as const, buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-close' } });
    return cmds;
  }, [state.actionEdit, state.actionDelete]);

  const customTemplate = useMemo(() => (state.customColumn ? buildSyncfusionCustomTemplate(state.customComponentType) : undefined), [state.customColumn, state.customComponentType]);
  const customMeta = useMemo(() => (state.customColumn ? getSyncfusionCustomColumnMeta(state.customComponentType) : undefined), [state.customColumn, state.customComponentType]);

  const radioTemplate = useCallback(
    () => (
      <span className="sf-radio-indicator inline-block h-[18px] w-[18px] rounded-full border-2 box-border" />
    ),
    [],
  );

  const gridData = useMemo(() => {
    if (!isNativePagination) return actions.rows;
    const pageSizeNum = Number(state.pageSize);
    return actions.rows.slice((state.currentPage - 1) * pageSizeNum, state.currentPage * pageSizeNum);
  }, [actions.rows, isNativePagination, state.pageSize, state.currentPage]);

  const actionsTemplate = useCallback(
    (rowData: Record<string, unknown>) => (
      <PlaygroundActionsCell
        showArchive={state.actionArchive} showDelete={state.actionDelete} showEdit={state.actionEdit}
        showExport={state.actionExport} showKebab={state.actionKebab} showView={state.actionView}
        onArchive={() => handleArchive(rowData)} onDelete={() => handleDeleteAction(rowData)}
        onEdit={() => handleEditAction(rowData)}
        onExport={() => handleExport(rowData)} onView={() => handleView(rowData)}
      />
    ),
    [state.actionEdit, state.actionDelete, state.actionKebab, state.actionView, state.actionExport, state.actionArchive, handleArchive, handleDeleteAction, handleEditAction, handleExport, handleView],
  );

  const columnsWithTemplate = useMemo(() => {
    let cols = state.columns;
    if (state.selectionType === 'Single') cols = cols.map((col) => (col.field === '_radio' ? { ...col, template: radioTemplate } : col));
    if (isValueDefined(customMeta) && isValueDefined(customTemplate)) {
      const fieldExists = cols.some((col) => col.field === customMeta.field);
      if (!fieldExists) {
        const customCol = { field: customMeta.field, headerText: customMeta.headerText, width: customMeta.width, textAlign: 'Center' as const };
        const actionsIdx = cols.findIndex((col) => col.field === 'actions');
        cols = actionsIdx >= 0 ? [...cols.slice(0, actionsIdx), customCol, ...cols.slice(actionsIdx)] : [...cols, customCol];
      }
      cols = cols.map((col) => (col.field === customMeta.field ? { ...col, template: customTemplate } : col));
    }
    if (state.actionsColumn && isInlineEdit) cols = cols.map((col) => (col.field === 'actions' ? { ...col, commands: inlineCommands } : col));
    else if (state.actionsColumn) cols = cols.map((col) => (col.field === 'actions' ? { ...col, template: actionsTemplate } : col));
    return cols;
  }, [state.columns, state.selectionType, state.actionsColumn, actionsTemplate, customMeta, customTemplate, radioTemplate, isInlineEdit, inlineCommands]);

  const codeSnippet = useMemo(() => buildSyncfusionCodeSnippet({
    density: state.density, isLoading: state.isLoading, rowHeight: state.rowHeight,
    paginationMode: state.paginationMode, paginationVariant: state.paginationVariant,
    pageSize: state.pageSize, selectionType: state.selectionType,
    selectionMode: state.selectionMode, checkboxOnly: state.checkboxOnly,
    sorting: state.sorting, filtering: state.filtering, grouping: state.grouping,
    resizing: state.resizing, reordering: state.reordering,
    columnChooser: state.columnChooser, columnMenu: state.columnMenu,
    frozenColumns: state.frozenColumns, virtualization: state.virtualization,
    clipboard: state.clipboard, textWrap: state.textWrap,
    actionsColumn: state.actionsColumn, actionEdit: state.actionEdit, actionDelete: state.actionDelete,
    actionView: state.actionView, actionExport: state.actionExport, actionArchive: state.actionArchive,
    customColumn: state.customColumn, customComponentType: state.customComponentType,
    selectionToolbar: state.selectionToolbar,
    aggregatesEnabled: state.aggregatesEnabled, aggregateType: state.aggregateType,
    footerBorderWidth: state.footerBorderWidth, footerFontSize: state.footerFontSize,
    footerFontWeight: state.footerFontWeight, footerPadding: state.footerPadding,
    playgroundEditMode: state.playgroundEditMode,
  }), [
    state.density, state.isLoading, state.rowHeight, state.paginationMode, state.paginationVariant,
    state.pageSize, state.selectionType, state.selectionMode, state.checkboxOnly,
    state.sorting, state.filtering, state.grouping, state.resizing, state.reordering,
    state.columnChooser, state.columnMenu, state.frozenColumns, state.virtualization,
    state.clipboard, state.textWrap, state.actionsColumn, state.actionEdit, state.actionDelete,
    state.actionView, state.actionExport, state.actionArchive,
    state.customColumn, state.customComponentType, state.selectionToolbar,
    state.aggregatesEnabled, state.aggregateType,
    state.footerBorderWidth, state.footerFontSize, state.footerFontWeight, state.footerPadding,
    state.playgroundEditMode,
  ]);

  return (
    <ShowcaseSection descriptionKey="gridShowcase.interactivePlaygroundDescription" testId="sf-grid-playground" titleKey="gridShowcase.interactivePlaygroundTitle">
      <div className="space-y-4">
        <SyncfusionPlaygroundControls state={state} />
        {showSelectionToolbar ? (
          <GridSelectionToolbar
            showCheckIcon
            selectedCount={state.selectedCount}
            selectedItems={state.selectedItems}
            testId="pg-sf-sel-toolbar"
            onClearAll={handleClearAll}
            onRemoveItem={state.handleRemoveSelectedItem}
          />
        ) : null}
        <DataGrid
          key={state.gridKey}
          {...(state.aggregates ? { aggregates: state.aggregates } : {})}
          allowFiltering={state.filtering} allowGrouping={state.grouping} allowPaging={state.effectivePaging}
          allowReordering={state.reordering} allowResizing={state.resizing} allowSorting={state.sorting}
          allowTextWrap={state.textWrap} className={radioClassName} columns={columnsWithTemplate} data={gridData}
          editSettings={editSettings}
          enableClipboard={state.clipboard} enableVirtualization={state.virtualization}
          {...(isInlineEdit ? { onActionComplete: handleActionComplete } : {})}
          frozenColumns={state.frozenColumnCount} gridRef={gridRef} height={state.height} isLoading={state.isLoading}
          pageSettings={pageSettings} rowHeight={state.effectiveRowHeight}
          {...(state.selectionSettings ? { selectionSettings: state.selectionSettings, onRowSelected: state.handleRowSelected, onRowDeselected: state.handleRowDeselected } : {})}
          showColumnChooser={state.columnChooser} showColumnMenu={state.columnMenu}
          testId="pg-sf-table" themeOverrides={themeOverrides}
        />
        {isNativePagination ? (
          <NativePagination
            currentPage={state.currentPage} pageSize={Number(state.pageSize)} pageSizes={PAGE_SIZES}
            testId="pg-sf-native-pagination" totalItems={actions.rows.length} totalPages={state.totalPages}
            variant={VARIANT_MAP[state.paginationVariant] ?? PaginationVariant.Default}
            onPageChange={state.handlePageChange} onPageSizeChange={state.handlePageSizeChange}
          />
        ) : null}
        <div className="rounded-lg border border-border bg-surface-secondary p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase text-text-secondary">{FM(`${PG}.currentState`)}</h4>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:grid-cols-4" data-testid="pg-sf-state">
            {state.stateEntries.map((entry) => (
              <div key={entry.labelKey} className="flex justify-between gap-2">
                <dt className="text-text-secondary">{FM(entry.labelKey)}</dt>
                <dd className="font-medium text-text-primary">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CopyableCodeSnippet code={codeSnippet} testId="pg-sf-code" />
        <PlaygroundDialogs actions={actions} testPrefix="pg-sf" />
      </div>
    </ShowcaseSection>
  );
});

InteractivePlaygroundSection.displayName = 'InteractivePlaygroundSection';
