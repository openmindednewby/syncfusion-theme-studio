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
  loader: {
    spinnerColor: '59 130 246',
    trackColor: '229 231 235',
    size: '40px',
    borderWidth: '4px',
    animationDuration: '800ms',
    iconColor: '59 130 246',
    iconSize: '20px',
  },
  skeletonLoader: {
    baseColor: '229 231 235',
    shimmerColor: '243 244 246',
    borderRadius: '4px',
    animationDuration: '1.5s',
  },
  slider: {
    trackBg: '229 231 235',
    fillColor: '59 130 246',
    thumbColor: '59 130 246',
    thumbHoverColor: '37 99 235',
    thumbActiveColor: '29 78 216',
    focusRingColor: '59 130 246',
    tickColor: '107 114 128',
    tooltipBg: '29 78 216',
    tooltipText: '255 255 255',
    disabledOpacity: '0.5',
  },
};
