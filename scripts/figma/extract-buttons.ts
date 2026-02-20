// Button extraction from Figma document tree
// Multi-strategy approach:
//   Strategy 1 (legacy): SECTION/FRAME named "buttons" with Light/Dark sub-frames
//   Strategy 2: "Buttons (Final)" page → COMPONENT_SET nodes → variant children
//   Strategy 3: "Buttons (Review)" page → 96-variant COMPONENT_SET (appearance×kind)
//   Strategy 4 (fallback): Search entire document for COMPONENT_SET nodes named "button"

import {
  extractFromComponentSets,
  extractFromNestedButtonSets,
  findButtonsPage,
  findComponentSets,
  findReviewPage,
} from './button-helpers';

import type {
  ButtonStateData,
  ButtonVariantData,
  FigmaColor,
  FigmaExtraction,
  FigmaNode,
  FigmaPaint,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';

type ModeResult = {
  light: Record<string, ButtonVariantData>;
  dark: Record<string, ButtonVariantData>;
};

function findSectionByName(
  root: FigmaNode,
  name: string,
): FigmaNode | undefined {
  const lowerName = name.toLowerCase();
  if (root.name.toLowerCase() === lowerName && (root.type === 'SECTION' || root.type === 'FRAME')) {
    return root;
  }
  for (const child of root.children ?? []) {
    const found = findSectionByName(child, name);
    if (found) return found;
  }
  return undefined;
}

function findTextChild(node: FigmaNode): FigmaNode | undefined {
  if (node.type === 'TEXT' && node.characters) return node;
  for (const child of node.children ?? []) {
    const found = findTextChild(child);
    if (found) return found;
  }
  return undefined;
}

function resolvePaintColor(
  paint: FigmaPaint,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): FigmaColor | undefined {
  if (resolver && paint.boundVariables) {
    const resolved = resolver(paint.boundVariables, modeName);
    if (resolved) return resolved;
  }
  return paint.color;
}

export function extractStateColors(
  stateFrame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): ButtonStateData | undefined {
  const fills = stateFrame.fills ?? [];
  const solidFill = fills.find((p) => p.type === 'SOLID' && p.visible !== false);
  const fillColor = solidFill
    ? resolvePaintColor(solidFill, resolver, modeName)
    : undefined;

  const strokes = stateFrame.strokes ?? [];
  const solidStroke = strokes.find((p) => p.type === 'SOLID' && p.visible !== false);
  const strokeColor = solidStroke
    ? resolvePaintColor(solidStroke, resolver, modeName)
    : undefined;

  const textNode = findTextChild(stateFrame);
  let textFillColor: FigmaColor | undefined;
  if (textNode) {
    const textFills = textNode.fills ?? [];
    const textSolid = textFills.find((p) => p.type === 'SOLID' && p.visible !== false);
    if (textSolid) textFillColor = resolvePaintColor(textSolid, resolver, modeName);
  }

  if (!fillColor && !textFillColor) return undefined;

  const state: ButtonStateData = {
    background: fillColor ? figmaColorToRgb(fillColor) : 'transparent',
    textColor: textFillColor ? figmaColorToRgb(textFillColor) : '255 255 255',
    borderColor: strokeColor ? figmaColorToRgb(strokeColor) : 'transparent',
  };

  appendTypography(state, textNode);
  appendLayoutProps(state, stateFrame);

  return state;
}

function appendTypography(
  state: ButtonStateData,
  textNode: FigmaNode | undefined,
): void {
  if (!textNode?.style) return;
  const { fontFamily, fontSize, fontWeight, lineHeightPx, letterSpacing } = textNode.style;

  if (fontFamily) state.fontFamily = fontFamily;
  if (fontSize !== undefined) state.fontSize = `${fontSize}px`;
  if (fontWeight !== undefined) state.fontWeight = String(fontWeight);
  if (lineHeightPx !== undefined) state.lineHeight = `${lineHeightPx}px`;
  if (letterSpacing !== undefined) state.letterSpacing = `${letterSpacing}px`;
}

function appendLayoutProps(
  state: ButtonStateData,
  frame: FigmaNode,
): void {
  if (frame.paddingTop !== undefined) state.paddingTop = `${frame.paddingTop}px`;
  if (frame.paddingRight !== undefined) state.paddingRight = `${frame.paddingRight}px`;
  if (frame.paddingBottom !== undefined) state.paddingBottom = `${frame.paddingBottom}px`;
  if (frame.paddingLeft !== undefined) state.paddingLeft = `${frame.paddingLeft}px`;
  if (frame.itemSpacing !== undefined) state.gap = `${frame.itemSpacing}px`;
  if (frame.cornerRadius !== undefined) state.borderRadius = `${frame.cornerRadius}px`;
  if (frame.strokeWeight !== undefined) state.borderWidth = `${frame.strokeWeight}px`;
  if (frame.opacity !== undefined) state.opacity = String(frame.opacity);
}

const STATE_NAME_MAP: Record<string, keyof ButtonVariantData> = {
  default: 'default',
  hover: 'hover',
  active: 'active',
  pressed: 'active',
  disabled: 'disabled',
};

function extractVariant(
  variantFrame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): ButtonVariantData | undefined {
  const variant: ButtonVariantData = {};
  let found = false;

  for (const child of variantFrame.children ?? []) {
    const stateKey = STATE_NAME_MAP[child.name.toLowerCase()];
    if (!stateKey) continue;

    const stateData = extractStateColors(child, resolver, modeName);
    if (stateData) {
      variant[stateKey] = stateData;
      found = true;
    }
  }

  return found ? variant : undefined;
}

const VARIANT_NAMES = ['primary', 'secondary', 'outline', 'ghost', 'danger'];

function extractButtonsFromMode(
  modeFrame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Record<string, ButtonVariantData> {
  const result: Record<string, ButtonVariantData> = {};

  for (const child of modeFrame.children ?? []) {
    const variantKey = child.name.toLowerCase();
    if (!VARIANT_NAMES.includes(variantKey)) continue;

    const variantData = extractVariant(child, resolver, modeName);
    if (variantData) result[variantKey] = variantData;
  }

  return result;
}

/**
 * Merge supplementary data into primary result.
 * Only adds variants/states that don't exist in primary.
 */
function mergeButtonResults(
  primary: Record<string, ButtonVariantData>,
  supplement: Record<string, ButtonVariantData>,
): Record<string, ButtonVariantData> {
  const merged = { ...primary };

  for (const [variant, data] of Object.entries(supplement)) {
    if (!merged[variant]) {
      merged[variant] = data;
    } else {
      // Add missing states from supplement
      for (const state of ['default', 'hover', 'active', 'disabled'] as const) {
        if (!merged[variant][state] && data[state]) {
          merged[variant][state] = data[state];
        }
      }
    }
  }

  return merged;
}

// Strategy 1: SECTION/FRAME named "buttons" with Light/Dark sub-frames
function strategy1(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ModeResult | undefined {
  const section = findSectionByName(document, 'buttons');
  if (!section) return undefined;

  const lightFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'light',
  );
  const darkFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'dark',
  );

  if (!lightFrame && !darkFrame) return undefined;

  const light = lightFrame ? extractButtonsFromMode(lightFrame, resolver, 'light') : {};
  const dark = darkFrame ? extractButtonsFromMode(darkFrame, resolver, 'dark') : {};

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  console.log(`Strategy 1 (SECTION/FRAME): ${Object.keys(light).length} light, ${Object.keys(dark).length} dark`);
  return { light, dark };
}

// Strategy 2: Find button pages → COMPONENT_SET nodes with Variant/State format
function strategy2(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ModeResult | undefined {
  // Search ALL button-related pages, not just the first match
  const pages = (document.children ?? []).filter((p) => {
    const lower = p.name.toLowerCase();
    return lower.includes('button');
  });
  if (pages.length === 0) return undefined;

  let light: Record<string, ButtonVariantData> = {};
  let dark: Record<string, ButtonVariantData> = {};

  for (const page of pages) {
    const sets = findComponentSets(page);
    // Only process sets named exactly "Button" (exclude "Icon-Button", "base.button", etc.)
    const buttonSets = sets.filter((s) => s.name === 'Button');
    if (buttonSets.length === 0) continue;

    const pageLightData = extractFromComponentSets(buttonSets, extractStateColors, resolver, 'light');
    const pageDarkData = extractFromComponentSets(buttonSets, extractStateColors, resolver, 'dark');

    light = mergeButtonResults(light, pageLightData);
    dark = mergeButtonResults(dark, pageDarkData);
  }

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  console.log(`Strategy 2 (COMPONENT_SET pages): ${Object.keys(light).length} light, ${Object.keys(dark).length} dark`);
  return { light, dark };
}

// Strategy 3: 96-variant COMPONENT_SET with appearance×kind (supplements Strategy 2)
function strategy3(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ModeResult | undefined {
  // Find large Button COMPONENT_SETs (>10 variants = likely the appearance×kind set)
  const MIN_NESTED_VARIANTS = 10;
  const allSets = findComponentSets(document);
  const nestedSets = allSets.filter((s) => {
    const lower = s.name.toLowerCase();
    return lower === 'button' && (s.children?.length ?? 0) > MIN_NESTED_VARIANTS;
  });

  if (nestedSets.length === 0) return undefined;

  const light = extractFromNestedButtonSets(nestedSets, extractStateColors, resolver, 'light');
  const dark = extractFromNestedButtonSets(nestedSets, extractStateColors, resolver, 'dark');

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  console.log(`Strategy 3 (nested 96-variant): ${Object.keys(light).length} light, ${Object.keys(dark).length} dark`);
  return { light, dark };
}

// Strategy 4: Search entire document for any COMPONENT_SET named "button" (fallback)
function strategy4(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ModeResult | undefined {
  const allSets = findComponentSets(document);
  const buttonSets = allSets.filter((s) => s.name.toLowerCase().includes('button'));

  if (buttonSets.length === 0) return undefined;

  const light = extractFromComponentSets(buttonSets, extractStateColors, resolver, 'light');
  const dark = extractFromComponentSets(buttonSets, extractStateColors, resolver, 'dark');

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  console.log(`Strategy 4 (document-wide): ${Object.keys(light).length} light, ${Object.keys(dark).length} dark`);
  return { light, dark };
}

export function extractButtons(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): FigmaExtraction['buttons'] {
  // Strategy 1: legacy SECTION/FRAME
  const s1 = strategy1(document, resolver);
  if (s1) return s1;

  // Strategy 2+3: combine Variant/State data with appearance×kind data
  const s2 = strategy2(document, resolver);
  const s3 = strategy3(document, resolver);

  if (s2 && s3) {
    // Merge: Strategy 2 is primary (has states), Strategy 3 supplements missing variants
    const light = mergeButtonResults(s2.light, s3.light);
    const dark = mergeButtonResults(s2.dark, s3.dark);
    console.log(`Merged strategies 2+3: ${Object.keys(light).length} light, ${Object.keys(dark).length} dark`);
    return { light, dark };
  }

  if (s2) return s2;
  if (s3) return s3;

  // Strategy 4: document-wide fallback
  const s4 = strategy4(document, resolver);
  if (s4) return s4;

  return undefined;
}
