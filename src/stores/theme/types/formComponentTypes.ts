// Form component type definitions (buttons, inputs)

import type { ShadowScale } from './shadowScale';

export interface ButtonStateColors {
  background: string;
  backgroundHover: string;
  backgroundActive: string;
  textColor: string;
  textColorHover: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  shadow: ShadowScale;
  disabledBackground: string;
  disabledTextColor: string;
  disabledBorderColor: string;
  disabledOpacity: string;
}

export interface ButtonTypography {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface ButtonPadding {
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
}

export interface ButtonFocusRing {
  color: string;
  width: string;
  offset: string;
}

export interface ButtonsComponentConfig {
  primary: ButtonStateColors;
  secondary: ButtonStateColors;
  outline: ButtonStateColors;
  ghost: ButtonStateColors;
  danger: ButtonStateColors;
  typography: ButtonTypography;
  padding: ButtonPadding;
  gap: string;
  focusRing: ButtonFocusRing;
  transitionDuration: string;
}

export interface InputsConfig {
  background: string;
  borderDefault: string;
  borderHover: string;
  borderFocus: string;
  borderError: string;
  textColor: string;
  placeholderColor: string;
  labelColor: string;
  helperTextColor: string;
  errorTextColor: string;
  focusRingColor: string;
  borderRadius: string;
  transitionDuration: string;
}
