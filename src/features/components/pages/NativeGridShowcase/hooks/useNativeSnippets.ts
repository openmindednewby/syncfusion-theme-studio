/**
 * Computes section-level code snippets for the Native Grid playground.
 * Each snippet shows a full <TableNative .../> configuration for that section.
 */
import { useMemo } from 'react';

import { buildSectionSnippet } from '../../../shared/InteractiveControls';

import type { NativePlaygroundState } from './useNativePlaygroundState';

const TAG = 'TableNative';

interface NativeSnippets {
  appearance: string;
  selection: string;
  editing: string;
  pagination: string;
  features: string;
  aggregates: string;
  customColumn: string;
  actions: string;
}

function useAppearanceSnippet(s: NativePlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'density', value: s.density }, { name: 'striped', value: s.striped },
    { name: 'hoverable', value: s.hoverable }, { name: 'compact', value: s.compact },
  ]), [s.density, s.striped, s.hoverable, s.compact]);
}

function useSelectionSnippet(s: NativePlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'selectionType', value: s.selectionType }, { name: 'selectionMode', value: s.selectionMode },
    { name: 'checkbox', value: s.checkbox },
    ...(s.selectionType !== 'None' ? [{ name: 'selectionToolbar', value: s.selectionToolbar }] : []),
  ]), [s.selectionType, s.selectionMode, s.checkbox, s.selectionToolbar]);
}

function usePaginationSnippet(s: NativePlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'paginationMode', value: s.paginationMode },
    ...(s.paginationMode !== 'None' ? [{ name: 'pageSize', value: s.pageSize }] : []),
    ...(s.paginationMode === 'NativePagination' ? [{ name: 'paginationVariant', value: s.paginationVariant }] : []),
  ]), [s.paginationMode, s.pageSize, s.paginationVariant]);
}

function useFeaturesSnippet(s: NativePlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'filterEnabled', value: s.filterEnabled },
    ...(s.filterEnabled ? [{ name: 'filterType', value: s.filterType }] : []),
    { name: 'columnMenu', value: s.columnMenu }, { name: 'groupEnabled', value: s.groupEnabled },
  ]), [s.filterEnabled, s.filterType, s.columnMenu, s.groupEnabled]);
}

function useAggregatesSnippet(s: NativePlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'aggregatesEnabled', value: s.aggregatesEnabled },
    ...(s.aggregatesEnabled ? [
      { name: 'aggregateType', value: s.aggregateType }, { name: 'footerBorderWidth', value: s.footerBorderWidth },
      { name: 'footerFontSize', value: s.footerFontSize }, { name: 'footerFontWeight', value: s.footerFontWeight },
      { name: 'footerPadding', value: s.footerPadding },
    ] : []),
  ]), [s.aggregatesEnabled, s.aggregateType, s.footerBorderWidth, s.footerFontSize, s.footerFontWeight, s.footerPadding]);
}

function useActionsSnippet(s: NativePlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'actionsColumn', value: s.actionsColumn },
    ...(s.actionsColumn ? [
      { name: 'actionEdit', value: s.actionEdit }, { name: 'actionDelete', value: s.actionDelete },
      { name: 'actionKebab', value: s.actionKebab }, { name: 'actionView', value: s.actionView },
      { name: 'actionExport', value: s.actionExport }, { name: 'actionArchive', value: s.actionArchive },
      { name: 'playgroundEditMode', value: s.playgroundEditMode },
    ] : []),
  ]), [s.actionsColumn, s.actionEdit, s.actionDelete, s.actionKebab, s.actionView, s.actionExport, s.actionArchive, s.playgroundEditMode]);
}

export function useNativeSnippets(state: NativePlaygroundState): NativeSnippets {
  const editing = useMemo(
    () => buildSectionSnippet(TAG, [{ name: 'editMode', value: state.editMode }]),
    [state.editMode],
  );
  const customColumn = useMemo(() => buildSectionSnippet(TAG, [
    { name: 'customColumn', value: state.customColumn },
    ...(state.customColumn ? [{ name: 'customComponentType', value: state.customComponentType }] : []),
  ]), [state.customColumn, state.customComponentType]);

  return {
    appearance: useAppearanceSnippet(state), selection: useSelectionSnippet(state),
    editing, pagination: usePaginationSnippet(state), features: useFeaturesSnippet(state),
    aggregates: useAggregatesSnippet(state), customColumn, actions: useActionsSnippet(state),
  };
}
