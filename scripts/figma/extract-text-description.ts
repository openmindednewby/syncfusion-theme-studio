// Text Description extraction from Figma document tree
// Used by extract.ts to pull text description styling data

import type {
  FigmaColor,
  FigmaNode,
  FigmaPaint,
  TextDescriptionData,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';

function findPageByName(root: FigmaNode, name: string): FigmaNode | undefined {
  const lowerName = name.toLowerCase();
  for (const child of root.children ?? []) {
    if (child.type === 'CANVAS' && child.name.toLowerCase().includes(lowerName)) {
      return child;
    }
  }
  return undefined;
}

function findComponentSet(root: FigmaNode, name: string): FigmaNode | undefined {
  const lowerName = name.toLowerCase();
  if (root.name.toLowerCase() === lowerName && root.type === 'COMPONENT_SET') {
    return root;
  }
  for (const child of root.children ?? []) {
    const found = findComponentSet(child, name);
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

/** Resolve a paint's color: try bound variable first, fall back to raw color */
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

const LINE_HEIGHT_PX = 20;
const LETTER_SPACING_PERCENT = 2;

export function extractTextDescription(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): TextDescriptionData | undefined {
  const page = findPageByName(document, 'Text Description');
  if (!page) return undefined;

  const componentSet = findComponentSet(page, 'Description');
  if (!componentSet) return undefined;

  // Find the first component variant to extract text styling from
  const firstVariant = (componentSet.children ?? []).find(
    (c) => c.type === 'COMPONENT',
  );
  if (!firstVariant) return undefined;

  const textNode = findTextChild(firstVariant);
  if (!textNode) return undefined;

  // Extract text color from fills
  let textColor = '59 69 89'; // default
  const textFills = textNode.fills ?? [];
  const textSolid = textFills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (textSolid) {
    const resolved = resolvePaintColor(textSolid, resolver, 'light');
    if (resolved) textColor = figmaColorToRgb(resolved);
  }

  const style = textNode.style;
  const result: TextDescriptionData = {
    textColor,
    fontFamily: style?.fontFamily,
    fontSize: style?.fontSize ? `${style.fontSize}px` : undefined,
    fontWeight: style?.fontWeight ? String(style.fontWeight) : undefined,
    lineHeight: `${LINE_HEIGHT_PX}px`,
    letterSpacing: `${LETTER_SPACING_PERCENT}%`,
  };

  console.log(
    `Text Description: ${result.fontFamily ?? 'unknown'} ${result.fontSize ?? '?'}` +
    ` / color ${result.textColor}`,
  );

  return result;
}
