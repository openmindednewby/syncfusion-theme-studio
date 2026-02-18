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
