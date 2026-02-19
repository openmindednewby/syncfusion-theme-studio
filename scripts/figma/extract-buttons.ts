// Button extraction from Figma document tree
// Used by extract.ts to pull button color data from variant/state frames
// Expected Figma structure:
//   Buttons (section) > Light/Dark > Primary/Secondary/... > Default/Hover/Active

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

function extractStateColors(
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

export function extractButtons(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): FigmaExtraction['buttons'] {
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

  console.log(`Buttons: ${Object.keys(light).length} light, ${Object.keys(dark).length} dark variants`);

  return { light, dark };
}
