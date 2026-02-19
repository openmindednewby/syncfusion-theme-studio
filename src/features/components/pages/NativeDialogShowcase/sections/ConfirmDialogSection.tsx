/**
 * ConfirmDialogSection - Demonstrates confirm/cancel and danger dialog patterns.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import {
  ButtonNative,
  ButtonVariant,
  DialogNative,
  DialogVariant,
} from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const ConfirmDialogSection = memo((): JSX.Element => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDangerOpen, setIsDangerOpen] = useState(false);

  const handleConfirmOpen = useCallback(() => {
    setIsConfirmOpen(true);
  }, []);

  const handleConfirmClose = useCallback(() => {
    setIsConfirmOpen(false);
  }, []);

  const handleDangerOpen = useCallback(() => {
    setIsDangerOpen(true);
  }, []);

  const handleDangerClose = useCallback(() => {
    setIsDangerOpen(false);
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.dialogShowcase.sections.confirm')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.dialogShowcase.sections.confirmDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <ButtonNative
          testId="native-confirm-dialog-open-btn"
          variant={ButtonVariant.Outline}
          onClick={handleConfirmOpen}
        >
          {FM('components.dialogShowcase.openConfirmDialog')}
        </ButtonNative>
        <ButtonNative
          testId="native-danger-dialog-open-btn"
          variant={ButtonVariant.Danger}
          onClick={handleDangerOpen}
        >
          {FM('components.dialogShowcase.openDangerDialog')}
        </ButtonNative>
      </div>

      <DialogNative
        isOpen={isConfirmOpen}
        primaryButton={{
          text: FM('common.confirm'),
          variant: 'primary',
          onClick: handleConfirmClose,
          testId: 'native-confirm-dialog-confirm-btn',
        }}
        secondaryButton={{
          text: FM('common.cancel'),
          variant: 'secondary',
          onClick: handleConfirmClose,
          testId: 'native-confirm-dialog-cancel-btn',
        }}
        testId="native-confirm-dialog"
        title={FM('components.dialogShowcase.confirmDialogTitle')}
        variant={DialogVariant.Confirm}
        onClose={handleConfirmClose}
      >
        <p>{FM('components.dialogShowcase.confirmDialogContent')}</p>
      </DialogNative>

      <DialogNative
        isOpen={isDangerOpen}
        primaryButton={{
          text: FM('common.delete'),
          variant: 'danger',
          onClick: handleDangerClose,
          testId: 'native-danger-dialog-delete-btn',
        }}
        secondaryButton={{
          text: FM('common.cancel'),
          variant: 'secondary',
          onClick: handleDangerClose,
          testId: 'native-danger-dialog-cancel-btn',
        }}
        testId="native-danger-dialog"
        title={FM('components.dialogShowcase.dangerDialogTitle')}
        variant={DialogVariant.Danger}
        onClose={handleDangerClose}
      >
        <p>{FM('components.dialogShowcase.dangerDialogContent')}</p>
      </DialogNative>
      <CopyableCodeSnippet code='<DialogNative isOpen={isOpen} title="Confirm" variant={DialogVariant.Confirm} onClose={handleClose}>Content</DialogNative>' />
    </section>
  );
});

ConfirmDialogSection.displayName = 'ConfirmDialogSection';
