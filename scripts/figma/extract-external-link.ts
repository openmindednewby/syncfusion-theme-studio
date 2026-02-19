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

function extractStateColor(
  variant: FigmaNode,
  resolver: VariableColorResolver | undefined,
): string {
  const textNode = findTextChild(variant);
  if (!textNode) return '59 69 89';

  const fills = textNode.fills ?? [];
  const solidFill = fills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (solidFill) {
    const resolved = resolvePaintColor(solidFill, resolver, 'light');
    if (resolved) return figmaColorToRgb(resolved);
  }
  return '59 69 89';
}

export function extractExternalLink(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ExternalLinkData | undefined {
  const page = findPageByName(document, 'External Link');
  if (!page) return undefined;

  const componentSet = findComponentSet(page, 'link');
  if (!componentSet) return undefined;

  const variants = componentSet.children ?? [];
  let enabledColor = '59 69 89';
  let disabledColor = '156 163 175';
  let fontFamily: string | undefined;
  let fontSize: string | undefined;
  let fontWeight: string | undefined;

  for (const variant of variants) {
    if (variant.type !== 'COMPONENT') continue;

    const nameLower = variant.name.toLowerCase();
    const color = extractStateColor(variant, resolver);

    if (nameLower.includes('disabled')) {
      disabledColor = color;
    } else {
      enabledColor = color;

      const textNode = findTextChild(variant);
      if (textNode?.style) {
        fontFamily = textNode.style.fontFamily;
        fontSize = textNode.style.fontSize ? `${textNode.style.fontSize}px` : undefined;
        fontWeight = textNode.style.fontWeight ? String(textNode.style.fontWeight) : undefined;
      }
    }
  }

  const result: ExternalLinkData = {
    enabledColor,
    disabledColor,
    fontFamily,
    fontSize,
    fontWeight,
  };

  console.log(
    `External Link: enabled=${result.enabledColor} disabled=${result.disabledColor}` +
    ` font=${result.fontFamily ?? 'unknown'} ${result.fontSize ?? '?'}`,
  );

  return result;
}
