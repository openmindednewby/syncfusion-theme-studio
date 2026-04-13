/**
 * @deprecated Use real `TableNative` or `DataGrid` with `density` and `themeOverrides` props instead.
 *
 * SpecDataGrid - Static HTML table matching exact design spec DataGrid measurements.
 * Renders pixel-perfect replicas of the "Table" component at three
 * density levels (medium, low, high) with optional selection state.
 * Supports light (spec) and dark (ThemeStudio) color modes.
 */
import type { CSSProperties } from 'react';
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

import { SpecGridDensity } from './SpecGridDensity';

/* ── Checkbox SVGs ────────────────────────────────────────────── */

const UncheckedBox = ({ borderColor }: { borderColor: string }): JSX.Element => (
  <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
    <rect height="13" rx="2" stroke={borderColor} width="13" x="0.5" y="0.5" />
  </svg>
);

const CheckedBox = ({ fill }: { fill: string }): JSX.Element => (
  <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
    <rect fill={fill} height="14" rx="2" width="14" />
    <path d="M3.5 7L6 9.5L10.5 4.5" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

/* ── Figma spec constants ─────────────────────────────────────── */

const FONT_FAMILY = "'Fira Sans', sans-serif";
const FONT_SIZE = 12;
const HEADER_FONT_WEIGHT = 600;
const CELL_FONT_WEIGHT = 400;
const TABLE_BORDER_RADIUS = 4;
const BORDER_WIDTH = 1;

const ROW_HEIGHT_MEDIUM = 40;
const ROW_HEIGHT_LOW = 48;
const ROW_HEIGHT_HIGH = 32;

const CHECKBOX_COL_WIDTH = 40;
const NUMBER_COL_WIDTH = 32;
const DATA_COL_COUNT = 8;
const DATA_ROW_COUNT = 9;
const CELL_PADDING_H = 12;

/* ── Color palette (theme-aware via CSS variables) ────────────── */

interface GridPalette {
  headerBg: string;
  headerText: string;
  rowBg: string;
  rowAltBg: string;
  selectedBg: string;
  borderColor: string;
  cellText: string;
  checkboxBlue: string;
  checkboxBorder: string;
}

const THEME_PALETTE: GridPalette = {
  headerBg: 'rgb(var(--color-surface))',
  headerText: 'rgb(var(--color-text-primary))',
  rowBg: 'rgb(var(--color-surface-elevated))',
  rowAltBg: 'rgb(var(--color-surface-elevated))',
  selectedBg: 'rgb(var(--color-primary-100))',
  borderColor: 'rgb(var(--color-border))',
  cellText: 'rgb(var(--color-text-secondary))',
  checkboxBlue: 'rgb(var(--color-primary-500))',
  checkboxBorder: 'rgb(var(--color-border))',
};

/* ── Types ────────────────────────────────────────────────────── */

interface SpecDataGridProps {
  density: SpecGridDensity;
  withSelection?: boolean;
  selectedRows?: number[];
  testId?: string;
}

/* ── Helpers ──────────────────────────────────────────────────── */

function getRowHeight(density: SpecGridDensity): number {
  if (density === SpecGridDensity.Low) return ROW_HEIGHT_LOW;
  if (density === SpecGridDensity.High) return ROW_HEIGHT_HIGH;
  return ROW_HEIGHT_MEDIUM;
}

function getPalette(): GridPalette {
  return THEME_PALETTE;
}

/* ── Component ────────────────────────────────────────────────── */

const SpecDataGridComponent = ({
  density,
  withSelection = false,
  selectedRows = [],
  testId,
}: SpecDataGridProps): JSX.Element => {
  const p = getPalette();
  const rowHeight = getRowHeight(density);
  const selectedSet = new Set(selectedRows);

  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    border: `${BORDER_WIDTH}px solid ${p.borderColor}`,
    borderRadius: TABLE_BORDER_RADIUS,
    overflow: 'hidden',
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    tableLayout: 'fixed',
  };

  const headerCell: CSSProperties = {
    height: rowHeight,
    background: p.headerBg,
    color: p.headerText,
    fontWeight: HEADER_FONT_WEIGHT,
    textAlign: 'left',
    padding: `0 ${CELL_PADDING_H}px`,
    borderBottom: `${BORDER_WIDTH}px solid ${p.borderColor}`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const getRowBg = (rowIdx: number): string => {
    if (selectedSet.has(rowIdx)) return p.selectedBg;
    return rowIdx % 2 === 1 ? p.rowAltBg : p.rowBg;
  };

  const dataCell = (rowIdx: number): CSSProperties => {
    const bg = getRowBg(rowIdx);
    return {
      height: rowHeight,
      background: bg,
      color: p.cellText,
      fontWeight: CELL_FONT_WEIGHT,
      textAlign: 'left',
      padding: `0 ${CELL_PADDING_H}px`,
      borderBottom: `${BORDER_WIDTH}px solid ${p.borderColor}`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  };

  const cbCell: CSSProperties = { width: CHECKBOX_COL_WIDTH, textAlign: 'center', verticalAlign: 'middle' };
  const numCell: CSSProperties = { width: NUMBER_COL_WIDTH, textAlign: 'right', paddingRight: CELL_PADDING_H };

  return (
    <table data-testid={testId} style={tableStyle}>
      <thead>
        <tr>
          {withSelection ? <th style={{ ...headerCell, ...cbCell }}><UncheckedBox borderColor={p.checkboxBorder} /></th> : null}
          {withSelection ? <th style={{ ...headerCell, ...numCell }} /> : null}
          {Array.from({ length: DATA_COL_COUNT }, (_, i) => (
            <th key={i} style={headerCell}>{FM('showcase.sections.heading')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: DATA_ROW_COUNT }, (_, rowIdx) => {
          const cell = dataCell(rowIdx);
          const isSelected = selectedSet.has(rowIdx);

          return (
            <tr key={rowIdx}>
              {withSelection ? (
                <td style={{ ...cell, ...cbCell }}>
                  {isSelected ? <CheckedBox fill={p.checkboxBlue} /> : <UncheckedBox borderColor={p.checkboxBorder} />}
                </td>
              ) : null}
              {withSelection ? <td style={{ ...cell, ...numCell, color: p.cellText }}>{rowIdx + 1}</td> : null}
              {Array.from({ length: DATA_COL_COUNT }, (_value, colIdx) => (
                <td key={colIdx} style={cell}>{colIdx === 0 ? 'Heading' : 'cell data'}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const SpecDataGrid = memo(SpecDataGridComponent);

SpecDataGrid.displayName = 'SpecDataGrid';
