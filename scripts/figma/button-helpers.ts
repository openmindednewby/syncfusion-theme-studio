// COMPONENT_SET parsing utilities for Figma button extraction
// Handles multiple variant property formats:
//   - "Variant=Button primary, State=Default" (12-variant set)
//   - "scale=m, appearance=solid, kind=brand, ..." (96-variant set)

import type {
  ButtonStateData,
  ButtonVariantData,
  FigmaNode,
  VariableColorResolver,
} from './types';

/** Parsed variant properties from a COMPONENT_SET child name */
interface VariantProperties {
  variant: string;
  state: string;
}

/**
 * Parse any "key=value, key=value" string into a Record.
 * Handles "(default)" suffixes in values (strips them).
 * Example: "scale=m (default), appearance=solid" → { scale: "m", appearance: "solid" }
 */
export function parseAllProperties(name: string): Record<string, string> {
  const result: Record<string, string> = {};
  const parts = name.split(',').map((p) => p.trim());

  for (const part of parts) {
    const eqIdx = part.indexOf('=');
    if (eqIdx < 0) continue;
    const key = part.slice(0, eqIdx).trim().toLowerCase();
    let value = part.slice(eqIdx + 1).trim().toLowerCase();
    // Strip "(default)" suffix
    value = value.replace(/\s*\(default\)/g, '');
    if (key && value) result[key] = value;
  }

  return result;
}

/**
 * Parse Figma COMPONENT_SET variant name into structured variant+state properties.
 * Input: "Variant=Button primary, State=Default"
 * Output: { variant: "button primary", state: "default" }
 */
export function parseVariantProperties(name: string): VariantProperties | undefined {
  const props = parseAllProperties(name);
  const variant = props.variant;
  const state = props.state;
  if (!variant || !state) return undefined;
  return { variant, state };
}

/** Maps Figma variant values to theme variant keys */
export const VARIANT_VALUE_MAP: Record<string, string> = {
  'button primary': 'primary',
  'button secondary': 'secondary',
  'button outline': 'outline',
  'button ghost': 'ghost',
  'button danger': 'danger',
  'button disabled': 'disabled',
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  danger: 'danger',
  disabled: 'disabled',
};

/** Maps Figma state values to ButtonVariantData keys */
const STATE_VALUE_MAP: Record<string, keyof ButtonVariantData> = {
  default: 'default',
  hover: 'hover',
  active: 'active',
  pressed: 'active',
  disabled: 'disabled',
  enabled: 'default',
};

/**
 * Maps appearance×kind from the 96-variant set to our 5 theme variants.
 * Key format: "appearance:kind"
 */
const APPEARANCE_KIND_MAP: Record<string, string> = {
  'solid:brand': 'primary',
  'outline-fill:neutral': 'secondary',
  'outline:neutral': 'outline',
  'outline:brand': 'outline',
  'transparent:neutral': 'ghost',
  'transparent:brand': 'ghost',
  'solid:danger': 'danger',
};

/**
 * Find the page whose name includes both "button" and "final" (case-insensitive).
 * Falls back to any page containing "button".
 */
export function findButtonsPage(document: FigmaNode): FigmaNode | undefined {
  const pages = document.children ?? [];

  const finalPage = pages.find((p) => {
    const lower = p.name.toLowerCase();
    return lower.includes('button') && lower.includes('final');
  });
  if (finalPage) return finalPage;

  return pages.find((p) => p.name.toLowerCase().includes('button'));
}

/** Find a page whose name includes "button" and "review" (case-insensitive) */
export function findReviewPage(document: FigmaNode): FigmaNode | undefined {
  return (document.children ?? []).find((p) => {
    const lower = p.name.toLowerCase();
    return lower.includes('button') && lower.includes('review');
  });
}

/** Recursively find all COMPONENT_SET nodes in a subtree */
export function findComponentSets(root: FigmaNode): FigmaNode[] {
  const results: FigmaNode[] = [];

  function walk(node: FigmaNode): void {
    if (node.type === 'COMPONENT_SET') {
      results.push(node);
      return;
    }
    for (const child of node.children ?? []) {
      walk(child);
    }
  }

  walk(root);
  return results;
}

/** Find a descendant node by name (case-insensitive), BFS */
function findDescendantByName(root: FigmaNode, name: string): FigmaNode | undefined {
  const lower = name.toLowerCase();
  const queue: FigmaNode[] = [...(root.children ?? [])];

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node.name.toLowerCase() === lower) return node;
    if (node.children) queue.push(...node.children);
  }

  return undefined;
}

/** Find the first TEXT node descendant */
function findTextDescendant(root: FigmaNode): FigmaNode | undefined {
  if (root.type === 'TEXT' && root.characters) return root;
  for (const child of root.children ?? []) {
    const found = findTextDescendant(child);
    if (found) return found;
  }
  return undefined;
}

/**
 * Extract button data from the 96-variant COMPONENT_SET with nested structure.
 * Structure: COMPONENT → button-container → bg-color-and-corners → corner-radius-container (fill/stroke)
 *            COMPONENT → button-container → TEXT "Button" (text color)
 */
export function extractFromNestedButtonSets(
  sets: FigmaNode[],
  extractStateFn: (node: FigmaNode, resolver: VariableColorResolver | undefined, modeName: string) => ButtonStateData | undefined,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Record<string, ButtonVariantData> {
  const result: Record<string, ButtonVariantData> = {};

  for (const set of sets) {
    for (const child of set.children ?? []) {
      const props = parseAllProperties(child.name);
      const appearance = props.appearance;
      const kind = props.kind;
      const iconOnly = props['icon only'];
      const loading = props.loading;

      // Skip icon-only and loading variants
      if (!appearance || !kind) continue;
      if (iconOnly === 'true' || loading === 'true') continue;

      const mapKey = `${appearance}:${kind}`;
      const themeVariant = APPEARANCE_KIND_MAP[mapKey];
      if (!themeVariant) continue;

      // Extract from nested structure
      const stateData = extractNestedButtonState(child, extractStateFn, resolver, modeName);
      if (!stateData) continue;

      // Only set if we don't already have this variant (first match wins)
      if (!result[themeVariant]) result[themeVariant] = {};
      if (!result[themeVariant].default) result[themeVariant].default = stateData;
    }
  }

  return result;
}

/**
 * Extract state data from a 96-variant button COMPONENT.
 * Navigates the nested structure to find bg color, text color, and layout.
 */
function extractNestedButtonState(
  component: FigmaNode,
  extractStateFn: (node: FigmaNode, resolver: VariableColorResolver | undefined, modeName: string) => ButtonStateData | undefined,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): ButtonStateData | undefined {
  // Try to find the corner-radius-container for bg/stroke
  const container = findDescendantByName(component, 'button-container');
  const cornerContainer = findDescendantByName(component, 'corner-radius-container');

  // Build a synthetic node that has the fills/strokes from the corner container
  // and the text from the button-container
  if (cornerContainer) {
    // Create a proxy node with the right fills/strokes + text children
    const textNode = container ? findTextDescendant(container) : findTextDescendant(component);
    const proxyNode: FigmaNode = {
      id: component.id,
      name: component.name,
      type: 'FRAME',
      fills: cornerContainer.fills,
      strokes: cornerContainer.strokes,
      cornerRadius: cornerContainer.cornerRadius,
      strokeWeight: cornerContainer.strokeWeight,
      paddingTop: container?.paddingTop,
      paddingRight: container?.paddingRight,
      paddingBottom: container?.paddingBottom,
      paddingLeft: container?.paddingLeft,
      itemSpacing: container?.itemSpacing,
      children: textNode ? [textNode] : [],
    };
    return extractStateFn(proxyNode, resolver, modeName);
  }

  // Fallback: try extracting from the component directly
  return extractStateFn(component, resolver, modeName);
}

/**
 * Extract button data from COMPONENT_SET nodes (12-variant format).
 * Each set's children have names like "Variant=Button primary, State=Default".
 * The "disabled" variant is stored separately and merged as disabled fallback.
 * Prefers "Icon=No" variants over "Icon=Yes" when both exist.
 */
export function extractFromComponentSets(
  sets: FigmaNode[],
  extractStateFn: (node: FigmaNode, resolver: VariableColorResolver | undefined, modeName: string) => ButtonStateData | undefined,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Record<string, ButtonVariantData> {
  const result: Record<string, ButtonVariantData> = {};
  let disabledFallback: ButtonStateData | undefined;

  for (const set of sets) {
    for (const child of set.children ?? []) {
      const allProps = parseAllProperties(child.name);
      const props = parseVariantProperties(child.name);
      if (!props) continue;

      // Prefer "Icon=No" variants for cleaner data
      const iconProp = allProps.icon;
      if (iconProp === 'yes') {
        // Check if we already have an "Icon=No" version for this variant+state
        const themeVariant = VARIANT_VALUE_MAP[props.variant];
        const stateKey = STATE_VALUE_MAP[props.state];
        if (themeVariant && stateKey && result[themeVariant]?.[stateKey]) continue;
      }

      const themeVariant = VARIANT_VALUE_MAP[props.variant];
      if (!themeVariant) continue;

      const stateKey = STATE_VALUE_MAP[props.state];
      if (!stateKey) continue;

      const stateData = extractStateFn(child, resolver, modeName);
      if (!stateData) continue;

      if (themeVariant === 'disabled') {
        if (stateKey === 'default') disabledFallback = stateData;
        continue;
      }

      if (!result[themeVariant]) result[themeVariant] = {};
      result[themeVariant][stateKey] = stateData;
    }
  }

  if (disabledFallback) {
    for (const variant of Object.values(result)) {
      if (!variant.disabled) variant.disabled = disabledFallback;
    }
  }

  return result;
}
