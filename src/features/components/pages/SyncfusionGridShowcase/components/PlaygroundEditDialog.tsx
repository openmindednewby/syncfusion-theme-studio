/** Edit modal with form fields for the playground Edit action. */
import { memo, useCallback, useState, useEffect } from 'react';

import { DialogNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

type Row = Record<string, unknown>;

const EXCLUDED_KEYS = new Set(['id', 'actions']);

interface Props {
  isOpen: boolean;
  row: Row | null;
  testId: string;
  onSave: (values: Row) => void;
  onCancel: () => void;
}

const PlaygroundEditDialog = ({ isOpen, row, testId, onSave, onCancel }: Props): JSX.Element => {
  const [values, setValues] = useState<Row>({});

  useEffect(() => {
    if (row) setValues({ ...row });
  }, [row]);

  const handleChange = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => onSave(values), [onSave, values]);

  const editableKeys = row ? Object.keys(row).filter((k) => !EXCLUDED_KEYS.has(k)) : [];

  return (
    <DialogNative
      isOpen={isOpen}
      primaryButton={{ text: FM('common.save'), onClick: handleSave, testId: 'pg-edit-save-btn' }}
      secondaryButton={{ text: FM('common.cancel'), onClick: onCancel, testId: 'pg-edit-cancel-btn' }}
      testId={testId}
      title={FM('gridShowcase.editDialogTitle')}
      onClose={onCancel}
    >
      <div className="space-y-3">
        {editableKeys.map((key) => (
          <label key={key} className="block text-sm">
            <span className="mb-1 block font-medium capitalize text-text-secondary">{key}</span>
            <input
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              data-testid={`pg-edit-field-${key}`}
              type="text"
              value={String(values[key] ?? '')}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </DialogNative>
  );
};

const Memoized = memo(PlaygroundEditDialog);
Memoized.displayName = 'PlaygroundEditDialog';

export { Memoized as PlaygroundEditDialog };
