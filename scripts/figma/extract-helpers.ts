// Shared paint/node helpers for Figma extraction scripts
// Used by extract-dropdowns.ts and other extractors that need
// variable-resolved paint colors and node traversal.

import type {
  FigmaColor,
  FigmaNode,
  FigmaPaint,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';

/** Resolve a paint's color, preferring variable binding over raw color */
export function resolvePaintColor(
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

/** Get the first visible solid fill color as an RGB string */
export function getSolidFillColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): string | undefined {
  const fill = (node.fills ?? []).find(
    (f) => f.type === 'SOLID' && f.visible !== false,
  );
  if (!fill) return undefined;
  const color = resolvePaintColor(fill, resolver, modeName);
  return color ? figmaColorToRgb(color) : undefined;
}

/** Get the first visible solid stroke color as an RGB string */
export function getSolidStrokeColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): string | undefined {
  const stroke = (node.strokes ?? []).find(
    (s) => s.type === 'SOLID' && s.visible !== false,
  );
  if (!stroke) return undefined;
  const color = resolvePaintColor(stroke, resolver, modeName);
  return color ? figmaColorToRgb(color) : undefined;
}

/** Find a descendant node by name (case-insensitive, DFS) */
export function findByName(
  root: FigmaNode,
  name: string,
): FigmaNode | undefined {
  const lower = name.toLowerCase();
  if (root.name.toLowerCase() === lower) return root;
  for (const child of root.children ?? []) {
    const found = findByName(child, name);
    if (found) return found;
  }
  return undefined;
}

/** Find the first TEXT node descendant */
export function findTextNode(root: FigmaNode): FigmaNode | undefined {
  if (root.type === 'TEXT') return root;
  for (const child of root.children ?? []) {
    const found = findTextNode(child);
    if (found) return found;
  }
  return undefined;
}

/** Get the fill color of the first TEXT descendant */
export function getTextFillColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): string | undefined {
  const textNode = findTextNode(node);
  if (!textNode) return undefined;
  return getSolidFillColor(textNode, resolver, modeName);
}
