// Theme update and export/import actions

import { isValueDefined } from '@/utils/is';

import { DEFAULT_THEME } from '../defaultTheme';
import { injectThemeVariables } from '../themeInjector';

import type { ThemeConfig } from '../types';
import type { ExportImportActions, GetState, SetState, ThemeUpdateActions } from './types';

const JSON_INDENT = 2;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object' && !Array.isArray(value);
}

function isValidThemeConfig(value: unknown): value is ThemeConfig {
  if (!isPlainObject(value)) return false;
  const hasId = 'id' in value && typeof value['id'] === 'string' && value['id'] !== '';
  const hasPrimary = 'primary' in value && isPlainObject(value['primary']);
  return hasId && hasPrimary;
}

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
        set({ theme: parsed });
        injectThemeVariables(parsed, get().mode);
        return true;
      } catch {
        return false;
      }
    },
  };
}
