/**
 * EditCell renders an inline input for editing a table cell value.
 *
 * Renders the appropriate input type based on the current value.
 * Enter/Tab saves, Escape cancels.
 */
import { memo, useCallback, useRef, useEffect } from 'react';

import { FM } from '@/localization/helpers';
import { cn } from '@/utils/cn';

const DIRTY_CELL_BG = 'bg-yellow-50 dark:bg-yellow-900/20';

interface Props {
  value: unknown;
  field: string;
  isDirty?: boolean;
  onValueChange: (field: string, value: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditCell = ({
  value,
  field,
  isDirty = false,
  onValueChange,
  onSave,
  onCancel,
}: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputType = e.target.type;
      const newValue = inputType === 'checkbox' ? e.target.checked : e.target.value;
      onValueChange(field, newValue);
    },
    [field, onValueChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        onSave();
      }
      if (e.key === 'Escape') onCancel();
    },
    [onSave, onCancel],
  );

  const isBooleanValue = typeof value === 'boolean';
  const isNumberValue = typeof value === 'number';

  return (
    <div className={cn(isDirty && DIRTY_CELL_BG, 'w-full')}>
      {isBooleanValue ? (
        <input
          ref={inputRef}
          aria-label={FM('table.editField', field)}
          checked={Boolean(value)}
          className="h-4 w-4"
          data-testid={`edit-cell-${field}`}
          type="checkbox"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <input
          ref={inputRef}
          aria-label={FM('table.editField', field)}
          className="native-grid-filter-input w-full rounded border px-2 py-1 text-xs text-text-primary focus:outline-none"
          data-testid={`edit-cell-${field}`}
          style={{ backgroundColor: 'var(--component-datagrid-edit-cell-bg)', borderColor: 'var(--component-datagrid-edit-cell-border)' }}
          type={isNumberValue ? 'number' : 'text'}
          value={String(value ?? '')}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default memo(EditCell);
