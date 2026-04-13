import { memo, useCallback } from 'react';

import { ButtonNative, ButtonVariant, useToast, ToastSeverity } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const SEVERITY_ICONS = {
  success: '\u2713',
  warning: '\u26A0',
  error: '\u2717',
  info: '\u2139',
} as const;

const BULLET_ICON = '\u2022';

export const NativeNotificationsSection = memo((): JSX.Element => {
  const { addToast } = useToast();

  const handleSuccess = useCallback((): void => {
    addToast({ severity: ToastSeverity.Success, title: FM('components.nativeToasts.success'), message: FM('components.nativeToasts.successMessage') });
  }, [addToast]);

  const handleWarning = useCallback((): void => {
    addToast({ severity: ToastSeverity.Warning, title: FM('components.nativeToasts.warning'), message: FM('components.nativeToasts.warningMessage') });
  }, [addToast]);

  const handleError = useCallback((): void => {
    addToast({ severity: ToastSeverity.Error, title: FM('components.nativeToasts.error'), message: FM('components.nativeToasts.errorMessage') });
  }, [addToast]);

  const handleInfo = useCallback((): void => {
    addToast({ severity: ToastSeverity.Info, title: FM('components.nativeToasts.info'), message: FM('components.nativeToasts.infoMessage') });
  }, [addToast]);

  return (
    <section className="card" data-testid={TestIds.NATIVE_NOTIFICATIONS_SECTION}>
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeNotifications')}
      </h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Native Toasts */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.toasts')}</h4>
          <div className="flex flex-wrap gap-3">
            <ButtonNative testId="native-toast-success-btn" variant={ButtonVariant.Primary} onClick={handleSuccess}>
              {FM('components.nativeToasts.success')}
            </ButtonNative>
            <ButtonNative testId="native-toast-warning-btn" variant={ButtonVariant.Outline} onClick={handleWarning}>
              {FM('components.nativeToasts.warning')}
            </ButtonNative>
            <ButtonNative testId="native-toast-error-btn" variant={ButtonVariant.Secondary} onClick={handleError}>
              {FM('components.nativeToasts.error')}
            </ButtonNative>
            <ButtonNative testId="native-toast-info-btn" variant={ButtonVariant.Outline} onClick={handleInfo}>
              {FM('components.nativeToasts.info')}
            </ButtonNative>
          </div>
        </div>

        {/* Native Static Messages */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-secondary">{FM('components.messages')}</h4>
          <div className="space-y-3">
            <div className="native-message native-message-success" role="alert">
              <span className="native-message-icon">{SEVERITY_ICONS.success}</span>
              <div className="native-message-content">{FM('components.nativeMessages.success')}</div>
            </div>
            <div className="native-message native-message-warning" role="alert">
              <span className="native-message-icon">{SEVERITY_ICONS.warning}</span>
              <div className="native-message-content">{FM('components.nativeMessages.warning')}</div>
            </div>
            <div className="native-message native-message-error" role="alert">
              <span className="native-message-icon">{SEVERITY_ICONS.error}</span>
              <div className="native-message-content">{FM('components.nativeMessages.error')}</div>
            </div>
            <div className="native-message native-message-info" role="alert">
              <span className="native-message-icon">{SEVERITY_ICONS.info}</span>
              <div className="native-message-content">{FM('components.nativeMessages.info')}</div>
            </div>
            <div className="native-message native-message-normal" role="alert">
              <span className="native-message-icon">{BULLET_ICON}</span>
              <div className="native-message-content">{FM('components.nativeMessages.normal')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

NativeNotificationsSection.displayName = 'NativeNotificationsSection';
