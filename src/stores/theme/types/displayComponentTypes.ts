// Display component type definitions (cards, modals, badges)

export interface CardsConfig {
  background: string;
  borderColor: string;
  borderRadius: string;
  shadowDefault: string;
  shadowHover: string;
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
  headerBackground: string;
  footerBackground: string;
  textColor: string;
  titleColor: string;
  subtitleColor: string;
  borderWidth: string;
  hoverBorderColor: string;
  headerTextColor: string;
  headerBorderColor: string;
  footerBorderColor: string;
  contentPadding: string;
  imageOverlayColor: string;
  actionTextColor: string;
  actionHoverColor: string;
  transitionDuration: string;
}

export interface ModalsConfig {
  backdropColor: string;
  backdropBlur: string;
  contentBackground: string;
  borderColor: string;
  borderRadius: string;
  shadow: string;
  headerBackground: string;
  footerBackground: string;
}

export interface BadgeVariant {
  background: string;
  textColor: string;
  borderColor: string;
}

export interface BadgesConfig {
  success: BadgeVariant;
  warning: BadgeVariant;
  error: BadgeVariant;
  info: BadgeVariant;
  borderRadius: string;
  padding: string;
}
