import { memo } from 'react';

import { AlertNative, AlertVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeAlertsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeAlerts')}
    </h3>
    <div className="space-y-3">
      <AlertNative testId="native-alert-success" title={FM('components.alerts.nativeSuccessTitle')} variant={AlertVariant.Success}>
        {FM('components.alerts.nativeSuccessMessage')}
      </AlertNative>
      <AlertNative testId="native-alert-warning" title={FM('components.alerts.nativeWarningTitle')} variant={AlertVariant.Warning}>
        {FM('components.alerts.nativeWarningMessage')}
      </AlertNative>
      <AlertNative testId="native-alert-error" title={FM('components.alerts.nativeErrorTitle')} variant={AlertVariant.Error}>
        {FM('components.alerts.nativeErrorMessage')}
      </AlertNative>
      <AlertNative testId="native-alert-info" title={FM('components.alerts.nativeInfoTitle')} variant={AlertVariant.Info}>
        {FM('components.alerts.nativeInfoMessage')}
      </AlertNative>
      <AlertNative dismissible testId="native-alert-dismissible" variant={AlertVariant.Info}>
        {FM('components.alerts.nativeDismissibleMessage')}
      </AlertNative>
      <AlertNative showIcon={false} testId="native-alert-no-icon" variant={AlertVariant.Success}>
        {FM('components.alerts.nativeNoIconMessage')}
      </AlertNative>
    </div>
  </section>
));

NativeAlertsSection.displayName = 'NativeAlertsSection';
