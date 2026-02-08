// Action types and shared utilities

import type { ThemeState } from '../types';

export type SetState = (partial: Partial<ThemeState>) => void;
export type GetState = () => ThemeState;

export interface ModeActions {
  setMode: ThemeState['setMode'];
  toggleMode: ThemeState['toggleMode'];
}

export interface ColorUpdateActions {
  updatePrimaryColor: ThemeState['updatePrimaryColor'];
  updateSecondaryColor: ThemeState['updateSecondaryColor'];
  updateNeutralColor: ThemeState['updateNeutralColor'];
  updateStatusColor: ThemeState['updateStatusColor'];
}

export interface ThemeUpdateActions {
  updateTheme: ThemeState['updateTheme'];
  resetTheme: ThemeState['resetTheme'];
}

export interface ExportImportActions {
  exportTheme: ThemeState['exportTheme'];
  importTheme: ThemeState['importTheme'];
}

export interface ModeConfigActions {
  updateModeConfig: ThemeState['updateModeConfig'];
}

export interface ComponentConfigActions {
  updateHeaderConfig: ThemeState['updateHeaderConfig'];
  updateSidebarConfig: ThemeState['updateSidebarConfig'];
  updateButtonConfig: ThemeState['updateButtonConfig'];
}
