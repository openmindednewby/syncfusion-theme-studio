/**
 * ExportToolbar - Shared toolbar with CSV, Excel, and PDF export buttons.
 * Designed to sit above a Syncfusion DataGrid and trigger downloads via
 * the useGridExport hook.
 */
import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { cn } from '@/utils/cn';

interface ExportToolbarProps {
  onExportCsv: () => void;
  onExportExcel: () => void;
  onExportPdf: () => void;
  isExporting?: boolean;
  className?: string;
}

const BUTTON_BASE =
  'inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50';

const ICON_SIZE = 16;
const ICON_VIEWBOX = '0 0 24 24';
const DOC_OUTLINE = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z';
const DOC_FOLD = 'M14 2v6h6';

const CsvIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" height={ICON_SIZE} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox={ICON_VIEWBOX} width={ICON_SIZE}>
    <path d={DOC_OUTLINE} />
    <path d={DOC_FOLD} />
    <path d="M8 13h2" />
    <path d="M8 17h2" />
    <path d="M14 13h2" />
    <path d="M14 17h2" />
  </svg>
);

const ExcelIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" height={ICON_SIZE} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox={ICON_VIEWBOX} width={ICON_SIZE}>
    <path d={DOC_OUTLINE} />
    <path d={DOC_FOLD} />
    <path d="M10 12l4 6" />
    <path d="M14 12l-4 6" />
  </svg>
);

const PdfIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="none" height={ICON_SIZE} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox={ICON_VIEWBOX} width={ICON_SIZE}>
    <path d={DOC_OUTLINE} />
    <path d={DOC_FOLD} />
    <path d="M9 15v-2h1.5a1.5 1.5 0 0 0 0-3H9v5" />
  </svg>
);

export const ExportToolbar = memo(({
  onExportCsv,
  onExportExcel,
  onExportPdf,
  isExporting = false,
  className,
}: ExportToolbarProps): JSX.Element => (
  <div
    aria-label={FM('dataExport.toolbarLabel')}
    className={cn('flex items-center gap-2', className)}
    data-testid={TestIds.EXPORT_TOOLBAR}
    role="toolbar"
  >
    <button
      aria-label={FM('dataExport.exportCsv')}
      className={BUTTON_BASE}
      data-testid={TestIds.EXPORT_CSV_BTN}
      disabled={isExporting}
      type="button"
      onClick={onExportCsv}
    >
      <CsvIcon />
      {FM('dataExport.csv')}
    </button>
    <button
      aria-label={FM('dataExport.exportExcel')}
      className={BUTTON_BASE}
      data-testid={TestIds.EXPORT_EXCEL_BTN}
      disabled={isExporting}
      type="button"
      onClick={onExportExcel}
    >
      <ExcelIcon />
      {FM('dataExport.excel')}
    </button>
    <button
      aria-label={FM('dataExport.exportPdf')}
      className={BUTTON_BASE}
      data-testid={TestIds.EXPORT_PDF_BTN}
      disabled={isExporting}
      type="button"
      onClick={onExportPdf}
    >
      <PdfIcon />
      {FM('dataExport.pdf')}
    </button>
  </div>
));

ExportToolbar.displayName = 'ExportToolbar';
