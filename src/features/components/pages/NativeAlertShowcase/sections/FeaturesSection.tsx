/**
 * FeaturesSection - Demonstrates native alert features:
 * Dismissible, no icon, with title, with children content, and long content.
 */
import { memo } from 'react';

import { AlertNative, AlertSeverity } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const FeaturesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.alertShowcase.sections.features')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.alertShowcase.sections.featuresDesc')}
      </p>
    </div>
    <div className="space-y-3">
      <AlertNative
        dismissible
        severity={AlertSeverity.Info}
        testId="showcase-native-alert-dismissible"
        title={FM('components.alertShowcase.dismissibleWithTitle')}
      >
        {FM('components.alertShowcase.dismissibleWithTitleMessage')}
      </AlertNative>
      <AlertNative
        severity={AlertSeverity.Success}
        showIcon={false}
        testId="showcase-native-alert-no-icon"
      >
        {FM('components.alertShowcase.noIconMessage')}
      </AlertNative>
      <AlertNative
        severity={AlertSeverity.Warning}
        testId="showcase-native-alert-children"
        title={FM('components.alertShowcase.withChildrenTitle')}
      >
        <div className="space-y-1">
          <p>{FM('components.alertShowcase.withChildrenMessage')}</p>
          <p className="text-sm opacity-80">
            {FM('components.alertShowcase.withChildrenDetail')}
          </p>
        </div>
      </AlertNative>
      <AlertNative
        severity={AlertSeverity.Error}
        testId="showcase-native-alert-long"
        title={FM('components.alertShowcase.longContentTitle')}
      >
        {FM('components.alertShowcase.longContentMessage')}
      </AlertNative>
    </div>
  </section>
));

FeaturesSection.displayName = 'FeaturesSection';
