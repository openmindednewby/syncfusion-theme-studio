/**
 * VariantsSection demonstrates all four toast severity styles:
 * Success, Warning, Error, and Info with trigger buttons.
 */
import { memo, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant, useToast, ToastSeverity } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const VariantsSection = memo((): JSX.Element => {
  const { addToast } = useToast();

  const handleSuccess = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Success,
      title: FM('components.nativeToasts.success'),
      message: FM('components.nativeToasts.successMessage'),
    });
  }, [addToast]);

  const handleWarning = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Warning,
      title: FM('components.nativeToasts.warning'),
      message: FM('components.nativeToasts.warningMessage'),
    });
  }, [addToast]);

  const handleError = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Error,
      title: FM('components.nativeToasts.error'),
      message: FM('components.nativeToasts.errorMessage'),
    });
  }, [addToast]);

  const handleInfo = useCallback((): void => {
    addToast({
      severity: ToastSeverity.Info,
      title: FM('components.nativeToasts.info'),
      message: FM('components.nativeToasts.infoMessage'),
    });
  }, [addToast]);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_TOAST_VARIANTS_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toastShowcase.sections.variants')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toastShowcase.sections.variantsDesc')}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <ButtonNative
          testId="native-toast-showcase-success-btn"
          variant={ButtonVariant.Primary}
          onClick={handleSuccess}
        >
          {FM('components.nativeToasts.success')}
        </ButtonNative>
        <ButtonNative
          testId="native-toast-showcase-warning-btn"
          variant={ButtonVariant.Outline}
          onClick={handleWarning}
        >
          {FM('components.nativeToasts.warning')}
        </ButtonNative>
        <ButtonNative
          testId="native-toast-showcase-error-btn"
          variant={ButtonVariant.Danger}
          onClick={handleError}
        >
          {FM('components.nativeToasts.error')}
        </ButtonNative>
        <ButtonNative
          testId="native-toast-showcase-info-btn"
          variant={ButtonVariant.Secondary}
          onClick={handleInfo}
        >
          {FM('components.nativeToasts.info')}
        </ButtonNative>
      </div>
      <CopyableCodeSnippet code={'addToast({\n  severity: ToastSeverity.Success,\n  title: "Success",\n  message: "Operation completed successfully",\n});'} />
    </section>
  );
});

VariantsSection.displayName = 'VariantsSection';
