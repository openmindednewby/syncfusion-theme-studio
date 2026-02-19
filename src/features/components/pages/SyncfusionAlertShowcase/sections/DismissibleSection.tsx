/**
 * DismissibleSection - Demonstrates Syncfusion Message/Alert with showCloseIcon
 * across filled, outlined, and text variants.
 */
import { memo, useEffect, useMemo } from 'react';

import { MessageComponent } from '@syncfusion/ej2-react-notifications';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';
import { cn } from '@/utils/cn';

/** Syncfusion MessageComponent severity string value */
const SEVERITY_INFO = 'Info';

/** Syncfusion MessageComponent variant string values */
const VARIANT_FILLED = 'Filled';
const VARIANT_OUTLINED = 'Outlined';
const VARIANT_TEXT = 'Text';

export const DismissibleSection = memo((): JSX.Element => {
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
          {FM('components.alertShowcase.sections.dismissible')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.alertShowcase.sections.dismissibleDesc')}
        </p>
      </div>
      <div className="space-y-3">
        <MessageComponent
          showCloseIcon
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_INFO}
          variant={VARIANT_FILLED}
        >
          {FM('components.alertShowcase.sfDismissibleFilled')}
        </MessageComponent>
        <MessageComponent
          showCloseIcon
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_INFO}
          variant={VARIANT_OUTLINED}
        >
          {FM('components.alertShowcase.sfDismissibleOutlined')}
        </MessageComponent>
        <MessageComponent
          showCloseIcon
          showIcon
          cssClass={cssClass}
          severity={SEVERITY_INFO}
          variant={VARIANT_TEXT}
        >
          {FM('components.alertShowcase.sfDismissibleText')}
        </MessageComponent>
      </div>
      <CopyableCodeSnippet code='<MessageComponent showCloseIcon showIcon severity="Info" variant="Filled">Dismissible alert</MessageComponent>' />
    </section>
  );
});

DismissibleSection.displayName = 'DismissibleSection';
