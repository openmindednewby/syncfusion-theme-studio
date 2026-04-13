/**
 * State management hook for the Native Grid Interactive Playground.
 * Returns individual state values, setters, and derived grid configs.
 */
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { AggregateRowDef, EditingConfig, GroupingConfig, SelectedItem, SelectionConfig } from '@/components/ui/native';
import { GridDensity } from '@/components/ui/shared/GridDensity';
import type { GridConfig } from '@/lib/grid/types';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { DEFAULT_FOOTER_BORDER_WIDTH, DEFAULT_FOOTER_FONT_SIZE, DEFAULT_FOOTER_FONT_WEIGHT, DEFAULT_FOOTER_PADDING } from '../../../shared/footerStyleOptions';
import { PlaygroundPresetId } from '../../../shared/InteractiveControls/PlaygroundPresetId';
import { NATIVE_PRESETS } from '../data/nativePlaygroundPresets';
import {
  DENSITY_MAP, buildSelectionConfig, buildEditConfig,
  buildGridConfig, buildNativeStateEntries, buildNativePlaygroundAggregates,
} from '../utils/nativePlaygroundHelpers';

import type { StateEntry } from '../../../shared/InteractiveControls';
import type { NativePresetValues } from '../data/nativePlaygroundPresets';

type Setter<T> = Dispatch<SetStateAction<T>>;
const PAGE_SIZE_DEFAULT = 5; const ZERO_SELECTED = 0; const INITIAL_PAGE = 1;

export interface NativePlaygroundState {
  density: GridDensity; setDensity: (v: string) => void;
  striped: boolean; setStriped: (v: boolean) => void;
  hoverable: boolean; setHoverable: (v: boolean) => void;
  compact: boolean; setCompact: (v: boolean) => void;
  selectionType: string; setSelectionType: (v: string) => void;
  selectionMode: string; setSelectionMode: (v: string) => void;
  checkbox: boolean; setCheckbox: (v: boolean) => void;
  editMode: string; setEditMode: (v: string) => void;
  filterEnabled: boolean; setFilterEnabled: (v: boolean) => void;
  filterType: string; setFilterType: (v: string) => void;
  paginationMode: string; setPaginationMode: (v: string) => void;
  paginationVariant: string; setPaginationVariant: (v: string) => void;
  pageSize: string; setPageSize: (v: string) => void;
  columnMenu: boolean; setColumnMenu: (v: boolean) => void;
  groupEnabled: boolean; setGroupEnabled: (v: boolean) => void;
  actionsColumn: boolean; setActionsColumn: (v: boolean) => void;
  actionEdit: boolean; setActionEdit: (v: boolean) => void;
  actionDelete: boolean; setActionDelete: (v: boolean) => void;
  actionKebab: boolean; setActionKebab: (v: boolean) => void;
  actionView: boolean; setActionView: (v: boolean) => void;
  actionExport: boolean; setActionExport: (v: boolean) => void;
  actionArchive: boolean; setActionArchive: (v: boolean) => void;
  playgroundEditMode: string; setPlaygroundEditMode: (v: string) => void;
  customColumn: boolean; setCustomColumn: (v: boolean) => void;
  customComponentType: string; setCustomComponentType: (v: string) => void;
  selectionToolbar: boolean; setSelectionToolbar: (v: boolean) => void;
  aggregatesEnabled: boolean; setAggregatesEnabled: (v: boolean) => void;
  aggregateType: string; setAggregateType: (v: string) => void;
  footerBorderWidth: string; setFooterBorderWidth: (v: string) => void;
  footerFontSize: string; setFooterFontSize: (v: string) => void;
  footerFontWeight: string; setFooterFontWeight: (v: string) => void;
  footerPadding: string; setFooterPadding: (v: string) => void;
  aggregates: AggregateRowDef[] | undefined;
  selectionConfig: SelectionConfig | undefined;
  editConfig: EditingConfig | undefined;
  gridConfig: GridConfig;
  groupConfig: GroupingConfig | undefined;
  selectedRows: number; selectedItems: SelectedItem[];
  handleSelectionChange: (rows: Array<Record<string, unknown>>) => void;
  handleRemoveSelectedItem: (key: string) => void;
  handleClearAllSelected: () => void;
  stateEntries: StateEntry[];
  currentPage: number; totalPages: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
  currentPreset: string; applyPreset: (id: string) => void;
}

interface RawState {
  densityStr: string; setDensityStr: Setter<string>;
  striped: boolean; setStriped: Setter<boolean>;
  hoverable: boolean; setHoverable: Setter<boolean>;
  compact: boolean; setCompact: Setter<boolean>;
  selectionType: string; setSelectionType: Setter<string>;
  selectionMode: string; setSelectionMode: Setter<string>;
  checkbox: boolean; setCheckbox: Setter<boolean>;
  editMode: string; setEditMode: Setter<string>;
  filterEnabled: boolean; setFilterEnabled: Setter<boolean>;
  filterType: string; setFilterType: Setter<string>;
  paginationMode: string; setPaginationMode: Setter<string>;
  paginationVariant: string; setPaginationVariant: Setter<string>;
  pageSize: string; setPageSize: Setter<string>;
  columnMenu: boolean; setColumnMenu: Setter<boolean>;
  groupEnabled: boolean; setGroupEnabled: Setter<boolean>;
  actionsColumn: boolean; setActionsColumn: Setter<boolean>;
  actionEdit: boolean; setActionEdit: Setter<boolean>;
  actionDelete: boolean; setActionDelete: Setter<boolean>;
  actionKebab: boolean; setActionKebab: Setter<boolean>;
  actionView: boolean; setActionView: Setter<boolean>;
  actionExport: boolean; setActionExport: Setter<boolean>;
  actionArchive: boolean; setActionArchive: Setter<boolean>;
  playgroundEditMode: string; setPlaygroundEditMode: Setter<string>;
  customColumn: boolean; setCustomColumn: Setter<boolean>;
  customComponentType: string; setCustomComponentType: Setter<string>;
  selectionToolbar: boolean; setSelectionToolbar: Setter<boolean>;
  aggregatesEnabled: boolean; setAggregatesEnabled: Setter<boolean>;
  aggregateType: string; setAggregateType: Setter<string>;
  footerBorderWidth: string; setFooterBorderWidth: Setter<string>;
  footerFontSize: string; setFooterFontSize: Setter<string>;
  footerFontWeight: string; setFooterFontWeight: Setter<string>;
  footerPadding: string; setFooterPadding: Setter<string>;
  selectedRows: number; setSelectedRows: Setter<number>;
  selectedItems: SelectedItem[]; setSelectedItems: Setter<SelectedItem[]>;
  currentPage: number; setCurrentPage: Setter<number>;
  currentPreset: string; setCurrentPreset: Setter<string>;
}

function useRawState(): RawState {
  const [densityStr, setDensityStr] = useState('medium');
  const [striped, setStriped] = useState(true); const [hoverable, setHoverable] = useState(true); const [compact, setCompact] = useState(false);
  const [selectionType, setSelectionType] = useState('None'); const [selectionMode, setSelectionMode] = useState('Row');
  const [checkbox, setCheckbox] = useState(false); const [editMode, setEditMode] = useState('None');
  const [filterEnabled, setFilterEnabled] = useState(false); const [filterType, setFilterType] = useState('Menu');
  const [paginationMode, setPaginationMode] = useState('BuiltIn'); const [paginationVariant, setPaginationVariant] = useState('default');
  const [pageSize, setPageSize] = useState(String(PAGE_SIZE_DEFAULT));
  const [columnMenu, setColumnMenu] = useState(false); const [groupEnabled, setGroupEnabled] = useState(false);
  const [actionsColumn, setActionsColumn] = useState(false); const [actionEdit, setActionEdit] = useState(true);
  const [actionDelete, setActionDelete] = useState(true); const [actionKebab, setActionKebab] = useState(true);
  const [actionView, setActionView] = useState(false); const [actionExport, setActionExport] = useState(false); const [actionArchive, setActionArchive] = useState(false);
  const [playgroundEditMode, setPlaygroundEditMode] = useState('modal');
  const [customColumn, setCustomColumn] = useState(false); const [customComponentType, setCustomComponentType] = useState<string>(CustomComponentType.AlertBadge);
  const [selectionToolbar, setSelectionToolbar] = useState(false);
  const [aggregatesEnabled, setAggregatesEnabled] = useState(false);
  const [aggregateType, setAggregateType] = useState('Sum');
  const [footerBorderWidth, setFooterBorderWidth] = useState(DEFAULT_FOOTER_BORDER_WIDTH);
  const [footerFontSize, setFooterFontSize] = useState(DEFAULT_FOOTER_FONT_SIZE);
  const [footerFontWeight, setFooterFontWeight] = useState(DEFAULT_FOOTER_FONT_WEIGHT);
  const [footerPadding, setFooterPadding] = useState(DEFAULT_FOOTER_PADDING);
  const [selectedRows, setSelectedRows] = useState(ZERO_SELECTED); const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]); const [currentPage, setCurrentPage] = useState(INITIAL_PAGE); const [currentPreset, setCurrentPreset] = useState<string>(PlaygroundPresetId.Default);
  return { densityStr, setDensityStr, striped, setStriped, hoverable, setHoverable, compact, setCompact, selectionType, setSelectionType, selectionMode, setSelectionMode, checkbox, setCheckbox, editMode, setEditMode, filterEnabled, setFilterEnabled, filterType, setFilterType, paginationMode, setPaginationMode, paginationVariant, setPaginationVariant, pageSize, setPageSize, columnMenu, setColumnMenu, groupEnabled, setGroupEnabled, actionsColumn, setActionsColumn, actionEdit, setActionEdit, actionDelete, setActionDelete, actionKebab, setActionKebab, actionView, setActionView, actionExport, setActionExport, actionArchive, setActionArchive, playgroundEditMode, setPlaygroundEditMode, customColumn, setCustomColumn, customComponentType, setCustomComponentType, selectionToolbar, setSelectionToolbar, aggregatesEnabled, setAggregatesEnabled, aggregateType, setAggregateType, footerBorderWidth, setFooterBorderWidth, footerFontSize, setFooterFontSize, footerFontWeight, setFooterFontWeight, footerPadding, setFooterPadding, selectedRows, setSelectedRows, selectedItems, setSelectedItems, currentPage, setCurrentPage, currentPreset, setCurrentPreset };
}

interface DerivedConfigs {
  selectionConfig: SelectionConfig | undefined; editConfig: EditingConfig | undefined; gridConfig: GridConfig; groupConfig: GroupingConfig | undefined;
  aggregates: AggregateRowDef[] | undefined; stateEntries: StateEntry[]; totalPages: number;
}

function useDerivedConfigs(raw: RawState, dataLength: number): DerivedConfigs {
  const selectionConfig = useMemo(() => buildSelectionConfig({ type: raw.selectionType, mode: raw.selectionMode, checkbox: raw.checkbox }), [raw.selectionType, raw.selectionMode, raw.checkbox]);
  const isInline = raw.playgroundEditMode === 'inline';
  const effectiveEditMode = isInline ? 'Normal' : raw.editMode;
  const hideCommandColumn = isInline && raw.actionsColumn;
  const editConfig = useMemo(() => buildEditConfig(effectiveEditMode, !hideCommandColumn), [effectiveEditMode, hideCommandColumn]);
  const gridConfig = useMemo(() => buildGridConfig({ filterEnabled: raw.filterEnabled, filterType: raw.filterType, paginationMode: raw.paginationMode, pageSize: raw.pageSize, columnMenu: raw.columnMenu }), [raw.filterEnabled, raw.filterType, raw.paginationMode, raw.pageSize, raw.columnMenu]);
  const groupConfig = useMemo<GroupingConfig | undefined>(() => (raw.groupEnabled ? { showDropArea: true } : undefined), [raw.groupEnabled]);
  const aggregates = useMemo(() => buildNativePlaygroundAggregates(raw.aggregatesEnabled, raw.aggregateType), [raw.aggregatesEnabled, raw.aggregateType]);
  const stateEntries = useMemo(() => buildNativeStateEntries({ density: raw.densityStr, selectionType: raw.selectionType, selectedRows: raw.selectedRows, editMode: raw.editMode, filterEnabled: raw.filterEnabled, paginationMode: raw.paginationMode, groupEnabled: raw.groupEnabled, columnMenu: raw.columnMenu, actionsColumn: raw.actionsColumn, customColumn: raw.customColumn, customComponentType: raw.customComponentType, selectionToolbar: raw.selectionToolbar, aggregatesEnabled: raw.aggregatesEnabled, aggregateType: raw.aggregateType }), [raw.densityStr, raw.selectionType, raw.selectedRows, raw.editMode, raw.filterEnabled, raw.paginationMode, raw.groupEnabled, raw.columnMenu, raw.actionsColumn, raw.customColumn, raw.customComponentType, raw.selectionToolbar, raw.aggregatesEnabled, raw.aggregateType]);
  const totalPages = Math.ceil(dataLength / Number(raw.pageSize));
  return { selectionConfig, editConfig, gridConfig, groupConfig, aggregates, stateEntries, totalPages };
}

type Handlers = Pick<NativePlaygroundState, 'handleSelectionChange' | 'handleRemoveSelectedItem' | 'handleClearAllSelected' | 'handlePageChange' | 'handlePageSizeChange' | 'applyPreset'>;

function buildReturn(raw: RawState, density: GridDensity, derived: DerivedConfigs, handlers: Handlers): NativePlaygroundState {
  return {
    density, setDensity: raw.setDensityStr, striped: raw.striped, setStriped: raw.setStriped,
    hoverable: raw.hoverable, setHoverable: raw.setHoverable, compact: raw.compact, setCompact: raw.setCompact,
    selectionType: raw.selectionType, setSelectionType: raw.setSelectionType, selectionMode: raw.selectionMode, setSelectionMode: raw.setSelectionMode,
    checkbox: raw.checkbox, setCheckbox: raw.setCheckbox, editMode: raw.editMode, setEditMode: raw.setEditMode,
    filterEnabled: raw.filterEnabled, setFilterEnabled: raw.setFilterEnabled, filterType: raw.filterType, setFilterType: raw.setFilterType,
    paginationMode: raw.paginationMode, setPaginationMode: raw.setPaginationMode, paginationVariant: raw.paginationVariant, setPaginationVariant: raw.setPaginationVariant,
    pageSize: raw.pageSize, setPageSize: raw.setPageSize, columnMenu: raw.columnMenu, setColumnMenu: raw.setColumnMenu,
    groupEnabled: raw.groupEnabled, setGroupEnabled: raw.setGroupEnabled, actionsColumn: raw.actionsColumn, setActionsColumn: raw.setActionsColumn,
    actionEdit: raw.actionEdit, setActionEdit: raw.setActionEdit, actionDelete: raw.actionDelete, setActionDelete: raw.setActionDelete,
    actionKebab: raw.actionKebab, setActionKebab: raw.setActionKebab,
    actionView: raw.actionView, setActionView: raw.setActionView, actionExport: raw.actionExport, setActionExport: raw.setActionExport,
    actionArchive: raw.actionArchive, setActionArchive: raw.setActionArchive,
    playgroundEditMode: raw.playgroundEditMode, setPlaygroundEditMode: raw.setPlaygroundEditMode,
    customColumn: raw.customColumn, setCustomColumn: raw.setCustomColumn, customComponentType: raw.customComponentType, setCustomComponentType: raw.setCustomComponentType,
    selectionToolbar: raw.selectionToolbar, setSelectionToolbar: raw.setSelectionToolbar,
    aggregatesEnabled: raw.aggregatesEnabled, setAggregatesEnabled: raw.setAggregatesEnabled,
    aggregateType: raw.aggregateType, setAggregateType: raw.setAggregateType,
    footerBorderWidth: raw.footerBorderWidth, setFooterBorderWidth: raw.setFooterBorderWidth,
    footerFontSize: raw.footerFontSize, setFooterFontSize: raw.setFooterFontSize,
    footerFontWeight: raw.footerFontWeight, setFooterFontWeight: raw.setFooterFontWeight,
    footerPadding: raw.footerPadding, setFooterPadding: raw.setFooterPadding,
    ...derived, selectedRows: raw.selectedRows, selectedItems: raw.selectedItems,
    currentPage: raw.currentPage, currentPreset: raw.currentPreset, ...handlers,
  };
}

function applyPresetToRaw(raw: RawState, p: NativePresetValues): void {
  raw.setDensityStr(p.densityStr); raw.setStriped(p.striped); raw.setHoverable(p.hoverable); raw.setCompact(p.compact); raw.setSelectionType(p.selectionType); raw.setSelectionMode(p.selectionMode); raw.setCheckbox(p.checkbox); raw.setEditMode(p.editMode); raw.setFilterEnabled(p.filterEnabled); raw.setFilterType(p.filterType);
  raw.setPaginationMode(p.paginationMode); raw.setPaginationVariant(p.paginationVariant); raw.setPageSize(p.pageSize); raw.setColumnMenu(p.columnMenu); raw.setGroupEnabled(p.groupEnabled); raw.setActionsColumn(p.actionsColumn); raw.setActionEdit(p.actionEdit); raw.setActionDelete(p.actionDelete); raw.setActionKebab(p.actionKebab);
  raw.setActionView(p.actionView); raw.setActionExport(p.actionExport); raw.setActionArchive(p.actionArchive); raw.setPlaygroundEditMode(p.playgroundEditMode); raw.setCustomColumn(p.customColumn); raw.setCustomComponentType(p.customComponentType); raw.setSelectionToolbar(p.selectionToolbar); raw.setAggregatesEnabled(p.aggregatesEnabled); raw.setAggregateType(p.aggregateType);
  raw.setFooterBorderWidth(p.footerBorderWidth); raw.setFooterFontSize(p.footerFontSize); raw.setFooterFontWeight(p.footerFontWeight); raw.setFooterPadding(p.footerPadding);
}

export function useNativePlaygroundState(dataLength: number): NativePlaygroundState {
  const raw = useRawState();
  const density = DENSITY_MAP[raw.densityStr] ?? GridDensity.Medium;
  const { setSelectedRows, setSelectedItems, setCurrentPage, setPageSize: setPageSizeRaw } = raw;
  const handleSelectionChange = useCallback((rows: Array<Record<string, unknown>>) => {
    setSelectedRows(rows.length);
    setSelectedItems(rows.map((r) => ({ key: String(r['id']), label: String(r['name']) })));
  }, [setSelectedRows, setSelectedItems]);
  const handleRemoveSelectedItem = useCallback((key: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.key !== key));
    setSelectedRows((prev) => Math.max(prev - 1, 0));
  }, [setSelectedItems, setSelectedRows]);
  const handleClearAllSelected = useCallback(() => { setSelectedItems([]); setSelectedRows(ZERO_SELECTED); }, [setSelectedItems, setSelectedRows]);
  const handlePageChange = useCallback((page: number) => setCurrentPage(page), [setCurrentPage]);
  const handlePageSizeChange = useCallback((size: number) => { setPageSizeRaw(String(size)); setCurrentPage(INITIAL_PAGE); }, [setPageSizeRaw, setCurrentPage]);
  const applyPreset = useCallback((id: string) => { const p = NATIVE_PRESETS[id]; if (!p) return; applyPresetToRaw(raw, p); raw.setCurrentPreset(id); raw.setSelectedRows(ZERO_SELECTED); raw.setSelectedItems([]); raw.setCurrentPage(INITIAL_PAGE); }, [raw]);
  const derived = useDerivedConfigs(raw, dataLength);
  return buildReturn(raw, density, derived, { handleSelectionChange, handleRemoveSelectedItem, handleClearAllSelected, handlePageChange, handlePageSizeChange, applyPreset });
}
