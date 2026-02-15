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
  updatePrimaryPalette: ThemeState['updatePrimaryPalette'];
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
  updateButtonsConfig: ThemeState['updateButtonsConfig'];
  updateInputConfig: ThemeState['updateInputConfig'];
  updateDataGridConfig: ThemeState['updateDataGridConfig'];
  updateCardsConfig: ThemeState['updateCardsConfig'];
  updateModalsConfig: ThemeState['updateModalsConfig'];
  updateBadgesConfig: ThemeState['updateBadgesConfig'];
  updateSelectConfig: ThemeState['updateSelectConfig'];
  updateDatePickerConfig: ThemeState['updateDatePickerConfig'];
  updateDialogConfig: ThemeState['updateDialogConfig'];
  updateErrorMessagesConfig: ThemeState['updateErrorMessagesConfig'];
  updateFlexBoxConfig: ThemeState['updateFlexBoxConfig'];
  updateAlertsConfig: ThemeState['updateAlertsConfig'];
  updateToastConfig: ThemeState['updateToastConfig'];
  updateMessageConfig: ThemeState['updateMessageConfig'];
  updateChipConfig: ThemeState['updateChipConfig'];
  updateAccordionConfig: ThemeState['updateAccordionConfig'];
  updateToolbarConfig: ThemeState['updateToolbarConfig'];
  updateMenuConfig: ThemeState['updateMenuConfig'];
  updateBreadcrumbConfig: ThemeState['updateBreadcrumbConfig'];
  updatePaginationConfig: ThemeState['updatePaginationConfig'];
  updateTabsConfig: ThemeState['updateTabsConfig'];
  updateTimelineConfig: ThemeState['updateTimelineConfig'];
  updateAvatarConfig: ThemeState['updateAvatarConfig'];
  updateProgressBarConfig: ThemeState['updateProgressBarConfig'];
  updateTooltipConfig: ThemeState['updateTooltipConfig'];
}

export interface TypographyActions {
  updateFontFamily: ThemeState['updateFontFamily'];
  updateFontSize: ThemeState['updateFontSize'];
  updateFontWeight: ThemeState['updateFontWeight'];
  updateLineHeight: ThemeState['updateLineHeight'];
  updateLetterSpacing: ThemeState['updateLetterSpacing'];
  updateTransition: ThemeState['updateTransition'];
}

export interface AnimationActions {
  updateAnimationConfig: ThemeState['updateAnimationConfig'];
}

export interface LayoutActions {
  updateLayoutDimension: ThemeState['updateLayoutDimension'];
  updateLayoutFullWidth: ThemeState['updateLayoutFullWidth'];
  updateSpacingBaseUnit: ThemeState['updateSpacingBaseUnit'];
  updateBorderRadius: ThemeState['updateBorderRadius'];
  updateShadow: ThemeState['updateShadow'];
}
