/**
 * InteractiveSection - Buttons that trigger Syncfusion Toast notifications
 * programmatically using ToastComponent ref and show() method.
 */
import { memo, useCallback, useRef, useMemo } from 'react';

import { ToastComponent } from '@syncfusion/ej2-react-notifications';

import { Button, ButtonVariant } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';

/** Toast auto-dismiss timeout in milliseconds */
const TOAST_TIMEOUT_MS = 5000;

/** Syncfusion Toast CSS class names for each variant */
const TOAST_SUCCESS = 'e-toast-success';
const TOAST_WARNING = 'e-toast-warning';
const TOAST_DANGER = 'e-toast-danger';
const TOAST_INFO = 'e-toast-info';

export const InteractiveSection = memo((): JSX.Element => {
  const toastRef = useRef<ToastComponent>(null);
  const { mode } = useThemeStore();

  const cssClass = useMemo(() => {
    const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
    return cn('sf-toast', modeClass);
  }, [mode]);

  const showToast = useCallback(
    (toastCss: string, title: string, content: string) => {
      toastRef.current?.show({ title, content, cssClass: cn(cssClass, toastCss) });
    },
    [cssClass],
  );

  const handleSuccess = useCallback(() => {
    showToast(TOAST_SUCCESS, FM('components.syncfusionToasts.successTitle'), FM('components.syncfusionToasts.successMessage'));
  }, [showToast]);

  const handleWarning = useCallback(() => {
    showToast(TOAST_WARNING, FM('components.syncfusionToasts.warningTitle'), FM('components.syncfusionToasts.warningMessage'));
  }, [showToast]);

  const handleError = useCallback(() => {
    showToast(TOAST_DANGER, FM('components.syncfusionToasts.errorTitle'), FM('components.syncfusionToasts.errorMessage'));
  }, [showToast]);

  const handleInfo = useCallback(() => {
    showToast(TOAST_INFO, FM('components.syncfusionToasts.infoTitle'), FM('components.syncfusionToasts.infoMessage'));
  }, [showToast]);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toastShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toastShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          testId="sf-toast-showcase-success-btn"
          variant={ButtonVariant.Primary}
          onClick={handleSuccess}
        >
          {FM('components.syncfusionToasts.successBtn')}
        </Button>
        <Button
          testId="sf-toast-showcase-warning-btn"
          variant={ButtonVariant.Outline}
          onClick={handleWarning}
        >
          {FM('components.syncfusionToasts.warningBtn')}
        </Button>
        <Button
          testId="sf-toast-showcase-error-btn"
          variant={ButtonVariant.Danger}
          onClick={handleError}
        >
          {FM('components.syncfusionToasts.errorBtn')}
        </Button>
        <Button
          testId="sf-toast-showcase-info-btn"
          variant={ButtonVariant.Secondary}
          onClick={handleInfo}
        >
          {FM('components.syncfusionToasts.infoBtn')}
        </Button>
      </div>

      <ToastComponent
        ref={toastRef}
        showCloseButton
        showProgressBar
        cssClass={cssClass}
        position={{ X: 'Right', Y: 'Top' }}
        timeOut={TOAST_TIMEOUT_MS}
      />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
