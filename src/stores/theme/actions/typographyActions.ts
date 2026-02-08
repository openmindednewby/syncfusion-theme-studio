// Typography and transition update actions

import { injectThemeVariables } from '../themeInjector';

import type { GetState, SetState, TypographyActions } from './types';

type FontFamilyType = 'sans' | 'mono';
type TransitionType = 'fast' | 'normal' | 'slow' | 'easing';

export function createTypographyActions(set: SetState, get: GetState): TypographyActions {
  return {
    updateFontFamily: (type: FontFamilyType, value: string): void => {
      const { theme, mode } = get();
      const fontKey = type === 'sans' ? 'fontSans' : 'fontMono';
      const newTheme = {
        ...theme,
        typography: { ...theme.typography, [fontKey]: value },
      };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, mode);
    },

    updateTransition: (type: TransitionType, value: string): void => {
      const { theme, mode } = get();
      const newTheme = {
        ...theme,
        transitions: { ...theme.transitions, [type]: value },
      };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, mode);
    },
  };
}
