// Theme update and export/import actions

import { isValueDefined } from '@/utils/is';

import { DEFAULT_THEME } from '../utils/defaultTheme';
import { injectThemeVariables } from '../utils/themeInjector';

import type { ThemeConfig } from '../types';
import type { ExportImportActions, GetState, SetState, ThemeUpdateActions } from './types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object' && !Array.isArray(value);
}

function isValidThemeConfig(value: unknown): value is ThemeConfig {
  if (!isPlainObject(value)) return false;
  const hasId = 'id' in value && typeof value['id'] === 'string' && value['id'] !== '';
  const hasPrimary = 'primary' in value && isPlainObject(value['primary']);
  return hasId && hasPrimary;
}

/** Deep-merge imported theme with defaults so missing keys (e.g. animations) get filled in */
function deepMerge<T>(defaults: T, imported: T): T {
  if (!isPlainObject(defaults) || !isPlainObject(imported)) return imported;
  const result: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(imported)) {
    const importedVal = imported[key];
    const defaultVal = result[key];
    result[key] = isPlainObject(defaultVal) && isPlainObject(importedVal)
      ? deepMerge(defaultVal, importedVal)
      : importedVal;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- deep-merge returns same shape
  return result as T;
}

const JSON_INDENT = 2;

export function createThemeUpdateActions(set: SetState, get: GetState): ThemeUpdateActions {
  return {
    updateTheme: (updates) => {
      const newTheme = { ...get().theme, ...updates };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, get().mode);
    },
    resetTheme: () => {
      set({ theme: DEFAULT_THEME });
      injectThemeVariables(DEFAULT_THEME, get().mode);
    },
  };
}

export function createExportImportActions(set: SetState, get: GetState): ExportImportActions {
  return {
    exportTheme: () => JSON.stringify(get().theme, null, JSON_INDENT),
    importTheme: (json) => {
      try {
        const parsed: unknown = JSON.parse(json);
        if (!isValidThemeConfig(parsed)) return false;
        const merged = deepMerge(DEFAULT_THEME, parsed);
        set({ theme: merged });
        injectThemeVariables(merged, get().mode);
        return true;
      } catch {
        return false;
      }
    },
  };
}
