/**
 * Hook for exporting Syncfusion DataGrid content to CSV, Excel, and PDF.
 * Wraps Syncfusion's built-in export methods with loading state and
 * consistent file naming (pageName_YYYY-MM-DD).
 */
import { useCallback, useRef, useState } from 'react';

import type {
  PdfExportProperties,
  PdfHeader,
  PdfFooter,
} from '@syncfusion/ej2-grids';
import type { GridComponent } from '@syncfusion/ej2-react-grids';

import { isValueDefined } from '@/utils/is';

/** PDF header/footer customisation options. */
export interface PdfExportOptions {
  headerText?: string;
  includePageNumbers?: boolean;
}

interface UseGridExportResult {
  isExporting: boolean;
  exportToExcel: () => void;
  exportToCsv: () => void;
  exportToPdf: () => void;
}

/** Safely fire a Syncfusion export (returns a Promise). */
function fireExport(promise: Promise<unknown>): void {
  promise.catch(() => undefined);
}

function useGuardedExport(
  gridRef: React.MutableRefObject<GridComponent | undefined>,
): [(action: (grid: GridComponent) => void) => void, boolean] {
  const [isExporting, setIsExporting] = useState(false);
  const exportingRef = useRef(false);

  const guardedExport = useCallback(
    (action: (grid: GridComponent) => void) => {
      const grid = gridRef.current;
      if (!isValueDefined(grid) || exportingRef.current) return;
      exportingRef.current = true;
      setIsExporting(true);
      try { action(grid); } finally {
        exportingRef.current = false;
        setIsExporting(false);
      }
    },
    [gridRef],
  );

  return [guardedExport, isExporting];
}

const PAD_WIDTH = 2;
const HEADER_HEIGHT = 40;
const FOOTER_HEIGHT = 30;
const HEADER_FONT_SIZE = 14;
const DATE_FONT_SIZE = 10;
const PAGE_NUMBER_FONT_SIZE = 10;
const HEADER_Y_OFFSET = 10;
const DATE_X_OFFSET = 400;
const PAGE_NUMBER_X = 250;
const PAGE_NUMBER_Y = 5;

function buildPdfHeader(headerText: string): PdfHeader {
  return {
    fromTop: 0,
    height: HEADER_HEIGHT,
    contents: [
      {
        type: 'Text',
        value: headerText,
        position: { x: 0, y: HEADER_Y_OFFSET },
        style: { fontSize: HEADER_FONT_SIZE },
      },
      {
        type: 'Text',
        value: new Date().toLocaleDateString(),
        position: { x: DATE_X_OFFSET, y: HEADER_Y_OFFSET },
        style: { fontSize: DATE_FONT_SIZE },
      },
    ],
  };
}

function buildPdfFooter(): PdfFooter {
  return {
    fromBottom: 0,
    height: FOOTER_HEIGHT,
    contents: [
      {
        type: 'PageNumber',
        pageNumberType: 'Arabic',
        position: { x: PAGE_NUMBER_X, y: PAGE_NUMBER_Y },
        style: { fontSize: PAGE_NUMBER_FONT_SIZE },
      },
    ],
  };
}

/** Build a file name from the page name and the current date. */
export function buildExportFileName(pageName: string): string {
  const now = new Date();
  const y = String(now.getFullYear());
  const m = String(now.getMonth() + 1).padStart(PAD_WIDTH, '0');
  const d = String(now.getDate()).padStart(PAD_WIDTH, '0');
  return `${pageName}_${y}-${m}-${d}`;
}

/** Build PdfExportProperties from the file name and user options. */
export function buildPdfProps(fileName: string, opts?: PdfExportOptions): PdfExportProperties {
  const props: PdfExportProperties = { fileName: `${fileName}.pdf` };

  if (isValueDefined(opts?.headerText))
    props.header = buildPdfHeader(opts.headerText);

  if (opts?.includePageNumbers !== false)
    props.footer = buildPdfFooter();

  return props;
}

/**
 * Provides export callbacks bound to a Syncfusion GridComponent ref.
 *
 * @param gridRef - mutable ref pointing at the GridComponent instance
 * @param fileName - base file name (without extension)
 * @param pdfOptions - optional PDF header/footer settings
 */
export function useGridExport(
  gridRef: React.MutableRefObject<GridComponent | undefined>,
  fileName: string,
  pdfOptions?: PdfExportOptions,
): UseGridExportResult {
  const [guardedExport, isExporting] = useGuardedExport(gridRef);

  const exportToExcel = useCallback(() => {
    guardedExport((grid) => fireExport(grid.excelExport({ fileName: `${fileName}.xlsx` })));
  }, [guardedExport, fileName]);

  const exportToCsv = useCallback(() => {
    guardedExport((grid) => fireExport(grid.csvExport({ fileName: `${fileName}.csv` })));
  }, [guardedExport, fileName]);

  const exportToPdf = useCallback(() => {
    guardedExport((grid) => fireExport(grid.pdfExport(buildPdfProps(fileName, pdfOptions))));
  }, [guardedExport, fileName, pdfOptions]);

  return { isExporting, exportToExcel, exportToCsv, exportToPdf };
}
