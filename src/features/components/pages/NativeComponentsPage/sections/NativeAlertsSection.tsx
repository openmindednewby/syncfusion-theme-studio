import { memo } from 'react';

import { AlertNative, AlertSeverity } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeAlertsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeAlerts')}
    </h3>
    <div className="space-y-3">
      <AlertNative severity={AlertSeverity.Success} testId="native-alert-success" title={FM('components.alerts.nativeSuccessTitle')}>
        {FM('components.alerts.nativeSuccessMessage')}
      </AlertNative>
      <AlertNative severity={AlertSeverity.Warning} testId="native-alert-warning" title={FM('components.alerts.nativeWarningTitle')}>
        {FM('components.alerts.nativeWarningMessage')}
      </AlertNative>
      <AlertNative severity={AlertSeverity.Error} testId="native-alert-error" title={FM('components.alerts.nativeErrorTitle')}>
        {FM('components.alerts.nativeErrorMessage')}
      </AlertNative>
      <AlertNative severity={AlertSeverity.Info} testId="native-alert-info" title={FM('components.alerts.nativeInfoTitle')}>
        {FM('components.alerts.nativeInfoMessage')}
      </AlertNative>
      <AlertNative dismissible severity={AlertSeverity.Info} testId="native-alert-dismissible">
        {FM('components.alerts.nativeDismissibleMessage')}
      </AlertNative>
      <AlertNative severity={AlertSeverity.Success} showIcon={false} testId="native-alert-no-icon">
        {FM('components.alerts.nativeNoIconMessage')}
      </AlertNative>
    </div>
  </section>
));

NativeAlertsSection.displayName = 'NativeAlertsSection';
