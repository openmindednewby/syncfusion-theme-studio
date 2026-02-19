/**
 * TextSection - Demonstrates Syncfusion Message/Alert with text (minimal)
 * variant across all severities: Success, Warning, Error, Info.
 */
import { memo, useEffect, useMemo } from 'react';

import { MessageComponent } from '@syncfusion/ej2-react-notifications';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';
import { cn } from '@/utils/cn';

/** Syncfusion MessageComponent severity string values */
const SEVERITY_SUCCESS = 'Success';
const SEVERITY_WARNING = 'Warning';
const SEVERITY_ERROR = 'Error';
const SEVERITY_INFO = 'Info';

/** Syncfusion MessageComponent variant string value */
const VARIANT_TEXT = 'Text';

export const TextSection = memo((): JSX.Element => {
  const { mode } = useThemeStore();

  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Notifications).catch(() => {});
  }, []);

  const cssClass = useMemo(() => {
    const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
    return cn('sf-alert', modeClass);
  }, [mode]);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.alertShowcase.sections.text')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.alertShowcase.sections.textDesc')}
        </p>
      </div>
      <div className="space-y-3">
        <MessageComponent
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_SUCCESS}
          variant={VARIANT_TEXT}
        >
          {FM('components.alerts.successMessage')}
        </MessageComponent>
        <MessageComponent
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_WARNING}
          variant={VARIANT_TEXT}
        >
          {FM('components.alerts.warningMessage')}
        </MessageComponent>
        <MessageComponent
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_ERROR}
          variant={VARIANT_TEXT}
        >
          {FM('components.alerts.errorMessage')}
        </MessageComponent>
        <MessageComponent
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_INFO}
          variant={VARIANT_TEXT}
        >
          {FM('components.alerts.infoMessage')}
        </MessageComponent>
      </div>
      <CopyableCodeSnippet code='<MessageComponent showIcon severity="Error" variant="Text">Message text</MessageComponent>' />
    </section>
  );
});

TextSection.displayName = 'TextSection';
