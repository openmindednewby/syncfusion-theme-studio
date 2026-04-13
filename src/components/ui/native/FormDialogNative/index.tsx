import { memo, useCallback } from 'react';

import DialogNative from '@/components/ui/native/DialogNative';
import type { BaseFormDialogProps } from '@/components/ui/shared/formDialogTypes';
import { FM } from '@/localization/utils/helpers';

export type FormDialogNativeProps = BaseFormDialogProps;

const DEFAULT_WIDTH = '480px';

const FormDialogNative = memo(({
  isOpen,
  title,
  onSave,
  onCancel,
  children,
  testId = 'form-dialog-native',
  width = DEFAULT_WIDTH,
  saveText,
  cancelText,
  saveDisabled = false,
  saveTestId,
  cancelTestId,
}: FormDialogNativeProps): JSX.Element => {
  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    if (!saveDisabled) onSave();
  }, [onSave, saveDisabled]);

  return (
    <DialogNative
      isOpen={isOpen}
      testId={testId}
      title={title}
      width={width}
      onClose={onCancel}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {children}
        <div className="flex justify-end gap-3 pt-2">
          <button
            className="rounded-md px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover"
            data-testid={cancelTestId}
            type="button"
            onClick={onCancel}
          >
            {cancelText ?? FM('common.cancel')}
          </button>
          <button
            className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700 disabled:opacity-50"
            data-testid={saveTestId}
            disabled={saveDisabled}
            type="submit"
          >
            {saveText ?? FM('common.save')}
          </button>
        </div>
      </form>
    </DialogNative>
  );
});

FormDialogNative.displayName = 'FormDialogNative';

export default FormDialogNative;
