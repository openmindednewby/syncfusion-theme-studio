/**
 * ModalSection - Demonstrates confirm/cancel and danger-variant Syncfusion dialogs.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { Button, ButtonVariant, Dialog, DialogVariant } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

export const ModalSection = memo((): JSX.Element => {
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
          {FM('components.dialogShowcase.sections.modal')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.dialogShowcase.sections.modalDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          testId="sf-confirm-dialog-open-btn"
          variant={ButtonVariant.Outline}
          onClick={handleConfirmOpen}
        >
          {FM('components.dialogShowcase.openConfirmDialog')}
        </Button>
        <Button
          testId="sf-danger-dialog-open-btn"
          variant={ButtonVariant.Danger}
          onClick={handleDangerOpen}
        >
          {FM('components.dialogShowcase.openDangerDialog')}
        </Button>
      </div>

      <Dialog
        isOpen={isConfirmOpen}
        primaryButton={{
          text: FM('common.confirm'),
          variant: 'primary',
          onClick: handleConfirmClose,
          testId: 'sf-confirm-dialog-confirm-btn',
        }}
        secondaryButton={{
          text: FM('common.cancel'),
          variant: 'secondary',
          onClick: handleConfirmClose,
          testId: 'sf-confirm-dialog-cancel-btn',
        }}
        testId="sf-confirm-dialog"
        title={FM('components.dialogShowcase.confirmDialogTitle')}
        variant={DialogVariant.Confirm}
        onClose={handleConfirmClose}
      >
        <p className="text-text-primary">
          {FM('components.dialogShowcase.confirmDialogContent')}
        </p>
      </Dialog>

      <Dialog
        isOpen={isDangerOpen}
        primaryButton={{
          text: FM('common.delete'),
          variant: 'danger',
          onClick: handleDangerClose,
          testId: 'sf-danger-dialog-delete-btn',
        }}
        secondaryButton={{
          text: FM('common.cancel'),
          variant: 'secondary',
          onClick: handleDangerClose,
          testId: 'sf-danger-dialog-cancel-btn',
        }}
        testId="sf-danger-dialog"
        title={FM('components.dialogShowcase.dangerDialogTitle')}
        variant={DialogVariant.Danger}
        onClose={handleDangerClose}
      >
        <p className="text-text-primary">
          {FM('components.dialogShowcase.dangerDialogContent')}
        </p>
      </Dialog>
      <CopyableCodeSnippet code='<Dialog isOpen={isOpen} title="Confirm" variant={DialogVariant.Danger} primaryButton={{ text: "Delete", variant: "danger" }} secondaryButton={{ text: "Cancel" }}>Content</Dialog>' />
    </section>
  );
});

ModalSection.displayName = 'ModalSection';
