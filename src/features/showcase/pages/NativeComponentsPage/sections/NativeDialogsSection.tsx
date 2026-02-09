import { memo, useState, useCallback } from 'react';

import { ButtonNative, DialogNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeDialogsSection = memo((): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleDialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleConfirmDialogOpen = useCallback(() => {
    setIsConfirmDialogOpen(true);
  }, []);

  const handleConfirmDialogClose = useCallback(() => {
    setIsConfirmDialogOpen(false);
  }, []);

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeDialogs')}
      </h3>
      <div className="flex gap-4">
        <ButtonNative testId="native-dialog-open-btn" variant="primary" onClick={handleDialogOpen}>
          Open Dialog
        </ButtonNative>
        <ButtonNative
          testId="native-confirm-dialog-open-btn"
          variant="outline"
          onClick={handleConfirmDialogOpen}
        >
          Confirm Dialog
        </ButtonNative>
      </div>

      <DialogNative
        isOpen={isDialogOpen}
        primaryButton={{
          text: 'Close',
          variant: 'primary',
          onClick: handleDialogClose,
          testId: 'native-dialog-close-btn',
        }}
        testId="native-dialog"
        title="Information"
        onClose={handleDialogClose}
      >
        <p>
          This is a native HTML dialog component using the &lt;dialog&gt; element. It provides
          built-in accessibility and modal behavior.
        </p>
      </DialogNative>

      <DialogNative
        isOpen={isConfirmDialogOpen}
        primaryButton={{
          text: 'Confirm',
          variant: 'primary',
          onClick: handleConfirmDialogClose,
          testId: 'native-confirm-dialog-confirm-btn',
        }}
        secondaryButton={{
          text: 'Cancel',
          variant: 'secondary',
          onClick: handleConfirmDialogClose,
          testId: 'native-confirm-dialog-cancel-btn',
        }}
        testId="native-confirm-dialog"
        title="Confirm Action"
        variant="confirm"
        onClose={handleConfirmDialogClose}
      >
        <p>Are you sure you want to proceed with this action? This operation cannot be undone.</p>
      </DialogNative>
    </section>
  );
});

NativeDialogsSection.displayName = 'NativeDialogsSection';
