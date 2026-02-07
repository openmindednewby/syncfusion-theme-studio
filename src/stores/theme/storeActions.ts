import { isValueDefined } from '@/utils/is';

import { DEFAULT_THEME } from './defaultTheme';
import { injectThemeVariables } from './themeInjector';

import type { ColorScale, ThemeConfig, ThemeState } from './types';

type SetState = (partial: Partial<ThemeState>) => void;
type GetState = () => ThemeState;

interface ModeActions {
  setMode: ThemeState['setMode'];
  toggleMode: ThemeState['toggleMode'];
}

interface ThemeUpdateActions {
  updateTheme: ThemeState['updateTheme'];
  updatePrimaryColor: ThemeState['updatePrimaryColor'];
  resetTheme: ThemeState['resetTheme'];
}

interface ExportImportActions {
  exportTheme: ThemeState['exportTheme'];
  importTheme: ThemeState['importTheme'];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return isValueDefined(value) && typeof value === 'object' && !Array.isArray(value);
}

function isValidThemeConfig(value: unknown): value is ThemeConfig {
  if (!isPlainObject(value)) return false;
  const hasId = 'id' in value && typeof value['id'] === 'string' && value['id'] !== '';
  const hasPrimary = 'primary' in value && isPlainObject(value['primary']);
  return hasId && hasPrimary;
}

function createModeActions(set: SetState, get: GetState): ModeActions {
  return {
    setMode: (mode) => {
      set({ mode });
      injectThemeVariables(get().theme, mode);
    },
    toggleMode: () => {
      const newMode = get().mode === 'light' ? 'dark' : 'light';
      set({ mode: newMode });
      injectThemeVariables(get().theme, newMode);
    },
  };
}

function createThemeUpdateActions(set: SetState, get: GetState): ThemeUpdateActions {
  return {
    updateTheme: (updates) => {
      const newTheme = { ...get().theme, ...updates };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, get().mode);
    },
    updatePrimaryColor: (shade: keyof ColorScale, value: string) => {
      const currentTheme = get().theme;
      const newTheme = { ...currentTheme, primary: { ...currentTheme.primary, [shade]: value } };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, get().mode);
    },
    resetTheme: () => {
      set({ theme: DEFAULT_THEME });
      injectThemeVariables(DEFAULT_THEME, get().mode);
    },
  };
}

function createExportImportActions(set: SetState, get: GetState): ExportImportActions {
  return {
    exportTheme: () => JSON.stringify(get().theme, null, 2),
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

export function createThemeActions(set: SetState, get: GetState): ThemeState {
  return {
    mode: 'light',
    theme: DEFAULT_THEME,
    ...createModeActions(set, get),
    ...createThemeUpdateActions(set, get),
    ...createExportImportActions(set, get),
  };
}
