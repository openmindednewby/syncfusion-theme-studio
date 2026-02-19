// Main theme configuration and state types

import { type Mode, type StatusKey, type StatusShade ,
  type ColorScale,
  type ColorShade,
  type StatusColors,
  type ThemeModeConfig,
  type ThemeModeConfigUpdate,
} from './colorTypes';
import { type ButtonVariant ,
  type AccordionConfig,
  type AlertBadgesConfig,
  type AlertsConfig,
  type AvatarConfig,
  type BadgesConfig,
  type BreadcrumbConfig,
  type ButtonStateColors,
  type ButtonsComponentConfig,
  type CardsConfig,
  type CheckboxConfig,
  type ChipConfig,
  type ComponentsConfig,
  type DataGridConfig,
  type DatePickerConfig,
  type DialogConfig,
  type ErrorMessagesConfig,
  type FabConfig,
  type FlexBoxConfig,
  type HeaderComponentConfig,
  type IconButtonConfig,
  type InputsConfig,
  type MenuConfig,
  type MessageConfig,
  type ModalsConfig,
  type PaginationConfig,
  type ProgressBarConfig,
  type RadioConfig,
  type SelectConfig,
  type SidebarComponentConfig,
  type SplitButtonConfig,
  type TabsConfig,
  type TextDescriptionConfig,
  type TimelineConfig,
  type ToastConfig,
  type ToggleConfig,
  type ToolbarConfig,
  type TooltipConfig,
} from './componentTypes';
import { type FontFamilyType, type TransitionType ,
  type BorderRadiusConfig,
  type FontSizeScale,
  type FontWeightScale,
  type LayoutConfig,
  type LetterSpacingScale,
  type LineHeightScale,
  type ShadowConfig,
  type SpacingConfig,
  type TransitionConfig,
  type TypographyConfig,
} from './layoutTypes';

import type { AnimationConfig } from './animationTypes';
import type { TypographyComponentsConfig } from './typographyComponentTypes';





export interface ThemeConfig {
  id: string;
  name: string;
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  status: StatusColors;
  layout: LayoutConfig;
  spacing: SpacingConfig;
  borderRadius: BorderRadiusConfig;
  shadows: ShadowConfig;
  typography: TypographyConfig;
  transitions: TransitionConfig;
  animations: AnimationConfig;
  light: ThemeModeConfig;
  dark: ThemeModeConfig;
  components: ComponentsConfig;
  typographyComponents: TypographyComponentsConfig;
}

export interface ThemeState {
  mode: Mode;
  theme: ThemeConfig;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updatePrimaryColor: (shade: ColorShade, value: string) => void;
  updateSecondaryColor: (shade: ColorShade, value: string) => void;
  updateNeutralColor: (shade: ColorShade, value: string) => void;
  updateStatusColor: (status: StatusKey, shade: StatusShade, value: string) => void;
  /** Updates entire primary palette and cascades to component colors */
  updatePrimaryPalette: (baseColor: string, cascadeToComponents: boolean) => void;
  updateModeConfig: (mode: Mode, updates: ThemeModeConfigUpdate) => void;
  // Component actions now update the current mode's config
  updateHeaderConfig: (updates: Partial<HeaderComponentConfig>) => void;
  updateSidebarConfig: (updates: Partial<SidebarComponentConfig>) => void;
  updateButtonConfig: (variant: ButtonVariant, updates: Partial<ButtonStateColors>) => void;
  updateButtonsConfig: (updates: Partial<ButtonsComponentConfig>) => void;
  updateInputConfig: (updates: Partial<InputsConfig>) => void;
  updateDataGridConfig: (updates: Partial<DataGridConfig>) => void;
  updateCardsConfig: (updates: Partial<CardsConfig>) => void;
  updateModalsConfig: (updates: Partial<ModalsConfig>) => void;
  updateBadgesConfig: (updates: Partial<BadgesConfig>) => void;
  updateAlertBadgesConfig: (updates: Partial<AlertBadgesConfig>) => void;
  updateSelectConfig: (updates: Partial<SelectConfig>) => void;
  updateDatePickerConfig: (updates: Partial<DatePickerConfig>) => void;
  updateDialogConfig: (updates: Partial<DialogConfig>) => void;
  updateErrorMessagesConfig: (updates: Partial<ErrorMessagesConfig>) => void;
  updateFlexBoxConfig: (updates: Partial<FlexBoxConfig>) => void;
  updateAlertsConfig: (updates: Partial<AlertsConfig>) => void;
  updateToastConfig: (updates: Partial<ToastConfig>) => void;
  updateMessageConfig: (updates: Partial<MessageConfig>) => void;
  updateChipConfig: (updates: Partial<ChipConfig>) => void;
  updateAccordionConfig: (updates: Partial<AccordionConfig>) => void;
  updateToolbarConfig: (updates: Partial<ToolbarConfig>) => void;
  updateMenuConfig: (updates: Partial<MenuConfig>) => void;
  updateBreadcrumbConfig: (updates: Partial<BreadcrumbConfig>) => void;
  updatePaginationConfig: (updates: Partial<PaginationConfig>) => void;
  updateTabsConfig: (updates: Partial<TabsConfig>) => void;
  updateTimelineConfig: (updates: Partial<TimelineConfig>) => void;
  updateAvatarConfig: (updates: Partial<AvatarConfig>) => void;
  updateProgressBarConfig: (updates: Partial<ProgressBarConfig>) => void;
  updateTooltipConfig: (updates: Partial<TooltipConfig>) => void;
  updateIconButtonConfig: (updates: Partial<IconButtonConfig>) => void;
  updateFabConfig: (updates: Partial<FabConfig>) => void;
  updateSplitButtonConfig: (updates: Partial<SplitButtonConfig>) => void;
  updateTextDescriptionConfig: (updates: Partial<TextDescriptionConfig>) => void;
  updateCheckboxConfig: (updates: Partial<CheckboxConfig>) => void;
  updateRadioConfig: (updates: Partial<RadioConfig>) => void;
  updateToggleConfig: (updates: Partial<ToggleConfig>) => void;
  // Typography component actions
  updateTypographyComponentLevel: (level: keyof TypographyComponentsConfig, updates: Record<string, string>) => void;
  // Typography actions
  updateFontFamily: (type: FontFamilyType, value: string) => void;
  updateFontSize: (key: keyof FontSizeScale, value: string) => void;
  updateFontWeight: (key: keyof FontWeightScale, value: string) => void;
  updateLineHeight: (key: keyof LineHeightScale, value: string) => void;
  updateLetterSpacing: (key: keyof LetterSpacingScale, value: string) => void;
  updateTransition: (type: TransitionType, value: string) => void;
  // Animation actions
  updateAnimationConfig: (updates: Partial<AnimationConfig>) => void;
  // Layout actions
  updateLayoutDimension: (key: keyof LayoutConfig, value: string) => void;
  updateLayoutFullWidth: (value: boolean) => void;
  updateSpacingBaseUnit: (value: number) => void;
  updateBorderRadius: (key: keyof BorderRadiusConfig, value: string) => void;
  updateShadow: (key: keyof ShadowConfig, value: string) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (json: string) => boolean;
}
