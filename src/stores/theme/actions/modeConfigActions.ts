// Mode configuration actions

import { injectThemeVariables } from '../themeInjector';

import type { Mode, ThemeModeConfig } from '../types';
import type { GetState, ModeConfigActions, SetState } from './types';

export function createModeConfigActions(set: SetState, get: GetState): ModeConfigActions {
  return {
    updateModeConfig: (mode: Mode, updates: Partial<ThemeModeConfig>) => {
      const currentTheme = get().theme;
      const currentModeConfig = currentTheme[mode];
      const newModeConfig = {
        backgrounds: { ...currentModeConfig.backgrounds, ...updates.backgrounds },
        text: { ...currentModeConfig.text, ...updates.text },
        borders: { ...currentModeConfig.borders, ...updates.borders },
      };
      const newTheme = { ...currentTheme, [mode]: newModeConfig };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, get().mode);
    },
  };
}
