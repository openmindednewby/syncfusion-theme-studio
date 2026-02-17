// Layout component type definitions (header, sidebar)

import type { ShadowScale } from './shadowScale';

export interface HeaderComponentConfig {
  background: string;
  textColor: string;
  borderBottom: string;
  height: string;
  shadow: ShadowScale;
}

export interface SidebarComponentConfig {
  background: string;
  textColor: string;
  activeItemBackground: string;
  activeItemTextColor: string;
  hoverItemBackground: string;
  borderRight: string;
  widthExpanded: string;
  widthCollapsed: string;
  transitionDuration: string;
  fontSize: string;
  fontWeight: string;
  iconSize: string;
  iconStrokeWidth: string;
  expandAnimationEnabled: boolean;
  expandAnimationDuration: string;
  showScrollbar: boolean;
  searchHighlightColor: string;
  searchHighlightScale: string;
  searchBackground: string;
  searchBorder: string;
  searchBorderRadius: string;
  searchTextColor: string;
  searchPlaceholderColor: string;
  searchFocusBackground: string;
  searchFocusBorder: string;
  searchFontSize: string;
  searchPadding: string;
}
