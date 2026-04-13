// Grid button component type definitions

export interface GridButtonStateColors {
  background: string;
  backgroundHover: string;
  textColor: string;
  borderColor: string;
  disabledOpacity: string;
}

export interface GridButtonTypography {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface GridButtonsConfig {
  default: GridButtonStateColors;
  save: GridButtonStateColors;
  delete: GridButtonStateColors;
  view: GridButtonStateColors;
  export: GridButtonStateColors;
  archive: GridButtonStateColors;
  typography: GridButtonTypography;
  paddingV: string;
  paddingH: string;
  borderRadius: string;
  transitionDuration: string;
}
