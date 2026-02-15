// Default dark mode navigation component configurations

import { AnimationEffect } from '../types';
import { type NavigationKeys } from './defaultKeys';

import type { ComponentConfigSingle } from '../types';


type NavigationKeysType = `${NavigationKeys}`;

export const DEFAULT_NAVIGATION_DARK: Pick<ComponentConfigSingle, NavigationKeysType> = {
  accordion: {
    background: '17 24 39',
    textColor: '209 213 219',
    headerBackground: '31 41 55',
    headerTextColor: '249 250 251',
    headerHoverBackground: '55 65 81',
    borderColor: '55 65 81',
    expandedBackground: '17 24 39',
    expandedTextColor: '209 213 219',
    iconColor: '156 163 175',
    animationEffect: AnimationEffect.SlideDown,
    animationDuration: '200ms',
  },
  toolbar: {
    background: '17 24 39',
    textColor: '209 213 219',
    hoverBackground: '55 65 81',
    hoverTextColor: '249 250 251',
    activeBackground: '75 85 99',
    borderColor: '55 65 81',
    separatorColor: '75 85 99',
    iconColor: '156 163 175',
  },
  menu: {
    background: '17 24 39',
    textColor: '209 213 219',
    hoverBackground: '55 65 81',
    hoverTextColor: '249 250 251',
    activeBackground: '75 85 99',
    borderColor: '55 65 81',
    iconColor: '156 163 175',
    popupBackground: '31 41 55',
    popupBorderColor: '55 65 81',
    popupTextColor: '209 213 219',
    separatorColor: '55 65 81',
    animationEffect: AnimationEffect.SlideDown,
    animationDuration: '150ms',
  },
  breadcrumb: {
    background: '17 24 39',
    textColor: '156 163 175',
    hoverTextColor: '96 165 250',
    activeTextColor: '249 250 251',
    separatorColor: '107 114 128',
    iconColor: '156 163 175',
    transitionDuration: '150ms',
  },
};
