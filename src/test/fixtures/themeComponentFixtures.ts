/**
 * Component-related test fixtures for theme tests.
 */

import type {
  ComponentsConfig,
  ButtonsComponentConfig,
  ButtonStateColors,
  HeaderComponentConfig,
  SidebarComponentConfig,
  InputsConfig,
  DataGridConfig,
  CardsConfig,
  ModalsConfig,
  BadgesConfig,
} from '../../stores/theme/types';

const createPrimaryButton = (): ButtonStateColors => ({
  background: '59 130 246',
  backgroundHover: '37 99 235',
  backgroundActive: '29 78 216',
  textColor: '255 255 255',
  textColorHover: '255 255 255',
  borderColor: '59 130 246',
  borderWidth: '1px',
  borderRadius: 'md',
  shadow: 'sm',
});

const createSecondaryButton = (): ButtonStateColors => ({
  background: '243 244 246',
  backgroundHover: '229 231 235',
  backgroundActive: '209 213 219',
  textColor: '55 65 81',
  textColorHover: '31 41 55',
  borderColor: '229 231 235',
  borderWidth: '1px',
  borderRadius: 'md',
  shadow: 'none',
});

const createOutlineButton = (): ButtonStateColors => ({
  background: 'transparent',
  backgroundHover: '239 246 255',
  backgroundActive: '219 234 254',
  textColor: '59 130 246',
  textColorHover: '37 99 235',
  borderColor: '59 130 246',
  borderWidth: '1px',
  borderRadius: 'md',
  shadow: 'none',
});

const createGhostButton = (): ButtonStateColors => ({
  background: 'transparent',
  backgroundHover: '243 244 246',
  backgroundActive: '229 231 235',
  textColor: '55 65 81',
  textColorHover: '31 41 55',
  borderColor: 'transparent',
  borderWidth: '1px',
  borderRadius: 'md',
  shadow: 'none',
});

const createDangerButton = (): ButtonStateColors => ({
  background: '239 68 68',
  backgroundHover: '220 38 38',
  backgroundActive: '185 28 28',
  textColor: '255 255 255',
  textColorHover: '255 255 255',
  borderColor: '239 68 68',
  borderWidth: '1px',
  borderRadius: 'md',
  shadow: 'sm',
});

const createButtons = (): ButtonsComponentConfig => ({
  primary: createPrimaryButton(),
  secondary: createSecondaryButton(),
  outline: createOutlineButton(),
  ghost: createGhostButton(),
  danger: createDangerButton(),
});

const createHeader = (): HeaderComponentConfig => ({
  background: '255 255 255',
  textColor: '17 24 39',
  borderBottom: '229 231 235',
  height: '64px',
  shadow: 'sm',
});

const createSidebar = (): SidebarComponentConfig => ({
  background: '249 250 251',
  textColor: '55 65 81',
  activeItemBackground: '239 246 255',
  activeItemTextColor: '59 130 246',
  hoverItemBackground: '243 244 246',
  borderRight: '229 231 235',
  widthExpanded: '280px',
  widthCollapsed: '64px',
});

const createInputs = (): InputsConfig => ({
  background: '255 255 255',
  borderDefault: '209 213 219',
  borderHover: '156 163 175',
  borderFocus: '59 130 246',
  borderError: '239 68 68',
  textColor: '17 24 39',
  placeholderColor: '156 163 175',
  labelColor: '55 65 81',
  helperTextColor: '107 114 128',
  errorTextColor: '239 68 68',
  focusRingColor: '59 130 246',
  borderRadius: 'md',
});

const createDataGrid = (): DataGridConfig => ({
  headerBackground: '249 250 251',
  headerTextColor: '55 65 81',
  headerBorder: '229 231 235',
  rowEvenBackground: '255 255 255',
  rowOddBackground: '249 250 251',
  rowHoverBackground: '243 244 246',
  rowSelectedBackground: '239 246 255',
  cellBorderColor: '229 231 235',
  cellPadding: '12px 16px',
  paginationBackground: '255 255 255',
});

const createCards = (): CardsConfig => ({
  background: '255 255 255',
  borderColor: '229 231 235',
  borderRadius: 'lg',
  shadowDefault: 'sm',
  shadowHover: 'md',
  paddingSm: '16px',
  paddingMd: '24px',
  paddingLg: '32px',
  headerBackground: '249 250 251',
  footerBackground: '249 250 251',
});

const createModals = (): ModalsConfig => ({
  backdropColor: '0 0 0 / 0.5',
  backdropBlur: '4px',
  contentBackground: '255 255 255',
  borderColor: '229 231 235',
  borderRadius: 'xl',
  shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  headerBackground: '255 255 255',
  footerBackground: '249 250 251',
});

const createBadges = (): BadgesConfig => ({
  success: { background: '220 252 231', textColor: '21 128 61', borderColor: '134 239 172' },
  warning: { background: '254 249 195', textColor: '161 98 7', borderColor: '253 224 71' },
  error: { background: '254 226 226', textColor: '185 28 28', borderColor: '252 165 165' },
  info: { background: '219 234 254', textColor: '29 78 216', borderColor: '147 197 253' },
  borderRadius: 'full',
  padding: '4px 12px',
});

export const createComponents = (): ComponentsConfig => ({
  header: createHeader(),
  sidebar: createSidebar(),
  buttons: createButtons(),
  inputs: createInputs(),
  dataGrid: createDataGrid(),
  cards: createCards(),
  modals: createModals(),
  badges: createBadges(),
});
