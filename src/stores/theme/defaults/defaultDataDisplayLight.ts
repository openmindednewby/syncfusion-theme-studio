// Default light mode data display component configurations

import { AnimationEffect } from '../types';
import { type DataDisplayKeys } from './defaultKeys';

import type { ComponentConfigSingle } from '../types';

type DataDisplayKeysType = `${DataDisplayKeys}`;

export const DEFAULT_DATA_DISPLAY_LIGHT: Pick<ComponentConfigSingle, DataDisplayKeysType> = {
  tabs: {
    background: '255 255 255',
    activeBg: '255 255 255',
    activeText: '59 130 246',
    inactiveText: '107 114 128',
    borderColor: '229 231 235',
    hoverBg: '249 250 251',
    indicatorColor: '59 130 246',
    transitionDuration: '150ms',
  },
  timeline: {
    trackColor: '229 231 235',
    activeColor: '59 130 246',
    markerBg: '255 255 255',
    markerBorder: '59 130 246',
    labelText: '55 65 81',
    connectorColor: '209 213 219',
  },
  avatar: {
    background: '219 234 254',
    textColor: '29 78 216',
    borderColor: '255 255 255',
    statusIndicatorColor: '34 197 94',
    fallbackBg: '229 231 235',
  },
  progressBar: {
    trackBg: '229 231 235',
    fillColor: '59 130 246',
    textColor: '55 65 81',
    borderRadius: 'full',
    successFillColor: '34 197 94',
    warningFillColor: '245 158 11',
    dangerFillColor: '239 68 68',
  },
  tooltip: {
    background: '17 24 39',
    textColor: '249 250 251',
    borderColor: '55 65 81',
    arrowColor: '17 24 39',
    animationEffect: AnimationEffect.Fade,
    animationDuration: '150ms',
  },
};
