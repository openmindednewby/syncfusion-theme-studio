// Component configuration actions

import { injectThemeVariables } from '../themeInjector';

import type {
  AlertsConfig,
  BadgesConfig,
  ButtonStateColors,
  ButtonVariant,
  CardsConfig,
  DataGridConfig,
  DatePickerConfig,
  DialogConfig,
  ErrorMessagesConfig,
  FlexBoxConfig,
  HeaderComponentConfig,
  InputsConfig,
  MessageConfig,
  ModalsConfig,
  SelectConfig,
  SidebarComponentConfig,
  ThemeConfig,
  ToastConfig,
} from '../types';
import type { ComponentConfigActions, GetState, SetState } from './types';

type ComponentKey = 'header' | 'sidebar' | 'inputs' | 'dataGrid' |
  'cards' | 'modals' | 'badges' | 'select' | 'datePicker' | 'dialog' |
  'errorMessages' | 'flexBox' | 'alerts' | 'toast' | 'message';

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

export function createComponentConfigActions(set: SetState, get: GetState): ComponentConfigActions {
  return {
    updateHeaderConfig: (u: Partial<HeaderComponentConfig>) => update(set, get, 'header', u),
    updateSidebarConfig: (u: Partial<SidebarComponentConfig>) => update(set, get, 'sidebar', u),
    updateInputConfig: (u: Partial<InputsConfig>) => update(set, get, 'inputs', u),
    updateDataGridConfig: (u: Partial<DataGridConfig>) => update(set, get, 'dataGrid', u),
    updateCardsConfig: (u: Partial<CardsConfig>) => update(set, get, 'cards', u),
    updateModalsConfig: (u: Partial<ModalsConfig>) => update(set, get, 'modals', u),
    updateBadgesConfig: (u: Partial<BadgesConfig>) => update(set, get, 'badges', u),
    updateSelectConfig: (u: Partial<SelectConfig>) => update(set, get, 'select', u),
    updateDatePickerConfig: (u: Partial<DatePickerConfig>) => update(set, get, 'datePicker', u),
    updateDialogConfig: (u: Partial<DialogConfig>) => update(set, get, 'dialog', u),
    updateErrorMessagesConfig: (u: Partial<ErrorMessagesConfig>) => update(set, get, 'errorMessages', u),
    updateFlexBoxConfig: (u: Partial<FlexBoxConfig>) => update(set, get, 'flexBox', u),
    updateAlertsConfig: (u: Partial<AlertsConfig>) => update(set, get, 'alerts', u),
    updateToastConfig: (u: Partial<ToastConfig>) => update(set, get, 'toast', u),
    updateMessageConfig: (u: Partial<MessageConfig>) => update(set, get, 'message', u),
    updateButtonConfig: (v: ButtonVariant, u: Partial<ButtonStateColors>) => updateButton(set, get, v, u),
  };
}
