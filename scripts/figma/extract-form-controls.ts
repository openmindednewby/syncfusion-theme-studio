// Radio button and checkbox extraction from Figma COMPONENT_SET nodes
// Handles two sources:
//   1. "Buttons (Final)" page: "radio button" and "check box" sets (with variable bindings)
//   2. "Buttons (Review)" page: "base.radio" and "base.checkbox" sets (direct colors)

import { findComponentSets, parseAllProperties } from './button-helpers';
import type {
  CheckboxExtractionData,
  FigmaColor,
  FigmaNode,
  FigmaPaint,
  FormControlExtractionData,
  RadioExtractionData,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';

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

function getSolidFillColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): string | undefined {
  const fill = (node.fills ?? []).find((f) => f.type === 'SOLID' && f.visible !== false);
  if (!fill) return undefined;
  const color = resolvePaintColor(fill, resolver, modeName);
  return color ? figmaColorToRgb(color) : undefined;
}

function getSolidStrokeColor(
  node: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): string | undefined {
  const stroke = (node.strokes ?? []).find((s) => s.type === 'SOLID' && s.visible !== false);
  if (!stroke) return undefined;
  const color = resolvePaintColor(stroke, resolver, modeName);
  return color ? figmaColorToRgb(color) : undefined;
}

/** Find a descendant node by name (case-insensitive) */
function findByName(root: FigmaNode, name: string): FigmaNode | undefined {
  const lower = name.toLowerCase();
  if (root.name.toLowerCase() === lower) return root;
  for (const child of root.children ?? []) {
    const found = findByName(child, name);
    if (found) return found;
  }
  return undefined;
}

/** Find a descendant node by type */
function findByType(root: FigmaNode, type: string): FigmaNode | undefined {
  if (root.type === type) return root;
  for (const child of root.children ?? []) {
    const found = findByType(child, type);
    if (found) return found;
  }
  return undefined;
}

/** Find TEXT node descendant */
function findTextNode(root: FigmaNode): FigmaNode | undefined {
  return findByType(root, 'TEXT');
}

// --- Checkbox extraction ---

interface CheckboxVariants {
  checkedEnabled?: FigmaNode;
  checkedDisabled?: FigmaNode;
  uncheckedEnabled?: FigmaNode;
  uncheckedDisabled?: FigmaNode;
}

function classifyCheckboxVariants(set: FigmaNode): CheckboxVariants {
  const result: CheckboxVariants = {};

  for (const child of set.children ?? []) {
    const props = parseAllProperties(child.name);
    const type = props.type ?? props['property 1'] ?? '';
    const state = props.state ?? 'enabled';
    const isChecked = type === 'checked';
    const isEnabled = state === 'enabled';

    if (isChecked && isEnabled) result.checkedEnabled = child;
    else if (isChecked && !isEnabled) result.checkedDisabled = child;
    else if (!isChecked && isEnabled) result.uncheckedEnabled = child;
    else result.uncheckedDisabled = child;
  }

  return result;
}

function extractCheckboxData(
  set: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): CheckboxExtractionData | undefined {
  const variants = classifyCheckboxVariants(set);
  if (!variants.checkedEnabled && !variants.uncheckedEnabled) return undefined;

  const data: CheckboxExtractionData = {
    checkedBackground: '59 130 246',
    checkedBorderColor: '59 130 246',
    checkmarkColor: '255 255 255',
    uncheckedBorderColor: '209 213 219',
  };

  // Extract from checked+enabled variant
  if (variants.checkedEnabled) {
    const cbRect = findByName(variants.checkedEnabled, 'checkbox');
    if (cbRect) {
      const fill = getSolidFillColor(cbRect, resolver, modeName);
      if (fill) data.checkedBackground = fill;
      const stroke = getSolidStrokeColor(cbRect, resolver, modeName);
      if (stroke) data.checkedBorderColor = stroke;
      if (cbRect.cornerRadius) data.borderRadius = `${cbRect.cornerRadius}px`;
      const box = variants.checkedEnabled.absoluteBoundingBox;
      if (box) data.size = `${Math.round(box.width)}px`;
    }

    // Checkmark color from the check vector
    const checkInstance = findByName(variants.checkedEnabled, 'check');
    if (checkInstance) {
      const vector = findByType(checkInstance, 'VECTOR');
      if (vector) {
        const color = getSolidFillColor(vector, resolver, modeName);
        if (color) data.checkmarkColor = color;
      }
    }
  }

  // Extract from unchecked+enabled variant
  if (variants.uncheckedEnabled) {
    const cbRect = findByName(variants.uncheckedEnabled, 'checkbox');
    if (cbRect) {
      const stroke = getSolidStrokeColor(cbRect, resolver, modeName);
      if (stroke) data.uncheckedBorderColor = stroke;
    }
  }

  // Extract disabled state
  if (variants.uncheckedDisabled) {
    const cbRect = findByName(variants.uncheckedDisabled, 'checkbox');
    if (cbRect) {
      const fill = getSolidFillColor(cbRect, resolver, modeName);
      if (fill) data.disabledBackground = fill;
      const stroke = getSolidStrokeColor(cbRect, resolver, modeName);
      if (stroke) data.disabledBorderColor = stroke;
    }
  }

  return data;
}

// --- Radio extraction ---

interface RadioVariants {
  checkedEnabled?: FigmaNode;
  checkedDisabled?: FigmaNode;
  uncheckedEnabled?: FigmaNode;
  uncheckedDisabled?: FigmaNode;
  disabled?: FigmaNode;
  contrast?: FigmaNode;
}

function classifyRadioVariants(set: FigmaNode): RadioVariants {
  const result: RadioVariants = {};

  for (const child of set.children ?? []) {
    const props = parseAllProperties(child.name);
    const type = props.type ?? props['property 1'] ?? '';
    const state = props.state ?? '';

    // Handle "base.radio" format: type=unchecked/checked/contrast/disabled
    if (!state) {
      if (type === 'checked') result.checkedEnabled = child;
      else if (type === 'unchecked') result.uncheckedEnabled = child;
      else if (type === 'disabled') result.disabled = child;
      else if (type === 'contrast') result.contrast = child;
      continue;
    }

    // Handle "radio button" format: Property 1=Checked/Unchecked, State=Enabled/Disabled
    const isChecked = type === 'checked';
    const isEnabled = state === 'enabled';

    if (isChecked && isEnabled) result.checkedEnabled = child;
    else if (isChecked && !isEnabled) result.checkedDisabled = child;
    else if (!isChecked && isEnabled) result.uncheckedEnabled = child;
    else result.uncheckedDisabled = child;
  }

  return result;
}

function extractRadioData(
  set: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): RadioExtractionData | undefined {
  const variants = classifyRadioVariants(set);
  if (!variants.checkedEnabled && !variants.uncheckedEnabled) return undefined;

  const data: RadioExtractionData = {
    selectedBorderColor: '59 130 246',
    dotColor: '59 130 246',
    uncheckedBorderColor: '209 213 219',
  };

  // Extract from checked variant
  if (variants.checkedEnabled) {
    const radioRect = findByName(variants.checkedEnabled, 'radio');
    if (radioRect) {
      const stroke = getSolidStrokeColor(radioRect, resolver, modeName);
      if (stroke) data.selectedBorderColor = stroke;
      if (radioRect.absoluteBoundingBox) {
        data.size = `${Math.round(radioRect.absoluteBoundingBox.width)}px`;
      }
    }

    // Dot color from the "fill" ellipse
    const fillNode = findByName(variants.checkedEnabled, 'fill');
    if (fillNode) {
      const color = getSolidFillColor(fillNode, resolver, modeName);
      if (color) data.dotColor = color;
    }

    // Extract label text style
    const textNode = findTextNode(variants.checkedEnabled);
    if (textNode?.style) {
      if (textNode.style.fontFamily) data.labelFontFamily = textNode.style.fontFamily;
      if (textNode.style.fontSize) data.labelFontSize = `${textNode.style.fontSize}px`;
      if (textNode.style.fontWeight) data.labelFontWeight = String(textNode.style.fontWeight);
    }
  }

  // Extract from unchecked variant
  if (variants.uncheckedEnabled) {
    const radioRect = findByName(variants.uncheckedEnabled, 'radio');
    if (radioRect) {
      const stroke = getSolidStrokeColor(radioRect, resolver, modeName);
      if (stroke) data.uncheckedBorderColor = stroke;
    }
  }

  // Extract disabled state
  const disabledNode = variants.uncheckedDisabled ?? variants.disabled;
  if (disabledNode) {
    const radioRect = findByName(disabledNode, 'radio');
    if (radioRect) {
      const stroke = getSolidStrokeColor(radioRect, resolver, modeName);
      if (stroke) data.disabledBorderColor = stroke;
    }
    const textNode = findTextNode(disabledNode);
    if (textNode) {
      const color = getSolidFillColor(textNode, resolver, modeName);
      if (color) data.disabledLabelColor = color;
    }
  }

  return data;
}

// --- Main extraction ---

function findFormControlSets(
  document: FigmaNode,
): { checkboxSets: FigmaNode[]; radioSets: FigmaNode[] } {
  const checkboxSets: FigmaNode[] = [];
  const radioSets: FigmaNode[] = [];

  // Search all pages
  for (const page of document.children ?? []) {
    const sets = findComponentSets(page);
    for (const set of sets) {
      const lower = set.name.toLowerCase();
      if (lower.includes('check') && lower.includes('box') || lower === 'base.checkbox') {
        checkboxSets.push(set);
      } else if (lower.includes('radio') || lower === 'base.radio') {
        radioSets.push(set);
      }
    }
  }

  return { checkboxSets, radioSets };
}

export function extractFormControls(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): FormControlExtractionData | undefined {
  const { checkboxSets, radioSets } = findFormControlSets(document);
  const result: FormControlExtractionData = {};

  // Try each checkbox set until one produces data
  for (const set of checkboxSets) {
    const light = extractCheckboxData(set, resolver, 'light');
    const dark = extractCheckboxData(set, resolver, 'dark');
    if (light && dark) {
      result.checkbox = { light, dark };
      console.log(`Checkbox: extracted from "${set.name}" (${set.id})`);
      break;
    }
  }

  // Try each radio set until one produces data
  for (const set of radioSets) {
    const light = extractRadioData(set, resolver, 'light');
    const dark = extractRadioData(set, resolver, 'dark');
    if (light && dark) {
      result.radio = { light, dark };
      console.log(`Radio: extracted from "${set.name}" (${set.id})`);
      break;
    }
  }

  if (!result.checkbox && !result.radio) return undefined;
  return result;
}
