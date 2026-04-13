/**
 * Control panel for the Syncfusion Grid Interactive Playground.
 * Renders grouped toggles and selects for all DataGrid features.
 * Each section shows a code-hint button with the full component snippet.
 */
import { memo } from 'react';

import {
  ControlGroup,
  SelectControl,
  ToggleControl,
} from '../../../shared/InteractiveControls';
import { useSyncfusionSnippets } from '../hooks/useSyncfusionSnippets';
import {
  AGGREGATE_TYPE_OPTIONS,
  CUSTOM_COMPONENT_OPTIONS,
  DENSITY_OPTIONS,
  FOOTER_BORDER_WIDTH_OPTIONS,
  FOOTER_FONT_SIZE_OPTIONS,
  FOOTER_FONT_WEIGHT_OPTIONS,
  FOOTER_PADDING_OPTIONS,
  FROZEN_COLUMNS_OPTIONS,
  PAGE_SIZE_OPTIONS,
  PAGINATION_MODE_OPTIONS,
  PAGINATION_VARIANT_OPTIONS,
  PLAYGROUND_EDIT_MODE_OPTIONS,
  PRESET_OPTIONS,
  ROW_HEIGHT_OPTIONS,
  SELECTION_MODE_OPTIONS,
  SELECTION_TYPE_OPTIONS,
} from '../utils/syncfusionPlaygroundOptions';

import type { SyncfusionPlaygroundState } from '../hooks/useSyncfusionPlaygroundState';

const PG = 'components.gridShowcase.playground';

interface Props {
  state: SyncfusionPlaygroundState;
}

const SyncfusionPlaygroundControls = ({ state }: Props): JSX.Element => {
  const snippets = useSyncfusionSnippets(state);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-full">
        <SelectControl className="min-w-[220px]" labelKey={`${PG}.preset`} options={PRESET_OPTIONS} testId="pg-sf-preset" value={state.currentPreset} onChange={state.applyPreset} />
      </div>
      <ControlGroup codeSnippet={snippets.appearance} codeTestId="pg-sf-appearance-code" titleKey={`${PG}.appearance`}>
        <SelectControl labelKey={`${PG}.density`} options={DENSITY_OPTIONS} testId="pg-sf-density" value={state.density} onChange={state.setDensity} />
        <ToggleControl checked={state.isLoading} labelKey={`${PG}.isLoading`} testId="pg-sf-loading" onChange={state.setIsLoading} />
        <SelectControl labelKey={`${PG}.rowHeight`} options={ROW_HEIGHT_OPTIONS} testId="pg-sf-row-height" value={state.rowHeight} onChange={state.setRowHeight} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.pagination} codeTestId="pg-sf-pagination-code" titleKey={`${PG}.pagination`}>
        <SelectControl labelKey={`${PG}.paginationMode`} options={PAGINATION_MODE_OPTIONS} testId="pg-sf-paging-mode" value={state.paginationMode} onChange={state.setPaginationMode} />
        {state.paginationMode !== 'None' ? (
          <SelectControl labelKey={`${PG}.pageSize`} options={PAGE_SIZE_OPTIONS} testId="pg-sf-page-size" value={state.pageSize} onChange={state.setPageSize} />
        ) : null}
        {state.paginationMode === 'NativePagination' ? (
          <SelectControl labelKey={`${PG}.paginationVariant`} options={PAGINATION_VARIANT_OPTIONS} testId="pg-sf-paging-variant" value={state.paginationVariant} onChange={state.setPaginationVariant} />
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.selection} codeTestId="pg-sf-selection-code" titleKey={`${PG}.selection`}>
        <SelectControl labelKey={`${PG}.selectionType`} options={SELECTION_TYPE_OPTIONS} testId="pg-sf-sel-type" value={state.selectionType} onChange={state.setSelectionType} />
        <SelectControl labelKey={`${PG}.selectionMode`} options={SELECTION_MODE_OPTIONS} testId="pg-sf-sel-mode" value={state.selectionMode} onChange={state.setSelectionMode} />
        <ToggleControl checked={state.checkboxOnly} labelKey={`${PG}.checkboxOnly`} testId="pg-sf-checkbox" onChange={state.setCheckboxOnly} />
        {state.selectionType !== 'None' ? (
          <ToggleControl checked={state.selectionToolbar} labelKey={`${PG}.selectionToolbar`} testId="pg-sf-sel-toolbar-toggle" onChange={state.setSelectionToolbar} />
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.features} codeTestId="pg-sf-features-code" titleKey={`${PG}.features`}>
        <ToggleControl checked={state.sorting} labelKey={`${PG}.sorting`} testId="pg-sf-sorting" onChange={state.setSorting} />
        <ToggleControl checked={state.filtering} labelKey={`${PG}.filtering`} testId="pg-sf-filtering" onChange={state.setFiltering} />
        <ToggleControl checked={state.grouping} labelKey={`${PG}.grouping`} testId="pg-sf-grouping" onChange={state.setGrouping} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.columnFeatures} codeTestId="pg-sf-col-features-code" titleKey={`${PG}.columnFeatures`}>
        <ToggleControl checked={state.resizing} labelKey={`${PG}.resizing`} testId="pg-sf-resizing" onChange={state.setResizing} />
        <ToggleControl checked={state.reordering} labelKey={`${PG}.reordering`} testId="pg-sf-reordering" onChange={state.setReordering} />
        <ToggleControl checked={state.columnChooser} labelKey={`${PG}.columnChooser`} testId="pg-sf-col-chooser" onChange={state.setColumnChooser} />
        <ToggleControl checked={state.columnMenu} labelKey={`${PG}.showColumnMenu`} testId="pg-sf-col-menu" onChange={state.setColumnMenu} />
        <SelectControl labelKey={`${PG}.frozenColumns`} options={FROZEN_COLUMNS_OPTIONS} testId="pg-sf-frozen" value={state.frozenColumns} onChange={state.setFrozenColumns} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.advanced} codeTestId="pg-sf-advanced-code" titleKey={`${PG}.advanced`}>
        <ToggleControl checked={state.virtualization} labelKey={`${PG}.virtualization`} testId="pg-sf-virtual" onChange={state.setVirtualization} />
        <ToggleControl checked={state.clipboard} labelKey={`${PG}.clipboard`} testId="pg-sf-clipboard" onChange={state.setClipboard} />
        <ToggleControl checked={state.textWrap} labelKey={`${PG}.textWrap`} testId="pg-sf-text-wrap" onChange={state.setTextWrap} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.customColumn} codeTestId="pg-sf-custom-code" titleKey={`${PG}.customColumn`}>
        <ToggleControl checked={state.customColumn} labelKey={`${PG}.customColumn`} testId="pg-sf-custom-col" onChange={state.setCustomColumn} />
        {state.customColumn ? (
          <SelectControl labelKey={`${PG}.customComponentType`} options={CUSTOM_COMPONENT_OPTIONS} testId="pg-sf-custom-type" value={state.customComponentType} onChange={state.setCustomComponentType} />
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.aggregates} codeTestId="pg-sf-aggregates-code" titleKey={`${PG}.aggregates`}>
        <ToggleControl checked={state.aggregatesEnabled} labelKey={`${PG}.aggregatesEnabled`} testId="pg-sf-aggregates" onChange={state.setAggregatesEnabled} />
        {state.aggregatesEnabled ? (
          <>
            <SelectControl labelKey={`${PG}.aggregateType`} options={AGGREGATE_TYPE_OPTIONS} testId="pg-sf-agg-type" value={state.aggregateType} onChange={state.setAggregateType} />
            <SelectControl labelKey={`${PG}.footerBorderWidth`} options={FOOTER_BORDER_WIDTH_OPTIONS} testId="pg-sf-footer-border" value={state.footerBorderWidth} onChange={state.setFooterBorderWidth} />
            <SelectControl labelKey={`${PG}.footerFontSize`} options={FOOTER_FONT_SIZE_OPTIONS} testId="pg-sf-footer-font-size" value={state.footerFontSize} onChange={state.setFooterFontSize} />
            <SelectControl labelKey={`${PG}.footerFontWeight`} options={FOOTER_FONT_WEIGHT_OPTIONS} testId="pg-sf-footer-font-weight" value={state.footerFontWeight} onChange={state.setFooterFontWeight} />
            <SelectControl labelKey={`${PG}.footerPadding`} options={FOOTER_PADDING_OPTIONS} testId="pg-sf-footer-padding" value={state.footerPadding} onChange={state.setFooterPadding} />
          </>
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.actions} codeTestId="pg-sf-actions-code" titleKey={`${PG}.actions`}>
        <ToggleControl checked={state.actionsColumn} labelKey={`${PG}.actionsColumn`} testId="pg-sf-actions-col" onChange={state.setActionsColumn} />
        {state.actionsColumn ? (
          <>
            <ToggleControl checked={state.actionEdit} labelKey={`${PG}.actionEdit`} testId="pg-sf-action-edit" onChange={state.setActionEdit} />
            <ToggleControl checked={state.actionDelete} labelKey={`${PG}.actionDelete`} testId="pg-sf-action-delete" onChange={state.setActionDelete} />
            <ToggleControl checked={state.actionKebab} labelKey={`${PG}.actionKebab`} testId="pg-sf-action-kebab" onChange={state.setActionKebab} />
            <ToggleControl checked={state.actionView} labelKey={`${PG}.actionView`} testId="pg-sf-action-view" onChange={state.setActionView} />
            <ToggleControl checked={state.actionExport} labelKey={`${PG}.actionExport`} testId="pg-sf-action-export" onChange={state.setActionExport} />
            <ToggleControl checked={state.actionArchive} labelKey={`${PG}.actionArchive`} testId="pg-sf-action-archive" onChange={state.setActionArchive} />
            <SelectControl labelKey={`${PG}.playgroundEditMode`} options={PLAYGROUND_EDIT_MODE_OPTIONS} testId="pg-sf-edit-mode" value={state.playgroundEditMode} onChange={state.setPlaygroundEditMode} />
          </>
        ) : null}
      </ControlGroup>
    </div>
  );
};

const MemoizedControls = memo(SyncfusionPlaygroundControls);
MemoizedControls.displayName = 'SyncfusionPlaygroundControls';

export { MemoizedControls as SyncfusionPlaygroundControls };
