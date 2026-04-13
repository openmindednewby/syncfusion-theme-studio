import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { GridComponent } from '@syncfusion/ej2-react-grids';

import { buildExportFileName, buildPdfProps, useGridExport } from './useGridExport';

/* ------------------------------------------------------------------ */
/*  buildExportFileName                                                */
/* ------------------------------------------------------------------ */
describe('buildExportFileName', () => {
  it('should include the page name and current date', () => {
    const result = buildExportFileName('products');
    expect(result).toMatch(/^products_\d{4}-\d{2}-\d{2}$/);
  });

  it('should use today date', () => {
    const now = new Date();
    const y = String(now.getFullYear());
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const expected = `alerts_${y}-${m}-${d}`;
    expect(buildExportFileName('alerts')).toBe(expected);
  });
});

/* ------------------------------------------------------------------ */
/*  buildPdfProps                                                      */
/* ------------------------------------------------------------------ */
describe('buildPdfProps', () => {
  it('should set fileName with .pdf extension', () => {
    const result = buildPdfProps('report');
    expect(result.fileName).toBe('report.pdf');
  });

  it('should include header when headerText is provided', () => {
    const result = buildPdfProps('report', { headerText: 'My Report' });
    expect(result.header).toBeDefined();
    expect(result.header?.contents?.[0]?.value).toBe('My Report');
  });

  it('should include footer with page numbers by default', () => {
    const result = buildPdfProps('report', { headerText: 'Report' });
    expect(result.footer).toBeDefined();
    expect(result.footer?.contents?.[0]?.type).toBe('PageNumber');
  });

  it('should exclude footer when includePageNumbers is false', () => {
    const result = buildPdfProps('report', { includePageNumbers: false });
    expect(result.footer).toBeUndefined();
  });

  it('should omit header when headerText is not provided', () => {
    const result = buildPdfProps('report');
    expect(result.header).toBeUndefined();
  });
});

/* ------------------------------------------------------------------ */
/*  useGridExport hook                                                 */
/* ------------------------------------------------------------------ */
interface MockGrid {
  excelExport: ReturnType<typeof vi.fn>;
  csvExport: ReturnType<typeof vi.fn>;
  pdfExport: ReturnType<typeof vi.fn>;
}

function createMockGrid(): MockGrid {
  return {
    excelExport: vi.fn().mockResolvedValue(undefined),
    csvExport: vi.fn().mockResolvedValue(undefined),
    pdfExport: vi.fn().mockResolvedValue(undefined),
  };
}

function createGridRef(mock: MockGrid): React.MutableRefObject<GridComponent | undefined> {
   
  return { current: mock as unknown as GridComponent };
}

describe('useGridExport', () => {
  let mockGrid: MockGrid;

  beforeEach(() => {
    mockGrid = createMockGrid();
  });

  it('should call excelExport with correct file name', () => {
    const ref = createGridRef(mockGrid);
    const { result } = renderHook(() => useGridExport(ref, 'test-file'));

    act(() => { result.current.exportToExcel(); });
    expect(mockGrid.excelExport).toHaveBeenCalledWith({ fileName: 'test-file.xlsx' });
  });

  it('should call csvExport with correct file name', () => {
    const ref = createGridRef(mockGrid);
    const { result } = renderHook(() => useGridExport(ref, 'test-file'));

    act(() => { result.current.exportToCsv(); });
    expect(mockGrid.csvExport).toHaveBeenCalledWith({ fileName: 'test-file.csv' });
  });

  it('should call pdfExport with correct file name', () => {
    const ref = createGridRef(mockGrid);
    const { result } = renderHook(() => useGridExport(ref, 'test-file'));

    act(() => { result.current.exportToPdf(); });
    expect(mockGrid.pdfExport).toHaveBeenCalledWith(
      expect.objectContaining({ fileName: 'test-file.pdf' }),
    );
  });

  it('should not call any export when gridRef is undefined', () => {
    const ref: React.MutableRefObject<GridComponent | undefined> = { current: undefined };
    const { result } = renderHook(() => useGridExport(ref, 'test-file'));

    act(() => { result.current.exportToExcel(); });
    act(() => { result.current.exportToCsv(); });
    act(() => { result.current.exportToPdf(); });
    expect(mockGrid.excelExport).not.toHaveBeenCalled();
    expect(mockGrid.csvExport).not.toHaveBeenCalled();
    expect(mockGrid.pdfExport).not.toHaveBeenCalled();
  });

  it('should initially have isExporting as false', () => {
    const ref = createGridRef(mockGrid);
    const { result } = renderHook(() => useGridExport(ref, 'test-file'));
    expect(result.current.isExporting).toBe(false);
  });
});
