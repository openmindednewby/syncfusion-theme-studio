// Default dark mode data display component configurations

import { type DataDisplayKeys } from './defaultKeys';

import type { ComponentConfigSingle } from '../types';

type DataDisplayKeysType = `${DataDisplayKeys}`;

export const DEFAULT_DATA_DISPLAY_DARK: Pick<ComponentConfigSingle, DataDisplayKeysType> = {
  tabs: {
    background: '17 24 39',
    activeBg: '31 41 55',
    activeText: '96 165 250',
    inactiveText: '156 163 175',
    borderColor: '55 65 81',
    hoverBg: '31 41 55',
    indicatorColor: '96 165 250',
  },
  timeline: {
    trackColor: '55 65 81',
    activeColor: '96 165 250',
    markerBg: '31 41 55',
    markerBorder: '96 165 250',
    labelText: '209 213 219',
    connectorColor: '75 85 99',
  },
  avatar: {
    background: '30 58 138',
    textColor: '191 219 254',
    borderColor: '31 41 55',
    statusIndicatorColor: '74 222 128',
    fallbackBg: '55 65 81',
  },
  progressBar: {
    trackBg: '55 65 81',
    fillColor: '96 165 250',
    textColor: '209 213 219',
    borderRadius: 'full',
    successFillColor: '74 222 128',
    warningFillColor: '251 191 36',
    dangerFillColor: '248 113 113',
  },
  tooltip: {
    background: '249 250 251',
    textColor: '17 24 39',
    borderColor: '229 231 235',
    arrowColor: '249 250 251',
  },
};
