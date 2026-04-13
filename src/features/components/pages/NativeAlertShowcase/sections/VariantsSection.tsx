/**
 * VariantsSection - Demonstrates all native alert severity styles:
 * Success, Warning, Error, and Info.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { AlertNative, AlertSeverity } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const VariantsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.alertShowcase.sections.variants')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.alertShowcase.sections.variantsDesc')}
      </p>
    </div>
    <div className="space-y-3">
      <AlertNative
        severity={AlertSeverity.Success}
        testId="showcase-native-alert-success"
        title={FM('components.alerts.nativeSuccessTitle')}
      >
        {FM('components.alerts.nativeSuccessMessage')}
      </AlertNative>
      <AlertNative
        severity={AlertSeverity.Warning}
        testId="showcase-native-alert-warning"
        title={FM('components.alerts.nativeWarningTitle')}
      >
        {FM('components.alerts.nativeWarningMessage')}
      </AlertNative>
      <AlertNative
        severity={AlertSeverity.Error}
        testId="showcase-native-alert-error"
        title={FM('components.alerts.nativeErrorTitle')}
      >
        {FM('components.alerts.nativeErrorMessage')}
      </AlertNative>
      <AlertNative
        severity={AlertSeverity.Info}
        testId="showcase-native-alert-info"
        title={FM('components.alerts.nativeInfoTitle')}
      >
        {FM('components.alerts.nativeInfoMessage')}
      </AlertNative>
    </div>
    <CopyableCodeSnippet code='<AlertNative severity={AlertSeverity.Success} title="Title">Message</AlertNative>' />
  </section>
));

VariantsSection.displayName = 'VariantsSection';
