// DataGrid-specific CSS variable injection

import { isValueDefined } from '@/utils/is';

import { DATA_GRID_CSS_VAR_MAP, VarFormat } from './dataGridVarMap';

import type { DataGridConfig, ComponentConfigSingle } from '../types';

export function injectDataGridVariables(root: HTMLElement, c: ComponentConfigSingle): void {
  const dg = c.dataGrid;

  for (const [field, entry] of Object.entries(DATA_GRID_CSS_VAR_MAP)) {
    const value = getFieldValue(dg, field);
    if (!isValueDefined(value)) continue;
    const formatted = entry.format === VarFormat.Rgb ? `rgb(${value})` : String(value);
    root.style.setProperty(entry.varName, formatted);
  }
}

function getFieldValue(dg: DataGridConfig, field: string): string | number | undefined {
  if (field in dg) return dg[field as keyof DataGridConfig]; // eslint-disable-line @typescript-eslint/consistent-type-assertions -- safe: checked with `in`
  return undefined;
}
