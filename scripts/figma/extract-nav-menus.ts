// Nav menu extraction from Figma document tree
// Used by extract.ts to pull navigation menu color data
// Expected Figma structure:
//   "navigation menu" section/page containing light/dark instances
//   "menu items" component set with Default/Selected variants

import type {
  FigmaExtraction,
  FigmaNode,
  NavMenuColorData,
  VariableColorResolver,
} from './types';
import { figmaColorToRgb } from './utils';
import {
  buildDefaultMode,
  extractContainerData,
  extractFillColor,
  extractItemStateColors,
  extractItemTypography,
  extractTextColor,
  findDarkChild,
  findLightChild,
  findMenuItemsComponentSet,
  findNavMenuPage,
  findNodeContaining,
  findSectionByName,
  findVariant,
} from './nav-menu-helpers';

/** Find item variants and extract their state colors */
function extractVariantStates(
  menuItemsSet: FigmaNode | undefined,
  resolver: VariableColorResolver | undefined,
  mode: 'light' | 'dark',
): { defaultState: ReturnType<typeof extractItemStateColors>; selectedState: ReturnType<typeof extractItemStateColors>; hoverState: ReturnType<typeof extractItemStateColors>; defaultVariant: FigmaNode | undefined } {
  const defaultVariant = menuItemsSet ? findVariant(menuItemsSet, 'default') : undefined;
  const selectedVariant = menuItemsSet ? findVariant(menuItemsSet, 'selected') : undefined;
  const hoverVariant = menuItemsSet ? findVariant(menuItemsSet, 'hover') : undefined;

  return {
    defaultState: defaultVariant ? extractItemStateColors(defaultVariant, resolver, mode) : {},
    selectedState: selectedVariant ? extractItemStateColors(selectedVariant, resolver, mode) : {},
    hoverState: hoverVariant ? extractItemStateColors(hoverVariant, resolver, mode) : {},
    defaultVariant,
  };
}

/** Extract icon color from a default menu item variant */
function extractIconColor(
  defaultVariant: FigmaNode | undefined,
  resolver: VariableColorResolver | undefined,
  mode: string,
): string | undefined {
  if (!defaultVariant) return undefined;
  for (const child of defaultVariant.children ?? []) {
    if (child.type !== 'TEXT') {
      const iconFill = extractFillColor(child, resolver, mode);
      if (iconFill) return figmaColorToRgb(iconFill);
    }
  }
  return undefined;
}

/** Build NavMenuColorData from the navigation page for a given mode */
function extractModeData(
  navPage: FigmaNode,
  mode: 'light' | 'dark',
  resolver: VariableColorResolver | undefined,
): NavMenuColorData | undefined {
  const menuNode = (navPage.children ?? []).find((c) => {
    const name = c.name.toLowerCase();
    return name.includes('navigation menu') && name.includes(mode);
  });

  const menuItemsSet = findMenuItemsComponentSet(navPage);
  if (!menuNode && !menuItemsSet) return undefined;

  const container = menuNode ? extractContainerData(menuNode, resolver, mode) : {};
  const { defaultState, selectedState, hoverState, defaultVariant } = extractVariantStates(menuItemsSet, resolver, mode);
  const typography = extractItemTypography(defaultVariant ?? menuNode ?? navPage);

  const data: NavMenuColorData = {
    background: container.background ?? (mode === 'light' ? '250 251 252' : '17 24 39'),
    textColor: defaultState.textColor ?? (mode === 'light' ? '55 65 81' : '209 213 219'),
    activeBackground: selectedState.background ?? '0 83 104',
    activeTextColor: selectedState.textColor ?? '255 255 255',
    borderColor: container.borderColor ?? (mode === 'light' ? '229 231 235' : '55 65 81'),
  };

  if (hoverState.background) data.hoverBackground = hoverState.background;
  if (hoverState.textColor) data.hoverTextColor = hoverState.textColor;
  if (defaultState.borderRadius) data.itemBorderRadius = defaultState.borderRadius;
  if (defaultState.paddingLeft) data.itemPaddingLeft = defaultState.paddingLeft;
  if (defaultState.paddingRight) data.itemPaddingRight = defaultState.paddingRight;
  if (typography.fontFamily) data.fontFamily = typography.fontFamily;
  if (typography.fontSize) data.fontSize = typography.fontSize;
  if (typography.fontWeight) data.fontWeight = typography.fontWeight;
  if (typography.lineHeight) data.lineHeight = typography.lineHeight;

  const iconColor = extractIconColor(defaultVariant, resolver, mode);
  if (iconColor) data.iconColor = iconColor;

  return data;
}

/** Extract menu data from a single mode frame (light or dark) */
function extractModeFromFrame(
  modeFrame: FigmaNode,
  resolver: VariableColorResolver | undefined,
  modeName: 'light' | 'dark',
): NavMenuColorData | undefined {
  const bgColor = extractFillColor(modeFrame, resolver, modeName);
  const menuItemsSet = findMenuItemsComponentSet(modeFrame);
  const defaultVariant = menuItemsSet ? findVariant(menuItemsSet, 'default') : undefined;
  const selectedVariant = menuItemsSet ? findVariant(menuItemsSet, 'selected') : undefined;

  const defaultState = defaultVariant ? extractItemStateColors(defaultVariant, resolver, modeName) : {};
  const selectedState = selectedVariant ? extractItemStateColors(selectedVariant, resolver, modeName) : {};
  const textColor = defaultState.textColor ?? extractTextColor(modeFrame, resolver, modeName);
  const defaults = buildDefaultMode(modeName);

  return {
    background: bgColor ? figmaColorToRgb(bgColor) : defaults.background,
    textColor: (typeof textColor === 'string' ? textColor : textColor ? figmaColorToRgb(textColor) : undefined)
      ?? defaults.textColor,
    activeBackground: selectedState.background ?? defaults.activeBackground,
    activeTextColor: selectedState.textColor ?? '255 255 255',
    borderColor: defaults.borderColor,
  };
}

/** Alternative: look for a section named "navigation" with light/dark sub-frames */
function extractFromNavigationSection(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): FigmaExtraction['navMenus'] {
  const sectionNames = ['navigation menus', 'navigation menu', 'nav menu', 'nav menus'];
  let section: FigmaNode | undefined;

  for (const name of sectionNames) {
    section = findSectionByName(document, name);
    if (section) break;
  }
  if (!section) return undefined;

  const lightFrame = findLightChild(section);
  const darkFrame = findDarkChild(section);
  if (!lightFrame && !darkFrame) return undefined;

  const light = lightFrame ? extractModeFromFrame(lightFrame, resolver, 'light') : undefined;
  const dark = darkFrame ? extractModeFromFrame(darkFrame, resolver, 'dark') : undefined;
  if (!light && !dark) return undefined;

  return {
    light: light ?? buildDefaultMode('light'),
    dark: dark ?? buildDefaultMode('dark'),
  };
}

export function extractNavMenus(
  document: FigmaNode,
  resolver: VariableColorResolver | undefined,
): FigmaExtraction['navMenus'] {
  // Strategy 1: Look for a dedicated nav menu page
  const navPage = findNavMenuPage(document);
  if (navPage) {
    const light = extractModeData(navPage, 'light', resolver);
    const dark = extractModeData(navPage, 'dark', resolver);

    if (light ?? dark) {
      const result = {
        light: light ?? buildDefaultMode('light'),
        dark: dark ?? buildDefaultMode('dark'),
      };
      console.log(`Nav menus: ${Object.keys(result.light).length} light properties extracted`);
      return result;
    }
  }

  // Strategy 2: Look for navigation section with light/dark sub-frames
  const fromSection = extractFromNavigationSection(document, resolver);
  if (fromSection) {
    console.log('Nav menus: extracted from navigation section');
    return fromSection;
  }

  // Strategy 3: Search entire document for navigation menu components
  const menuNode = findNodeContaining(document, 'navigation menu', ['COMPONENT', 'INSTANCE', 'FRAME']);
  if (menuNode) {
    const light = extractContainerData(menuNode, resolver, 'light');
    if (light.background) {
      console.log('Nav menus: extracted from navigation menu component');
      return {
        light: { ...buildDefaultMode('light'), background: light.background },
        dark: buildDefaultMode('dark'),
      };
    }
  }

  return undefined;
}
