/**
 * BasicDialogSection - Demonstrates the Syncfusion Dialog wrapper with basic open/close.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { Button, ButtonVariant, Dialog } from '@/components/ui/syncfusion';
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
        <Button
          testId="sf-basic-dialog-open-btn"
          variant={ButtonVariant.Primary}
          onClick={handleOpen}
        >
          {FM('components.dialogShowcase.openBasicDialog')}
        </Button>
      </div>

      <Dialog
        isOpen={isOpen}
        primaryButton={{
          text: FM('components.close'),
          variant: 'primary',
          onClick: handleClose,
          testId: 'sf-basic-dialog-close-btn',
        }}
        testId="sf-basic-dialog"
        title={FM('components.dialogShowcase.basicDialogTitle')}
        onClose={handleClose}
      >
        <p className="text-text-primary">
          {FM('components.dialogShowcase.basicDialogContent')}
        </p>
      </Dialog>
      <CopyableCodeSnippet code='<Dialog isOpen={isOpen} title="Title" onClose={handleClose} primaryButton={{ text: "OK", onClick: handleClose }}>Content</Dialog>' />
    </section>
  );
});

BasicDialogSection.displayName = 'BasicDialogSection';
