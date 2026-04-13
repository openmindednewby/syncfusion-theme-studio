/**
 * CustomContentSection - Demonstrates a native dialog with rich custom content.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant, DialogNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const CustomContentSection = memo((): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.dialogShowcase.sections.custom')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.dialogShowcase.sections.customDesc')}
        </p>
      </div>
      <div className="flex gap-4">
        <ButtonNative
          testId="native-custom-dialog-open-btn"
          variant={ButtonVariant.Primary}
          onClick={handleOpen}
        >
          {FM('components.dialogShowcase.openCustomDialog')}
        </ButtonNative>
      </div>

      <DialogNative
        isOpen={isOpen}
        primaryButton={{
          text: FM('common.save'),
          variant: 'primary',
          onClick: handleClose,
          testId: 'native-custom-dialog-save-btn',
        }}
        secondaryButton={{
          text: FM('common.cancel'),
          variant: 'secondary',
          onClick: handleClose,
          testId: 'native-custom-dialog-cancel-btn',
        }}
        testId="native-custom-dialog"
        title={FM('components.dialogShowcase.customDialogTitle')}
        width="500px"
        onClose={handleClose}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="custom-name">
              {FM('components.dialogShowcase.customNameLabel')}
            </label>
            <input
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="custom-name"
              placeholder={FM('components.dialogShowcase.customNamePlaceholder')}
              type="text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="custom-email">
              {FM('components.dialogShowcase.customEmailLabel')}
            </label>
            <input
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="custom-email"
              placeholder={FM('components.dialogShowcase.customEmailPlaceholder')}
              type="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="custom-message">
              {FM('components.dialogShowcase.customMessageLabel')}
            </label>
            <textarea
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="custom-message"
              placeholder={FM('components.dialogShowcase.customMessagePlaceholder')}
              rows={3}
            />
          </div>
        </div>
      </DialogNative>
      <CopyableCodeSnippet code='<DialogNative isOpen={isOpen} title="Custom" width="500px" onClose={handleClose}><form>...</form></DialogNative>' />
    </section>
  );
});

CustomContentSection.displayName = 'CustomContentSection';
