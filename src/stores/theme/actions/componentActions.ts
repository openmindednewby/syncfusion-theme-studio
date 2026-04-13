// Component configuration actions

import { type ButtonVariant , type GridButtonVariant ,
  type AccordionConfig,
  type ButtonsComponentConfig,
  type AlertsConfig,
  type AvatarConfig,
  type AlertBadgesConfig,
  type ExternalLinkConfig,
  type ImageConfig,
  type BadgesConfig,
  type BreadcrumbConfig,
  type ButtonStateColors,
  type CardsConfig,
  type CheckboxConfig,
  type ChipConfig,
  type DataGridConfig,
  type DatePickerConfig,
  type DialogConfig,
  type ErrorMessagesConfig,
  type FabConfig,
  type FlexBoxConfig,
  type GridButtonsConfig,
  type GridButtonStateColors,
  type GridDropdownConfig,
  type HeaderComponentConfig,
  type IconButtonConfig,
  type InputMessageConfig,
  type InputsConfig,
  type MenuConfig,
  type MessageConfig,
  type ModalsConfig,
  type PaginationConfig,
  type PillBadgeConfig,
  type ProgressBarConfig,
  type RadioConfig,
  type SearchPanelConfig,
  type SelectConfig,
  type SidebarComponentConfig,
  type SplitButtonConfig,
  type TabsConfig,
  type TextDescriptionConfig,
  type ThemeConfig,
  type TimelineConfig,
  type ToastConfig,
  type ToggleConfig,
  type ToolbarConfig,
  type TooltipConfig,
  type LoaderConfig,
  type SkeletonLoaderConfig,
  type SliderConfig,
} from '../types';
import { injectThemeVariables } from '../utils/themeInjector';

import type { ComponentConfigActions, GetState, SetState } from './types';

const enum ComponentKey {
  Header = 'header',
  Sidebar = 'sidebar',
  Inputs = 'inputs',
  DataGrid = 'dataGrid',
  Cards = 'cards',
  Modals = 'modals',
  Badges = 'badges',
  AlertBadges = 'alertBadges',
  Select = 'select',
  DatePicker = 'datePicker',
  Dialog = 'dialog',
  ErrorMessages = 'errorMessages',
  FlexBox = 'flexBox',
  Alerts = 'alerts',
  Toast = 'toast',
  Message = 'message',
  Chips = 'chips',
  Accordion = 'accordion',
  Toolbar = 'toolbar',
  Menu = 'menu',
  Breadcrumb = 'breadcrumb',
  Pagination = 'pagination',
  PillBadge = 'pillBadge',
  Tabs = 'tabs',
  Timeline = 'timeline',
  Avatar = 'avatar',
  ProgressBar = 'progressBar',
  Tooltip = 'tooltip',
  Buttons = 'buttons',
  IconButtons = 'iconButtons',
  Fab = 'fab',
  SplitButton = 'splitButton',
  GridButtons = 'gridButtons',
  GridDropdown = 'gridDropdown',
  TextDescription = 'textDescription',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Toggle = 'toggle',
  ExternalLink = 'externalLink',
  Image = 'image',
  InputMessage = 'inputMessage',
  SearchPanel = 'searchPanel',
  Loader = 'loader',
  SkeletonLoader = 'skeletonLoader',
  Slider = 'slider',
}

export function createComponentConfigActions(set: SetState, get: GetState): ComponentConfigActions {
  return {
    ...createCoreComponentActions(set, get),
    ...createDisplayActions(set, get),
    updateButtonConfig: (v: ButtonVariant, u: Partial<ButtonStateColors>) => updateButton(set, get, v, u),
    updateButtonsConfig: (u: Partial<ButtonsComponentConfig>) => update(set, get, ComponentKey.Buttons, u),
    updateIconButtonConfig: (u: Partial<IconButtonConfig>) => update(set, get, ComponentKey.IconButtons, u),
    updateFabConfig: (u: Partial<FabConfig>) => update(set, get, ComponentKey.Fab, u),
    updateSplitButtonConfig: (u: Partial<SplitButtonConfig>) => update(set, get, ComponentKey.SplitButton, u),
    updateGridButtonsConfig: (u: Partial<GridButtonsConfig>) => update(set, get, ComponentKey.GridButtons, u),
    updateGridButtonVariant: (v: GridButtonVariant, u: Partial<GridButtonStateColors>) => updateGridButton(set, get, v, u),
    updateGridDropdownConfig: (u: Partial<GridDropdownConfig>) => update(set, get, ComponentKey.GridDropdown, u),
    updateCheckboxConfig: (u: Partial<CheckboxConfig>) => update(set, get, ComponentKey.Checkbox, u),
    updateRadioConfig: (u: Partial<RadioConfig>) => update(set, get, ComponentKey.Radio, u),
    updateToggleConfig: (u: Partial<ToggleConfig>) => update(set, get, ComponentKey.Toggle, u),
    updateExternalLinkConfig: (u: Partial<ExternalLinkConfig>) => update(set, get, ComponentKey.ExternalLink, u),
    updateImageConfig: (u: Partial<ImageConfig>) => update(set, get, ComponentKey.Image, u),
    updateInputMessageConfig: (u: Partial<InputMessageConfig>) => update(set, get, ComponentKey.InputMessage, u),
    updateSearchPanelConfig: (u: Partial<SearchPanelConfig>) => update(set, get, ComponentKey.SearchPanel, u),
  };
}

function createDisplayActions(set: SetState, get: GetState): Pick<ComponentConfigActions,
  'updateMessageConfig' | 'updateChipConfig' | 'updateAccordionConfig' | 'updateToolbarConfig' |
  'updateMenuConfig' | 'updateBreadcrumbConfig' | 'updatePaginationConfig' | 'updatePillBadgeConfig' |
  'updateTabsConfig' | 'updateTimelineConfig' | 'updateAvatarConfig' | 'updateProgressBarConfig' |
  'updateTooltipConfig' | 'updateTextDescriptionConfig' | 'updateLoaderConfig' |
  'updateSkeletonLoaderConfig' | 'updateSliderConfig'
> {
  return {
    updatePillBadgeConfig: (u: Partial<PillBadgeConfig>) => update(set, get, ComponentKey.PillBadge, u),
    updateMessageConfig: (u: Partial<MessageConfig>) => update(set, get, ComponentKey.Message, u),
    updateChipConfig: (u: Partial<ChipConfig>) => update(set, get, ComponentKey.Chips, u),
    updateAccordionConfig: (u: Partial<AccordionConfig>) => update(set, get, ComponentKey.Accordion, u),
    updateToolbarConfig: (u: Partial<ToolbarConfig>) => update(set, get, ComponentKey.Toolbar, u),
    updateMenuConfig: (u: Partial<MenuConfig>) => update(set, get, ComponentKey.Menu, u),
    updateBreadcrumbConfig: (u: Partial<BreadcrumbConfig>) => update(set, get, ComponentKey.Breadcrumb, u),
    updatePaginationConfig: (u: Partial<PaginationConfig>) => update<PaginationConfig>(set, get, ComponentKey.Pagination, u),
    updateTabsConfig: (u: Partial<TabsConfig>) => update(set, get, ComponentKey.Tabs, u),
    updateTimelineConfig: (u: Partial<TimelineConfig>) => update(set, get, ComponentKey.Timeline, u),
    updateAvatarConfig: (u: Partial<AvatarConfig>) => update(set, get, ComponentKey.Avatar, u),
    updateProgressBarConfig: (u: Partial<ProgressBarConfig>) => update(set, get, ComponentKey.ProgressBar, u),
    updateTooltipConfig: (u: Partial<TooltipConfig>) => update(set, get, ComponentKey.Tooltip, u),
    updateTextDescriptionConfig: (u: Partial<TextDescriptionConfig>) => update(set, get, ComponentKey.TextDescription, u),
    updateLoaderConfig: (u: Partial<LoaderConfig>) => update(set, get, ComponentKey.Loader, u),
    updateSkeletonLoaderConfig: (u: Partial<SkeletonLoaderConfig>) => update(set, get, ComponentKey.SkeletonLoader, u),
    updateSliderConfig: (u: Partial<SliderConfig>) => update(set, get, ComponentKey.Slider, u),
  };
}

function update<T>(set: SetState, get: GetState, key: ComponentKey, updates: Partial<T>): void {
  const { theme, mode } = get();
  const newTheme: ThemeConfig = {
    ...theme,
    components: {
      ...theme.components,
      [mode]: { ...theme.components[mode], [key]: { ...theme.components[mode][key], ...updates } },
    },
  };
  set({ theme: newTheme });
  injectThemeVariables(newTheme, mode);
}

function updateButton(set: SetState, get: GetState, variant: ButtonVariant, updates: Partial<ButtonStateColors>): void {
  const { theme, mode } = get();
  const buttons = { ...theme.components[mode].buttons, [variant]: { ...theme.components[mode].buttons[variant], ...updates } };
  const newTheme: ThemeConfig = { ...theme, components: { ...theme.components, [mode]: { ...theme.components[mode], buttons } } };
  set({ theme: newTheme });
  injectThemeVariables(newTheme, mode);
}

function updateGridButton(set: SetState, get: GetState, variant: GridButtonVariant, updates: Partial<GridButtonStateColors>): void {
  const { theme, mode } = get();
  const gridButtons = { ...theme.components[mode].gridButtons, [variant]: { ...theme.components[mode].gridButtons[variant], ...updates } };
  const newTheme: ThemeConfig = { ...theme, components: { ...theme.components, [mode]: { ...theme.components[mode], gridButtons } } };
  set({ theme: newTheme });
  injectThemeVariables(newTheme, mode);
}

function createCoreComponentActions(set: SetState, get: GetState): Pick<ComponentConfigActions,
  'updateHeaderConfig' | 'updateSidebarConfig' | 'updateInputConfig' | 'updateDataGridConfig' |
  'updateCardsConfig' | 'updateModalsConfig' | 'updateBadgesConfig' | 'updateSelectConfig' |
  'updateDatePickerConfig' | 'updateDialogConfig' | 'updateErrorMessagesConfig' |
  'updateFlexBoxConfig' | 'updateAlertsConfig' | 'updateToastConfig' | 'updateAlertBadgesConfig'
> {
  return {
    updateHeaderConfig: (u: Partial<HeaderComponentConfig>) => update(set, get, ComponentKey.Header, u),
    updateSidebarConfig: (u: Partial<SidebarComponentConfig>) => update(set, get, ComponentKey.Sidebar, u),
    updateInputConfig: (u: Partial<InputsConfig>) => update(set, get, ComponentKey.Inputs, u),
    updateDataGridConfig: (u: Partial<DataGridConfig>) => update(set, get, ComponentKey.DataGrid, u),
    updateCardsConfig: (u: Partial<CardsConfig>) => update(set, get, ComponentKey.Cards, u),
    updateModalsConfig: (u: Partial<ModalsConfig>) => update(set, get, ComponentKey.Modals, u),
    updateBadgesConfig: (u: Partial<BadgesConfig>) => update(set, get, ComponentKey.Badges, u),
    updateSelectConfig: (u: Partial<SelectConfig>) => update(set, get, ComponentKey.Select, u),
    updateDatePickerConfig: (u: Partial<DatePickerConfig>) => update(set, get, ComponentKey.DatePicker, u),
    updateDialogConfig: (u: Partial<DialogConfig>) => update(set, get, ComponentKey.Dialog, u),
    updateErrorMessagesConfig: (u: Partial<ErrorMessagesConfig>) => update(set, get, ComponentKey.ErrorMessages, u),
    updateFlexBoxConfig: (u: Partial<FlexBoxConfig>) => update(set, get, ComponentKey.FlexBox, u),
    updateAlertsConfig: (u: Partial<AlertsConfig>) => update(set, get, ComponentKey.Alerts, u),
    updateToastConfig: (u: Partial<ToastConfig>) => update(set, get, ComponentKey.Toast, u),
    updateAlertBadgesConfig: (u: Partial<AlertBadgesConfig>) => update(set, get, ComponentKey.AlertBadges, u),
  };
}
