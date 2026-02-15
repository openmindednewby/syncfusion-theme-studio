// Component configuration actions

import { injectThemeVariables } from '../themeInjector';
import { type ButtonVariant ,
  type AccordionConfig,
  type ButtonsComponentConfig,
  type AlertsConfig,
  type AvatarConfig,
  type BadgesConfig,
  type BreadcrumbConfig,
  type ButtonStateColors,
  type CardsConfig,
  type ChipConfig,
  type DataGridConfig,
  type DatePickerConfig,
  type DialogConfig,
  type ErrorMessagesConfig,
  type FlexBoxConfig,
  type HeaderComponentConfig,
  type InputsConfig,
  type MenuConfig,
  type MessageConfig,
  type ModalsConfig,
  type PaginationConfig,
  type ProgressBarConfig,
  type SelectConfig,
  type SidebarComponentConfig,
  type TabsConfig,
  type ThemeConfig,
  type TimelineConfig,
  type ToastConfig,
  type ToolbarConfig,
  type TooltipConfig,
} from '../types';

import type { ComponentConfigActions, GetState, SetState } from './types';

const enum ComponentKey {
  Header = 'header',
  Sidebar = 'sidebar',
  Inputs = 'inputs',
  DataGrid = 'dataGrid',
  Cards = 'cards',
  Modals = 'modals',
  Badges = 'badges',
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
  Tabs = 'tabs',
  Timeline = 'timeline',
  Avatar = 'avatar',
  ProgressBar = 'progressBar',
  Tooltip = 'tooltip',
  Buttons = 'buttons',
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

function createCoreComponentActions(set: SetState, get: GetState): Pick<ComponentConfigActions,
  'updateHeaderConfig' | 'updateSidebarConfig' | 'updateInputConfig' | 'updateDataGridConfig' |
  'updateCardsConfig' | 'updateModalsConfig' | 'updateBadgesConfig' | 'updateSelectConfig' |
  'updateDatePickerConfig' | 'updateDialogConfig' | 'updateErrorMessagesConfig' |
  'updateFlexBoxConfig' | 'updateAlertsConfig' | 'updateToastConfig'
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
  };
}

export function createComponentConfigActions(set: SetState, get: GetState): ComponentConfigActions {
  return {
    ...createCoreComponentActions(set, get),
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
    updateButtonConfig: (v: ButtonVariant, u: Partial<ButtonStateColors>) => updateButton(set, get, v, u),
    updateButtonsConfig: (u: Partial<ButtonsComponentConfig>) => update(set, get, ComponentKey.Buttons, u),
  };
}
