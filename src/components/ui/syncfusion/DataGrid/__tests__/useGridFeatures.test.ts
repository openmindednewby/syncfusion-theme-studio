/**
 * Unit tests for useGridFeatures - resolveFeatures and computePageSettings.
 * Focuses on logic: feature flag resolution from props/gridConfig.
 */
import { describe, it, expect } from 'vitest';

import { AggregateType } from '@/lib/grid/types';

import { DEFAULT_PAGE_SETTINGS, DEFAULT_PAGE_SIZE, AVAILABLE_PAGE_SIZES } from '../constants';
import { resolveFeatures, computePageSettings } from '../useGridFeatures';

import type { DataGridProps } from '../types';

/** Create minimal valid props for testing */
function createProps(overrides: Partial<DataGridProps<Record<string, unknown>>> = {}): DataGridProps<Record<string, unknown>> {
  return {
    data: [],
    columns: [],
    ...overrides,
  };
}

describe('resolveFeatures', () => {
  it('returns sensible defaults when no props or config provided', () => {
    const features = resolveFeatures(createProps());

    expect(features.paging).toBe(true);
    expect(features.sorting).toBe(true);
    expect(features.filtering).toBe(false);
    expect(features.grouping).toBe(false);
    expect(features.hasAggregates).toBe(false);
    expect(features.hasSelection).toBe(false);
    expect(features.editing).toBe(false);
    expect(features.hasCommandColumn).toBe(false);
    expect(features.resizing).toBe(false);
    expect(features.reordering).toBe(false);
    expect(features.freezing).toBe(false);
    expect(features.columnChooser).toBe(false);
    expect(features.columnMenu).toBe(false);
    expect(features.excelExport).toBe(false);
    expect(features.pdfExport).toBe(false);
    expect(features.hasToolbar).toBe(false);
    expect(features.hasContextMenu).toBe(false);
    expect(features.detailRow).toBe(false);
    expect(features.rowDragDrop).toBe(false);
    expect(features.virtualization).toBe(false);
    expect(features.infiniteScroll).toBe(false);
    expect(features.clipboard).toBe(false);
    expect(features.search).toBe(false);
    expect(features.print).toBe(false);
  });

  it('enables paging when prop is true', () => {
    const features = resolveFeatures(createProps({ allowPaging: true }));
    expect(features.paging).toBe(true);
  });

  it('disables paging when prop is false', () => {
    const features = resolveFeatures(createProps({ allowPaging: false }));
    expect(features.paging).toBe(false);
  });

  it('reads paging from gridConfig when prop not set', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { pagination: { enabled: false } },
    }));
    expect(features.paging).toBe(false);
  });

  it('prop takes precedence over gridConfig for paging', () => {
    const features = resolveFeatures(createProps({
      allowPaging: true,
      gridConfig: { pagination: { enabled: false } },
    }));
    expect(features.paging).toBe(true);
  });

  it('enables filtering from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { filter: { enabled: true } },
    }));
    expect(features.filtering).toBe(true);
  });

  it('enables grouping from prop', () => {
    const features = resolveFeatures(createProps({ allowGrouping: true }));
    expect(features.grouping).toBe(true);
  });

  it('enables grouping from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { group: { enabled: true } },
    }));
    expect(features.grouping).toBe(true);
  });

  it('detects aggregates from props', () => {
    const features = resolveFeatures(createProps({
      aggregates: [{ columns: [{ field: 'price', type: AggregateType.Sum }] }],
    }));
    expect(features.hasAggregates).toBe(true);
  });

  it('detects aggregates from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: {
        aggregates: [{ columns: [{ field: 'total', type: AggregateType.Average }] }],
      },
    }));
    expect(features.hasAggregates).toBe(true);
  });

  it('detects selection from selectionSettings prop', () => {
    const features = resolveFeatures(createProps({
      selectionSettings: { type: 'Multiple' },
    }));
    expect(features.hasSelection).toBe(true);
  });

  it('detects selection from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { selection: { enabled: true } },
    }));
    expect(features.hasSelection).toBe(true);
  });

  it('enables editing from editSettings prop', () => {
    const features = resolveFeatures(createProps({
      editSettings: { allowEditing: true },
    }));
    expect(features.editing).toBe(true);
  });

  it('enables editing from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { edit: { enabled: true } },
    }));
    expect(features.editing).toBe(true);
  });

  it('detects command columns', () => {
    const features = resolveFeatures(createProps({
      columns: [
        { field: 'name' },
        { commands: [{ type: 'Edit' }] },
      ],
    }));
    expect(features.hasCommandColumn).toBe(true);
  });

  it('does not detect command columns when none present', () => {
    const features = resolveFeatures(createProps({
      columns: [{ field: 'name' }, { field: 'age' }],
    }));
    expect(features.hasCommandColumn).toBe(false);
  });

  it('enables resizing from prop', () => {
    const features = resolveFeatures(createProps({ allowResizing: true }));
    expect(features.resizing).toBe(true);
  });

  it('enables reordering from prop', () => {
    const features = resolveFeatures(createProps({ allowReordering: true }));
    expect(features.reordering).toBe(true);
  });

  it('detects freezing from frozenColumns', () => {
    const features = resolveFeatures(createProps({ frozenColumns: 2 }));
    expect(features.freezing).toBe(true);
  });

  it('detects freezing from frozenRows', () => {
    const features = resolveFeatures(createProps({ frozenRows: 1 }));
    expect(features.freezing).toBe(true);
  });

  it('does not enable freezing when frozen values are zero', () => {
    const features = resolveFeatures(createProps({ frozenColumns: 0, frozenRows: 0 }));
    expect(features.freezing).toBe(false);
  });

  it('enables column chooser from prop', () => {
    const features = resolveFeatures(createProps({ showColumnChooser: true }));
    expect(features.columnChooser).toBe(true);
  });

  it('enables column chooser from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { columnChooser: { enabled: true } },
    }));
    expect(features.columnChooser).toBe(true);
  });

  it('enables column menu from prop', () => {
    const features = resolveFeatures(createProps({ showColumnMenu: true }));
    expect(features.columnMenu).toBe(true);
  });

  it('enables excel export from prop', () => {
    const features = resolveFeatures(createProps({ allowExcelExport: true }));
    expect(features.excelExport).toBe(true);
  });

  it('enables pdf export from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { export: { pdf: true } },
    }));
    expect(features.pdfExport).toBe(true);
  });

  it('enables toolbar from prop', () => {
    const features = resolveFeatures(createProps({ toolbar: ['Search', 'Add'] }));
    expect(features.hasToolbar).toBe(true);
  });

  it('enables toolbar from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { toolbar: { enabled: true } },
    }));
    expect(features.hasToolbar).toBe(true);
  });

  it('enables context menu from prop', () => {
    const features = resolveFeatures(createProps({
      contextMenuItems: ['Copy', 'Edit'],
    }));
    expect(features.hasContextMenu).toBe(true);
  });

  it('enables context menu from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { contextMenu: { enabled: true } },
    }));
    expect(features.hasContextMenu).toBe(true);
  });

  it('enables detail row from detailTemplate prop', () => {
    const features = resolveFeatures(createProps({
      detailTemplate: () => null as unknown as JSX.Element,
    }));
    expect(features.detailRow).toBe(true);
  });

  it('enables detail row from childGrid prop', () => {
    const features = resolveFeatures(createProps({ childGrid: {} }));
    expect(features.detailRow).toBe(true);
  });

  it('enables detail row from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { detailRow: { enabled: true } },
    }));
    expect(features.detailRow).toBe(true);
  });

  it('enables row drag and drop from prop', () => {
    const features = resolveFeatures(createProps({ allowRowDragAndDrop: true }));
    expect(features.rowDragDrop).toBe(true);
  });

  it('enables virtualization from prop', () => {
    const features = resolveFeatures(createProps({ enableVirtualization: true }));
    expect(features.virtualization).toBe(true);
  });

  it('enables virtualization from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { virtualization: { enabled: true } },
    }));
    expect(features.virtualization).toBe(true);
  });

  it('enables infinite scroll from prop', () => {
    const features = resolveFeatures(createProps({ enableInfiniteScrolling: true }));
    expect(features.infiniteScroll).toBe(true);
  });

  it('enables clipboard from prop', () => {
    const features = resolveFeatures(createProps({ enableClipboard: true }));
    expect(features.clipboard).toBe(true);
  });

  it('enables search from prop', () => {
    const features = resolveFeatures(createProps({
      searchSettings: { key: 'test' },
    }));
    expect(features.search).toBe(true);
  });

  it('enables search from gridConfig', () => {
    const features = resolveFeatures(createProps({
      gridConfig: { search: { enabled: true } },
    }));
    expect(features.search).toBe(true);
  });

  it('enables print from prop', () => {
    const features = resolveFeatures(createProps({ allowPrint: true }));
    expect(features.print).toBe(true);
  });
});

describe('computePageSettings', () => {
  const DATA_LENGTH_LARGE = 50;
  const DATA_LENGTH_SMALL = 5;

  it('returns fallback when no gridConfig pagination', () => {
    const result = computePageSettings(undefined, DEFAULT_PAGE_SETTINGS, true, DATA_LENGTH_LARGE);
    expect(result).toEqual(DEFAULT_PAGE_SETTINGS);
  });

  it('returns gridConfig page settings when data exceeds threshold', () => {
    const CUSTOM_PAGE_SIZE = 20;
    const config = {
      pagination: { enabled: true, pageSize: CUSTOM_PAGE_SIZE, threshold: 0 },
    };
    const result = computePageSettings(config, DEFAULT_PAGE_SETTINGS, true, DATA_LENGTH_LARGE);

    expect(result.pageSize).toBe(CUSTOM_PAGE_SIZE);
    expect(result.pageSizes).toEqual(AVAILABLE_PAGE_SIZES);
  });

  it('returns full data as page size when below threshold', () => {
    const THRESHOLD = 100;
    const config = {
      pagination: { enabled: true, threshold: THRESHOLD },
    };
    const result = computePageSettings(config, DEFAULT_PAGE_SETTINGS, true, DATA_LENGTH_LARGE);

    expect(result.pageSize).toBe(DATA_LENGTH_LARGE);
  });

  it('uses default page size when gridConfig does not specify one', () => {
    const config = { pagination: { enabled: true } };
    const result = computePageSettings(config, DEFAULT_PAGE_SETTINGS, true, DATA_LENGTH_LARGE);

    expect(result.pageSize).toBe(DEFAULT_PAGE_SIZE);
  });

  it('uses custom pageSizes from gridConfig', () => {
    const CUSTOM_SIZES = [5, 15, 30];
    const config = {
      pagination: { enabled: true, pageSizes: CUSTOM_SIZES },
    };
    const result = computePageSettings(config, DEFAULT_PAGE_SETTINGS, true, DATA_LENGTH_LARGE);

    expect(result.pageSizes).toEqual(CUSTOM_SIZES);
  });

  it('returns data length as page size when paging is disabled', () => {
    const config = { pagination: { enabled: true } };
    const result = computePageSettings(config, DEFAULT_PAGE_SETTINGS, false, DATA_LENGTH_SMALL);

    expect(result.pageSize).toBe(DATA_LENGTH_SMALL);
  });
});
