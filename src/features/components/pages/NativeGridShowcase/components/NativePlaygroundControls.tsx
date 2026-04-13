/**
 * Control panel for the Native Grid Interactive Playground.
 * Renders grouped toggles and selects for all TableNative features.
 * Each section shows a code-hint button with the full component snippet.
 */
import { memo } from 'react';

import {
  ControlGroup,
  SelectControl,
  ToggleControl,
} from '../../../shared/InteractiveControls';
import { useNativeSnippets } from '../hooks/useNativeSnippets';
import {
  AGGREGATE_TYPE_OPTIONS,
  CUSTOM_COMPONENT_OPTIONS,
  DENSITY_OPTIONS,
  EDIT_MODE_OPTIONS,
  FILTER_TYPE_OPTIONS,
  FOOTER_BORDER_WIDTH_OPTIONS,
  FOOTER_FONT_SIZE_OPTIONS,
  FOOTER_FONT_WEIGHT_OPTIONS,
  FOOTER_PADDING_OPTIONS,
  PAGE_SIZE_OPTIONS,
  PAGINATION_MODE_OPTIONS,
  PAGINATION_VARIANT_OPTIONS,
  PLAYGROUND_EDIT_MODE_OPTIONS,
  PRESET_OPTIONS,
  SELECTION_MODE_OPTIONS,
  SELECTION_TYPE_OPTIONS,
} from '../utils/nativePlaygroundOptions';

import type { NativePlaygroundState } from '../hooks/useNativePlaygroundState';

const PG = 'components.gridShowcase.playground';

interface Props {
  state: NativePlaygroundState;
}

const NativePlaygroundControls = ({ state }: Props): JSX.Element => {
  const isNativePagination = state.paginationMode === 'NativePagination';
  const snippets = useNativeSnippets(state);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-full">
        <SelectControl className="min-w-[220px]" labelKey={`${PG}.preset`} options={PRESET_OPTIONS} testId="pg-native-preset" value={state.currentPreset} onChange={state.applyPreset} />
      </div>
      <ControlGroup codeSnippet={snippets.appearance} codeTestId="pg-native-appearance-code" titleKey={`${PG}.appearance`}>
        <SelectControl labelKey={`${PG}.density`} options={DENSITY_OPTIONS} testId="pg-native-density" value={state.density} onChange={state.setDensity} />
        <ToggleControl checked={state.striped} labelKey={`${PG}.striped`} testId="pg-native-striped" onChange={state.setStriped} />
        <ToggleControl checked={state.hoverable} labelKey={`${PG}.hoverable`} testId="pg-native-hoverable" onChange={state.setHoverable} />
        <ToggleControl checked={state.compact} labelKey={`${PG}.compact`} testId="pg-native-compact" onChange={state.setCompact} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.selection} codeTestId="pg-native-selection-code" titleKey={`${PG}.selection`}>
        <SelectControl labelKey={`${PG}.selectionType`} options={SELECTION_TYPE_OPTIONS} testId="pg-native-sel-type" value={state.selectionType} onChange={state.setSelectionType} />
        <SelectControl labelKey={`${PG}.selectionMode`} options={SELECTION_MODE_OPTIONS} testId="pg-native-sel-mode" value={state.selectionMode} onChange={state.setSelectionMode} />
        <ToggleControl checked={state.checkbox} labelKey={`${PG}.checkbox`} testId="pg-native-checkbox" onChange={state.setCheckbox} />
        {state.selectionType !== 'None' ? (
          <ToggleControl checked={state.selectionToolbar} labelKey={`${PG}.selectionToolbar`} testId="pg-native-sel-toolbar-toggle" onChange={state.setSelectionToolbar} />
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.editing} codeTestId="pg-native-editing-code" titleKey={`${PG}.editing`}>
        <SelectControl labelKey={`${PG}.editMode`} options={EDIT_MODE_OPTIONS} testId="pg-native-edit-mode" value={state.editMode} onChange={state.setEditMode} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.pagination} codeTestId="pg-native-pagination-code" titleKey={`${PG}.pagination`}>
        <SelectControl labelKey={`${PG}.paginationMode`} options={PAGINATION_MODE_OPTIONS} testId="pg-native-paging-mode" value={state.paginationMode} onChange={state.setPaginationMode} />
        {state.paginationMode !== 'None' ? (
          <SelectControl labelKey={`${PG}.pageSize`} options={PAGE_SIZE_OPTIONS} testId="pg-native-page-size" value={state.pageSize} onChange={state.setPageSize} />
        ) : null}
        {isNativePagination ? (
          <SelectControl labelKey={`${PG}.paginationVariant`} options={PAGINATION_VARIANT_OPTIONS} testId="pg-native-paging-variant" value={state.paginationVariant} onChange={state.setPaginationVariant} />
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.features} codeTestId="pg-native-features-code" titleKey={`${PG}.features`}>
        <ToggleControl checked={state.filterEnabled} labelKey={`${PG}.filterEnabled`} testId="pg-native-filter" onChange={state.setFilterEnabled} />
        {state.filterEnabled ? (
          <SelectControl labelKey={`${PG}.filterType`} options={FILTER_TYPE_OPTIONS} testId="pg-native-filter-type" value={state.filterType} onChange={state.setFilterType} />
        ) : null}
        <ToggleControl checked={state.columnMenu} labelKey={`${PG}.showColumnMenu`} testId="pg-native-col-menu" onChange={state.setColumnMenu} />
        <ToggleControl checked={state.groupEnabled} labelKey={`${PG}.groupEnabled`} testId="pg-native-group" onChange={state.setGroupEnabled} />
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.aggregates} codeTestId="pg-native-aggregates-code" titleKey={`${PG}.aggregates`}>
        <ToggleControl checked={state.aggregatesEnabled} labelKey={`${PG}.aggregatesEnabled`} testId="pg-native-aggregates" onChange={state.setAggregatesEnabled} />
        {state.aggregatesEnabled ? (
          <>
            <SelectControl labelKey={`${PG}.aggregateType`} options={AGGREGATE_TYPE_OPTIONS} testId="pg-native-agg-type" value={state.aggregateType} onChange={state.setAggregateType} />
            <SelectControl labelKey={`${PG}.footerBorderWidth`} options={FOOTER_BORDER_WIDTH_OPTIONS} testId="pg-native-footer-border" value={state.footerBorderWidth} onChange={state.setFooterBorderWidth} />
            <SelectControl labelKey={`${PG}.footerFontSize`} options={FOOTER_FONT_SIZE_OPTIONS} testId="pg-native-footer-font-size" value={state.footerFontSize} onChange={state.setFooterFontSize} />
            <SelectControl labelKey={`${PG}.footerFontWeight`} options={FOOTER_FONT_WEIGHT_OPTIONS} testId="pg-native-footer-font-weight" value={state.footerFontWeight} onChange={state.setFooterFontWeight} />
            <SelectControl labelKey={`${PG}.footerPadding`} options={FOOTER_PADDING_OPTIONS} testId="pg-native-footer-padding" value={state.footerPadding} onChange={state.setFooterPadding} />
          </>
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.customColumn} codeTestId="pg-native-custom-code" titleKey={`${PG}.customColumn`}>
        <ToggleControl checked={state.customColumn} labelKey={`${PG}.customColumn`} testId="pg-native-custom-col" onChange={state.setCustomColumn} />
        {state.customColumn ? (
          <SelectControl labelKey={`${PG}.customComponentType`} options={CUSTOM_COMPONENT_OPTIONS} testId="pg-native-custom-type" value={state.customComponentType} onChange={state.setCustomComponentType} />
        ) : null}
      </ControlGroup>

      <ControlGroup codeSnippet={snippets.actions} codeTestId="pg-native-actions-code" titleKey={`${PG}.actions`}>
        <ToggleControl checked={state.actionsColumn} labelKey={`${PG}.actionsColumn`} testId="pg-native-actions-col" onChange={state.setActionsColumn} />
        {state.actionsColumn ? (
          <>
            <ToggleControl checked={state.actionEdit} labelKey={`${PG}.actionEdit`} testId="pg-native-action-edit" onChange={state.setActionEdit} />
            <ToggleControl checked={state.actionDelete} labelKey={`${PG}.actionDelete`} testId="pg-native-action-delete" onChange={state.setActionDelete} />
            <ToggleControl checked={state.actionKebab} labelKey={`${PG}.actionKebab`} testId="pg-native-action-kebab" onChange={state.setActionKebab} />
            <ToggleControl checked={state.actionView} labelKey={`${PG}.actionView`} testId="pg-native-action-view" onChange={state.setActionView} />
            <ToggleControl checked={state.actionExport} labelKey={`${PG}.actionExport`} testId="pg-native-action-export" onChange={state.setActionExport} />
            <ToggleControl checked={state.actionArchive} labelKey={`${PG}.actionArchive`} testId="pg-native-action-archive" onChange={state.setActionArchive} />
            <SelectControl labelKey={`${PG}.playgroundEditMode`} options={PLAYGROUND_EDIT_MODE_OPTIONS} testId="pg-native-pg-edit-mode" value={state.playgroundEditMode} onChange={state.setPlaygroundEditMode} />
          </>
        ) : null}
      </ControlGroup>
    </div>
  );
};

const MemoizedControls = memo(NativePlaygroundControls);
MemoizedControls.displayName = 'NativePlaygroundControls';

export { MemoizedControls as NativePlaygroundControls };
