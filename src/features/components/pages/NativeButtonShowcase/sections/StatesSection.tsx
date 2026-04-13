/**
 * StatesSection - Demonstrates disabled and full-width button states.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant, ButtonSize } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

export const StatesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.states')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.statesDesc')}
      </p>
    </div>

    {/* Disabled variants */}
    <div className="flex flex-wrap gap-4">
      <ButtonNative disabled testId="native-btn-showcase-disabled-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.disabled')}
      </ButtonNative>
      <ButtonNative disabled testId="native-btn-showcase-disabled-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.disabled')}
      </ButtonNative>
      <ButtonNative disabled testId="native-btn-showcase-disabled-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.disabled')}
      </ButtonNative>
      <ButtonNative disabled testId="native-btn-showcase-disabled-ghost" variant={ButtonVariant.Ghost}>
        {FM('components.buttons.disabled')}
      </ButtonNative>
      <ButtonNative disabled testId="native-btn-showcase-disabled-danger" variant={ButtonVariant.Danger}>
        {FM('components.buttons.disabled')}
      </ButtonNative>
    </div>

    {/* Full-width buttons */}
    <h4 className="font-medium text-text-primary">
      {FM('components.buttonShowcase.sections.fullWidth')}
    </h4>
    <p className="text-sm text-text-secondary">
      {FM('components.buttonShowcase.sections.fullWidthDesc')}
    </p>
    <div className="flex max-w-md flex-col gap-3">
      <ButtonNative fullWidth testId="native-btn-showcase-full-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </ButtonNative>
      <ButtonNative
        fullWidth
        size={ButtonSize.Lg}
        testId="native-btn-showcase-full-outline"
        variant={ButtonVariant.Outline}
      >
        {FM('components.buttons.outline')}
      </ButtonNative>
    </div>
    <CopyableCodeSnippet code="<ButtonNative disabled variant={ButtonVariant.Primary}>Disabled</ButtonNative>" />
  </section>
));

StatesSection.displayName = 'StatesSection';
