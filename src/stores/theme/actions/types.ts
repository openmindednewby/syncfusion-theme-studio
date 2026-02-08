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
  updateInputConfig: ThemeState['updateInputConfig'];
  updateDataGridConfig: ThemeState['updateDataGridConfig'];
  updateCardsConfig: ThemeState['updateCardsConfig'];
  updateModalsConfig: ThemeState['updateModalsConfig'];
  updateBadgesConfig: ThemeState['updateBadgesConfig'];
  updateSelectConfig: ThemeState['updateSelectConfig'];
  updateDatePickerConfig: ThemeState['updateDatePickerConfig'];
  updateDialogConfig: ThemeState['updateDialogConfig'];
}

export interface TypographyActions {
  updateFontFamily: ThemeState['updateFontFamily'];
  updateTransition: ThemeState['updateTransition'];
}

export interface LayoutActions {
  updateLayoutDimension: ThemeState['updateLayoutDimension'];
  updateSpacingBaseUnit: ThemeState['updateSpacingBaseUnit'];
  updateBorderRadius: ThemeState['updateBorderRadius'];
  updateShadow: ThemeState['updateShadow'];
}
