/**
 * SizesSection - Demonstrates all ButtonNative size presets.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant, ButtonSize } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const SizesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.sizes')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.sizesDesc')}
      </p>
    </div>
    <div className="flex flex-wrap items-center gap-4">
      <ButtonNative size={ButtonSize.Sm} testId="native-btn-showcase-sm" variant={ButtonVariant.Primary}>
        {FM('components.buttons.small')}
      </ButtonNative>
      <ButtonNative size={ButtonSize.Md} testId="native-btn-showcase-md" variant={ButtonVariant.Primary}>
        {FM('components.buttons.medium')}
      </ButtonNative>
      <ButtonNative size={ButtonSize.Lg} testId="native-btn-showcase-lg" variant={ButtonVariant.Primary}>
        {FM('components.buttons.large')}
      </ButtonNative>
    </div>
    <div className="flex flex-wrap items-center gap-4">
      <ButtonNative size={ButtonSize.Sm} testId="native-btn-showcase-outline-sm" variant={ButtonVariant.Outline}>
        {FM('components.buttons.small')}
      </ButtonNative>
      <ButtonNative size={ButtonSize.Md} testId="native-btn-showcase-outline-md" variant={ButtonVariant.Outline}>
        {FM('components.buttons.medium')}
      </ButtonNative>
      <ButtonNative size={ButtonSize.Lg} testId="native-btn-showcase-outline-lg" variant={ButtonVariant.Outline}>
        {FM('components.buttons.large')}
      </ButtonNative>
    </div>
    <CopyableCodeSnippet code="<ButtonNative size={ButtonSize.Sm} variant={ButtonVariant.Primary}>Label</ButtonNative>" />
  </section>
));

SizesSection.displayName = 'SizesSection';
