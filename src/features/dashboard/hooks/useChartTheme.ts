// Hook to derive chart-friendly colors from the theme store

import { useMemo } from 'react';

import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';

interface ChartThemeColors {
  background: string;
  textColor: string;
  gridLineColor: string;
  labelColor: string;
  palette: string[];
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
}

const FALLBACK_HEX = '#000000';
const RGB_COMPONENT_COUNT = 3;
const BITS_24 = 24;
const HEX_SHIFT_BASE = 1 << BITS_24;
const RED_SHIFT = 16;
const GREEN_SHIFT = 8;
const HEX_RADIX = 16;

/** Convert space-separated RGB string to hex */
function rgbToHex(rgb: string): string {
  const parts = rgb.split(' ').map(Number);
  if (parts.length < RGB_COMPONENT_COUNT) return FALLBACK_HEX;
  const r = parts[0] ?? 0;
  const g = parts[1] ?? 0;
  const b = parts[2] ?? 0;
  return `#${(HEX_SHIFT_BASE | (r << RED_SHIFT) | (g << GREEN_SHIFT) | b).toString(HEX_RADIX).slice(1)}`;
}

export function useChartTheme(): ChartThemeColors {
  const { theme, mode } = useThemeStore();
  const modeConfig = mode === Mode.Light ? theme.light : theme.dark;

  return useMemo(() => {
    const primary500 = rgbToHex(theme.primary['500']);
    const primary400 = rgbToHex(theme.primary['400']);
    const secondary500 = rgbToHex(theme.secondary['500']);
    const secondary400 = rgbToHex(theme.secondary['400']);
    const success500 = rgbToHex(theme.status.success['500']);
    const warning500 = rgbToHex(theme.status.warning['500']);
    const error500 = rgbToHex(theme.status.error['500']);
    const info500 = rgbToHex(theme.status.info['500']);

    return {
      background: rgbToHex(modeConfig.backgrounds.surface),
      textColor: rgbToHex(modeConfig.text.primary),
      gridLineColor: rgbToHex(modeConfig.borders.subtle),
      labelColor: rgbToHex(modeConfig.text.secondary),
      palette: [
        primary500, secondary500, success500,
        warning500, info500, primary400, secondary400,
      ],
      primaryColor: primary500,
      secondaryColor: secondary500,
      successColor: success500,
      warningColor: warning500,
      errorColor: error500,
      infoColor: info500,
    };
  }, [theme, modeConfig]);
}
