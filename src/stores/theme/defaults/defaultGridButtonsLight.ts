import type { GridButtonsConfig } from '../types';

export const DEFAULT_GRID_BUTTONS_LIGHT: GridButtonsConfig = {
  default: {
    background: '255 255 255',
    backgroundHover: '243 244 246',
    textColor: '123 123 123',
    borderColor: '223 223 223',
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
    background: '255 255 255',
    backgroundHover: '219 234 254',
    textColor: '59 130 246',
    borderColor: '147 197 253',
    disabledOpacity: '0.5',
  },
  export: {
    background: '255 255 255',
    backgroundHover: '220 252 231',
    textColor: '22 163 74',
    borderColor: '134 239 172',
    disabledOpacity: '0.5',
  },
  archive: {
    background: '255 255 255',
    backgroundHover: '254 243 199',
    textColor: '161 98 7',
    borderColor: '252 211 77',
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
