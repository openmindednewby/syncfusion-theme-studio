/**
 * EditingSection demonstrates all three editing modes:
 * Normal (inline), Dialog (modal form), and Batch (multi-cell).
 *
 * Each mode is shown with its own TableNative instance and
 * appropriate command column actions (Edit/Delete/Save/Cancel).
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative } from '@/components/ui/native';
import type { EditingConfig } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { PRODUCT_COLUMNS, PRODUCTS } from '../sampleData';

type DataRow = Record<string, unknown>;

const INLINE_EDIT_CONFIG: EditingConfig = {
  mode: 'Normal',
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
};

const DIALOG_EDIT_CONFIG: EditingConfig = {
  mode: 'Dialog',
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
};

const BATCH_EDIT_CONFIG: EditingConfig = {
  mode: 'Batch',
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
};

function useEditCallbacks(): {
  handleSave: (edited: DataRow, original: DataRow) => void;
  handleDelete: (row: DataRow) => void;
  handleAdd: (row: DataRow) => void;
} {
  const handleSave = useCallback((_edited: DataRow, _original: DataRow) => {
    // In a real app, this would call an API
  }, []);

  const handleDelete = useCallback((_row: DataRow) => {
    // In a real app, this would call an API
  }, []);

  const handleAdd = useCallback((_row: DataRow) => {
    // In a real app, this would call an API
  }, []);

  return { handleSave, handleDelete, handleAdd };
}

const EDIT_MODES = ['Normal', 'Dialog', 'Batch'] as const;

type EditModeType = (typeof EDIT_MODES)[number];

const EDIT_MODE_CONFIGS: Record<EditModeType, EditingConfig> = {
  Normal: INLINE_EDIT_CONFIG,
  Dialog: DIALOG_EDIT_CONFIG,
  Batch: BATCH_EDIT_CONFIG,
};

const EDIT_MODE_TEST_IDS: Record<EditModeType, string> = {
  Normal: TestIds.NATIVE_GRID_EDIT_INLINE,
  Dialog: TestIds.NATIVE_GRID_EDIT_DIALOG,
  Batch: TestIds.NATIVE_GRID_EDIT_BATCH,
};

const ACTIVE_TAB_STYLE = 'border-primary-500 text-primary-600';
const INACTIVE_TAB_STYLE = 'border-transparent text-text-secondary hover:text-text-primary hover:border-border';

export const EditingSection = memo((): JSX.Element => {
  const [activeMode, setActiveMode] = useState<EditModeType>('Normal');
  const { handleSave, handleDelete, handleAdd } = useEditCallbacks();

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.gridShowcase.sections.editing')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.gridShowcase.sections.editingDesc')}
        </p>
      </div>
      <div className="flex gap-2 border-b border-border" data-testid={TestIds.NATIVE_GRID_EDIT_TABS}>
        {EDIT_MODES.map((mode) => (
          <button
            key={mode}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeMode === mode ? ACTIVE_TAB_STYLE : INACTIVE_TAB_STYLE
            }`}
            data-testid={`edit-tab-${mode.toLowerCase()}`}
            type="button"
            onClick={() => setActiveMode(mode)}
          >
            {FM(`components.gridShowcase.editModes.${mode.toLowerCase()}`)}
          </button>
        ))}
      </div>
      <TableNative
        ariaLabel={FM('components.gridShowcase.sections.editing')}
        columns={PRODUCT_COLUMNS}
        data={PRODUCTS}
        editConfig={EDIT_MODE_CONFIGS[activeMode]}
        testId={EDIT_MODE_TEST_IDS[activeMode]}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onSave={handleSave}
      />
      <CopyableCodeSnippet code='<TableNative columns={columns} data={data} editConfig={{ mode: "Normal", allowEditing: true }} />' />
    </section>
  );
});

EditingSection.displayName = 'EditingSection';
