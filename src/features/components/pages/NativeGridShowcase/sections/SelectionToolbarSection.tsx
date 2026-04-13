/**
 * SelectionToolbarSection — demonstrates GridSelectionToolbar
 * composed above a TableNative with checkbox multi-select.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { GridSelectionToolbar, TableNative } from '@/components/ui/native';
import type { SelectionConfig, SelectedItem } from '@/components/ui/native';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

type DataRow = Record<string, unknown>;

function toSelectedItem(row: DataRow): SelectedItem {
  return { key: String(row['id']), label: String(row['name']) };
}

function filterOutKey(items: SelectedItem[], key: string): SelectedItem[] {
  return items.filter((item) => item.key !== key);
}

const CHECKBOX_SELECTION: SelectionConfig = { type: 'Multiple', mode: 'Row', checkbox: true };

const CODE_SNIPPET = `<GridSelectionToolbar
  selectedCount={selectedCount}
  selectedItems={selectedItems}
  onRemoveItem={handleRemove}
  onClearAll={handleClearAll}
/>
<TableNative
  columns={columns}
  data={data}
  selectionConfig={{ type: "Multiple", mode: "Row", checkbox: true }}
  onSelectionChange={handleSelectionChange}
/>`;

export const SelectionToolbarSection = memo((): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleSelectionChange = useCallback((rows: DataRow[]) => {
    setSelectedItems(rows.map(toSelectedItem));
  }, []);

  const handleRemoveItem = useCallback((key: string) => {
    setSelectedItems((prev) => filterOutKey(prev, key));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.selectionToolbarDesc"
      testId="native-grid-showcase-selection-toolbar"
      titleKey="gridShowcase.selectionToolbarTitle"
    >
      <GridSelectionToolbar
        showCheckIcon
        selectedCount={selectedItems.length}
        selectedItems={selectedItems}
        testId="native-selection-toolbar"
        onClearAll={handleClearAll}
        onRemoveItem={handleRemoveItem}
      />
      <TableNative
        ariaLabel={FM('gridShowcase.selectionToolbarTitle')}
        columns={EMPLOYEE_COLUMNS}
        data={EMPLOYEES}
        selectionConfig={CHECKBOX_SELECTION}
        testId="native-grid-selection-toolbar"
        onSelectionChange={handleSelectionChange}
      />
      <CopyableCodeSnippet code={CODE_SNIPPET} />
    </ShowcaseSection>
  );
});

SelectionToolbarSection.displayName = 'SelectionToolbarSection';
