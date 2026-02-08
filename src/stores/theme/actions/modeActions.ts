// Mode-related actions

import { injectThemeVariables } from '../themeInjector';

import type { GetState, ModeActions, SetState } from './types';

export function createModeActions(set: SetState, get: GetState): ModeActions {
  return {
    setMode: (mode) => {
      set({ mode });
      injectThemeVariables(get().theme, mode);
    },
    toggleMode: () => {
      const newMode = get().mode === 'light' ? 'dark' : 'light';
      set({ mode: newMode });
      injectThemeVariables(get().theme, newMode);
    },
  };
}
