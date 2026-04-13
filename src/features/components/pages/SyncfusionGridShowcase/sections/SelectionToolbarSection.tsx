/**
 * SelectionToolbarSection — demonstrates GridSelectionToolbar
 * composed above a Syncfusion DataGrid with checkbox multi-select.
 */
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { GridComponent, SelectionSettingsModel } from '@syncfusion/ej2-react-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { GridSelectionToolbar } from '@/components/ui/native';
import type { SelectedItem } from '@/components/ui/native';
import { DataGrid } from '@/components/ui/syncfusion';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_ROLE,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_STATUS,
} from '../data/data';

function buildItems(grid: GridComponent | undefined): SelectedItem[] {
  if (!grid) return [];
  const records: object[] = grid.getSelectedRecords();
  return records.map((r) => {
    const id = (r as Record<string, unknown>)['id']; // eslint-disable-line @typescript-eslint/consistent-type-assertions -- Syncfusion returns Object[]
    const name = (r as Record<string, unknown>)['name']; // eslint-disable-line @typescript-eslint/consistent-type-assertions -- Syncfusion returns Object[]
    return { key: String(id), label: String(name) };
  });
}

function filterOutKey(items: SelectedItem[], key: string): SelectedItem[] {
  return items.filter((item) => item.key !== key);
}

const CHECKBOX_WIDTH = 50;

const CODE_SNIPPET = `<GridSelectionToolbar
  selectedCount={selectedCount}
  selectedItems={selectedItems}
  onRemoveItem={handleRemove}
  onClearAll={handleClearAll}
/>
<DataGrid
  columns={columns}
  data={data}
  selectionSettings={{ type: "Multiple", mode: "Row", checkboxOnly: true }}
  gridRef={gridRef}
/>`;

export const SelectionToolbarSection = memo((): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const gridRef = useRef<GridComponent | undefined>(undefined);

  const selectionSettings = useMemo(
    (): SelectionSettingsModel => ({ type: 'Multiple', mode: 'Row', checkboxOnly: true }),
    [],
  );

  const columns = useMemo(
    (): ColumnModel[] => [
      { field: 'checkbox', type: 'checkbox', width: CHECKBOX_WIDTH },
      { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
      { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
      { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
      { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
      { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
    ],
    [],
  );

  const handleRowSelected = useCallback(() => {
    setSelectedItems(buildItems(gridRef.current));
  }, []);

  const handleRowDeselected = useCallback(() => {
    setSelectedItems(buildItems(gridRef.current));
  }, []);

  const handleRemoveItem = useCallback((key: string) => {
    setSelectedItems((prev) => filterOutKey(prev, key));
  }, []);

  const handleClearAll = useCallback(() => {
    gridRef.current?.clearSelection();
    setSelectedItems([]);
  }, []);

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.selectionToolbarDesc"
      testId="grid-showcase-selection-toolbar"
      titleKey="gridShowcase.selectionToolbarTitle"
    >
      <GridSelectionToolbar
        showCheckIcon
        selectedCount={selectedItems.length}
        selectedItems={selectedItems}
        testId="sf-selection-toolbar"
        onClearAll={handleClearAll}
        onRemoveItem={handleRemoveItem}
      />
      <DataGrid
        columns={columns}
        data={EMPLOYEES}
        gridRef={gridRef}
        selectionSettings={selectionSettings}
        testId="grid-selection-toolbar"
        onRowDeselected={handleRowDeselected}
        onRowSelected={handleRowSelected}
      />
      <CopyableCodeSnippet code={CODE_SNIPPET} />
    </ShowcaseSection>
  );
});

SelectionToolbarSection.displayName = 'SelectionToolbarSection';
