// Figma API types and extraction/mapping types for the Figma-to-Theme pipeline

/** Figma RGBA color in 0-1 float range */
export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Figma paint fill/stroke */
export interface FigmaPaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  color?: FigmaColor;
  boundVariables?: Record<string, unknown>;
}

/** Figma text style properties */
export interface FigmaTextStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeightPx?: number;
  letterSpacing?: number;
}

/** Figma effect (shadow, blur, etc.) */
export interface FigmaEffect {
  type: string;
  visible?: boolean;
  color?: FigmaColor;
  offset?: { x: number; y: number };
  radius?: number;
}

/** Figma node from the REST API */
export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  cornerRadius?: number;
  effects?: FigmaEffect[];
  style?: FigmaTextStyle;
  children?: FigmaNode[];
  characters?: string;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;
  strokeWeight?: number;
  opacity?: number;
}

/** Property types extractable from a Figma node */
export type FigmaPropertyType =
  | 'fill'
  | 'stroke'
  | 'effect'
  | 'text-style'
  | 'corner-radius';

/** Single extracted property from a Figma node */
export interface ExtractedProperty {
  nodePath: string;
  nodeId: string;
  propertyType: FigmaPropertyType;
  rawValue: FigmaColor | number | FigmaTextStyle;
  convertedValue?: string;
}

/** Extracted badge color data for a single badge instance */
export interface BadgeColorData {
  background: string;
  textColor: string;
  borderColor: string;
  fillOpacity: number;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
}

/** Badge data for a section (severity or sla) with light/dark variants */
export interface BadgeSectionData {
  light: Record<string, BadgeColorData>;
  dark: Record<string, BadgeColorData>;
}

/** Extracted button state color data (default/hover/active/disabled per variant) */
export interface ButtonStateData {
  background: string;
  textColor: string;
  borderColor: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  gap?: string;
  borderRadius?: string;
  borderWidth?: string;
  opacity?: string;
}

/** Extracted button variant data with states */
export interface ButtonVariantData {
  default?: ButtonStateData;
  hover?: ButtonStateData;
  active?: ButtonStateData;
  disabled?: ButtonStateData;
}

/** Extracted input color data for a single input state */
export interface InputColorData {
  background: string;
  borderColor: string;
  textColor: string;
  cornerRadius?: string;
  fillOpacity: number;
}

/** Input data with light/dark variants keyed by state label */
export interface InputSectionData {
  light: Record<string, InputColorData>;
  dark: Record<string, InputColorData>;
}

/** Extracted text description data */
export interface TextDescriptionData {
  textColor: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

/** Single icon node discovered in the Figma document tree */
export interface IconNodeData {
  nodeId: string;
  name: string;
  svgContent: string;
}

/** Result of the icon extraction phase */
export interface IconExtractionData {
  totalFound: number;
  skipped: number;
  icons: IconNodeData[];
}

/** Extracted nav menu color data for a single theme mode */
export interface NavMenuColorData {
  background: string;
  textColor: string;
  activeBackground: string;
  activeTextColor: string;
  hoverBackground?: string;
  hoverTextColor?: string;
  borderColor: string;
  iconColor?: string;
  separatorColor?: string;
  itemBorderRadius?: string;
  itemPaddingLeft?: string;
  itemPaddingRight?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

/** Nav menu data with light/dark variants */
export interface NavMenuSectionData {
  light: NavMenuColorData;
  dark: NavMenuColorData;
}

/** Extracted external link data */
export interface ExternalLinkData {
  textColor: string;
  iconColor: string;
  disabledTextColor?: string;
  disabledIconColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textDecoration?: string;
  gap?: string;
}

/** Extracted checkbox state data from Figma */
export interface CheckboxExtractionData {
  checkedBackground: string;
  checkedBorderColor: string;
  checkmarkColor: string;
  uncheckedBorderColor: string;
  disabledBackground?: string;
  disabledBorderColor?: string;
  size?: string;
  borderRadius?: string;
}

/** Extracted radio state data from Figma */
export interface RadioExtractionData {
  selectedBorderColor: string;
  dotColor: string;
  uncheckedBorderColor: string;
  disabledBorderColor?: string;
  disabledLabelColor?: string;
  size?: string;
  labelFontFamily?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
}

/** Form control extraction with light/dark modes */
export interface FormControlExtractionData {
  checkbox?: {
    light: CheckboxExtractionData;
    dark: CheckboxExtractionData;
  };
  radio?: {
    light: RadioExtractionData;
    dark: RadioExtractionData;
  };
}

/** Full extraction output */
export interface FigmaExtraction {
  fileKey: string;
  fileName: string;
  extractedAt: string;
  lightFrame: {
    nodeId: string;
    nodeName: string;
    properties: ExtractedProperty[];
  };
  darkFrame: {
    nodeId: string;
    nodeName: string;
    properties: ExtractedProperty[];
  };
  badges?: {
    severity?: BadgeSectionData;
    sla?: BadgeSectionData;
  };
  buttons?: {
    light: Record<string, ButtonVariantData>;
    dark: Record<string, ButtonVariantData>;
  };
  inputs?: InputSectionData;
  textDescription?: TextDescriptionData;
  icons?: IconExtractionData;
  navMenus?: NavMenuSectionData;
  externalLink?: ExternalLinkData;
  formControls?: FormControlExtractionData;
}

/** Single mapping rule */
export interface MappingRule {
  figmaPath: string;
  themePath: string;
  property?: FigmaPropertyType;
}

/** Root mapping config */
export interface FigmaMappingConfig {
  lightFrameSelector: string;
  darkFrameSelector: string;
  sharedMappings: MappingRule[];
  lightMappings: MappingRule[];
  darkMappings: MappingRule[];
}

// --- Figma Variables API types ---

/** Reference to another variable (used in boundVariables and alias values) */
export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

/** A single mode within a variable collection */
export interface FigmaVariableMode {
  modeId: string;
  name: string;
}

/** A variable collection containing modes */
export interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: FigmaVariableMode[];
}

/** A Figma variable with per-mode values */
export interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: string;
  variableCollectionId: string;
  valuesByMode: Record<string, FigmaColor | FigmaVariableAlias>;
}

/** Response from GET /v1/files/:key/variables/local */
export interface FigmaVariablesResponse {
  meta: {
    variables: Record<string, FigmaVariable>;
    variableCollections: Record<string, FigmaVariableCollection>;
  };
}

/**
 * Resolves a bound variable to a FigmaColor for a given mode.
 * Returns undefined if the variable or mode can't be resolved.
 */
export type VariableColorResolver = (
  boundVariables: Record<string, unknown>,
  modeName: string,
) => FigmaColor | undefined;
