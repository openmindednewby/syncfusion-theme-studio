// Component configuration actions

import { injectThemeVariables } from '../themeInjector';

import type {
  ButtonStateColors,
  ButtonVariant,
  HeaderComponentConfig,
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

export function createComponentConfigActions(
  set: SetState,
  get: GetState
): ComponentConfigActions {
  return {
    updateHeaderConfig: (updates) => updateHeaderConfigAction(set, get, updates),
    updateSidebarConfig: (updates) => updateSidebarConfigAction(set, get, updates),
    updateButtonConfig: (variant, updates) => updateButtonConfigAction(set, get, variant, updates),
  };
}
