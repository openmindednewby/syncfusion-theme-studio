import { describe, expect, it, vi } from 'vitest';

import {
  buildBodyOptionalProps,
  buildColumnMenuProps,
  buildFeatureProps,
  calcColSpan,
  extractPaginationConfig,
  isDialogEditing,
  resolveOptionalHandlers,
  resolveTableLayout,
  shouldShowFilter,
} from './tableContentUtils';

import type { FeatureFlags } from '../hooks/useTableFeatures';

function makeFlags(overrides: Partial<FeatureFlags> = {}): FeatureFlags {
  return {
    selectionEnabled: false,
    showCheckbox: false,
    groupingEnabled: false,
    showDropArea: false,
    editingEnabled: false,
    showCommandColumn: false,
    allowEditing: false,
    allowDeleting: false,
    ...overrides,
  };
}

// ── calcColSpan ───────────────────────────────────────────────────────

describe('calcColSpan', () => {
  const BASE_COLS = 5;

  it('returns column count when no extras enabled', () => {
    expect(calcColSpan(BASE_COLS, makeFlags())).toBe(BASE_COLS);
  });

  it('adds 1 for checkbox column', () => {
    expect(calcColSpan(BASE_COLS, makeFlags({ showCheckbox: true }))).toBe(
      BASE_COLS + 1,
    );
  });

  it('adds 1 for command column', () => {
    expect(calcColSpan(BASE_COLS, makeFlags({ showCommandColumn: true }))).toBe(
      BASE_COLS + 1,
    );
  });

  it('adds 2 for both checkbox and command', () => {
    expect(
      calcColSpan(
        BASE_COLS,
        makeFlags({ showCheckbox: true, showCommandColumn: true }),
      ),
    ).toBe(BASE_COLS + 2);
  });

  it('handles zero base columns', () => {
    expect(calcColSpan(0, makeFlags({ showCheckbox: true }))).toBe(1);
  });
});

// ── shouldShowFilter ──────────────────────────────────────────────────

describe('shouldShowFilter', () => {
  it('returns false when gridConfig is undefined', () => {
    expect(shouldShowFilter(undefined)).toBe(false);
  });

  it('returns false when filter is undefined', () => {
    expect(shouldShowFilter({})).toBe(false);
  });

  it('returns false when filter.enabled is false', () => {
    expect(shouldShowFilter({ filter: { enabled: false } })).toBe(false);
  });

  it('returns true when filter.enabled is true', () => {
    expect(shouldShowFilter({ filter: { enabled: true } })).toBe(true);
  });
});

// ── resolveOptionalHandlers ───────────────────────────────────────────

describe('resolveOptionalHandlers', () => {
  const HANDLERS = { onSave: () => {}, onDelete: () => {} };

  it('returns handlers when enabled', () => {
    expect(resolveOptionalHandlers(true, HANDLERS)).toBe(HANDLERS);
  });

  it('returns undefined when disabled', () => {
    expect(resolveOptionalHandlers(false, HANDLERS)).toBeUndefined();
  });
});

// ── resolveTableLayout ────────────────────────────────────────────────

describe('resolveTableLayout', () => {
  it('returns table-fixed by default', () => {
    expect(resolveTableLayout(undefined)).toBe('table-fixed');
  });

  it('returns table-fixed for fixed layout', () => {
    expect(resolveTableLayout({ tableLayout: 'fixed' })).toBe('table-fixed');
  });

  it('returns empty string for auto layout', () => {
    expect(resolveTableLayout({ tableLayout: 'auto' })).toBe('');
  });
});

// ── isDialogEditing ───────────────────────────────────────────────────

describe('isDialogEditing', () => {
  it('returns false when editing is disabled', () => {
    expect(isDialogEditing(false, { mode: 'Dialog' })).toBe(false);
  });

  it('returns false for non-Dialog mode', () => {
    expect(isDialogEditing(true, { mode: 'Normal' })).toBe(false);
    expect(isDialogEditing(true, { mode: 'Batch' })).toBe(false);
  });

  it('returns true for Dialog mode when enabled', () => {
    expect(isDialogEditing(true, { mode: 'Dialog' })).toBe(true);
  });

  it('returns false when editConfig is undefined', () => {
    expect(isDialogEditing(true, undefined)).toBe(false);
  });
});

// ── buildColumnMenuProps ──────────────────────────────────────────────

describe('buildColumnMenuProps', () => {
  it('builds props with all fields populated', () => {
    const columns = [{ field: 'name', headerText: 'Name' }];
    const visibility = {
      hiddenFields: new Set(['age']),
      toggleColumn: () => {},
    };
    const menu = { openField: 'name', close: () => {}, toggle: () => {} };

    const result = buildColumnMenuProps(columns, visibility, menu);
    expect(result.allColumns).toBe(columns);
    expect(result.hiddenFields).toBe(visibility.hiddenFields);
    expect(result.openMenuField).toBe('name');
    expect(result.onMenuClose).toBe(menu.close);
    expect(result.onMenuToggle).toBe(menu.toggle);
    expect(result.onToggleColumnVisibility).toBe(visibility.toggleColumn);
  });
});

// ── extractPaginationConfig ───────────────────────────────────────────

describe('extractPaginationConfig', () => {
  it('returns empty object when gridConfig is undefined', () => {
    expect(extractPaginationConfig(undefined)).toEqual({});
  });

  it('returns empty object when pagination is undefined', () => {
    expect(extractPaginationConfig({})).toEqual({});
  });

  it('extracts defined pagination fields', () => {
    const result = extractPaginationConfig({
      pagination: {
        enabled: true,
        pageCount: 8,
        pageSizes: [10, 25],
        showFirstLastButtons: true,
        showPageInfo: false,
      },
    });
    expect(result.pageCount).toBe(8);
    expect(result.pageSizes).toEqual([10, 25]);
    expect(result.showFirstLastButtons).toBe(true);
    expect(result.showPageInfo).toBe(false);
  });

  it('omits undefined pagination fields', () => {
    const result = extractPaginationConfig({
      pagination: { enabled: true, pageCount: 3 },
    });
    expect(result.pageCount).toBe(3);
    expect(result).not.toHaveProperty('pageSizes');
    expect(result).not.toHaveProperty('showFirstLastButtons');
  });
});

// ── buildBodyOptionalProps ────────────────────────────────────────────

describe('buildBodyOptionalProps', () => {
  const SELECTION = { selectedRows: [] };
  const EDITING = { editRow: null };

  it('returns empty when no features enabled', () => {
    const result = buildBodyOptionalProps(makeFlags(), SELECTION, EDITING);
    expect(result).toEqual({});
  });

  it('includes selection when enabled', () => {
    const result = buildBodyOptionalProps(
      makeFlags({ selectionEnabled: true }),
      SELECTION,
      EDITING,
    );
    expect(result).toHaveProperty('selection', SELECTION);
    expect(result).not.toHaveProperty('editing');
  });

  it('includes editing when enabled', () => {
    const result = buildBodyOptionalProps(
      makeFlags({ editingEnabled: true }),
      SELECTION,
      EDITING,
    );
    expect(result).toHaveProperty('editing', EDITING);
    expect(result).not.toHaveProperty('selection');
  });

  it('includes both when both enabled', () => {
    const result = buildBodyOptionalProps(
      makeFlags({ selectionEnabled: true, editingEnabled: true }),
      SELECTION,
      EDITING,
    );
    expect(result).toHaveProperty('selection');
    expect(result).toHaveProperty('editing');
  });
});

// ── buildFeatureProps ─────────────────────────────────────────────────

describe('buildFeatureProps', () => {
  const DATA = [{ id: 1 }];
  const COLUMNS = [{ field: 'id', headerText: 'ID' }];

  it('includes only processedData and columns when all callbacks undefined', () => {
    const result = buildFeatureProps(DATA, COLUMNS, {
      selectionConfig: undefined,
      onRowSelected: undefined,
      onRowDeselected: undefined,
      onSelectionChange: undefined,
      groupConfig: undefined,
      onGroupChange: undefined,
      aggregates: undefined,
      editConfig: undefined,
      onSave: undefined,
      onDelete: undefined,
      onAdd: undefined,
      onBatchSave: undefined,
    });
    expect(result.processedData).toBe(DATA);
    expect(result.columns).toBe(COLUMNS);
    expect(result).not.toHaveProperty('selectionConfig');
    expect(result).not.toHaveProperty('editConfig');
  });

  it('includes defined callbacks in result', () => {
    const onSave = vi.fn();
    const editConfig = { mode: 'Normal' as const };
    const result = buildFeatureProps(DATA, COLUMNS, {
      selectionConfig: undefined,
      onRowSelected: undefined,
      onRowDeselected: undefined,
      onSelectionChange: undefined,
      groupConfig: undefined,
      onGroupChange: undefined,
      aggregates: undefined,
      editConfig,
      onSave,
      onDelete: undefined,
      onAdd: undefined,
      onBatchSave: undefined,
    });
    expect(result).toHaveProperty('editConfig', editConfig);
    expect(result).toHaveProperty('onSave', onSave);
    expect(result).not.toHaveProperty('onDelete');
  });
});
