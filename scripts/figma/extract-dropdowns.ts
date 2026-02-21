// Dropdown extraction from Figma "Drop down lists (Final) -dtt" page
// Extracts trigger and item COMPONENT_SET nodes for light/dark modes.
// Falls back to example FRAME nodes when variable bindings are absent.

import { findComponentSets } from './button-helpers';
import {
  findByName,
  findTextNode,
  getSolidFillColor,
  getSolidStrokeColor,
  getTextFillColor,
} from './extract-helpers';
import type {
  DropdownColorData,
  DropdownSectionData,
  FigmaNode,
  VariableColorResolver,
} from './types';

const LUMINANCE_THRESHOLD = 0.5;
const FALLBACK = '0 0 0';

// --- Trigger/Item extraction from COMPONENT_SETs ---

function findDropdownPage(document: FigmaNode): FigmaNode | undefined {
  return (document.children ?? []).find((p) =>
    p.name.toLowerCase().includes('drop down lists'),
  );
}

function extractFromTriggerSet(
  set: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Partial<DropdownColorData> {
  const result: Partial<DropdownColorData> = {};
  const variant = (set.children ?? [])[0];
  if (!variant) return result;

  const container = findByName(variant, 'content-container');
  const target = container ?? variant;

  result.background = getSolidFillColor(target, resolver, modeName);
  result.borderColor = getSolidStrokeColor(target, resolver, modeName);
  result.textColor = getTextFillColor(target, resolver, modeName);

  const chevron = findByName(variant, 'chevrons - menus');
  if (chevron) {
    const vector = findByName(chevron, 'Vector');
    if (vector) {
      result.iconColor = getSolidStrokeColor(vector, resolver, modeName)
        ?? getSolidFillColor(vector, resolver, modeName);
    }
  }

  if (target.cornerRadius) result.borderRadius = `${target.cornerRadius}px`;

  const textNode = findTextNode(target);
  if (textNode?.style) {
    if (textNode.style.fontFamily) result.fontFamily = textNode.style.fontFamily;
    if (textNode.style.fontSize) result.fontSize = `${textNode.style.fontSize}px`;
  }

  return result;
}

function extractFromItemSet(
  set: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Partial<DropdownColorData> {
  const result: Partial<DropdownColorData> = {};
  const variant = (set.children ?? []).find((c) => {
    const lower = c.name.toLowerCase();
    return lower.includes('single select') || lower.includes('property 1=single');
  }) ?? (set.children ?? [])[0];
  if (!variant) return result;

  const container = findByName(variant, 'content-container');
  const target = container ?? variant;

  result.itemBackground = getSolidFillColor(target, resolver, modeName);
  result.itemTextColor = getTextFillColor(target, resolver, modeName);

  return result;
}

// --- Example FRAME fallback (light/dark by luminance) ---

function luminance(rgb: string): number {
  const parts = rgb.split(' ').map(Number);
  const MAX_RGB = 255;
  return (
    (parts[0]! / MAX_RGB) * 0.299 +
    (parts[1]! / MAX_RGB) * 0.587 +
    (parts[2]! / MAX_RGB) * 0.114
  );
}

function extractFromExampleFrame(
  frame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Partial<DropdownColorData> {
  const result: Partial<DropdownColorData> = {};
  const container = findByName(frame, 'content-container');
  const target = container ?? frame;

  result.background = getSolidFillColor(target, resolver, modeName);
  result.borderColor =
    getSolidStrokeColor(frame, resolver, modeName) ??
    getSolidStrokeColor(target, resolver, modeName);
  result.textColor = getTextFillColor(target, resolver, modeName);

  const chevron = findByName(frame, 'Vector');
  if (chevron) {
    result.iconColor =
      getSolidStrokeColor(chevron, resolver, modeName) ??
      getSolidFillColor(chevron, resolver, modeName);
  }

  if (target.cornerRadius) result.borderRadius = `${target.cornerRadius}px`;

  const itemNode = findByName(frame, 'Input "dropdown list" item');
  if (itemNode) {
    const itemContainer = findByName(itemNode, 'content-container');
    const itemTarget = itemContainer ?? itemNode;
    result.itemBackground = getSolidFillColor(itemTarget, resolver, modeName);
    result.itemTextColor = getTextFillColor(itemTarget, resolver, modeName);
  }

  return result;
}

function classifyExamplesByLuminance(
  frames: FigmaNode[],
  resolver: VariableColorResolver | undefined,
): { light: FigmaNode[]; dark: FigmaNode[] } {
  const light: FigmaNode[] = [];
  const dark: FigmaNode[] = [];

  for (const frame of frames) {
    const container = findByName(frame, 'content-container');
    // Mode name irrelevant for raw luminance — use 'light' as default
    const bg = getSolidFillColor(container ?? frame, resolver, 'light');
    if (!bg) continue;
    if (luminance(bg) >= LUMINANCE_THRESHOLD) light.push(frame);
    else dark.push(frame);
  }

  return { light, dark };
}

// --- Merge & comparison helpers ---

function mergePartials(
  ...partials: Partial<DropdownColorData>[]
): DropdownColorData {
  const merged: Record<string, string | undefined> = {};
  for (const p of partials) {
    for (const [key, value] of Object.entries(p)) {
      if (value !== undefined) merged[key] = value;
    }
  }
  return {
    background: merged.background ?? FALLBACK,
    borderColor: merged.borderColor ?? FALLBACK,
    textColor: merged.textColor ?? FALLBACK,
    iconColor: merged.iconColor ?? merged.textColor ?? FALLBACK,
    itemBackground: merged.itemBackground ?? merged.background ?? FALLBACK,
    itemTextColor: merged.itemTextColor ?? merged.textColor ?? FALLBACK,
    borderRadius: merged.borderRadius,
    fontFamily: merged.fontFamily,
    fontSize: merged.fontSize,
  };
}

function colorsIdentical(a: DropdownColorData, b: DropdownColorData): boolean {
  return (
    a.background === b.background &&
    a.borderColor === b.borderColor &&
    a.textColor === b.textColor &&
    a.iconColor === b.iconColor &&
    a.itemBackground === b.itemBackground &&
    a.itemTextColor === b.itemTextColor
  );
}

/** When COMPONENT_SET modes are identical, use example FRAMEs for light/dark */
function applyExampleFallback(
  page: FigmaNode,
  lightBase: Partial<DropdownColorData>,
  darkBase: Partial<DropdownColorData>,
  resolver: VariableColorResolver | undefined,
): { light: DropdownColorData; dark: DropdownColorData } | undefined {
  const examples = (page.children ?? []).filter(
    (c) => c.type === 'FRAME' && c.name.toLowerCase().includes('example'),
  );
  if (examples.length === 0) return undefined;

  const classified = classifyExamplesByLuminance(examples, resolver);
  const light = classified.light.length > 0
    ? mergePartials(lightBase, extractFromExampleFrame(classified.light[0]!, resolver, 'light'))
    : mergePartials(lightBase);
  const dark = classified.dark.length > 0
    ? mergePartials(darkBase, extractFromExampleFrame(classified.dark[0]!, resolver, 'dark'))
    : mergePartials(darkBase);

  return { light, dark };
}

// --- Main export ---

export function extractDropdowns(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): DropdownSectionData | undefined {
  const page = findDropdownPage(document);
  if (!page) return undefined;

  const sets = findComponentSets(page);
  const triggerSet = sets.find(
    (s) =>
      s.name.toLowerCase().includes('dropdown list') &&
      !s.name.toLowerCase().includes('item'),
  );
  const itemSet = sets.find((s) =>
    s.name.toLowerCase().includes('dropdown list') &&
    s.name.toLowerCase().includes('item'),
  );

  if (!triggerSet && !itemSet) return undefined;

  const lightTrigger = triggerSet
    ? extractFromTriggerSet(triggerSet, resolver, 'light') : {};
  const darkTrigger = triggerSet
    ? extractFromTriggerSet(triggerSet, resolver, 'dark') : {};
  const lightItem = itemSet
    ? extractFromItemSet(itemSet, resolver, 'light') : {};
  const darkItem = itemSet
    ? extractFromItemSet(itemSet, resolver, 'dark') : {};

  let light = mergePartials(lightTrigger, lightItem);
  let dark = mergePartials(darkTrigger, darkItem);

  if (colorsIdentical(light, dark)) {
    const fallback = applyExampleFallback(
      page, { ...lightTrigger, ...lightItem },
      { ...darkTrigger, ...darkItem }, resolver,
    );
    if (fallback) ({ light, dark } = fallback);
  }

  console.log(`Dropdown trigger set: "${triggerSet?.name ?? 'none'}"`);
  console.log(`Dropdown item set: "${itemSet?.name ?? 'none'}"`);

  return { light, dark };
}
