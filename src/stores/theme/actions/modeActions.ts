// Mode-related actions

import { Mode } from '../types';
import { injectThemeVariables } from '../utils/themeInjector';


import type { GetState, ModeActions, SetState } from './types';

export function createModeActions(set: SetState, get: GetState): ModeActions {
  return {
    setMode: (mode) => {
      set({ mode });
      injectThemeVariables(get().theme, mode);
    },
    toggleMode: () => {
      const newMode = get().mode === Mode.Light ? Mode.Dark : Mode.Light;
      set({ mode: newMode });
      injectThemeVariables(get().theme, newMode);
    },
  };
}
