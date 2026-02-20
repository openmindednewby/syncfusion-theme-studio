// Typography component configuration actions

import { injectThemeVariables } from '../utils/themeInjector';

import type { ThemeConfig, TypographyComponentsConfig } from '../types';
import type { GetState, SetState } from './types';

export interface TypographyComponentActions {
  updateTypographyComponentLevel: (level: keyof TypographyComponentsConfig, updates: Record<string, string>) => void;
}

export function createTypographyComponentActions(set: SetState, get: GetState): TypographyComponentActions {
  return {
    updateTypographyComponentLevel: (level: keyof TypographyComponentsConfig, updates: Record<string, string>) => {
      const { theme, mode } = get();
      const newTheme: ThemeConfig = {
        ...theme,
        typographyComponents: {
          ...theme.typographyComponents,
          [level]: { ...theme.typographyComponents[level], ...updates },
        },
      };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, mode);
    },
  };
}
