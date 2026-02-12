// Default light mode navigation component configurations

import { type NavigationKeys } from './defaultKeys';

import type { ComponentConfigSingle } from '../types';


type NavigationKeysType = `${NavigationKeys}`;

export const DEFAULT_NAVIGATION_LIGHT: Pick<ComponentConfigSingle, NavigationKeysType> = {
  accordion: {
    background: '255 255 255',
    textColor: '55 65 81',
    headerBackground: '249 250 251',
    headerTextColor: '17 24 39',
    headerHoverBackground: '243 244 246',
    borderColor: '229 231 235',
    expandedBackground: '255 255 255',
    expandedTextColor: '55 65 81',
    iconColor: '107 114 128',
  },
  toolbar: {
    background: '255 255 255',
    textColor: '55 65 81',
    hoverBackground: '243 244 246',
    hoverTextColor: '17 24 39',
    activeBackground: '229 231 235',
    borderColor: '229 231 235',
    separatorColor: '209 213 219',
    iconColor: '107 114 128',
  },
  menu: {
    background: '255 255 255',
    textColor: '55 65 81',
    hoverBackground: '243 244 246',
    hoverTextColor: '17 24 39',
    activeBackground: '229 231 235',
    borderColor: '229 231 235',
    iconColor: '107 114 128',
    popupBackground: '255 255 255',
    popupBorderColor: '229 231 235',
    popupTextColor: '55 65 81',
    separatorColor: '229 231 235',
  },
  breadcrumb: {
    background: '255 255 255',
    textColor: '107 114 128',
    hoverTextColor: '59 130 246',
    activeTextColor: '17 24 39',
    separatorColor: '156 163 175',
    iconColor: '107 114 128',
  },
};
