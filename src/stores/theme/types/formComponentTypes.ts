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
}

export interface ButtonsComponentConfig {
  primary: ButtonStateColors;
  secondary: ButtonStateColors;
  outline: ButtonStateColors;
  ghost: ButtonStateColors;
  danger: ButtonStateColors;
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
