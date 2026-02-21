// Color update actions

import { generateDerivedColors, generatePaletteFromBase } from '@/utils';
import type { DerivedComponentColors } from '@/utils';

import { type StatusKey, type StatusShade ,
  type ButtonsComponentConfig,
  type ColorScale,
  type ColorShade,
  type ComponentConfigSingle,
  type ComponentsConfig,
  type DataGridConfig,
  type InputsConfig,
  type SidebarComponentConfig,
  type ThemeConfig,
} from '../types';
import { injectThemeVariables } from '../utils/themeInjector';


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

interface DisabledOverrides {
  background: string;
  textColor: string;
}

export function buildDerivedModeConfig(
  config: ComponentConfigSingle,
  derived: DerivedComponentColors,
  palette?: ColorScale,
  isLightMode?: boolean,
): ComponentConfigSingle {
  const base: ComponentConfigSingle = {
    ...config,
    buttons: buildDerivedButtons(config.buttons, derived),
    sidebar: buildDerivedSidebar(config.sidebar, derived),
    inputs: buildDerivedInputs(config.inputs, derived),
    dataGrid: buildDerivedDataGrid(config.dataGrid, derived),
  };

  if (!palette) return base;

  const disabled = getDisabledOverrides(palette, isLightMode ?? true);
  return applyDisabledOverrides(base, disabled);
}

export function buildDerivedComponents(
  components: ComponentsConfig,
  derived: DerivedComponentColors,
  palette?: ColorScale,
): ComponentsConfig {
  return {
    light: buildDerivedModeConfig(components.light, derived, palette, true),
    dark: buildDerivedModeConfig(components.dark, derived, palette, false),
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
        newTheme = { ...newTheme, components: buildDerivedComponents(newTheme.components, derived, palette) };
      }
      applyAndInject(newTheme);
    },
  };
}

// Palette shades for disabled button states (light = muted/lighter, dark = muted/darker)
const DISABLED_SHADE_LIGHT: ColorShade = '200';
const DISABLED_SHADE_DARK: ColorShade = '900';
const DISABLED_TEXT_LIGHT = '255 255 255';
const DISABLED_TEXT_DARK = '148 163 184';

function getDisabledOverrides(palette: ColorScale, isLightMode: boolean): DisabledOverrides {
  const shade = isLightMode ? DISABLED_SHADE_LIGHT : DISABLED_SHADE_DARK;
  return { background: palette[shade], textColor: isLightMode ? DISABLED_TEXT_LIGHT : DISABLED_TEXT_DARK };
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

function applyDisabledOverrides(config: ComponentConfigSingle, disabled: DisabledOverrides): ComponentConfigSingle {
  return {
    ...config,
    buttons: {
      ...config.buttons,
      primary: { ...config.buttons.primary, disabledBackground: disabled.background, disabledTextColor: disabled.textColor },
      outline: { ...config.buttons.outline, disabledTextColor: disabled.background, disabledBorderColor: disabled.background },
    },
    iconButtons: {
      ...config.iconButtons,
      primary: { ...config.iconButtons.primary, disabledBackground: disabled.background },
    },
    fab: { ...config.fab, disabledBackground: disabled.background },
    splitButton: { ...config.splitButton, disabledBackground: disabled.background, disabledTextColor: disabled.textColor },
  };
}
