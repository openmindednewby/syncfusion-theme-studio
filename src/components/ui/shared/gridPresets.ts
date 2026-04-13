/**
 * Figma design palette presets for grid components.
 * Values extracted from Figma REST API: node 7080-26913 (Table component set).
 * Colors are in 'R G B' space-separated format matching DataGridConfig conventions.
 */
import type { DataGridConfig } from '@/stores/theme/types';

/** Figma light palette — scale=m (default) from the Figma "Table" component. */
export const FIGMA_LIGHT_PRESET: Partial<DataGridConfig> = {
  headerBackground: '246 246 246',
  headerTextColor: '59 69 89',
  headerBorder: '223 223 223',
  rowEvenBackground: '255 255 255',
  rowOddBackground: '255 255 255',
  rowSelectedBackground: '176 193 198',
  cellBorderColor: '223 223 223',
  rowHoverBackground: '243 243 243',
  headerFontWeight: '500',
  headerFontSize: '12px',
  cellPadding: '8px',
  rowHeight: '40px',
};

/** Figma dark palette — derived dark mode for the grid design. */
export const FIGMA_DARK_PRESET: Partial<DataGridConfig> = {
  headerBackground: '31 41 55',
  headerTextColor: '209 213 219',
  headerBorder: '55 65 81',
  rowEvenBackground: '17 24 39',
  rowOddBackground: '31 41 55',
  rowSelectedBackground: '30 58 138',
  cellBorderColor: '55 65 81',
  rowHoverBackground: '55 65 81',
  headerFontWeight: '500',
  headerFontSize: '14px',
  headerTextTransform: 'uppercase',
  cellPadding: '8px',
  rowHeight: '42px',
};

/**
 * Per-scale Figma overrides for pixel-perfect table rendering.
 * Extracted from Figma API: scale=s (7080-27029), scale=l (7080-26965).
 */

/** Scale=s (high density / compact) — 26px rows, 4px padding. */
export const FIGMA_SCALE_S_OVERRIDES: Partial<DataGridConfig> = {
  cellPadding: '4px',
  rowHeight: '26px',
};

/** Scale=l (low density / spacious) — 55px rows, 16px padding. */
export const FIGMA_SCALE_L_OVERRIDES: Partial<DataGridConfig> = {
  cellPadding: '16px',
  rowHeight: '55px',
};
