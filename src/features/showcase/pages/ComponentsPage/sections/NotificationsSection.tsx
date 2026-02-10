import { useRef, useCallback, useEffect } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { MessageComponent , ToastComponent } from '@syncfusion/ej2-react-notifications';


import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss } from '@/utils';

const TOAST_TIMEOUT_MS = 5000;

export const NotificationsSection = (): JSX.Element => {
  const toastRef = useRef<ToastComponent>(null);

  useEffect(() => {
    loadSyncfusionCss('notifications').catch(() => {});
  }, []);

  const showToast = useCallback((cssClass: string, title: string, content: string) => {
    toastRef.current?.show({ title, content, cssClass });
  }, []);

  const handleSuccessToast = useCallback(() => {
    showToast('e-toast-success', FM('components.syncfusionToasts.successTitle'), FM('components.syncfusionToasts.successMessage'));
  }, [showToast]);

  const handleWarningToast = useCallback(() => {
    showToast('e-toast-warning', FM('components.syncfusionToasts.warningTitle'), FM('components.syncfusionToasts.warningMessage'));
  }, [showToast]);

  const handleErrorToast = useCallback(() => {
    showToast('e-toast-danger', FM('components.syncfusionToasts.errorTitle'), FM('components.syncfusionToasts.errorMessage'));
  }, [showToast]);

  const handleInfoToast = useCallback(() => {
    showToast('e-toast-info', FM('components.syncfusionToasts.infoTitle'), FM('components.syncfusionToasts.infoMessage'));
  }, [showToast]);

  return (
    <section className="space-y-6" data-testid={TestIds.NOTIFICATIONS_SECTION}>
      <h3 className="text-xl font-semibold text-text-primary">{FM('components.notifications')}</h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Toast Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.toasts')}</h4>
          <div className="flex flex-wrap gap-3">
            <ButtonComponent
              cssClass="e-success"
              data-testid={TestIds.TOAST_SUCCESS_BTN}
              onClick={handleSuccessToast}
            >
              {FM('components.syncfusionToasts.successBtn')}
            </ButtonComponent>
            <ButtonComponent
              cssClass="e-warning"
              data-testid={TestIds.TOAST_WARNING_BTN}
              onClick={handleWarningToast}
            >
              {FM('components.syncfusionToasts.warningBtn')}
            </ButtonComponent>
            <ButtonComponent
              cssClass="e-danger"
              data-testid={TestIds.TOAST_ERROR_BTN}
              onClick={handleErrorToast}
            >
              {FM('components.syncfusionToasts.errorBtn')}
            </ButtonComponent>
            <ButtonComponent
              cssClass="e-info"
              data-testid={TestIds.TOAST_INFO_BTN}
              onClick={handleInfoToast}
            >
              {FM('components.syncfusionToasts.infoBtn')}
            </ButtonComponent>
          </div>
        </div>

        {/* Static Messages */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.messages')}</h4>
          <div className="space-y-3">
            <MessageComponent
              showCloseIcon
              data-testid={TestIds.MESSAGE_SUCCESS}
              severity="Success"
            >
              {FM('components.syncfusionMessages.success')}
            </MessageComponent>
            <MessageComponent
              showCloseIcon
              data-testid={TestIds.MESSAGE_WARNING}
              severity="Warning"
            >
              {FM('components.syncfusionMessages.warning')}
            </MessageComponent>
            <MessageComponent
              showCloseIcon
              data-testid={TestIds.MESSAGE_ERROR}
              severity="Error"
            >
              {FM('components.syncfusionMessages.error')}
            </MessageComponent>
            <MessageComponent
              showCloseIcon
              data-testid={TestIds.MESSAGE_INFO}
              severity="Info"
            >
              {FM('components.syncfusionMessages.info')}
            </MessageComponent>
            <MessageComponent data-testid={TestIds.MESSAGE_NORMAL} severity="Normal">
              {FM('components.syncfusionMessages.normal')}
            </MessageComponent>
          </div>
        </div>
      </div>

      {/* Toast container - positioned top-right */}
      <ToastComponent
        ref={toastRef}
        showCloseButton
        showProgressBar
        position={{ X: 'Right', Y: 'Top' }}
        timeOut={TOAST_TIMEOUT_MS}
      />
    </section>
  );
};
