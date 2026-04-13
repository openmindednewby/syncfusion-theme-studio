/** State management hook for the Syncfusion Grid Interactive Playground. */
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { SelectionSettingsModel } from '@syncfusion/ej2-react-grids';

import type { SelectedItem } from '@/components/ui/native';
import { GridDensity } from '@/components/ui/shared/GridDensity';
import type { AggregateRowConfig } from '@/lib/grid/types';
import { isValueDefined } from '@/utils/is';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { DEFAULT_FOOTER_BORDER_WIDTH, DEFAULT_FOOTER_FONT_SIZE, DEFAULT_FOOTER_FONT_WEIGHT, DEFAULT_FOOTER_PADDING } from '../../../shared/footerStyleOptions';
import { PlaygroundPresetId } from '../../../shared/InteractiveControls/PlaygroundPresetId';
import {
  EMPLOYEES, generateVirtualData,
  COL_WIDTH_ID, COL_WIDTH_NAME, COL_WIDTH_EMAIL, COL_WIDTH_ROLE, COL_WIDTH_STATUS, COL_WIDTH_DEPARTMENT, COL_WIDTH_SALARY,
  CHECKBOX_COL_WIDTH, VIRTUAL_ROW_COUNT, GRID_HEIGHT_VIRTUAL, COL_WIDTH_ACTIONS,
} from '../data/data';
import { SYNCFUSION_PRESETS } from '../data/syncfusionPlaygroundPresets';
import { DENSITY_MAP, GRID_DENSITY_ROW_HEIGHT, ROW_HEIGHT_TO_DENSITY, buildSelectionSettings, buildStateEntries, toEmployeeRows, getSelectedNames, buildPlaygroundAggregates } from '../utils/syncfusionPlaygroundHelpers';

import type { StateEntry } from '../../../shared/InteractiveControls';
import type { Employee } from '../data/data';
import type { SyncfusionPresetValues } from '../data/syncfusionPlaygroundPresets';

type Setter<T> = Dispatch<SetStateAction<T>>;
const PAGE_SIZE_DEFAULT = 5; const DEFAULT_ROW_HEIGHT = 40; const INITIAL_PAGE = 1;
const PLAYGROUND_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: 'ID', width: COL_WIDTH_ID, textAlign: 'Right', isPrimaryKey: true },
  { field: 'name', headerText: 'Name', width: COL_WIDTH_NAME },
  { field: 'email', headerText: 'Email', width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: 'Role', width: COL_WIDTH_ROLE },
  { field: 'status', headerText: 'Status', width: COL_WIDTH_STATUS },
  { field: 'department', headerText: 'Department', width: COL_WIDTH_DEPARTMENT },
];
const CHECKBOX_COL: ColumnModel = { field: 'checkbox', type: 'checkbox', width: CHECKBOX_COL_WIDTH };
const RADIO_COL: ColumnModel = { field: '_radio', headerText: '', width: CHECKBOX_COL_WIDTH, textAlign: 'Center', allowSorting: false, allowFiltering: false, allowGrouping: false, allowResizing: false, allowReordering: false };
const ACTIONS_COL: ColumnModel = { field: 'actions', headerText: 'Actions', width: COL_WIDTH_ACTIONS, textAlign: 'Center', allowSorting: false, allowFiltering: false, allowGrouping: false, allowResizing: false, allowEditing: false };
const SALARY_COL: ColumnModel = { field: 'salary', headerText: 'Salary', width: COL_WIDTH_SALARY, textAlign: 'Right', format: 'C0' };

export interface SyncfusionPlaygroundState {
  density: GridDensity; setDensity: (v: string) => void; isLoading: boolean; setIsLoading: (v: boolean) => void;
  rowHeight: string; setRowHeight: (v: string) => void; paginationMode: string; setPaginationMode: (v: string) => void;
  paginationVariant: string; setPaginationVariant: (v: string) => void; pageSize: string; setPageSize: (v: string) => void;
  selectionType: string; setSelectionType: (v: string) => void; selectionMode: string; setSelectionMode: (v: string) => void;
  checkboxOnly: boolean; setCheckboxOnly: (v: boolean) => void; sorting: boolean; setSorting: (v: boolean) => void;
  filtering: boolean; setFiltering: (v: boolean) => void; grouping: boolean; setGrouping: (v: boolean) => void;
  resizing: boolean; setResizing: (v: boolean) => void; reordering: boolean; setReordering: (v: boolean) => void;
  columnChooser: boolean; setColumnChooser: (v: boolean) => void; columnMenu: boolean; setColumnMenu: (v: boolean) => void;
  frozenColumns: string; setFrozenColumns: (v: string) => void; virtualization: boolean; setVirtualization: (v: boolean) => void;
  clipboard: boolean; setClipboard: (v: boolean) => void; textWrap: boolean; setTextWrap: (v: boolean) => void;
  actionsColumn: boolean; setActionsColumn: (v: boolean) => void; actionEdit: boolean; setActionEdit: (v: boolean) => void;
  actionDelete: boolean; setActionDelete: (v: boolean) => void; actionKebab: boolean; setActionKebab: (v: boolean) => void;
  actionView: boolean; setActionView: (v: boolean) => void; actionExport: boolean; setActionExport: (v: boolean) => void;
  actionArchive: boolean; setActionArchive: (v: boolean) => void; playgroundEditMode: string; setPlaygroundEditMode: (v: string) => void; customColumn: boolean; setCustomColumn: (v: boolean) => void;
  customComponentType: string; setCustomComponentType: (v: string) => void; selectionToolbar: boolean; setSelectionToolbar: (v: boolean) => void;
  aggregatesEnabled: boolean; setAggregatesEnabled: (v: boolean) => void; aggregateType: string; setAggregateType: (v: string) => void;
  footerBorderWidth: string; setFooterBorderWidth: (v: string) => void; footerFontSize: string; setFooterFontSize: (v: string) => void;
  footerFontWeight: string; setFooterFontWeight: (v: string) => void; footerPadding: string; setFooterPadding: (v: string) => void;
  aggregates: AggregateRowConfig[] | undefined;
  columns: ColumnModel[]; data: Employee[]; gridKey: string;
  height: string | number; effectiveRowHeight: number; effectivePaging: boolean;
  frozenColumnCount: number; selectionSettings: SelectionSettingsModel | undefined; stateEntries: StateEntry[];
  currentPage: number; totalPages: number; pagedData: Employee[];
  handlePageChange: (page: number) => void; handlePageSizeChange: (size: number) => void;
  selectedIds: ReadonlySet<number>;
  selectedCount: number; selectedNames: string; selectedItems: SelectedItem[];
  handleRowSelected: (row: Record<string, unknown>) => void; handleRowDeselected: (row: Record<string, unknown>) => void;
  handleRemoveSelectedItem: (key: string) => void; handleClearAllSelected: () => void;
  currentPreset: string; applyPreset: (id: string) => void;
}

interface RawState {
  densityStr: string; setDensityStr: Setter<string>; isLoading: boolean; setIsLoading: Setter<boolean>;
  rowHeight: string; setRowHeight: Setter<string>; paginationMode: string; setPaginationMode: Setter<string>;
  paginationVariant: string; setPaginationVariant: Setter<string>; pageSize: string; setPageSize: Setter<string>;
  selectionType: string; setSelectionType: Setter<string>; selectionMode: string; setSelectionMode: Setter<string>;
  checkboxOnly: boolean; setCheckboxOnly: Setter<boolean>; sorting: boolean; setSorting: Setter<boolean>;
  filtering: boolean; setFiltering: Setter<boolean>; grouping: boolean; setGrouping: Setter<boolean>;
  resizing: boolean; setResizing: Setter<boolean>; reordering: boolean; setReordering: Setter<boolean>;
  columnChooser: boolean; setColumnChooser: Setter<boolean>; columnMenu: boolean; setColumnMenu: Setter<boolean>;
  frozenColumns: string; setFrozenColumns: Setter<string>; virtualization: boolean; setVirtualization: Setter<boolean>;
  clipboard: boolean; setClipboard: Setter<boolean>; textWrap: boolean; setTextWrap: Setter<boolean>;
  actionsColumn: boolean; setActionsColumn: Setter<boolean>; actionEdit: boolean; setActionEdit: Setter<boolean>;
  actionDelete: boolean; setActionDelete: Setter<boolean>; actionKebab: boolean; setActionKebab: Setter<boolean>;
  actionView: boolean; setActionView: Setter<boolean>; actionExport: boolean; setActionExport: Setter<boolean>;
  actionArchive: boolean; setActionArchive: Setter<boolean>;
  playgroundEditMode: string; setPlaygroundEditMode: Setter<string>;
  customColumn: boolean; setCustomColumn: Setter<boolean>; customComponentType: string; setCustomComponentType: Setter<string>;
  selectionToolbar: boolean; setSelectionToolbar: Setter<boolean>;
  aggregatesEnabled: boolean; setAggregatesEnabled: Setter<boolean>; aggregateType: string; setAggregateType: Setter<string>;
  footerBorderWidth: string; setFooterBorderWidth: Setter<string>; footerFontSize: string; setFooterFontSize: Setter<string>;
  footerFontWeight: string; setFooterFontWeight: Setter<string>; footerPadding: string; setFooterPadding: Setter<string>;
  currentPage: number; setCurrentPage: Setter<number>; selectedIds: Set<number>; setSelectedIds: Setter<Set<number>>;
  currentPreset: string; setCurrentPreset: Setter<string>;
}

function useRawState(): RawState {
  const [densityStr, setDensityStr] = useState('medium'); const [isLoading, setIsLoading] = useState(false);
  const [rowHeight, setRowHeight] = useState(String(DEFAULT_ROW_HEIGHT));
  const [paginationMode, setPaginationMode] = useState('BuiltIn'); const [paginationVariant, setPaginationVariant] = useState('default');
  const [pageSize, setPageSize] = useState(String(PAGE_SIZE_DEFAULT));
  const [selectionType, setSelectionType] = useState('None'); const [selectionMode, setSelectionMode] = useState('Row');
  const [checkboxOnly, setCheckboxOnly] = useState(false);
  const [sorting, setSorting] = useState(true); const [filtering, setFiltering] = useState(true);
  const [grouping, setGrouping] = useState(false); const [resizing, setResizing] = useState(true);
  const [reordering, setReordering] = useState(true); const [columnChooser, setColumnChooser] = useState(false);
  const [columnMenu, setColumnMenu] = useState(true); const [frozenColumns, setFrozenColumns] = useState('0');
  const [virtualization, setVirtualization] = useState(false);
  const [clipboard, setClipboard] = useState(false); const [textWrap, setTextWrap] = useState(false);
  const [actionsColumn, setActionsColumn] = useState(false); const [actionEdit, setActionEdit] = useState(true);
  const [actionDelete, setActionDelete] = useState(true); const [actionKebab, setActionKebab] = useState(true);
  const [actionView, setActionView] = useState(false); const [actionExport, setActionExport] = useState(false); const [actionArchive, setActionArchive] = useState(false);
  const [playgroundEditMode, setPlaygroundEditMode] = useState('modal');
  const [customColumn, setCustomColumn] = useState(false); const [customComponentType, setCustomComponentType] = useState<string>(CustomComponentType.AlertBadge);
  const [selectionToolbar, setSelectionToolbar] = useState(false); const [aggregatesEnabled, setAggregatesEnabled] = useState(false); const [aggregateType, setAggregateType] = useState('Sum');
  const [footerBorderWidth, setFooterBorderWidth] = useState(DEFAULT_FOOTER_BORDER_WIDTH); const [footerFontSize, setFooterFontSize] = useState(DEFAULT_FOOTER_FONT_SIZE);
  const [footerFontWeight, setFooterFontWeight] = useState(DEFAULT_FOOTER_FONT_WEIGHT); const [footerPadding, setFooterPadding] = useState(DEFAULT_FOOTER_PADDING);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set()); const [currentPreset, setCurrentPreset] = useState<string>(PlaygroundPresetId.Default);
  return { densityStr, setDensityStr, isLoading, setIsLoading, rowHeight, setRowHeight, paginationMode, setPaginationMode, paginationVariant, setPaginationVariant, pageSize, setPageSize, selectionType, setSelectionType, selectionMode, setSelectionMode, checkboxOnly, setCheckboxOnly, sorting, setSorting, filtering, setFiltering, grouping, setGrouping, resizing, setResizing, reordering, setReordering, columnChooser, setColumnChooser, columnMenu, setColumnMenu, frozenColumns, setFrozenColumns, virtualization, setVirtualization, clipboard, setClipboard, textWrap, setTextWrap, actionsColumn, setActionsColumn, actionEdit, setActionEdit, actionDelete, setActionDelete, actionKebab, setActionKebab, actionView, setActionView, actionExport, setActionExport, actionArchive, setActionArchive, playgroundEditMode, setPlaygroundEditMode, customColumn, setCustomColumn, customComponentType, setCustomComponentType, selectionToolbar, setSelectionToolbar, aggregatesEnabled, setAggregatesEnabled, aggregateType, setAggregateType, footerBorderWidth, setFooterBorderWidth, footerFontSize, setFooterFontSize, footerFontWeight, setFooterFontWeight, footerPadding, setFooterPadding, currentPage, setCurrentPage, selectedIds, setSelectedIds, currentPreset, setCurrentPreset };
}

interface DerivedState {
  columns: ColumnModel[]; effectivePaging: boolean; selectionSettings: SelectionSettingsModel | undefined;
  stateEntries: StateEntry[]; pagedData: Employee[]; totalPages: number; selectedCount: number; selectedNames: string; selectedItems: SelectedItem[]; aggregates: AggregateRowConfig[] | undefined;
}
function useDerivedState(raw: RawState): DerivedState {
  const data = useMemo<Employee[]>(() => (raw.virtualization ? generateVirtualData(VIRTUAL_ROW_COUNT) : EMPLOYEES), [raw.virtualization]);
  const columns = useMemo(() => {
    let base: ColumnModel[] = raw.aggregatesEnabled ? [...PLAYGROUND_COLUMNS, SALARY_COL] : PLAYGROUND_COLUMNS;
    if (raw.selectionType === 'Multiple') base = [CHECKBOX_COL, ...base];
    else if (raw.selectionType === 'Single') base = [RADIO_COL, ...base];
    return raw.actionsColumn ? [...base, ACTIONS_COL] : base;
  }, [raw.selectionType, raw.actionsColumn, raw.aggregatesEnabled]);
  const effectivePaging = raw.virtualization ? false : raw.paginationMode === 'BuiltIn';
  const selectionSettings = useMemo(() => buildSelectionSettings({ type: raw.selectionType, mode: raw.selectionMode, checkboxOnly: raw.checkboxOnly }), [raw.selectionType, raw.selectionMode, raw.checkboxOnly]);
  const pageSizeNum = Number(raw.pageSize);
  const totalPages = Math.ceil(data.length / pageSizeNum);
  const pagedData = useMemo(() => (raw.paginationMode === 'NativePagination' ? data.slice((raw.currentPage - 1) * pageSizeNum, raw.currentPage * pageSizeNum) : data), [raw.paginationMode, raw.currentPage, pageSizeNum, data]);
  const selectedCount = raw.selectedIds.size;
  const selectedNames = useMemo(() => getSelectedNames(data, raw.selectedIds), [data, raw.selectedIds]);
  const selectedItems = useMemo<SelectedItem[]>(() => {
    const ZERO = 0;
    if (raw.selectedIds.size === ZERO) return [];
    return data.filter((e) => raw.selectedIds.has(e.id)).map((e) => ({ key: String(e.id), label: e.name }));
  }, [data, raw.selectedIds]);
  const aggregates = useMemo(() => buildPlaygroundAggregates(raw.aggregatesEnabled, raw.aggregateType), [raw.aggregatesEnabled, raw.aggregateType]);
  const stateEntries = useMemo(() => buildStateEntries({ density: raw.densityStr, sorting: raw.sorting, filtering: raw.filtering, paginationMode: raw.paginationMode, selectionType: raw.selectionType, grouping: raw.grouping, virtualization: raw.virtualization, frozenColumns: raw.frozenColumns, dataLength: data.length, selectedCount, selectedNames, actionsColumn: raw.actionsColumn, customColumn: raw.customColumn, customComponentType: raw.customComponentType, selectionToolbar: raw.selectionToolbar, aggregatesEnabled: raw.aggregatesEnabled, aggregateType: raw.aggregateType }), [raw.densityStr, raw.sorting, raw.filtering, raw.paginationMode, raw.selectionType, raw.grouping, raw.virtualization, raw.frozenColumns, data.length, selectedCount, selectedNames, raw.actionsColumn, raw.customColumn, raw.customComponentType, raw.selectionToolbar, raw.aggregatesEnabled, raw.aggregateType]);
  return { columns, effectivePaging, selectionSettings, stateEntries, pagedData, totalPages, selectedCount, selectedNames, selectedItems, aggregates };
}

type Handlers = Pick<SyncfusionPlaygroundState, 'setDensity' | 'setRowHeight' | 'setPageSize' | 'handlePageChange' | 'handlePageSizeChange' | 'handleRowSelected' | 'handleRowDeselected' | 'setSelectionType' | 'setVirtualization' | 'setColumnMenu' | 'handleRemoveSelectedItem' | 'handleClearAllSelected' | 'setPaginationMode' | 'setCustomColumn' | 'setCustomComponentType' | 'setAggregatesEnabled' | 'setAggregateType' | 'setPlaygroundEditMode' | 'applyPreset'>;

function buildReturn(raw: RawState, density: GridDensity, derived: DerivedState, handlers: Handlers): SyncfusionPlaygroundState {
  return {
    density, isLoading: raw.isLoading, setIsLoading: raw.setIsLoading, rowHeight: raw.rowHeight, paginationMode: raw.paginationMode,
    paginationVariant: raw.paginationVariant, setPaginationVariant: raw.setPaginationVariant, pageSize: raw.pageSize, selectionType: raw.selectionType,
    selectionMode: raw.selectionMode, setSelectionMode: raw.setSelectionMode, checkboxOnly: raw.checkboxOnly, setCheckboxOnly: raw.setCheckboxOnly,
    sorting: raw.sorting, setSorting: raw.setSorting, filtering: raw.filtering, setFiltering: raw.setFiltering, grouping: raw.grouping, setGrouping: raw.setGrouping,
    resizing: raw.resizing, setResizing: raw.setResizing, reordering: raw.reordering, setReordering: raw.setReordering,
    columnChooser: raw.columnChooser, setColumnChooser: raw.setColumnChooser, columnMenu: raw.columnMenu, frozenColumns: raw.frozenColumns, setFrozenColumns: raw.setFrozenColumns,
    virtualization: raw.virtualization, clipboard: raw.clipboard, setClipboard: raw.setClipboard, textWrap: raw.textWrap, setTextWrap: raw.setTextWrap,
    actionsColumn: raw.actionsColumn, setActionsColumn: raw.setActionsColumn, actionEdit: raw.actionEdit, setActionEdit: raw.setActionEdit,
    actionDelete: raw.actionDelete, setActionDelete: raw.setActionDelete, actionKebab: raw.actionKebab, setActionKebab: raw.setActionKebab,
    actionView: raw.actionView, setActionView: raw.setActionView, actionExport: raw.actionExport, setActionExport: raw.setActionExport,
    actionArchive: raw.actionArchive, setActionArchive: raw.setActionArchive,
    playgroundEditMode: raw.playgroundEditMode, customColumn: raw.customColumn,
    customComponentType: raw.customComponentType, selectionToolbar: raw.selectionToolbar, setSelectionToolbar: raw.setSelectionToolbar,
    aggregatesEnabled: raw.aggregatesEnabled, aggregateType: raw.aggregateType,
    footerBorderWidth: raw.footerBorderWidth, setFooterBorderWidth: raw.setFooterBorderWidth, footerFontSize: raw.footerFontSize, setFooterFontSize: raw.setFooterFontSize,
    footerFontWeight: raw.footerFontWeight, setFooterFontWeight: raw.setFooterFontWeight, footerPadding: raw.footerPadding, setFooterPadding: raw.setFooterPadding,
    ...derived, data: derived.pagedData, selectedIds: raw.selectedIds, currentPage: raw.currentPage, currentPreset: raw.currentPreset, ...handlers,
    gridKey: `${raw.virtualization ? 'virtual' : 'normal'}-${raw.selectionType}${raw.paginationMode === 'NativePagination' ? `-np${raw.pageSize}` : ''}-${raw.customColumn ? `c${raw.customComponentType}` : 'nc'}-${raw.aggregatesEnabled ? `agg${raw.aggregateType}` : 'na'}-${raw.playgroundEditMode}`,
    height: raw.virtualization ? GRID_HEIGHT_VIRTUAL : 'auto', effectiveRowHeight: Number(raw.rowHeight), frozenColumnCount: Number(raw.frozenColumns),
  };
}

function applyPresetToRaw(raw: RawState, p: SyncfusionPresetValues): void {
  raw.setDensityStr(p.densityStr); raw.setIsLoading(p.isLoading); raw.setRowHeight(p.rowHeight); raw.setPaginationMode(p.paginationMode); raw.setPaginationVariant(p.paginationVariant); raw.setPageSize(p.pageSize); raw.setSelectionType(p.selectionType); raw.setSelectionMode(p.selectionMode); raw.setCheckboxOnly(p.checkboxOnly); raw.setSorting(p.sorting); raw.setFiltering(p.filtering); raw.setGrouping(p.grouping); raw.setResizing(p.resizing); raw.setReordering(p.reordering); raw.setColumnChooser(p.columnChooser); raw.setColumnMenu(p.columnMenu);
  raw.setFrozenColumns(p.frozenColumns); raw.setVirtualization(p.virtualization); raw.setClipboard(p.clipboard); raw.setTextWrap(p.textWrap); raw.setActionsColumn(p.actionsColumn); raw.setActionEdit(p.actionEdit); raw.setActionDelete(p.actionDelete); raw.setActionKebab(p.actionKebab); raw.setActionView(p.actionView); raw.setActionExport(p.actionExport); raw.setActionArchive(p.actionArchive); raw.setPlaygroundEditMode(p.playgroundEditMode); raw.setCustomColumn(p.customColumn); raw.setCustomComponentType(p.customComponentType);
  raw.setSelectionToolbar(p.selectionToolbar); raw.setAggregatesEnabled(p.aggregatesEnabled); raw.setAggregateType(p.aggregateType); raw.setFooterBorderWidth(p.footerBorderWidth); raw.setFooterFontSize(p.footerFontSize); raw.setFooterFontWeight(p.footerFontWeight); raw.setFooterPadding(p.footerPadding);
}

export function useSyncfusionPlaygroundState(): SyncfusionPlaygroundState {
  const raw = useRawState();
  const density = DENSITY_MAP[raw.densityStr] ?? GridDensity.Medium;
  const derived = useDerivedState(raw);
  const { setCurrentPage, setPageSize: setPageSizeRaw, setSelectedIds, setSelectionType: setSelTypeRaw, setDensityStr, setRowHeight: setRowHeightRaw, setVirtualization: setVirtRaw, setColumnMenu: setColMenuRaw, setPaginationMode: setPaginationModeRaw, setCustomColumn: setCustomColRaw, setCustomComponentType: setCustomCompTypeRaw, setAggregatesEnabled: setAggEnabledRaw, setAggregateType: setAggTypeRaw, setPlaygroundEditMode: setEditModeRaw } = raw;
  const setDensity = useCallback((v: string) => { setDensityStr(v); const m = DENSITY_MAP[v]; if (isValueDefined(m)) setRowHeightRaw(String(GRID_DENSITY_ROW_HEIGHT[m])); }, [setDensityStr, setRowHeightRaw]);
  const setRowHeight = useCallback((v: string) => { setRowHeightRaw(v); const d = ROW_HEIGHT_TO_DENSITY[Number(v)]; if (isValueDefined(d)) setDensityStr(d); }, [setRowHeightRaw, setDensityStr]);
  /* Defer all gridKey-changing state updates to the next task so the grid remount
     happens after Syncfusion's document-level click handler finishes, preventing
     ColumnMenu.restoreFocus from accessing a destroyed FocusStrategy. */
  const setSelectionType = useCallback((v: string) => { setTimeout(() => { setSelTypeRaw(v); if (v === 'None') setSelectedIds(new Set()); }, 0); }, [setSelTypeRaw, setSelectedIds]);
  const setPageSize = useCallback((v: string) => { setTimeout(() => { setPageSizeRaw(v); setCurrentPage(INITIAL_PAGE); }, 0); }, [setPageSizeRaw, setCurrentPage]);
  const handlePageChange = useCallback((page: number) => setCurrentPage(page), [setCurrentPage]);
  const handlePageSizeChange = useCallback((size: number) => { setTimeout(() => { setPageSizeRaw(String(size)); setCurrentPage(INITIAL_PAGE); }, 0); }, [setPageSizeRaw, setCurrentPage]);
  const setVirtualization = useCallback((v: boolean) => { setTimeout(() => { setVirtRaw(v); if (v) setColMenuRaw(false); }, 0); }, [setVirtRaw, setColMenuRaw]);
  const setColumnMenu = useCallback((v: boolean) => { setColMenuRaw(v); if (v) setVirtRaw(false); }, [setColMenuRaw, setVirtRaw]);
  const setPaginationMode = useCallback((v: string) => { setTimeout(() => setPaginationModeRaw(v), 0); }, [setPaginationModeRaw]);
  const setCustomColumn = useCallback((v: boolean) => { setTimeout(() => setCustomColRaw(v), 0); }, [setCustomColRaw]);
  const setCustomComponentType = useCallback((v: string) => { setTimeout(() => setCustomCompTypeRaw(v), 0); }, [setCustomCompTypeRaw]);
  const setAggregatesEnabled = useCallback((v: boolean) => { setTimeout(() => setAggEnabledRaw(v), 0); }, [setAggEnabledRaw]);
  const setAggregateType = useCallback((v: string) => { setTimeout(() => setAggTypeRaw(v), 0); }, [setAggTypeRaw]);
  const setPlaygroundEditMode = useCallback((v: string) => { setTimeout(() => setEditModeRaw(v), 0); }, [setEditModeRaw]);
  const isSingleSel = raw.selectionType === 'Single';
  const handleRowSelected = useCallback((row: Record<string, unknown>) => { setSelectedIds((prev) => { const next = isSingleSel ? new Set<number>() : new Set(prev); for (const r of toEmployeeRows(row)) next.add(Number(r['id'])); return next; }); }, [setSelectedIds, isSingleSel]);
  const handleRowDeselected = useCallback((row: Record<string, unknown>) => { setSelectedIds((prev) => { const next = new Set(prev); for (const r of toEmployeeRows(row)) next.delete(Number(r['id'])); return next; }); }, [setSelectedIds]);
  const handleRemoveSelectedItem = useCallback((key: string) => { setSelectedIds((prev) => { const next = new Set(prev); next.delete(Number(key)); return next; }); }, [setSelectedIds]);
  const handleClearAllSelected = useCallback(() => { setSelectedIds(new Set()); }, [setSelectedIds]);
  const applyPreset = useCallback((id: string) => { const p = SYNCFUSION_PRESETS[id]; if (!p) return; setTimeout(() => { applyPresetToRaw(raw, p); raw.setCurrentPreset(id); raw.setCurrentPage(INITIAL_PAGE); raw.setSelectedIds(new Set()); }, 0); }, [raw]);
  return buildReturn(raw, density, derived, { setDensity, setRowHeight, setPageSize, handlePageChange, handlePageSizeChange, handleRowSelected, handleRowDeselected, setSelectionType, setVirtualization, setColumnMenu, handleRemoveSelectedItem, handleClearAllSelected, setPaginationMode, setCustomColumn, setCustomComponentType, setAggregatesEnabled, setAggregateType, setPlaygroundEditMode, applyPreset });
}
