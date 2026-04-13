/**
 * Computes section-level code snippets for the Syncfusion Grid playground.
 * Each snippet shows a full <DataGrid .../> configuration for that section.
 */
import { useMemo } from 'react';

import { buildSectionSnippet } from '../../../shared/InteractiveControls';

import type { SyncfusionPlaygroundState } from './useSyncfusionPlaygroundState';

const TAG = 'DataGrid';

interface SyncfusionSnippets {
  appearance: string;
  pagination: string;
  selection: string;
  features: string;
  columnFeatures: string;
  advanced: string;
  customColumn: string;
  aggregates: string;
  actions: string;
}

function useAppearanceSnippet(s: SyncfusionPlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'density', value: s.density }, { name: 'isLoading', value: s.isLoading },
    { name: 'rowHeight', value: s.rowHeight },
  ]), [s.density, s.isLoading, s.rowHeight]);
}

function usePaginationSnippet(s: SyncfusionPlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'paginationMode', value: s.paginationMode },
    ...(s.paginationMode !== 'None' ? [{ name: 'pageSize', value: s.pageSize }] : []),
    ...(s.paginationMode === 'NativePagination' ? [{ name: 'paginationVariant', value: s.paginationVariant }] : []),
  ]), [s.paginationMode, s.pageSize, s.paginationVariant]);
}

function useSelectionSnippet(s: SyncfusionPlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'selectionType', value: s.selectionType }, { name: 'selectionMode', value: s.selectionMode },
    { name: 'checkboxOnly', value: s.checkboxOnly },
    ...(s.selectionType !== 'None' ? [{ name: 'selectionToolbar', value: s.selectionToolbar }] : []),
  ]), [s.selectionType, s.selectionMode, s.checkboxOnly, s.selectionToolbar]);
}

function useColumnFeaturesSnippet(s: SyncfusionPlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'resizing', value: s.resizing }, { name: 'reordering', value: s.reordering },
    { name: 'columnChooser', value: s.columnChooser }, { name: 'columnMenu', value: s.columnMenu },
    { name: 'frozenColumns', value: s.frozenColumns },
  ]), [s.resizing, s.reordering, s.columnChooser, s.columnMenu, s.frozenColumns]);
}

function useAggregatesSnippet(s: SyncfusionPlaygroundState): string {
  return useMemo(() => buildSectionSnippet(TAG, [
    { name: 'aggregatesEnabled', value: s.aggregatesEnabled },
    ...(s.aggregatesEnabled ? [
      { name: 'aggregateType', value: s.aggregateType }, { name: 'footerBorderWidth', value: s.footerBorderWidth },
      { name: 'footerFontSize', value: s.footerFontSize }, { name: 'footerFontWeight', value: s.footerFontWeight },
      { name: 'footerPadding', value: s.footerPadding },
    ] : []),
  ]), [s.aggregatesEnabled, s.aggregateType, s.footerBorderWidth, s.footerFontSize, s.footerFontWeight, s.footerPadding]);
}

function useActionsSnippet(s: SyncfusionPlaygroundState): string {
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

export function useSyncfusionSnippets(state: SyncfusionPlaygroundState): SyncfusionSnippets {
  const features = useMemo(() => buildSectionSnippet(TAG, [
    { name: 'sorting', value: state.sorting }, { name: 'filtering', value: state.filtering },
    { name: 'grouping', value: state.grouping },
  ]), [state.sorting, state.filtering, state.grouping]);

  const advanced = useMemo(() => buildSectionSnippet(TAG, [
    { name: 'virtualization', value: state.virtualization }, { name: 'clipboard', value: state.clipboard },
    { name: 'textWrap', value: state.textWrap },
  ]), [state.virtualization, state.clipboard, state.textWrap]);

  const customColumn = useMemo(() => buildSectionSnippet(TAG, [
    { name: 'customColumn', value: state.customColumn },
    ...(state.customColumn ? [{ name: 'customComponentType', value: state.customComponentType }] : []),
  ]), [state.customColumn, state.customComponentType]);

  return {
    appearance: useAppearanceSnippet(state), pagination: usePaginationSnippet(state),
    selection: useSelectionSnippet(state), features, columnFeatures: useColumnFeaturesSnippet(state),
    advanced, customColumn, aggregates: useAggregatesSnippet(state), actions: useActionsSnippet(state),
  };
}
