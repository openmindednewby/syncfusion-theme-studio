import { memo, useState } from 'react';

import { ButtonNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

interface NativeToast {
  id: number;
  severity: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}

const SEVERITY_ICONS: Record<NativeToast['severity'], string> = {
  success: '\u2713',
  warning: '\u26A0',
  error: '\u2717',
  info: '\u2139',
};

const CLOSE_ICON = '\u2715';
const BULLET_ICON = '\u2022';

let toastIdCounter = 0;

const ToastItem = memo(({ toast, onDismiss }: { toast: NativeToast; onDismiss: (id: number) => void }): JSX.Element => (
  <div className={`native-toast native-toast-${toast.severity}`} role="alert">
    <span className="native-toast-icon">{SEVERITY_ICONS[toast.severity]}</span>
    <div className="native-toast-content">
      <div className="native-toast-title">{toast.title}</div>
      <div className="native-toast-message">{toast.message}</div>
    </div>
    <button
      aria-label="Dismiss notification"
      className="native-toast-close"
      type="button"
      onClick={() => onDismiss(toast.id)}
    >
      {CLOSE_ICON}
    </button>
  </div>
));

ToastItem.displayName = 'ToastItem';

export const NativeNotificationsSection = memo((): JSX.Element => {
  const [toasts, setToasts] = useState<NativeToast[]>([]);

  const addToast = (severity: NativeToast['severity'], title: string, message: string): void => {
    toastIdCounter += 1;
    const newToast: NativeToast = { id: toastIdCounter, severity, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: number): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSuccess = (): void => {
    addToast('success', FM('components.nativeToasts.success'), FM('components.nativeToasts.successMessage'));
  };

  const handleWarning = (): void => {
    addToast('warning', FM('components.nativeToasts.warning'), FM('components.nativeToasts.warningMessage'));
  };

  const handleError = (): void => {
    addToast('error', FM('components.nativeToasts.error'), FM('components.nativeToasts.errorMessage'));
  };

  const handleInfo = (): void => {
    addToast('info', FM('components.nativeToasts.info'), FM('components.nativeToasts.infoMessage'));
  };

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
            <ButtonNative testId="native-toast-success-btn" variant="primary" onClick={handleSuccess}>
              {FM('components.nativeToasts.success')}
            </ButtonNative>
            <ButtonNative testId="native-toast-warning-btn" variant="outline" onClick={handleWarning}>
              {FM('components.nativeToasts.warning')}
            </ButtonNative>
            <ButtonNative testId="native-toast-error-btn" variant="secondary" onClick={handleError}>
              {FM('components.nativeToasts.error')}
            </ButtonNative>
            <ButtonNative testId="native-toast-info-btn" variant="outline" onClick={handleInfo}>
              {FM('components.nativeToasts.info')}
            </ButtonNative>
          </div>
          {toasts.length > 0 && (
            <div className="mt-4 space-y-2">
              {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
              ))}
            </div>
          )}
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
