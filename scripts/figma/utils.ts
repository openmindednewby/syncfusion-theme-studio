// Utility functions for Figma-to-Theme pipeline

import type { FigmaColor, FigmaNode, FigmaPaint } from './types';

const MAX_RGB_VALUE = 255;

/**
 * Convert Figma RGBA (0-1 float) to space-separated RGB string.
 * Example: {r:0.23, g:0.51, b:0.97} -> '59 130 247'
 */
export function figmaColorToRgb(color: FigmaColor): string {
  const r = Math.round(color.r * MAX_RGB_VALUE);
  const g = Math.round(color.g * MAX_RGB_VALUE);
  const b = Math.round(color.b * MAX_RGB_VALUE);
  return `${r} ${g} ${b}`;
}

/** Check if a paint is a visible solid fill */
function isVisibleSolidPaint(paint: FigmaPaint): boolean {
  return paint.type === 'SOLID' && paint.visible !== false;
}

/** Extract the first visible solid fill color from a node */
export function extractSolidFill(
  node: FigmaNode,
): FigmaColor | undefined {
  const fills = node.fills ?? [];
  const solidFill = fills.find(isVisibleSolidPaint);
  return solidFill?.color;
}

/** Extract the first visible solid fill with its paint opacity */
export function extractSolidFillWithOpacity(
  node: FigmaNode,
): { color: FigmaColor; opacity: number } | undefined {
  const fills = node.fills ?? [];
  const solidFill = fills.find(isVisibleSolidPaint);
  if (!solidFill?.color) return undefined;
  return { color: solidFill.color, opacity: solidFill.opacity ?? 1 };
}

/** Extract the first visible solid stroke color from a node */
export function extractSolidStroke(
  node: FigmaNode,
): FigmaColor | undefined {
  const strokes = node.strokes ?? [];
  const solidStroke = strokes.find(isVisibleSolidPaint);
  return solidStroke?.color;
}

/**
 * Build a `/`-separated path from root to the given node.
 * parentPath is the already-built path of the parent.
 */
export function buildNodePath(
  nodeName: string,
  parentPath: string,
): string {
  return parentPath ? `${parentPath}/${nodeName}` : nodeName;
}

/**
 * Find a node in a Figma tree by `/`-separated path.
 * Searches children recursively, matching by name segments.
 */
export function findNodeByPath(
  root: FigmaNode,
  path: string,
): FigmaNode | undefined {
  const segments = path.split('/');
  let current: FigmaNode | undefined = root;

  for (const segment of segments) {
    if (!current?.children) return undefined;
    current = current.children.find((child) => child.name === segment);
    if (!current) return undefined;
  }

  return current;
}

/**
 * Set a deeply nested value on an object using dot-notation path.
 * Example: deepSet(obj, 'a.b.c', 42) -> obj.a.b.c = 42
 */
export function deepSet(
  obj: Record<string, unknown>,
  dotPath: string,
  value: unknown,
): void {
  const keys = dotPath.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1]!;
  current[lastKey] = value;
}

/** Check if a value is a plain object */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep merge source into target (source values override target).
 * Returns a new object; does not mutate inputs.
 */
export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...target };

  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      result[key] = deepMerge(targetVal, sourceVal);
    } else {
      result[key] = sourceVal;
    }
  }

  return result;
}
