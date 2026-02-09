import { memo } from 'react';

import { ButtonNative } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeButtonsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeButtons')}
    </h3>
    <div className="flex flex-wrap gap-4">
      <ButtonNative testId="native-btn-primary" variant="primary">
        {FM('components.buttons.primary')}
      </ButtonNative>
      <ButtonNative testId="native-btn-secondary" variant="secondary">
        {FM('components.buttons.secondary')}
      </ButtonNative>
      <ButtonNative testId="native-btn-outline" variant="outline">
        {FM('components.buttons.outline')}
      </ButtonNative>
      <ButtonNative testId="native-btn-ghost" variant="ghost">
        {FM('components.buttons.ghost')}
      </ButtonNative>
      <ButtonNative testId="native-btn-danger" variant="danger">
        {FM('components.buttons.danger')}
      </ButtonNative>
      <ButtonNative disabled testId="native-btn-disabled" variant="primary">
        {FM('components.buttons.disabled')}
      </ButtonNative>
    </div>
    <div className="mt-4 flex flex-wrap gap-4">
      <ButtonNative size="sm" testId="native-btn-sm" variant="primary">
        {FM('components.buttons.small')}
      </ButtonNative>
      <ButtonNative size="md" testId="native-btn-md" variant="primary">
        {FM('components.buttons.medium')}
      </ButtonNative>
      <ButtonNative size="lg" testId="native-btn-lg" variant="primary">
        {FM('components.buttons.large')}
      </ButtonNative>
    </div>
  </section>
));

NativeButtonsSection.displayName = 'NativeButtonsSection';
