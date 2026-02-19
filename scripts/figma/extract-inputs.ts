// Input extraction from Figma document tree
// Used by extract.ts to pull input state color data from the input section

import type {
  FigmaColor,
  FigmaNode,
  FigmaPaint,
  InputColorData,
  InputSectionData,
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

function extractInputColorData(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): InputColorData | undefined {
  const fills = node.fills ?? [];
  const solidFill = fills.find((p) => p.type === 'SOLID' && p.visible !== false);
  const fillColor = solidFill
    ? resolvePaintColor(solidFill, resolver, modeName)
    : undefined;

  const strokes = node.strokes ?? [];
  const solidStroke = strokes.find((p) => p.type === 'SOLID' && p.visible !== false);
  const strokeColor = solidStroke
    ? resolvePaintColor(solidStroke, resolver, modeName)
    : undefined;

  const textNode = findTextChild(node);
  let textFillColor: FigmaColor | undefined;
  if (textNode) {
    const textFills = textNode.fills ?? [];
    const textSolid = textFills.find((p) => p.type === 'SOLID' && p.visible !== false);
    if (textSolid) textFillColor = resolvePaintColor(textSolid, resolver, modeName);
  }

  if (!fillColor && !strokeColor && !textFillColor) return undefined;

  return {
    background: fillColor ? figmaColorToRgb(fillColor) : '0 0 0',
    borderColor: strokeColor ? figmaColorToRgb(strokeColor) : '0 0 0',
    textColor: textFillColor ? figmaColorToRgb(textFillColor) : '0 0 0',
    cornerRadius: node.cornerRadius ? `${node.cornerRadius}px` : undefined,
    fillOpacity: solidFill?.opacity ?? 1,
  };
}

const HEX_NOISE_PATTERN = /^[A-F0-9]{6}$/i;

function extractInputsFromMode(
  modeFrame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Record<string, InputColorData> {
  const inputs: Record<string, InputColorData> = {};

  for (const child of modeFrame.children ?? []) {
    if (HEX_NOISE_PATTERN.test(child.name)) continue;

    const textNode = findTextChild(child);
    if (!textNode?.characters) continue;

    const label = textNode.characters.trim().toUpperCase();
    if (HEX_NOISE_PATTERN.test(label)) continue;

    const colorData = extractInputColorData(child, resolver, modeName);
    if (colorData) inputs[label] = colorData;
  }

  return inputs;
}

export function extractInputs(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): InputSectionData | undefined {
  const section = findSectionByName(document, 'input');
  if (!section) return undefined;

  const lightFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'light',
  );
  const darkFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'dark',
  );

  if (!lightFrame && !darkFrame) return undefined;

  const light = lightFrame ? extractInputsFromMode(lightFrame, resolver, 'light') : {};
  const dark = darkFrame ? extractInputsFromMode(darkFrame, resolver, 'dark') : {};

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  console.log(`Inputs: ${Object.keys(light).length} light, ${Object.keys(dark).length} dark states`);

  return { light, dark };
}
