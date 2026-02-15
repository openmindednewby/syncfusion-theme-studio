// Animation configuration actions

import { injectThemeVariables } from '../themeInjector';

import type { AnimationConfig } from '../types';
import type { AnimationActions, GetState, SetState } from './types';

export function createAnimationActions(set: SetState, get: GetState): AnimationActions {
  return {
    updateAnimationConfig: (updates: Partial<AnimationConfig>): void => {
      const { theme, mode } = get();
      const newTheme = {
        ...theme,
        animations: { ...theme.animations, ...updates },
      };
      set({ theme: newTheme });
      injectThemeVariables(newTheme, mode);
    },
  };
}
