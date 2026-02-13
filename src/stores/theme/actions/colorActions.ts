// Color update actions

import { generateDerivedColors, generatePaletteFromBase } from '@/utils';
import type { DerivedComponentColors } from '@/utils';

import { injectThemeVariables } from '../themeInjector';
import { type StatusKey, type StatusShade ,
  type ButtonsComponentConfig,
  type ColorShade,
  type ComponentConfigSingle,
  type ComponentsConfig,
  type DataGridConfig,
  type InputsConfig,
  type SidebarComponentConfig,
  type ThemeConfig,
} from '../types';


import type { ColorUpdateActions, GetState, SetState } from './types';

const enum ColorScaleKey {
  Primary = 'primary',
  Secondary = 'secondary',
  Neutral = 'neutral',
}

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

export function buildDerivedButtons(buttons: ButtonsComponentConfig, derived: DerivedComponentColors): ButtonsComponentConfig {
  return {
    ...buttons,
    primary: {
      ...buttons.primary,
      background: derived.buttons.primary.background,
      backgroundHover: derived.buttons.primary.backgroundHover,
      textColor: derived.buttons.primary.textColor,
    },
  };
}

export function buildDerivedSidebar(sidebar: SidebarComponentConfig, derived: DerivedComponentColors): SidebarComponentConfig {
  return {
    ...sidebar,
    activeItemBackground: derived.sidebar.activeBg,
    activeItemTextColor: derived.sidebar.activeText,
  };
}

export function buildDerivedInputs(inputs: InputsConfig, derived: DerivedComponentColors): InputsConfig {
  return {
    ...inputs,
    borderFocus: derived.inputs.borderFocus,
    focusRingColor: derived.inputs.focusRingColor,
  };
}

export function buildDerivedDataGrid(dataGrid: DataGridConfig, derived: DerivedComponentColors): DataGridConfig {
  return {
    ...dataGrid,
    paginationActiveBackground: derived.dataGrid.paginationActiveBackground,
  };
}

export function buildDerivedModeConfig(config: ComponentConfigSingle, derived: DerivedComponentColors): ComponentConfigSingle {
  return {
    ...config,
    buttons: buildDerivedButtons(config.buttons, derived),
    sidebar: buildDerivedSidebar(config.sidebar, derived),
    inputs: buildDerivedInputs(config.inputs, derived),
    dataGrid: buildDerivedDataGrid(config.dataGrid, derived),
  };
}

export function buildDerivedComponents(components: ComponentsConfig, derived: DerivedComponentColors): ComponentsConfig {
  return {
    light: buildDerivedModeConfig(components.light, derived),
    dark: buildDerivedModeConfig(components.dark, derived),
  };
}

export function createColorUpdateActions(set: SetState, get: GetState): ColorUpdateActions {
  const applyAndInject = (newTheme: ThemeConfig): void => {
    set({ theme: newTheme });
    injectThemeVariables(newTheme, get().mode);
  };

  return {
    updatePrimaryColor: (shade, value) =>
      applyAndInject(buildColorScaleTheme(get().theme, { scaleKey: ColorScaleKey.Primary, shade, value })),
    updateSecondaryColor: (shade, value) =>
      applyAndInject(buildColorScaleTheme(get().theme, { scaleKey: ColorScaleKey.Secondary, shade, value })),
    updateNeutralColor: (shade, value) =>
      applyAndInject(buildColorScaleTheme(get().theme, { scaleKey: ColorScaleKey.Neutral, shade, value })),
    updateStatusColor: (status, shade, value) =>
      applyAndInject(buildStatusColorTheme(get().theme, { status, shade, value })),
    updatePrimaryPalette: (baseColor, cascadeToComponents) => {
      const palette = generatePaletteFromBase(baseColor);
      let newTheme: ThemeConfig = { ...get().theme, primary: palette };
      if (cascadeToComponents) {
        const derived = generateDerivedColors(palette);
        newTheme = { ...newTheme, components: buildDerivedComponents(newTheme.components, derived) };
      }
      applyAndInject(newTheme);
    },
  };
}
