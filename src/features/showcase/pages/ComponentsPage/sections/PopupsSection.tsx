import { useState, useRef, useCallback, useEffect } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent, TooltipComponent } from '@syncfusion/ej2-react-popups';

import { FM } from '@/localization/helpers';
import { loadSyncfusionCss } from '@/utils';

export const PopupsSection = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const dialogRef = useRef<DialogComponent>(null);
  const confirmDialogRef = useRef<DialogComponent>(null);

  // Load popups CSS on mount
  useEffect(() => {
    loadSyncfusionCss('popups').catch(() => {});
  }, []);

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

  const dialogButtons = [
    {
      buttonModel: {
        content: 'Close',
        cssClass: 'e-flat',
      },
      click: handleDialogClose,
    },
  ];

  const confirmButtons = [
    {
      buttonModel: {
        content: 'Cancel',
        cssClass: 'e-flat',
      },
      click: handleConfirmDialogClose,
    },
    {
      buttonModel: {
        content: 'Confirm',
        cssClass: 'e-primary',
        isPrimary: true,
      },
      click: handleConfirmDialogClose,
    },
  ];

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.popups')}</h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Dialogs */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.dialogs')}</h4>
          <div className="flex gap-4">
            <ButtonComponent cssClass="e-primary" onClick={handleDialogOpen}>
              Open Dialog
            </ButtonComponent>
            <ButtonComponent cssClass="e-outline" onClick={handleConfirmDialogOpen}>
              Confirm Dialog
            </ButtonComponent>
          </div>
        </div>

        {/* Tooltips */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.tooltips')}</h4>
          <div className="flex flex-wrap gap-4">
            <TooltipComponent content="Tooltip on top" position="TopCenter">
              <ButtonComponent cssClass="e-outline">Hover Top</ButtonComponent>
            </TooltipComponent>
            <TooltipComponent content="Tooltip on bottom" position="BottomCenter">
              <ButtonComponent cssClass="e-outline">Hover Bottom</ButtonComponent>
            </TooltipComponent>
            <TooltipComponent content="Tooltip on left" position="LeftCenter">
              <ButtonComponent cssClass="e-outline">Hover Left</ButtonComponent>
            </TooltipComponent>
            <TooltipComponent content="Tooltip on right" position="RightCenter">
              <ButtonComponent cssClass="e-outline">Hover Right</ButtonComponent>
            </TooltipComponent>
          </div>
        </div>
      </div>

      {/* Basic Dialog */}
      <DialogComponent
        ref={dialogRef}
        closeOnEscape
        isModal
        showCloseIcon
        buttons={dialogButtons}
        close={handleDialogClose}
        header="Information"
        visible={isDialogOpen}
        width="400px"
      >
        <p className="text-text-primary">
          This is a basic dialog component. Dialogs are used to show information or gather input from users.
        </p>
      </DialogComponent>

      {/* Confirm Dialog */}
      <DialogComponent
        ref={confirmDialogRef}
        closeOnEscape
        isModal
        showCloseIcon
        buttons={confirmButtons}
        close={handleConfirmDialogClose}
        header="Confirm Action"
        visible={isConfirmDialogOpen}
        width="400px"
      >
        <p className="text-text-primary">
          Are you sure you want to proceed with this action? This operation cannot be undone.
        </p>
      </DialogComponent>
    </section>
  );
};
