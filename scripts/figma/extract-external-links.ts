// External Link extraction from Figma document tree
// Used by extract.ts to pull external link styling data

import type {
  ExternalLinkData,
  FigmaColor,
  FigmaNode,
  FigmaPaint,
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

export function extractExternalLinks(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ExternalLinkData | undefined {
  const page = findPageByName(document, 'External Link');
  if (!page) return undefined;

  const componentSet = findComponentSet(page, 'External Link');
  if (!componentSet) return undefined;

  const firstVariant = (componentSet.children ?? []).find(
    (c) => c.type === 'COMPONENT',
  );
  if (!firstVariant) return undefined;

  const textNode = findTextChild(firstVariant);
  if (!textNode) return undefined;

  let textColor = '59 130 246';
  const textFills = textNode.fills ?? [];
  const textSolid = textFills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (textSolid) {
    const resolved = resolvePaintColor(textSolid, resolver, 'light');
    if (resolved) textColor = figmaColorToRgb(resolved);
  }

  const style = textNode.style;
  const result: ExternalLinkData = {
    textColor,
    iconColor: textColor,
    fontFamily: style?.fontFamily,
    fontSize: style?.fontSize ? `${style.fontSize}px` : undefined,
    fontWeight: style?.fontWeight ? String(style.fontWeight) : undefined,
    lineHeight: style?.lineHeightPx ? `${style.lineHeightPx}px` : undefined,
    letterSpacing: style?.letterSpacing ? `${style.letterSpacing}px` : undefined,
  };

  console.log(
    `External Link: ${result.fontFamily ?? 'unknown'} ${result.fontSize ?? '?'}` +
    ` / color ${result.textColor}`,
  );

  return result;
}
