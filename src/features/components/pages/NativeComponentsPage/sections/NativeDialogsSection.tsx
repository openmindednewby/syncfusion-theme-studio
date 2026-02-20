import { memo, useState, useCallback } from 'react';

import { ButtonNative, ButtonVariant, DialogNative, DialogVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

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
        <ButtonNative testId="native-dialog-open-btn" variant={ButtonVariant.Primary} onClick={handleDialogOpen}>
          {FM('components.openDialog')}
        </ButtonNative>
        <ButtonNative
          testId="native-confirm-dialog-open-btn"
          variant={ButtonVariant.Outline}
          onClick={handleConfirmDialogOpen}
        >
          {FM('components.confirmDialog')}
        </ButtonNative>
      </div>

      <DialogNative
        isOpen={isDialogOpen}
        primaryButton={{
          text: FM('components.close'),
          variant: ButtonVariant.Primary,
          onClick: handleDialogClose,
          testId: 'native-dialog-close-btn',
        }}
        testId="native-dialog"
        title={FM('components.dialogHeader')}
        onClose={handleDialogClose}
      >
        <p>
          {FM('components.nativeDialogContent')}
        </p>
      </DialogNative>

      <DialogNative
        isOpen={isConfirmDialogOpen}
        primaryButton={{
          text: FM('common.confirm'),
          variant: ButtonVariant.Primary,
          onClick: handleConfirmDialogClose,
          testId: 'native-confirm-dialog-confirm-btn',
        }}
        secondaryButton={{
          text: FM('common.cancel'),
          variant: ButtonVariant.Secondary,
          onClick: handleConfirmDialogClose,
          testId: 'native-confirm-dialog-cancel-btn',
        }}
        testId="native-confirm-dialog"
        title={FM('components.confirmDialogHeader')}
        variant={DialogVariant.Confirm}
        onClose={handleConfirmDialogClose}
      >
        <p>{FM('components.confirmDialogContent')}</p>
      </DialogNative>
    </section>
  );
});

NativeDialogsSection.displayName = 'NativeDialogsSection';
