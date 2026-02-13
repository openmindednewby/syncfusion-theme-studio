/**
 * VariantsSection - Demonstrates static Syncfusion Toast previews
 * for success, warning, error, and info variants using CSS classes.
 */
import { memo, useMemo } from 'react';

import { ToastComponent } from '@syncfusion/ej2-react-notifications';

import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';

/** Syncfusion Toast CSS class names for each variant */
const TOAST_SUCCESS = 'e-toast-success';
const TOAST_WARNING = 'e-toast-warning';
const TOAST_DANGER = 'e-toast-danger';
const TOAST_INFO = 'e-toast-info';

/** Toast timeout set to zero to keep previews static */
const STATIC_TIMEOUT = 0;

export const VariantsSection = memo((): JSX.Element => {
  const { mode } = useThemeStore();

  const cssClass = useMemo(() => {
    const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
    return cn('sf-toast', modeClass);
  }, [mode]);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.toastShowcase.sections.variants')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.toastShowcase.sections.variantsDesc')}
        </p>
      </div>
      <div className="space-y-3">
        <ToastComponent
          cssClass={cn(cssClass, TOAST_SUCCESS)}
          newestOnTop={false}
          timeOut={STATIC_TIMEOUT}
          title={FM('components.syncfusionToasts.successTitle')}
        >
          {FM('components.syncfusionToasts.successMessage')}
        </ToastComponent>
        <ToastComponent
          cssClass={cn(cssClass, TOAST_WARNING)}
          newestOnTop={false}
          timeOut={STATIC_TIMEOUT}
          title={FM('components.syncfusionToasts.warningTitle')}
        >
          {FM('components.syncfusionToasts.warningMessage')}
        </ToastComponent>
        <ToastComponent
          cssClass={cn(cssClass, TOAST_DANGER)}
          newestOnTop={false}
          timeOut={STATIC_TIMEOUT}
          title={FM('components.syncfusionToasts.errorTitle')}
        >
          {FM('components.syncfusionToasts.errorMessage')}
        </ToastComponent>
        <ToastComponent
          cssClass={cn(cssClass, TOAST_INFO)}
          newestOnTop={false}
          timeOut={STATIC_TIMEOUT}
          title={FM('components.syncfusionToasts.infoTitle')}
        >
          {FM('components.syncfusionToasts.infoMessage')}
        </ToastComponent>
      </div>
    </section>
  );
});

VariantsSection.displayName = 'VariantsSection';
