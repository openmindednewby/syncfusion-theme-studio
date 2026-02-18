import { describe, it, expect } from 'vitest';

import type { FigmaColor, FigmaNode } from './types';
import {
  figmaColorToRgb,
  extractSolidFill,
  extractSolidStroke,
  buildNodePath,
  findNodeByPath,
  deepSet,
  deepMerge,
} from './utils';

describe('figmaColorToRgb', () => {
  it('converts 0-1 float RGBA to space-separated RGB', () => {
    const color: FigmaColor = { r: 0.231, g: 0.51, b: 0.965, a: 1 };
    expect(figmaColorToRgb(color)).toBe('59 130 246');
  });

  it('converts pure white', () => {
    expect(figmaColorToRgb({ r: 1, g: 1, b: 1, a: 1 })).toBe('255 255 255');
  });

  it('converts pure black', () => {
    expect(figmaColorToRgb({ r: 0, g: 0, b: 0, a: 1 })).toBe('0 0 0');
  });

  it('rounds to nearest integer', () => {
    const color: FigmaColor = { r: 0.5, g: 0.5, b: 0.5, a: 1 };
    expect(figmaColorToRgb(color)).toBe('128 128 128');
  });

  it('ignores alpha channel', () => {
    const color: FigmaColor = { r: 1, g: 0, b: 0, a: 0.5 };
    expect(figmaColorToRgb(color)).toBe('255 0 0');
  });
});

describe('extractSolidFill', () => {
  it('returns first visible solid fill color', () => {
    const node: FigmaNode = {
      id: '1',
      name: 'test',
      type: 'RECTANGLE',
      fills: [
        { type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 } },
      ],
    };
    expect(extractSolidFill(node)).toEqual({ r: 1, g: 0, b: 0, a: 1 });
  });

  it('skips hidden fills', () => {
    const node: FigmaNode = {
      id: '1',
      name: 'test',
      type: 'RECTANGLE',
      fills: [
        { type: 'SOLID', visible: false, color: { r: 1, g: 0, b: 0, a: 1 } },
        { type: 'SOLID', color: { r: 0, g: 1, b: 0, a: 1 } },
      ],
    };
    expect(extractSolidFill(node)).toEqual({ r: 0, g: 1, b: 0, a: 1 });
  });

  it('skips gradient fills', () => {
    const node: FigmaNode = {
      id: '1',
      name: 'test',
      type: 'RECTANGLE',
      fills: [
        { type: 'GRADIENT_LINEAR' },
        { type: 'SOLID', color: { r: 0, g: 0, b: 1, a: 1 } },
      ],
    };
    expect(extractSolidFill(node)).toEqual({ r: 0, g: 0, b: 1, a: 1 });
  });

  it('returns undefined when no fills', () => {
    const node: FigmaNode = { id: '1', name: 'test', type: 'RECTANGLE' };
    expect(extractSolidFill(node)).toBeUndefined();
  });

  it('returns undefined when fills array is empty', () => {
    const node: FigmaNode = {
      id: '1',
      name: 'test',
      type: 'RECTANGLE',
      fills: [],
    };
    expect(extractSolidFill(node)).toBeUndefined();
  });
});

describe('extractSolidStroke', () => {
  it('returns first visible solid stroke color', () => {
    const node: FigmaNode = {
      id: '1',
      name: 'test',
      type: 'RECTANGLE',
      strokes: [
        { type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 } },
      ],
    };
    expect(extractSolidStroke(node)).toEqual({ r: 1, g: 0, b: 0, a: 1 });
  });

  it('returns undefined when no strokes', () => {
    const node: FigmaNode = { id: '1', name: 'test', type: 'RECTANGLE' };
    expect(extractSolidStroke(node)).toBeUndefined();
  });
});

describe('buildNodePath', () => {
  it('builds root-level path', () => {
    expect(buildNodePath('Colors', '')).toBe('Colors');
  });

  it('builds nested path', () => {
    expect(buildNodePath('Primary', 'Colors')).toBe('Colors/Primary');
  });

  it('builds deeply nested path', () => {
    expect(buildNodePath('500', 'Colors/Primary')).toBe('Colors/Primary/500');
  });
});

describe('findNodeByPath', () => {
  const tree: FigmaNode = {
    id: 'root',
    name: 'Root',
    type: 'FRAME',
    children: [
      {
        id: 'colors',
        name: 'Colors',
        type: 'FRAME',
        children: [
          {
            id: 'primary',
            name: 'Primary',
            type: 'FRAME',
            children: [
              { id: '500', name: '500', type: 'RECTANGLE' },
            ],
          },
        ],
      },
      {
        id: 'buttons',
        name: 'Buttons',
        type: 'FRAME',
      },
    ],
  };

  it('finds a top-level child', () => {
    expect(findNodeByPath(tree, 'Colors')?.id).toBe('colors');
  });

  it('finds a deeply nested node', () => {
    expect(findNodeByPath(tree, 'Colors/Primary/500')?.id).toBe('500');
  });

  it('returns undefined for non-existent path', () => {
    expect(findNodeByPath(tree, 'Colors/Secondary')).toBeUndefined();
  });

  it('returns undefined when traversing a leaf node', () => {
    expect(findNodeByPath(tree, 'Buttons/Label')).toBeUndefined();
  });
});

describe('deepSet', () => {
  it('sets a top-level value', () => {
    const obj: Record<string, unknown> = {};
    deepSet(obj, 'key', 'value');
    expect(obj).toEqual({ key: 'value' });
  });

  it('sets a nested value', () => {
    const obj: Record<string, unknown> = {};
    deepSet(obj, 'a.b.c', 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it('creates intermediate objects', () => {
    const obj: Record<string, unknown> = {};
    deepSet(obj, 'primary.500', '59 130 246');
    expect(obj).toEqual({ primary: { '500': '59 130 246' } });
  });

  it('preserves existing sibling keys', () => {
    const obj: Record<string, unknown> = { a: { existing: true } };
    deepSet(obj, 'a.newKey', 'newValue');
    expect(obj).toEqual({ a: { existing: true, newKey: 'newValue' } });
  });

  it('overwrites non-object intermediate values', () => {
    const obj: Record<string, unknown> = { a: 'string' };
    deepSet(obj, 'a.b', 42);
    expect(obj).toEqual({ a: { b: 42 } });
  });
});

describe('deepMerge', () => {
  it('merges flat objects', () => {
    const result = deepMerge({ a: 1 }, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('source overrides target', () => {
    const result = deepMerge({ a: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2 });
  });

  it('deep merges nested objects', () => {
    const target = { a: { b: 1, c: 2 } };
    const source = { a: { c: 3, d: 4 } };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
  });

  it('does not mutate inputs', () => {
    const target = { a: { b: 1 } };
    const source = { a: { c: 2 } };
    deepMerge(target, source);
    expect(target).toEqual({ a: { b: 1 } });
    expect(source).toEqual({ a: { c: 2 } });
  });

  it('overwrites non-object with object', () => {
    const result = deepMerge({ a: 'string' }, { a: { nested: true } });
    expect(result).toEqual({ a: { nested: true } });
  });

  it('overwrites object with non-object', () => {
    const result = deepMerge({ a: { nested: true } }, { a: 'string' });
    expect(result).toEqual({ a: 'string' });
  });
});
