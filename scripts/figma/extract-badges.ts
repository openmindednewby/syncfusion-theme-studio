// Badge extraction from Figma document tree
// Used by extract.ts to pull badge color data from severity/sla sections

import type {
  BadgeColorData,
  BadgeSectionData,
  FigmaColor,
  FigmaExtraction,
  FigmaNode,
  FigmaPaint,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';

function findSectionByName(
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

function findTextChild(node: FigmaNode): FigmaNode | undefined {
  if (node.type === 'TEXT' && node.characters) return node;
  for (const child of node.children ?? []) {
    const found = findTextChild(child);
    if (found) return found;
  }
  return undefined;
}

/** Resolve a paint's color: try bound variable first, fall back to raw color */
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

function extractBadgeColorData(
  badge: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): BadgeColorData | undefined {
  const fills = badge.fills ?? [];
  const solidFill = fills.find((p) => p.type === 'SOLID' && p.visible !== false);
  if (!solidFill) return undefined;

  const fillColor = resolvePaintColor(solidFill, resolver, modeName);
  if (!fillColor) return undefined;
  const fillOpacity = solidFill.opacity ?? 1;

  const strokes = badge.strokes ?? [];
  const solidStroke = strokes.find((p) => p.type === 'SOLID' && p.visible !== false);
  const strokeColor = solidStroke
    ? resolvePaintColor(solidStroke, resolver, modeName)
    : undefined;

  const textNode = findTextChild(badge);
  let textFillColor: FigmaColor | undefined;
  if (textNode) {
    const textFills = textNode.fills ?? [];
    const textSolid = textFills.find((p) => p.type === 'SOLID' && p.visible !== false);
    if (textSolid) textFillColor = resolvePaintColor(textSolid, resolver, modeName);
  }

  const result: BadgeColorData = {
    background: figmaColorToRgb(fillColor),
    textColor: textFillColor ? figmaColorToRgb(textFillColor) : '255 255 255',
    borderColor: strokeColor ? figmaColorToRgb(strokeColor) : figmaColorToRgb(fillColor),
    fillOpacity,
  };

  const style = textNode?.style;
  if (style) {
    result.fontFamily = style.fontFamily;
    result.fontSize = style.fontSize ? `${style.fontSize}px` : undefined;
    result.fontWeight = style.fontWeight ? String(style.fontWeight) : undefined;
    result.lineHeight = style.lineHeightPx ? `${style.lineHeightPx}px` : undefined;
    result.letterSpacing = style.letterSpacing !== undefined ? `${style.letterSpacing}px` : undefined;
  }

  if (badge.paddingTop !== undefined) result.paddingTop = `${badge.paddingTop}px`;
  if (badge.paddingRight !== undefined) result.paddingRight = `${badge.paddingRight}px`;
  if (badge.paddingBottom !== undefined) result.paddingBottom = `${badge.paddingBottom}px`;
  if (badge.paddingLeft !== undefined) result.paddingLeft = `${badge.paddingLeft}px`;

  return result;
}

const HEX_NOISE_PATTERN = /^[A-F0-9]{6}$/i;

function extractBadgesFromMode(
  modeFrame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: string,
): Record<string, BadgeColorData> {
  const badges: Record<string, BadgeColorData> = {};

  for (const child of modeFrame.children ?? []) {
    if (HEX_NOISE_PATTERN.test(child.name)) continue;

    const textNode = findTextChild(child);
    if (!textNode?.characters) continue;

    const label = textNode.characters.trim().toUpperCase();
    if (HEX_NOISE_PATTERN.test(label)) continue;

    const colorData = extractBadgeColorData(child, resolver, modeName);
    if (colorData) badges[label] = colorData;
  }

  return badges;
}

function extractBadgeSection(
  root: FigmaNode,
  sectionName: string,
  resolver: VariableColorResolver | undefined,
): BadgeSectionData | undefined {
  const section = findSectionByName(root, sectionName);
  if (!section) return undefined;

  const lightFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'light',
  );
  const darkFrame = (section.children ?? []).find(
    (c) => c.name.toLowerCase() === 'dark',
  );

  if (!lightFrame && !darkFrame) return undefined;

  const light = lightFrame ? extractBadgesFromMode(lightFrame, resolver, 'light') : {};
  const dark = darkFrame ? extractBadgesFromMode(darkFrame, resolver, 'dark') : {};

  if (Object.keys(light).length === 0 && Object.keys(dark).length === 0) return undefined;

  return { light, dark };
}

export function extractBadges(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): FigmaExtraction['badges'] {
  const severity = extractBadgeSection(document, 'severity', resolver);
  const sla = extractBadgeSection(document, 'sla', resolver);

  if (!severity && !sla) return undefined;

  console.log(
    `Badges: ${severity ? Object.keys(severity.light).length : 0} severity, ` +
    `${sla ? Object.keys(sla.light).length : 0} sla`,
  );

  return { severity, sla };
}
