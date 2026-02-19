/**
 * VariantsSection - Demonstrates all ButtonNative variant styles.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const VariantsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.variants')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.variantsDesc')}
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
      <ButtonNative testId="native-btn-showcase-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </ButtonNative>
      <ButtonNative testId="native-btn-showcase-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.secondary')}
      </ButtonNative>
      <ButtonNative testId="native-btn-showcase-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.outline')}
      </ButtonNative>
      <ButtonNative testId="native-btn-showcase-ghost" variant={ButtonVariant.Ghost}>
        {FM('components.buttons.ghost')}
      </ButtonNative>
      <ButtonNative testId="native-btn-showcase-danger" variant={ButtonVariant.Danger}>
        {FM('components.buttons.danger')}
      </ButtonNative>
    </div>
    <CopyableCodeSnippet code="<ButtonNative variant={ButtonVariant.Primary}>Label</ButtonNative>" />
  </section>
));

VariantsSection.displayName = 'VariantsSection';
