/**
 * EditDialog renders a modal form for editing a table row.
 *
 * Auto-generates form fields from column definitions.
 * Provides Save and Cancel buttons.
 */
import { memo, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';

const DIALOG_OVERLAY_BG = 'rgba(0, 0, 0, 0.5)';

interface ColumnDef {
  field: string;
  headerText: string;
}

interface Props {
  isOpen: boolean;
  columns: ColumnDef[];
  editValues: Record<string, unknown>;
  onValueChange: (field: string, value: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditDialog = ({
  isOpen,
  columns,
  editValues,
  onValueChange,
  onSave,
  onCancel,
}: Props): JSX.Element | null => {
  const handleFieldChange = useCallback(
    (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const inputType = e.target.type;
      const newValue = inputType === 'checkbox' ? e.target.checked : e.target.value;
      onValueChange(field, newValue);
    },
    [onValueChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    },
    [onCancel],
  );

  if (!isOpen) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- backdrop click dismisses dialog; keyboard handled on inner dialog
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-testid="edit-dialog-overlay"
      style={{ backgroundColor: DIALOG_OVERLAY_BG }}
      onClick={onCancel}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- dialog requires click/key listeners for modal behavior */}
      <div
        aria-label={FM('table.editRecord')}
        aria-modal="true"
        className={cn(
          'bg-surface rounded-lg border border-border shadow-lg',
          'w-full max-w-md p-6',
        )}
        data-testid="edit-dialog"
        role="dialog"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          {FM('table.editRecord')}
        </h2>

        <div className="space-y-4">
          {columns.map((col) => {
            const currentValue = editValues[col.field];
            const isBooleanField = typeof currentValue === 'boolean';

            return (
              <div key={col.field} className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-text-secondary"
                  htmlFor={`dialog-field-${col.field}`}
                >
                  {col.headerText}
                </label>
                {isBooleanField ? (
                  <input
                    checked={Boolean(currentValue)}
                    className="h-4 w-4"
                    data-testid={`dialog-field-${col.field}`}
                    id={`dialog-field-${col.field}`}
                    type="checkbox"
                    onChange={(e) => handleFieldChange(col.field, e)}
                  />
                ) : (
                  <input
                    className="rounded border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none"
                    data-testid={`dialog-field-${col.field}`}
                    id={`dialog-field-${col.field}`}
                    type="text"
                    value={String(currentValue ?? '')}
                    onChange={(e) => handleFieldChange(col.field, e)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded border border-border px-4 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors"
            data-testid="edit-dialog-cancel"
            type="button"
            onClick={onCancel}
          >
            {FM('common.cancel')}
          </button>
          <button
            className="rounded bg-primary-700 px-4 py-2 text-sm text-white hover:bg-primary-800 transition-colors"
            data-testid="edit-dialog-save"
            type="button"
            onClick={onSave}
          >
            {FM('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EditDialog);
