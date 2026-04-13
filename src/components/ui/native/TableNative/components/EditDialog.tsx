/**
 * EditDialog renders a modal form for editing a table row.
 *
 * Uses native HTML `<dialog>` with `showModal()` for browser-native focus
 * trapping, backdrop, and ESC handling (WCAG 2.4.3 compliant).
 * Auto-generates form fields from column definitions.
 * Provides Save and Cancel buttons.
 */
import { memo, useCallback, useEffect, useRef } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleFieldChange = useCallback(
    (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const inputType = e.target.type;
      const newValue = inputType === 'checkbox' ? e.target.checked : e.target.value;
      onValueChange(field, newValue);
    },
    [onValueChange],
  );

  // Sync dialog open state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  // Handle ESC key via dialog's native cancel event
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event): void => {
      e.preventDefault();
      onCancel();
    };

    dialog.addEventListener('cancel', handleCancel);
    return (): void => dialog.removeEventListener('cancel', handleCancel);
  }, [onCancel]);

  // Handle backdrop click -- clicks on the dialog element itself (outside the content padding box)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleBackdropClick(e: MouseEvent): void {
      if (e.target === dialog) onCancel();
    }

    dialog.addEventListener('click', handleBackdropClick);
    return (): void => dialog.removeEventListener('click', handleBackdropClick);
  }, [onCancel]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={FM('table.editRecord')}
      className={cn(
        'fixed inset-0 m-auto p-6 rounded-lg shadow-lg',
        'bg-surface border border-border',
        'w-full max-w-md',
        'backdrop:bg-black/50',
      )}
      data-testid="edit-dialog"
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
    </dialog>
  );
};

export default memo(EditDialog);
