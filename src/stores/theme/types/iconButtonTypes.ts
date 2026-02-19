// Icon button component type definitions

export interface IconButtonVariantColors {
  background: string;
  backgroundHover: string;
  backgroundActive: string;
  iconColor: string;
  iconColorHover: string;
  borderColor: string;
  borderWidth: string;
  disabledBackground: string;
  disabledIconColor: string;
  disabledOpacity: string;
}

export interface IconButtonConfig {
  primary: IconButtonVariantColors;
  secondary: IconButtonVariantColors;
  tertiary: IconButtonVariantColors;
  borderRadius: string;
  size: string;
  iconSize: string;
  focusRingColor: string;
  transitionDuration: string;
}
