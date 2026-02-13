/**
 * InteractiveSection provides interactive demos for custom toast content,
 * multiple-toast stacking, and auto-dismiss behavior.
 */
import { memo, useCallback } from 'react';

import { ButtonNative, ButtonVariant, useToast, ToastSeverity } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const STACKING_DELAY_MS = 200;
const SECOND_TOAST_DELAY_MS = 400;

export const InteractiveSection = memo((): JSX.Element => {
  const { addToast } = useToast();

  const handleCustomContent = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Info,
      title: FM('components.toastShowcase.sections.customTitle'),
      message: FM('components.toastShowcase.sections.customMessage'),
    });
  }, [addToast]);

  const handleStacking = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Success,
      title: FM('components.nativeToasts.success'),
      message: FM('components.toastShowcase.sections.stackToast1'),
    });
    setTimeout(() => {
      addToast({
        severity: ToastSeverity.Warning,
        title: FM('components.nativeToasts.warning'),
        message: FM('components.toastShowcase.sections.stackToast2'),
      });
    }, STACKING_DELAY_MS);
    setTimeout(() => {
      addToast({
        severity: ToastSeverity.Info,
        title: FM('components.nativeToasts.info'),
        message: FM('components.toastShowcase.sections.stackToast3'),
      });
    }, SECOND_TOAST_DELAY_MS);
  }, [addToast]);

  const handleAutoDismiss = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Info,
      title: FM('components.toastShowcase.sections.autoDismissTitle'),
      message: FM('components.toastShowcase.sections.autoDismissMessage'),
    });
  }, [addToast]);

  return (
    <section className="card space-y-6" data-testid={TestIds.NATIVE_TOAST_INTERACTIVE_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toastShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toastShowcase.sections.interactiveDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Custom Content */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM('components.toastShowcase.sections.customContent')}
          </h4>
          <p className="text-sm text-text-tertiary">
            {FM('components.toastShowcase.sections.customContentDesc')}
          </p>
          <ButtonNative
            testId="native-toast-showcase-custom-btn"
            variant={ButtonVariant.Outline}
            onClick={handleCustomContent}
          >
            {FM('components.toastShowcase.sections.customContent')}
          </ButtonNative>
        </div>

        {/* Stacking */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM('components.toastShowcase.sections.stacking')}
          </h4>
          <p className="text-sm text-text-tertiary">
            {FM('components.toastShowcase.sections.stackingDesc')}
          </p>
          <ButtonNative
            testId="native-toast-showcase-stack-btn"
            variant={ButtonVariant.Primary}
            onClick={handleStacking}
          >
            {FM('components.toastShowcase.sections.stackingButton')}
          </ButtonNative>
        </div>

        {/* Auto-Dismiss */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM('components.toastShowcase.sections.autoDismiss')}
          </h4>
          <p className="text-sm text-text-tertiary">
            {FM('components.toastShowcase.sections.autoDismissDesc')}
          </p>
          <ButtonNative
            testId="native-toast-showcase-autodismiss-btn"
            variant={ButtonVariant.Ghost}
            onClick={handleAutoDismiss}
          >
            {FM('components.toastShowcase.sections.autoDismissButton')}
          </ButtonNative>
        </div>
      </div>
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
