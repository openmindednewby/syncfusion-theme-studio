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

function extractTextColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
  fallback: string,
): string {
  const textNode = findTextChild(node);
  if (!textNode) return fallback;

  const fills = textNode.fills ?? [];
  const solidFill = fills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (solidFill) {
    const resolved = resolvePaintColor(solidFill, resolver, modeName);
    if (resolved) return figmaColorToRgb(resolved);
  }
  return fallback;
}

export function extractExternalLinks(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): ExternalLinkData | undefined {
  const page = findPageByName(document, 'External Link');
  if (!page) return undefined;

  // Try "link" first (Final -dtt page), then fall back to "External Link"
  const componentSet = findComponentSet(page, 'link')
    ?? findComponentSet(page, 'External Link');
  if (!componentSet) return undefined;

  const variants = componentSet.children ?? [];
  let enabledColor = '59 69 89';
  let disabledColor = '156 163 175';
  let fontFamily: string | undefined;
  let fontSize: string | undefined;
  let fontWeight: string | undefined;
  let lineHeight: string | undefined;
  let letterSpacing: string | undefined;
  let gap: string | undefined;
  let textDecoration: string | undefined;

  for (const variant of variants) {
    if (variant.type !== 'COMPONENT') continue;

    const nameLower = variant.name.toLowerCase();
    const color = extractTextColor(variant, resolver, 'light', '59 69 89');

    if (nameLower.includes('disabled')) {
      disabledColor = color;
    } else {
      enabledColor = color;

      const textNode = findTextChild(variant);
      if (textNode?.style) {
        fontFamily = textNode.style.fontFamily;
        fontSize = textNode.style.fontSize ? `${textNode.style.fontSize}px` : undefined;
        fontWeight = textNode.style.fontWeight ? String(textNode.style.fontWeight) : undefined;
        lineHeight = textNode.style.lineHeightPx ? `${textNode.style.lineHeightPx}px` : undefined;
        letterSpacing = textNode.style.letterSpacing !== undefined
          ? `${textNode.style.letterSpacing}px`
          : undefined;
      }

      // Extract gap from the variant's layout (itemSpacing)
      if (variant.itemSpacing !== undefined) {
        gap = `${variant.itemSpacing}px`;
      }
    }
  }

  // Check for underline: look for a child rectangle/line node that acts as underline
  for (const variant of variants) {
    if (variant.type !== 'COMPONENT') continue;
    if (variant.name.toLowerCase().includes('disabled')) continue;

    // Check direct children for underline decoration hints
    for (const child of variant.children ?? []) {
      for (const grandchild of child.children ?? []) {
        if (grandchild.type === 'LINE' || grandchild.type === 'RECTANGLE') {
          textDecoration = 'underline';
          break;
        }
      }
      if (textDecoration) break;
    }
    break;
  }

  const result: ExternalLinkData = {
    textColor: enabledColor,
    iconColor: enabledColor,
    disabledTextColor: disabledColor,
    disabledIconColor: disabledColor,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textDecoration,
    gap,
  };

  console.log(
    `External Link: enabled=${result.textColor} disabled=${result.disabledTextColor}` +
    ` font=${result.fontFamily ?? 'unknown'} ${result.fontSize ?? '?'}` +
    ` gap=${result.gap ?? 'none'} decoration=${result.textDecoration ?? 'none'}`,
  );

  return result;
}
