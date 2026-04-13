/**
 * Hook that produces scoped CSS variable overrides for grid components.
 * Wrap a grid in a `<div style={overrides}>` to override `:root` theme values per-instance.
 */
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

import { DATA_GRID_CSS_VAR_MAP, VarFormat } from '@/stores/theme/injectors/dataGridVarMap';
import type { DataGridConfig } from '@/stores/theme/types';
import { isValueDefined } from '@/utils/is';

import { type GridDensity } from './GridDensity';
import { GRID_DENSITY_ROW_HEIGHT } from './gridDensityMap';

interface GridStyleOverridesInput {
  density?: GridDensity;
  themeOverrides?: Partial<DataGridConfig>;
}

function buildCssVars(density: GridDensity | undefined, themeOverrides: Partial<DataGridConfig> | undefined): CSSProperties | undefined {
  const vars: Record<string, string> = {};
  let hasEntries = false;

  if (isValueDefined(density)) {
    vars['--component-datagrid-row-height'] = `${GRID_DENSITY_ROW_HEIGHT[density]}px`;
    hasEntries = true;
  }

  if (isValueDefined(themeOverrides))
    for (const [field, value] of Object.entries(themeOverrides)) {
      const entry = DATA_GRID_CSS_VAR_MAP[field];
      if (!isValueDefined(entry)) continue;
      vars[entry.varName] = entry.format === VarFormat.Rgb ? `rgb(${value})` : String(value);
      hasEntries = true;
    }

  // CSS custom properties are valid in React's CSSProperties via index signature
  return hasEntries ? vars : undefined;
}

export function useGridStyleOverrides({ density, themeOverrides }: GridStyleOverridesInput): CSSProperties | undefined {
  return useMemo(() => buildCssVars(density, themeOverrides), [density, themeOverrides]);
}
