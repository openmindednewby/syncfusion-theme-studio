/**
 * BasicDialogSection - Demonstrates a simple native dialog with open/close toggle.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant, DialogNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const BasicDialogSection = memo((): JSX.Element => {
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
          {FM('components.dialogShowcase.sections.basic')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.dialogShowcase.sections.basicDesc')}
        </p>
      </div>
      <div className="flex gap-4">
        <ButtonNative
          testId="native-basic-dialog-open-btn"
          variant={ButtonVariant.Primary}
          onClick={handleOpen}
        >
          {FM('components.dialogShowcase.openBasicDialog')}
        </ButtonNative>
      </div>

      <DialogNative
        isOpen={isOpen}
        primaryButton={{
          text: FM('components.close'),
          variant: 'primary',
          onClick: handleClose,
          testId: 'native-basic-dialog-close-btn',
        }}
        testId="native-basic-dialog"
        title={FM('components.dialogShowcase.basicDialogTitle')}
        onClose={handleClose}
      >
        <p>{FM('components.dialogShowcase.basicDialogContent')}</p>
      </DialogNative>
      <CopyableCodeSnippet code='<DialogNative isOpen={isOpen} title="Title" onClose={handleClose}>Content</DialogNative>' />
    </section>
  );
});

BasicDialogSection.displayName = 'BasicDialogSection';
