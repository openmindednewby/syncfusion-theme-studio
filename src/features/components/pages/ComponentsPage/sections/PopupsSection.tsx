import { useState, useRef, useCallback, useEffect } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent, TooltipComponent } from '@syncfusion/ej2-react-popups';

import { FM } from '@/localization/utils/helpers';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

export const PopupsSection = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const dialogRef = useRef<DialogComponent>(null);
  const confirmDialogRef = useRef<DialogComponent>(null);

  // Load popups CSS on mount
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Popups).catch(() => {});
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
        content: FM('components.close'),
        cssClass: 'e-flat',
      },
      click: handleDialogClose,
    },
  ];

  const confirmButtons = [
    {
      buttonModel: {
        content: FM('common.cancel'),
        cssClass: 'e-flat',
      },
      click: handleConfirmDialogClose,
    },
    {
      buttonModel: {
        content: FM('common.confirm'),
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
              {FM('components.openDialog')}
            </ButtonComponent>
            <ButtonComponent cssClass="e-outline" onClick={handleConfirmDialogOpen}>
              {FM('components.confirmDialog')}
            </ButtonComponent>
          </div>
        </div>

        {/* Tooltips */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.tooltips')}</h4>
          <div className="flex flex-wrap gap-4">
            <TooltipComponent content={FM('components.tooltipTop')} position="TopCenter">
              <ButtonComponent cssClass="e-outline">{FM('components.hoverTop')}</ButtonComponent>
            </TooltipComponent>
            <TooltipComponent content={FM('components.tooltipBottom')} position="BottomCenter">
              <ButtonComponent cssClass="e-outline">{FM('components.hoverBottom')}</ButtonComponent>
            </TooltipComponent>
            <TooltipComponent content={FM('components.tooltipLeft')} position="LeftCenter">
              <ButtonComponent cssClass="e-outline">{FM('components.hoverLeft')}</ButtonComponent>
            </TooltipComponent>
            <TooltipComponent content={FM('components.tooltipRight')} position="RightCenter">
              <ButtonComponent cssClass="e-outline">{FM('components.hoverRight')}</ButtonComponent>
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
        header={FM('components.dialogHeader')}
        visible={isDialogOpen}
        width="400px"
      >
        <p className="text-text-primary">
          {FM('components.dialogContent')}
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
        header={FM('components.confirmDialogHeader')}
        visible={isConfirmDialogOpen}
        width="400px"
      >
        <p className="text-text-primary">
          {FM('components.confirmDialogContent')}
        </p>
      </DialogComponent>
    </section>
  );
};
