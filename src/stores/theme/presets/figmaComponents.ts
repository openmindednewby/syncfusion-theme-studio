// Figma Design component overrides — ClearSkies 2.0 accent and surface colors
// Buttons use cyan/teal Selection (#00A1C9) / Highlight (#00B5E2) as primary accent
// Surfaces use dark navy palette: #1B2029, #262C39, #39404B, #111319

import { DEFAULT_COMPONENTS_DARK } from '../defaults/defaultComponentsDark';
import { DEFAULT_COMPONENTS_LIGHT } from '../defaults/defaultComponentsLight';
import { ShadowScale } from '../types';

import type { ComponentsConfig } from '../types';

export const FIGMA_COMPONENTS: ComponentsConfig = {
  light: {
    ...DEFAULT_COMPONENTS_LIGHT,
    checkbox: {
      ...DEFAULT_COMPONENTS_LIGHT.checkbox,
      checkedBackground: '0 161 201', checkedBorderColor: '0 161 201',
      indeterminateBackground: '0 161 201', focusRingColor: '0 161 201',
    },
    radio: {
      ...DEFAULT_COMPONENTS_LIGHT.radio,
      selectedBackground: '0 161 201', selectedBorderColor: '0 161 201', focusRingColor: '0 161 201',
    },
    toggle: {
      ...DEFAULT_COMPONENTS_LIGHT.toggle,
      trackActiveBackground: '0 161 201', focusRingColor: '0 161 201',
    },
    header: { ...DEFAULT_COMPONENTS_LIGHT.header, background: '255 255 255', textColor: '27 32 41', borderBottom: '223 223 223' },
    sidebar: {
      ...DEFAULT_COMPONENTS_LIGHT.sidebar,
      background: '250 251 252', textColor: '106 111 113',
      activeItemBackground: '0 161 201', activeItemTextColor: '255 255 255',
      hoverItemBackground: '243 243 243', borderRight: '223 223 223',
      searchHighlightColor: '0 161 201',
    },
    buttons: {
      ...DEFAULT_COMPONENTS_LIGHT.buttons,
      primary: {
        ...DEFAULT_COMPONENTS_LIGHT.buttons.primary,
        background: '0 161 201', backgroundHover: '0 133 166', backgroundActive: '0 108 135',
        textColor: '255 255 255', textColorHover: '255 255 255',
        borderColor: 'transparent', borderWidth: '0px', borderRadius: 'md', shadow: ShadowScale.Sm,
      },
      secondary: {
        ...DEFAULT_COMPONENTS_LIGHT.buttons.secondary,
        background: '243 243 243', backgroundHover: '223 226 228', backgroundActive: '193 196 197',
        textColor: '57 60 62', textColorHover: '27 32 41',
        borderColor: 'transparent', borderWidth: '0px', borderRadius: 'md', shadow: ShadowScale.None,
      },
      outline: {
        ...DEFAULT_COMPONENTS_LIGHT.buttons.outline,
        background: 'transparent', backgroundHover: '243 243 243', backgroundActive: '223 226 228',
        textColor: '0 161 201', textColorHover: '0 133 166',
        borderColor: '0 161 201', borderWidth: '1px', borderRadius: 'md', shadow: ShadowScale.None,
      },
      ghost: {
        ...DEFAULT_COMPONENTS_LIGHT.buttons.ghost,
        background: 'transparent', backgroundHover: '243 243 243', backgroundActive: '223 226 228',
        textColor: '57 60 62', textColorHover: '27 32 41',
        borderColor: 'transparent', borderWidth: '0px', borderRadius: 'md', shadow: ShadowScale.None,
      },
    },
    inputs: {
      ...DEFAULT_COMPONENTS_LIGHT.inputs,
      borderDefault: '223 223 223', borderHover: '161 161 161',
      borderFocus: '0 161 201', focusRingColor: '0 161 201',
      textColor: '27 32 41', placeholderColor: '161 161 161', labelColor: '106 111 113',
    },
    badges: {
      success: { background: '236 253 244', textColor: '21 128 61', borderColor: '34 197 94' },
      warning: { background: '255 251 235', textColor: '161 98 7', borderColor: '234 179 8' },
      error: { background: '254 242 242', textColor: '185 28 28', borderColor: '239 68 68' },
      info: { background: '230 247 252', textColor: '0 108 135', borderColor: '0 161 201' },
      borderRadius: 'full', padding: '2px 8px',
    },
  },
  dark: {
    ...DEFAULT_COMPONENTS_DARK,
    checkbox: {
      ...DEFAULT_COMPONENTS_DARK.checkbox,
      checkedBackground: '0 181 226', checkedBorderColor: '0 181 226',
      indeterminateBackground: '0 181 226', focusRingColor: '0 181 226',
    },
    radio: {
      ...DEFAULT_COMPONENTS_DARK.radio,
      selectedBackground: '0 181 226', selectedBorderColor: '0 181 226', focusRingColor: '0 181 226',
    },
    toggle: {
      ...DEFAULT_COMPONENTS_DARK.toggle,
      trackActiveBackground: '0 181 226', focusRingColor: '0 181 226',
    },
    header: { ...DEFAULT_COMPONENTS_DARK.header, background: '27 32 41', textColor: '243 243 243', borderBottom: '57 64 75' },
    sidebar: {
      ...DEFAULT_COMPONENTS_DARK.sidebar,
      background: '17 19 25', textColor: '161 161 161',
      activeItemBackground: '0 161 201', activeItemTextColor: '255 255 255',
      hoverItemBackground: '38 44 57', borderRight: '57 64 75',
      searchHighlightColor: '0 181 226',
    },
    buttons: {
      ...DEFAULT_COMPONENTS_DARK.buttons,
      primary: {
        ...DEFAULT_COMPONENTS_DARK.buttons.primary,
        background: '0 161 201', backgroundHover: '0 181 226', backgroundActive: '0 133 166',
        textColor: '255 255 255', textColorHover: '255 255 255',
        borderColor: 'transparent', borderWidth: '0px', borderRadius: 'md', shadow: ShadowScale.Sm,
      },
      secondary: {
        ...DEFAULT_COMPONENTS_DARK.buttons.secondary,
        background: '38 44 57', backgroundHover: '57 64 75', backgroundActive: '78 88 106',
        textColor: '223 226 228', textColorHover: '243 243 243',
        borderColor: 'transparent', borderWidth: '0px', borderRadius: 'md', shadow: ShadowScale.None,
      },
      outline: {
        ...DEFAULT_COMPONENTS_DARK.buttons.outline,
        background: 'transparent', backgroundHover: '38 44 57', backgroundActive: '57 64 75',
        textColor: '0 181 226', textColorHover: '77 200 230',
        borderColor: '0 181 226', borderWidth: '1px', borderRadius: 'md', shadow: ShadowScale.None,
      },
      ghost: {
        ...DEFAULT_COMPONENTS_DARK.buttons.ghost,
        background: 'transparent', backgroundHover: '38 44 57', backgroundActive: '57 64 75',
        textColor: '243 243 243', textColorHover: '243 243 243',
        borderColor: 'transparent', borderWidth: '0px', borderRadius: 'md', shadow: ShadowScale.None,
      },
    },
    inputs: {
      ...DEFAULT_COMPONENTS_DARK.inputs,
      background: '38 44 57', borderDefault: '57 64 75', borderHover: '106 111 113',
      borderFocus: '0 181 226', focusRingColor: '0 181 226',
      textColor: '243 243 243', placeholderColor: '106 111 113', labelColor: '161 161 161',
    },
    badges: {
      success: { background: '21 128 61', textColor: '209 250 229', borderColor: '34 197 94' },
      warning: { background: '161 98 7', textColor: '254 243 199', borderColor: '234 179 8' },
      error: { background: '185 28 28', textColor: '254 226 226', borderColor: '239 68 68' },
      info: { background: '0 108 135', textColor: '204 239 248', borderColor: '0 181 226' },
      borderRadius: 'full', padding: '2px 8px',
    },
  },
};
