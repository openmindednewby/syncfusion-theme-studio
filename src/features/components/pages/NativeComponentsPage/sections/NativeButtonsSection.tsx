import { memo } from 'react';

import { ButtonNative, ButtonVariant, ButtonSize } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const NativeButtonsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.nativeButtons')}
    </h3>
    <div className="flex flex-wrap gap-4">
      <ButtonNative testId="native-btn-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </ButtonNative>
      <ButtonNative testId="native-btn-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.secondary')}
      </ButtonNative>
      <ButtonNative testId="native-btn-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.outline')}
      </ButtonNative>
      <ButtonNative testId="native-btn-ghost" variant={ButtonVariant.Ghost}>
        {FM('components.buttons.ghost')}
      </ButtonNative>
      <ButtonNative testId="native-btn-danger" variant={ButtonVariant.Danger}>
        {FM('components.buttons.danger')}
      </ButtonNative>
      <ButtonNative disabled testId="native-btn-disabled" variant={ButtonVariant.Primary}>
        {FM('components.buttons.disabled')}
      </ButtonNative>
    </div>
    <div className="mt-4 flex flex-wrap gap-4">
      <ButtonNative size={ButtonSize.Sm} testId="native-btn-sm" variant={ButtonVariant.Primary}>
        {FM('components.buttons.small')}
      </ButtonNative>
      <ButtonNative size={ButtonSize.Md} testId="native-btn-md" variant={ButtonVariant.Primary}>
        {FM('components.buttons.medium')}
      </ButtonNative>
      <ButtonNative size={ButtonSize.Lg} testId="native-btn-lg" variant={ButtonVariant.Primary}>
        {FM('components.buttons.large')}
      </ButtonNative>
    </div>
  </section>
));

NativeButtonsSection.displayName = 'NativeButtonsSection';
