/** Code snippet builder for the Syncfusion Grid playground. */
import { GridDensity } from '@/components/ui/shared/GridDensity';

import { CustomComponentType } from '../../../shared/CustomComponentType';
import { DEFAULT_FOOTER_BORDER_WIDTH, DEFAULT_FOOTER_FONT_SIZE, DEFAULT_FOOTER_FONT_WEIGHT, DEFAULT_FOOTER_PADDING } from '../../../shared/footerStyleOptions';

interface SyncfusionSnippetState {
  density: string; isLoading: boolean; rowHeight: string;
  paginationMode: string; paginationVariant: string; pageSize: string;
  selectionType: string; selectionMode: string; checkboxOnly: boolean;
  sorting: boolean; filtering: boolean; grouping: boolean;
  resizing: boolean; reordering: boolean; columnChooser: boolean;
  columnMenu: boolean; frozenColumns: string; virtualization: boolean;
  clipboard: boolean; textWrap: boolean;
  actionsColumn?: boolean; actionEdit?: boolean; actionDelete?: boolean;
  actionView?: boolean; actionExport?: boolean; actionArchive?: boolean;
  customColumn?: boolean; customComponentType?: string;
  selectionToolbar?: boolean; aggregatesEnabled?: boolean; aggregateType?: string;
  footerBorderWidth?: string; footerFontSize?: string;
  footerFontWeight?: string; footerPadding?: string;
  playgroundEditMode?: string;
}

export function buildSyncfusionCodeSnippet(s: SyncfusionSnippetState): string {
  const imports = buildImportsSection(s);
  const setup = buildSetupSection(s);
  const jsx = s.paginationMode === 'NativePagination' ? buildNativePaginationJsx(s) : buildStandardJsx(s);
  return [imports.join('\n'), '', setup.join('\n'), '', jsx].join('\n');
}
function buildImportsSection(s: SyncfusionSnippetState): string[] {
  const lines = ["import type { ColumnModel } from '@syncfusion/ej2-grids';", "import { DataGrid } from '@/components/ui/syncfusion';"];
  const needsUseState = s.paginationMode === 'NativePagination' || s.selectionType !== 'None';
  if (needsUseState) lines.push("import { useState } from 'react';");
  if (s.density !== String(GridDensity.Medium)) lines.push("import { GridDensity } from '@/components/ui/shared/GridDensity';");
  if (s.selectionToolbar === true && s.selectionType !== 'None') {
    lines.push("import { GridSelectionToolbar } from '@/components/ui/native';");
    lines.push("import type { SelectedItem } from '@/components/ui/native';");
  }
  if (s.paginationMode === 'NativePagination') {
    lines.push("import { NativePagination } from '@/features/components/shared/NativePagination';");
    if (s.paginationVariant !== 'default') lines.push("import { PaginationVariant } from '@/features/components/shared/NativePagination/types';");
  }
  return lines;
}
function buildSetupSection(s: SyncfusionSnippetState): string[] {
  const isModalActions = s.actionsColumn === true && s.playgroundEditMode !== 'inline';
  const lines: string[] = ['interface Row { id: number; name: string; email: string; role: string; status: string }', ''];
  if (isModalActions) {
    if (s.actionEdit === true) lines.push('const handleEdit = (row: Row) => { /* your edit logic */ };');
    if (s.actionDelete === true) lines.push('const handleDelete = (row: Row) => { /* your delete logic */ };');
    if (s.actionView === true) lines.push('const handleView = (row: Row) => { /* view row details */ };');
    if (s.actionExport === true) lines.push('const handleExport = (row: Row) => { /* export row */ };');
    if (s.actionArchive === true) lines.push('const handleArchive = (row: Row) => { /* archive row */ };');
    lines.push('');
  }
  lines.push('const columns: ColumnModel[] = [',
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
function appendActionsColumnDef(lines: string[], s: SyncfusionSnippetState): void {
  if (s.actionsColumn !== true) return;
  if (s.playgroundEditMode !== 'inline') {
    const btns: string[] = [];
    if (s.actionEdit === true) btns.push('        <button onClick={() => handleEdit(row)}>Edit</button>');
    if (s.actionDelete === true) btns.push('        <button onClick={() => handleDelete(row)}>Delete</button>');
    if (s.actionView === true) btns.push('        <button onClick={() => handleView(row)}>View</button>');
    if (s.actionExport === true) btns.push('        <button onClick={() => handleExport(row)}>Export</button>');
    if (s.actionArchive === true) btns.push('        <button onClick={() => handleArchive(row)}>Archive</button>');
    if (btns.length > 0) lines.push("  {", "    field: 'actions',", "    headerText: 'Actions',", '    width: 180,',
      '    template: (row) => (', '      <div onClick={(e) => e.stopPropagation()}>',
      ...btns, '      </div>', '    ),', '  },');
  } else {
    const cmds: string[] = [];
    if (s.actionEdit === true) cmds.push("{ type: 'Edit', buttonOption: { cssClass: 'e-flat' } }");
    if (s.actionDelete === true) cmds.push("{ type: 'Delete', buttonOption: { cssClass: 'e-flat' } }");
    cmds.push("{ type: 'Save', buttonOption: { cssClass: 'e-flat e-primary' } }", "{ type: 'Cancel', buttonOption: { cssClass: 'e-flat' } }");
    lines.push(`  { field: 'actions', headerText: '', width: 120, commands: [${cmds.join(', ')}] },`);
  }
}
function appendHandlerStubs(lines: string[], s: SyncfusionSnippetState): void {
  if (s.selectionType !== 'None')
    lines.push('', 'const [selectedRows, setSelectedRows] = useState<Row[]>([]);',
      'const handleRowSelected = (args: { data: Row }) => { setSelectedRows((prev) => [...prev, args.data]); };',
      'const handleRowDeselected = (args: { data: Row }) => { setSelectedRows((prev) => prev.filter((r) => r.id !== args.data.id)); };');
  if (s.playgroundEditMode === 'inline' && s.actionsColumn === true)
    lines.push('', 'const handleActionComplete = (args) => { /* handle inline save/delete */ };');
  if (s.selectionToolbar === true && s.selectionType !== 'None')
    lines.push('', 'const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);',
      'const selectedCount = selectedItems.length;',
      'const handleRemove = (item: SelectedItem) => { /* remove from selection */ };',
      'const handleClearAll = () => { /* clear all selections */ };');
  if (s.paginationMode === 'NativePagination')
    lines.push('', 'const handlePageChange = (newPage: number) => setPage(newPage);',
      'const handlePageSizeChange = (newSize: number) => { /* update page size */ };');
}
function buildStandardJsx(s: SyncfusionSnippetState): string {
  const toolbarLines = buildSelectionToolbarSnippet(s);
  const lines = [...toolbarLines, '<DataGrid', '  columns={columns}', '  data={data}'];
  if (s.density !== String(GridDensity.Medium)) lines.push(`  density={GridDensity.${capitalize(s.density)}}`);
  if (s.isLoading) lines.push('  isLoading');
  if (s.rowHeight !== '40') lines.push(`  rowHeight={${s.rowHeight}}`);
  appendBooleanProps(lines, s);
  appendConfigProps(lines, s);
  appendCallbackProps(lines, s);
  appendAggregateSnippet(lines, s);
  lines.push('/>');
  return lines.join('\n');
}
function buildNativePaginationJsx(s: SyncfusionSnippetState): string {
  const toolbarLines = buildSelectionToolbarSnippet(s);
  const lines = [...toolbarLines, '<DataGrid', '  columns={columns}', '  data={pagedData}', '  allowPaging={false}'];
  if (s.sorting) lines.push('  allowSorting');
  if (s.filtering) lines.push('  allowFiltering');
  appendCallbackProps(lines, s);
  appendAggregateSnippet(lines, s);
  lines.push('/>', '<NativePagination', '  currentPage={page}', '  totalPages={totalPages}',
    `  pageSize={${s.pageSize}}`, '  totalItems={data.length}');
  if (s.paginationVariant !== 'default') lines.push(`  variant={PaginationVariant.${variantEnumName(s.paginationVariant)}}`);
  lines.push('  onPageChange={handlePageChange}', '  onPageSizeChange={handlePageSizeChange}', '/>');
  return lines.join('\n');
}
function buildSelectionToolbarSnippet(s: SyncfusionSnippetState): string[] {
  if (s.selectionToolbar !== true || s.selectionType === 'None') return [];
  return [
    '<GridSelectionToolbar', '  showCheckIcon', '  selectedCount={selectedCount}',
    '  selectedItems={selectedItems}', '  onRemoveItem={handleRemove}', '  onClearAll={handleClearAll}', '/>',
  ];
}
function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }
const VARIANT_NAMES: Record<string, string> = { noPageSize: 'NoPageSize', compact: 'Compact' };
function variantEnumName(v: string): string { return VARIANT_NAMES[v] ?? 'Default'; }
function appendBooleanProps(lines: string[], s: SyncfusionSnippetState): void {
  if (s.sorting) lines.push('  allowSorting');
  if (s.filtering) lines.push('  allowFiltering');
  if (s.paginationMode === 'BuiltIn') lines.push('  allowPaging');
  if (s.grouping) lines.push('  allowGrouping');
  if (s.resizing) lines.push('  allowResizing');
  if (s.reordering) lines.push('  allowReordering');
  if (s.textWrap) lines.push('  allowTextWrap');
  if (s.columnChooser) lines.push('  showColumnChooser');
  if (s.columnMenu) lines.push('  showColumnMenu');
  if (s.clipboard) lines.push('  enableClipboard');
  if (s.virtualization) lines.push('  enableVirtualization');
}
function appendCallbackProps(lines: string[], s: SyncfusionSnippetState): void {
  if (s.selectionType !== 'None') {
    lines.push('  onRowSelected={handleRowSelected}');
    lines.push('  onRowDeselected={handleRowDeselected}');
  }
  if (s.playgroundEditMode === 'inline' && s.actionsColumn === true) lines.push('  onActionComplete={handleActionComplete}');
}
function appendAggregateSnippet(lines: string[], s: SyncfusionSnippetState): void {
  if (s.aggregatesEnabled !== true) return;
  const aggType = s.aggregateType ?? 'Sum';
  lines.push(`  aggregates={[{ columns: [{ field: "salary", type: "${aggType}", footerTemplate: "${aggType}: \${${aggType}}" }] }]}`);
  appendFooterStyleSnippet(lines, s);
}
function appendFooterStyleSnippet(lines: string[], s: SyncfusionSnippetState): void {
  const overrides: string[] = [];
  if (s.footerBorderWidth !== DEFAULT_FOOTER_BORDER_WIDTH) overrides.push(`footerBorderWidth: "${s.footerBorderWidth}"`);
  if (s.footerFontSize !== DEFAULT_FOOTER_FONT_SIZE) overrides.push(`footerFontSize: "${s.footerFontSize}"`);
  if (s.footerFontWeight !== DEFAULT_FOOTER_FONT_WEIGHT) overrides.push(`footerFontWeight: "${s.footerFontWeight}"`);
  if (s.footerPadding !== DEFAULT_FOOTER_PADDING) overrides.push(`footerPadding: "${s.footerPadding}"`);
  if (overrides.length > 0) lines.push(`  themeOverrides={{ ${overrides.join(', ')} }}`);
}
function appendConfigProps(lines: string[], s: SyncfusionSnippetState): void {
  if (s.paginationMode === 'BuiltIn') lines.push(`  pageSettings={{ pageSize: ${s.pageSize} }}`);
  if (s.selectionType !== 'None') {
    const parts = [`type: "${s.selectionType}"`, `mode: "${s.selectionMode}"`];
    if (s.checkboxOnly) parts.push('checkboxOnly: true');
    lines.push(`  selectionSettings={{ ${parts.join(', ')} }}`);
  }
  if (s.frozenColumns !== '0') lines.push(`  frozenColumns={${s.frozenColumns}}`);
  if (s.virtualization) lines.push('  height={400}');
  if (s.actionsColumn === true && s.playgroundEditMode === 'inline') {
    const editParts: string[] = [];
    if (s.actionEdit === true) editParts.push('allowEditing: true');
    if (s.actionDelete === true) editParts.push('allowDeleting: true');
    if (editParts.length > 0) lines.push(`  editSettings={{ ${editParts.join(', ')}, mode: "Normal" }}`);
  }
  if (s.customColumn === true)
    lines.push(`  {/* Custom column: ${s.customComponentType ?? CustomComponentType.AlertBadge} template */}`);
}
