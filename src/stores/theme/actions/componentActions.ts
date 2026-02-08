// Component configuration actions

import { injectThemeVariables } from '../themeInjector';

import type {
  BadgesConfig,
  ButtonStateColors,
  ButtonVariant,
  CardsConfig,
  DataGridConfig,
  HeaderComponentConfig,
  InputsConfig,
  ModalsConfig,
  SidebarComponentConfig,
  ThemeConfig,
} from '../types';
import type { ComponentConfigActions, GetState, SetState } from './types';

function applyThemeUpdate(set: SetState, get: GetState, newTheme: ThemeConfig): void {
  set({ theme: newTheme });
  injectThemeVariables(newTheme, get().mode);
}

function updateHeaderConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<HeaderComponentConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      header: { ...currentTheme.components.header, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateSidebarConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<SidebarComponentConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      sidebar: { ...currentTheme.components.sidebar, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateButtonConfigAction(
  set: SetState,
  get: GetState,
  variant: ButtonVariant,
  updates: Partial<ButtonStateColors>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      buttons: {
        ...currentTheme.components.buttons,
        [variant]: { ...currentTheme.components.buttons[variant], ...updates },
      },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateInputConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<InputsConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      inputs: { ...currentTheme.components.inputs, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateDataGridConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<DataGridConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      dataGrid: { ...currentTheme.components.dataGrid, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateCardsConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<CardsConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      cards: { ...currentTheme.components.cards, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateModalsConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<ModalsConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      modals: { ...currentTheme.components.modals, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

function updateBadgesConfigAction(
  set: SetState,
  get: GetState,
  updates: Partial<BadgesConfig>
): void {
  const currentTheme = get().theme;
  const newTheme = {
    ...currentTheme,
    components: {
      ...currentTheme.components,
      badges: { ...currentTheme.components.badges, ...updates },
    },
  };
  applyThemeUpdate(set, get, newTheme);
}

export function createComponentConfigActions(
  set: SetState,
  get: GetState
): ComponentConfigActions {
  return {
    updateHeaderConfig: (updates) => updateHeaderConfigAction(set, get, updates),
    updateSidebarConfig: (updates) => updateSidebarConfigAction(set, get, updates),
    updateButtonConfig: (variant, updates) => updateButtonConfigAction(set, get, variant, updates),
    updateInputConfig: (updates) => updateInputConfigAction(set, get, updates),
    updateDataGridConfig: (updates) => updateDataGridConfigAction(set, get, updates),
    updateCardsConfig: (updates) => updateCardsConfigAction(set, get, updates),
    updateModalsConfig: (updates) => updateModalsConfigAction(set, get, updates),
    updateBadgesConfig: (updates) => updateBadgesConfigAction(set, get, updates),
  };
}
