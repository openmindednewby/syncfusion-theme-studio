// Helper utilities for nav menu extraction from Figma document tree.
// Separated from extract-nav-menus.ts for file size compliance.

import type {
  FigmaColor,
  FigmaNode,
  FigmaPaint,
  NavMenuColorData,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';

export function findSectionByName(
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

/** Find a node whose name contains the given substring (case-insensitive) */
export function findNodeContaining(
  root: FigmaNode,
  substring: string,
  types?: string[],
): FigmaNode | undefined {
  const lower = substring.toLowerCase();
  const nameMatch = root.name.toLowerCase().includes(lower);
  const typeMatch = !types || types.includes(root.type);
  if (nameMatch && typeMatch) return root;

  for (const child of root.children ?? []) {
    const found = findNodeContaining(child, substring, types);
    if (found) return found;
  }
  return undefined;
}

export function findTextChild(node: FigmaNode): FigmaNode | undefined {
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

export function extractFillColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): FigmaColor | undefined {
  const fills = node.fills ?? [];
  const solidFill = fills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (!solidFill) return undefined;
  return resolvePaintColor(solidFill, resolver, modeName);
}

export function extractStrokeColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): FigmaColor | undefined {
  const strokes = node.strokes ?? [];
  const solidStroke = strokes.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (!solidStroke) return undefined;
  return resolvePaintColor(solidStroke, resolver, modeName);
}

export function extractTextColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): FigmaColor | undefined {
  const textNode = findTextChild(node);
  if (!textNode) return undefined;
  const textFills = textNode.fills ?? [];
  const textSolid = textFills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (!textSolid) return undefined;
  return resolvePaintColor(textSolid, resolver, modeName);
}

/** Find the page containing navigation menu designs */
export function findNavMenuPage(document: FigmaNode): FigmaNode | undefined {
  const pages = document.children ?? [];
  return pages.find((p) => p.name.toLowerCase().includes('navigation menu'));
}

/** Find a child whose name contains 'light' (case-insensitive) */
export function findLightChild(parent: FigmaNode): FigmaNode | undefined {
  return (parent.children ?? []).find((c) => c.name.toLowerCase().includes('light'));
}

/** Find a child whose name contains 'dark' (case-insensitive) */
export function findDarkChild(parent: FigmaNode): FigmaNode | undefined {
  return (parent.children ?? []).find((c) => c.name.toLowerCase().includes('dark'));
}

/** Extract the component set named "menu items" for item-level state colors */
export function findMenuItemsComponentSet(root: FigmaNode): FigmaNode | undefined {
  if (root.name.toLowerCase() === 'menu items' && root.type === 'COMPONENT_SET') {
    return root;
  }
  for (const child of root.children ?? []) {
    const found = findMenuItemsComponentSet(child);
    if (found) return found;
  }
  return undefined;
}

/** Find a variant in a component set matching the given property values */
export function findVariant(
  componentSet: FigmaNode,
  selection: string,
): FigmaNode | undefined {
  const lowerSelection = selection.toLowerCase();
  return (componentSet.children ?? []).find((child) =>
    child.name.toLowerCase().includes(lowerSelection),
  );
}

export interface NavMenuContainerData {
  background?: string;
  borderColor?: string;
}

/** Extract container-level properties from a navigation menu instance */
export function extractContainerData(
  menuNode: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): NavMenuContainerData {
  const data: NavMenuContainerData = {};

  const bgColor = extractFillColor(menuNode, resolver, modeName);
  if (bgColor) data.background = figmaColorToRgb(bgColor);

  const strokeColor = extractStrokeColor(menuNode, resolver, modeName);
  if (strokeColor) data.borderColor = figmaColorToRgb(strokeColor);

  if (!data.background) {
    for (const child of menuNode.children ?? []) {
      const childBg = extractFillColor(child, resolver, modeName);
      if (childBg) {
        data.background = figmaColorToRgb(childBg);
        break;
      }
    }
  }

  return data;
}

/** Extract colors from a menu item variant */
export function extractItemStateColors(
  variant: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): { background?: string; textColor?: string; borderRadius?: string; paddingLeft?: string; paddingRight?: string } {
  const result: { background?: string; textColor?: string; borderRadius?: string; paddingLeft?: string; paddingRight?: string } = {};

  const bgColor = extractFillColor(variant, resolver, modeName);
  if (bgColor) result.background = figmaColorToRgb(bgColor);

  const txtColor = extractTextColor(variant, resolver, modeName);
  if (txtColor) result.textColor = figmaColorToRgb(txtColor);

  if (variant.cornerRadius !== undefined) result.borderRadius = `${variant.cornerRadius}px`;
  if (variant.paddingLeft !== undefined) result.paddingLeft = `${variant.paddingLeft}px`;
  if (variant.paddingRight !== undefined) result.paddingRight = `${variant.paddingRight}px`;

  return result;
}

/** Extract typography from a menu item variant's text node */
export function extractItemTypography(
  variant: FigmaNode,
): { fontFamily?: string; fontSize?: string; fontWeight?: string; lineHeight?: string } {
  const textNode = findTextChild(variant);
  if (!textNode?.style) return {};

  const result: { fontFamily?: string; fontSize?: string; fontWeight?: string; lineHeight?: string } = {};
  const { fontFamily, fontSize, fontWeight, lineHeightPx } = textNode.style;

  if (fontFamily) result.fontFamily = fontFamily;
  if (fontSize !== undefined) result.fontSize = `${fontSize}px`;
  if (fontWeight !== undefined) result.fontWeight = String(fontWeight);
  if (lineHeightPx !== undefined) result.lineHeight = `${lineHeightPx}px`;

  return result;
}

export function buildDefaultMode(mode: 'light' | 'dark'): NavMenuColorData {
  if (mode === 'light') {
    return {
      background: '250 251 252',
      textColor: '55 65 81',
      activeBackground: '0 83 104',
      activeTextColor: '255 255 255',
      borderColor: '229 231 235',
    };
  }
  return {
    background: '17 24 39',
    textColor: '209 213 219',
    activeBackground: '0 83 104',
    activeTextColor: '255 255 255',
    borderColor: '55 65 81',
  };
}
