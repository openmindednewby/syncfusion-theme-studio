// Color update actions

import { injectThemeVariables } from '../themeInjector';

import type { ColorShade, StatusKey, StatusShade, ThemeConfig } from '../types';
import type { ColorUpdateActions, GetState, SetState } from './types';

type ColorScaleKey = 'primary' | 'secondary' | 'neutral';

interface ColorScaleUpdate {
  scaleKey: ColorScaleKey;
  shade: ColorShade;
  value: string;
}

interface StatusColorUpdate {
  status: StatusKey;
  shade: StatusShade;
  value: string;
}

function buildColorScaleTheme(currentTheme: ThemeConfig, update: ColorScaleUpdate): ThemeConfig {
  return {
    ...currentTheme,
    [update.scaleKey]: { ...currentTheme[update.scaleKey], [update.shade]: update.value },
  };
}

function buildStatusColorTheme(currentTheme: ThemeConfig, update: StatusColorUpdate): ThemeConfig {
  return {
    ...currentTheme,
    status: {
      ...currentTheme.status,
      [update.status]: { ...currentTheme.status[update.status], [update.shade]: update.value },
    },
  };
}

export function createColorUpdateActions(set: SetState, get: GetState): ColorUpdateActions {
  const applyColorScaleUpdate = (update: ColorScaleUpdate): void => {
    const newTheme = buildColorScaleTheme(get().theme, update);
    set({ theme: newTheme });
    injectThemeVariables(newTheme, get().mode);
  };

  const applyStatusColorUpdate = (update: StatusColorUpdate): void => {
    const newTheme = buildStatusColorTheme(get().theme, update);
    set({ theme: newTheme });
    injectThemeVariables(newTheme, get().mode);
  };

  return {
    updatePrimaryColor: (shade, value) =>
      applyColorScaleUpdate({ scaleKey: 'primary', shade, value }),
    updateSecondaryColor: (shade, value) =>
      applyColorScaleUpdate({ scaleKey: 'secondary', shade, value }),
    updateNeutralColor: (shade, value) =>
      applyColorScaleUpdate({ scaleKey: 'neutral', shade, value }),
    updateStatusColor: (status, shade, value) =>
      applyStatusColorUpdate({ status, shade, value }),
  };
}
