import type { GridButtonsConfig } from '../types';

export const DEFAULT_GRID_BUTTONS_DARK: GridButtonsConfig = {
  default: {
    background: '17 19 25',
    backgroundHover: '31 41 55',
    textColor: '123 123 123',
    borderColor: '57 64 75',
    disabledOpacity: '0.5',
  },
  save: {
    background: '59 130 246',
    backgroundHover: '37 99 235',
    textColor: '255 255 255',
    borderColor: '59 130 246',
    disabledOpacity: '0.5',
  },
  delete: {
    background: 'transparent',
    backgroundHover: '239 68 68',
    textColor: '239 68 68',
    borderColor: '239 68 68',
    disabledOpacity: '0.5',
  },
  view: {
    background: '17 19 25',
    backgroundHover: '30 58 138',
    textColor: '96 165 250',
    borderColor: '30 64 175',
    disabledOpacity: '0.5',
  },
  export: {
    background: '17 19 25',
    backgroundHover: '20 83 45',
    textColor: '74 222 128',
    borderColor: '21 128 61',
    disabledOpacity: '0.5',
  },
  archive: {
    background: '17 19 25',
    backgroundHover: '120 53 15',
    textColor: '251 191 36',
    borderColor: '180 83 9',
    disabledOpacity: '0.5',
  },
  typography: {
    fontFamily: 'Fira Sans',
    fontSize: '10px',
    fontWeight: '400',
    lineHeight: '1.4',
    letterSpacing: '0px',
  },
  paddingV: '4px',
  paddingH: '10px',
  borderRadius: '4px',
  transitionDuration: '150ms',
};
