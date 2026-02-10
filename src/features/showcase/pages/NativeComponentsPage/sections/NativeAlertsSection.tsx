import { memo } from 'react';

import { AlertNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeAlertsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeAlerts')}
    </h3>
    <div className="space-y-3">
      <AlertNative testId="native-alert-success" title={FM('components.alerts.nativeSuccessTitle')} variant="success">
        {FM('components.alerts.nativeSuccessMessage')}
      </AlertNative>
      <AlertNative testId="native-alert-warning" title={FM('components.alerts.nativeWarningTitle')} variant="warning">
        {FM('components.alerts.nativeWarningMessage')}
      </AlertNative>
      <AlertNative testId="native-alert-error" title={FM('components.alerts.nativeErrorTitle')} variant="error">
        {FM('components.alerts.nativeErrorMessage')}
      </AlertNative>
      <AlertNative testId="native-alert-info" title={FM('components.alerts.nativeInfoTitle')} variant="info">
        {FM('components.alerts.nativeInfoMessage')}
      </AlertNative>
      <AlertNative dismissible testId="native-alert-dismissible" variant="info">
        {FM('components.alerts.nativeDismissibleMessage')}
      </AlertNative>
      <AlertNative showIcon={false} testId="native-alert-no-icon" variant="success">
        {FM('components.alerts.nativeNoIconMessage')}
      </AlertNative>
    </div>
  </section>
));

NativeAlertsSection.displayName = 'NativeAlertsSection';
