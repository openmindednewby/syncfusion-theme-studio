/** Code snippet builder for the Native Grid playground. */
import { GridDensity } from '@/components/ui/shared/GridDensity';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { DEFAULT_FOOTER_BORDER_WIDTH, DEFAULT_FOOTER_FONT_SIZE, DEFAULT_FOOTER_FONT_WEIGHT, DEFAULT_FOOTER_PADDING } from '../../../shared/footerStyleOptions';

interface NativeSnippetState {
  density: string; striped: boolean; hoverable: boolean; compact: boolean;
  selectionType: string; selectionMode: string; checkbox: boolean;
  editMode: string; filterEnabled: boolean; filterType: string;
  paginationMode: string; paginationVariant: string; pageSize: string;
  columnMenu: boolean; groupEnabled: boolean;
  actionsColumn?: boolean; actionEdit?: boolean; actionDelete?: boolean;
  actionView?: boolean; actionExport?: boolean; actionArchive?: boolean;
  customColumn?: boolean; customComponentType?: string;
  selectionToolbar?: boolean; aggregatesEnabled?: boolean; aggregateType?: string;
  footerBorderWidth?: string; footerFontSize?: string;
  footerFontWeight?: string; footerPadding?: string;
  playgroundEditMode?: string;
}

export function buildNativeCodeSnippet(s: NativeSnippetState): string {
  const imports = buildImportsSection(s);
  const setup = buildSetupSection(s);
  const jsx = s.paginationMode === 'NativePagination' ? buildNativePaginationJsx(s) : buildStandardJsx(s);
  return [imports.join('\n'), '', setup.join('\n'), '', jsx].join('\n');
}

const needsUseState = (s: NativeSnippetState): boolean => s.paginationMode === 'NativePagination' || s.selectionType !== 'None';
function buildImportsSection(s: NativeSnippetState): string[] {
  const lines = ["import { TableNative } from '@/components/ui/native';", "import type { TableColumn } from '@/components/ui/native';"];
  if (needsUseState(s)) lines.push("import { useState } from 'react';");
  if (s.density !== String(GridDensity.Medium)) lines.push("import { GridDensity } from '@/components/ui/shared/GridDensity';");
  if (s.selectionType !== 'None') lines.push("import type { SelectionConfig } from '@/components/ui/native';");
  const hasActionEditing = s.actionsColumn === true && (s.actionEdit === true || s.actionDelete === true);
  if (s.editMode !== 'None' || hasActionEditing) lines.push("import type { EditingConfig } from '@/components/ui/native';");
  if (s.filterEnabled) lines.push("import { FilterType } from '@/components/ui/native';");
  if (s.aggregatesEnabled === true) lines.push("import { AggregateType } from '@/components/ui/native';");
  if (s.groupEnabled) lines.push("import type { GroupingConfig } from '@/components/ui/native';");
  if (s.selectionToolbar === true && s.selectionType !== 'None') lines.push("import { GridSelectionToolbar } from '@/components/ui/native';", "import type { SelectedItem } from '@/components/ui/native';");
  if (s.paginationMode === 'NativePagination') {
    lines.push("import { NativePagination } from '@/features/components/shared/NativePagination';");
    if (s.paginationVariant !== 'default') lines.push("import { PaginationVariant } from '@/features/components/shared/NativePagination/types';");
  }
  return lines;
}
function buildSetupSection(s: NativeSnippetState): string[] {
  const hasActions = s.actionsColumn === true;
  const lines: string[] = ['interface Row { id: number; name: string; email: string; role: string; status: string }', ''];
  if (hasActions) {
    if (s.actionEdit === true) lines.push('const handleEdit = (row: Row) => { /* your edit logic */ };');
    if (s.actionDelete === true) lines.push('const handleDelete = (row: Row) => { /* your delete logic */ };');
    if (s.actionView === true) lines.push('const handleView = (row: Row) => { /* view row details */ };');
    if (s.actionExport === true) lines.push('const handleExport = (row: Row) => { /* export row */ };');
    if (s.actionArchive === true) lines.push('const handleArchive = (row: Row) => { /* archive row */ };');
    lines.push('');
  }
  lines.push('const columns: TableColumn[] = [',
    "  { field: 'id', headerText: 'ID', width: 80, isPrimaryKey: true },",
    "  { field: 'name', headerText: 'Name', width: 150 },",
    "  { field: 'email', headerText: 'Email', width: 200 },",
    "  { field: 'role', headerText: 'Role', width: 120 },",
    "  { field: 'status', headerText: 'Status', width: 100 },");
  appendActionsColumnDef(lines, s);
  lines.push('];', '', 'const data: Row[] = [', "  { id: 1, name: 'Jane Cooper', email: 'jane@example.com', role: 'Admin', status: 'Active' },", '];');
  if (s.paginationMode === 'NativePagination') {
    lines.push('const [page, setPage] = useState(1);', `const pageSize = ${s.pageSize};`);
    lines.push('const totalPages = Math.ceil(data.length / pageSize);');
    lines.push('const pagedData = data.slice((page - 1) * pageSize, page * pageSize);');
  }
  appendHandlerStubs(lines, s);
  return lines;
}
function appendActionsColumnDef(lines: string[], s: NativeSnippetState): void {
  if (s.actionsColumn !== true) return;
  const btns: string[] = [];
  if (s.actionEdit === true) btns.push('        <button onClick={() => handleEdit(row)}>Edit</button>');
  if (s.actionDelete === true) btns.push('        <button onClick={() => handleDelete(row)}>Delete</button>');
  if (s.actionView === true) btns.push('        <button onClick={() => handleView(row)}>View</button>');
  if (s.actionExport === true) btns.push('        <button onClick={() => handleExport(row)}>Export</button>');
  if (s.actionArchive === true) btns.push('        <button onClick={() => handleArchive(row)}>Archive</button>');
  if (btns.length > 0)
    lines.push("  {", "    field: 'actions',", "    headerText: 'Actions',", '    width: 180,',
      '    template: (row) => (', '      <div onClick={(e) => e.stopPropagation()}>',
      ...btns, '      </div>', '    ),', '  },');
}
function appendHandlerStubs(lines: string[], s: NativeSnippetState): void {
  if (s.selectionType !== 'None')
    lines.push('', 'const [selectedRows, setSelectedRows] = useState<Row[]>([]);',
      'const handleSelectionChange = (selected: Row[]) => { setSelectedRows(selected); };');
  const hasInlineEdit = s.playgroundEditMode === 'inline' && s.actionsColumn === true;
  if (s.editMode !== 'None' || hasInlineEdit) {
    lines.push('', 'const handleSave = (row: Row) => { /* handle save */ };');
    if (s.actionsColumn !== true) lines.push('const handleDelete = (row: Row) => { /* handle delete */ };');
  }
  if (s.groupEnabled)
    lines.push('', 'const handleGroupChange = (groups: string[]) => { /* handle group change */ };');
  if (s.selectionToolbar === true && s.selectionType !== 'None')
    lines.push('', 'const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);',
      'const selectedCount = selectedItems.length;',
      'const handleRemove = (item: SelectedItem) => { /* remove from selection */ };',
      'const handleClearAll = () => { /* clear all selections */ };');
  if (s.paginationMode === 'NativePagination')
    lines.push('', 'const handlePageChange = (newPage: number) => setPage(newPage);',
      'const handlePageSizeChange = (newSize: number) => { /* update page size */ };');
}
function buildStandardJsx(s: NativeSnippetState): string {
  const toolbarLines = buildSelectionToolbarSnippet(s);
  const lines = [...toolbarLines, '<TableNative', '  columns={columns}', '  data={data}'];
  if (s.density !== String(GridDensity.Medium)) lines.push(`  density={GridDensity.${capitalize(s.density)}}`);
  if (s.striped) lines.push('  striped');
  if (s.hoverable) lines.push('  hoverable');
  if (s.compact) lines.push('  compact');
  appendSelectionProps(lines, s);
  appendEditConfigProp(lines, s);
  appendGridConfigProps(lines, s);
  if (s.groupEnabled) lines.push('  groupConfig={{ showDropArea: true }}');
  if (s.columnMenu) lines.push('  showColumnMenu');
  appendCallbackProps(lines, s);
  appendAggregateSnippet(lines, s);
  if (s.customColumn === true)
    lines.push(`  {/* Custom column: ${s.customComponentType ?? CustomComponentType.AlertBadge} template */}`);
  lines.push('/>');
  return lines.join('\n');
}
function appendEditConfigProp(lines: string[], s: NativeSnippetState): void {
  const isActionsInline = s.actionsColumn === true && s.playgroundEditMode === 'inline';
  if (s.editMode !== 'None' && !isActionsInline)
    lines.push(`  editConfig={{ mode: "${s.editMode}", allowEditing: true, allowDeleting: true }}`);
  if (isActionsInline) {
    const editParts: string[] = [];
    if (s.actionEdit === true) editParts.push('allowEditing: true');
    if (s.actionDelete === true) editParts.push('allowDeleting: true');
    if (editParts.length > 0) lines.push(`  editConfig={{ ${editParts.join(', ')}, mode: "Normal" }}`);
  }
}
function buildNativePaginationJsx(s: NativeSnippetState): string {
  const toolbarLines = buildSelectionToolbarSnippet(s);
  const lines = [...toolbarLines, '<TableNative', '  columns={columns}', '  data={pagedData}'];
  if (s.striped) lines.push('  striped');
  if (s.hoverable) lines.push('  hoverable');
  appendCallbackProps(lines, s);
  appendAggregateSnippet(lines, s);
  lines.push('/>', '<NativePagination', '  currentPage={page}', '  totalPages={totalPages}',
    `  pageSize={${s.pageSize}}`, '  totalItems={data.length}');
  if (s.paginationVariant !== 'default') lines.push(`  variant={PaginationVariant.${variantEnumName(s.paginationVariant)}}`);
  lines.push('  onPageChange={handlePageChange}', '  onPageSizeChange={handlePageSizeChange}', '/>');
  return lines.join('\n');
}
function buildSelectionToolbarSnippet(s: NativeSnippetState): string[] {
  if (s.selectionToolbar !== true || s.selectionType === 'None') return [];
  return [
    '<GridSelectionToolbar', '  showCheckIcon', '  selectedCount={selectedCount}',
    '  selectedItems={selectedItems}', '  onRemoveItem={handleRemove}', '  onClearAll={handleClearAll}', '/>',
  ];
}
function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

const VARIANT_NAMES: Record<string, string> = { noPageSize: 'NoPageSize', compact: 'Compact' };
function variantEnumName(v: string): string { return VARIANT_NAMES[v] ?? 'Default'; }

function appendCallbackProps(lines: string[], s: NativeSnippetState): void {
  if (s.selectionType !== 'None') lines.push('  onSelectionChange={handleSelectionChange}');
  const hasInlineEdit = s.playgroundEditMode === 'inline' && s.actionsColumn === true;
  if (s.editMode !== 'None' || hasInlineEdit) { lines.push('  onSave={handleSave}'); lines.push('  onDelete={handleDelete}'); }
  if (s.groupEnabled) lines.push('  onGroupChange={handleGroupChange}');
}

function appendAggregateSnippet(lines: string[], s: NativeSnippetState): void {
  if (s.aggregatesEnabled !== true) return;
  const aggType = s.aggregateType ?? 'Sum';
  lines.push(`  aggregates={[{ columns: [{ field: "salary", type: AggregateType.${aggType} }] }]}`);
  appendFooterStyleSnippet(lines, s);
}

function appendFooterStyleSnippet(lines: string[], s: NativeSnippetState): void {
  const overrides: string[] = [];
  if (s.footerBorderWidth !== DEFAULT_FOOTER_BORDER_WIDTH) overrides.push(`footerBorderWidth: "${s.footerBorderWidth}"`);
  if (s.footerFontSize !== DEFAULT_FOOTER_FONT_SIZE) overrides.push(`footerFontSize: "${s.footerFontSize}"`);
  if (s.footerFontWeight !== DEFAULT_FOOTER_FONT_WEIGHT) overrides.push(`footerFontWeight: "${s.footerFontWeight}"`);
  if (s.footerPadding !== DEFAULT_FOOTER_PADDING) overrides.push(`footerPadding: "${s.footerPadding}"`);
  if (overrides.length > 0) lines.push(`  themeOverrides={{ ${overrides.join(', ')} }}`);
}

function appendSelectionProps(lines: string[], s: NativeSnippetState): void {
  if (s.selectionType === 'None') return;
  const parts = [`type: "${s.selectionType}"`, `mode: "${s.selectionMode}"`];
  if (s.checkbox) parts.push('checkbox: true');
  lines.push(`  selectionConfig={{ ${parts.join(', ')} }}`);
}

function appendGridConfigProps(lines: string[], s: NativeSnippetState): void {
  const isBuiltIn = s.paginationMode === 'BuiltIn';
  const hasConfig = s.filterEnabled || isBuiltIn || s.columnMenu;
  if (!hasConfig) return;
  const parts: string[] = [];
  if (s.filterEnabled) parts.push(`filter: { enabled: true, type: FilterType.${s.filterType} }`);
  if (isBuiltIn) parts.push(`pagination: { enabled: true, pageSize: ${s.pageSize} }`);
  if (s.columnMenu) parts.push('columnMenu: { enabled: true }');
  lines.push(`  gridConfig={{ ${parts.join(', ')} }}`);
}
