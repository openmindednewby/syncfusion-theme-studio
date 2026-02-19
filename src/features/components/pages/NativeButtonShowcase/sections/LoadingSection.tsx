/**
 * LoadingSection - Demonstrates ButtonNative loading state with spinner animation.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

export const LoadingSection = memo((): JSX.Element => (
  <section className="card space-y-4" data-testid={TestIds.NATIVE_LOADING_SECTION}>
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.loading')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.loadingDesc')}
      </p>
    </div>

    {/* All variants in loading state */}
    <div className="flex flex-wrap gap-4">
      <ButtonNative loading testId="native-btn-loading-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </ButtonNative>
      <ButtonNative loading testId="native-btn-loading-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.secondary')}
      </ButtonNative>
      <ButtonNative loading testId="native-btn-loading-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.outline')}
      </ButtonNative>
      <ButtonNative loading testId="native-btn-loading-ghost" variant={ButtonVariant.Ghost}>
        {FM('components.buttons.ghost')}
      </ButtonNative>
      <ButtonNative loading testId="native-btn-loading-danger" variant={ButtonVariant.Danger}>
        {FM('components.buttons.danger')}
      </ButtonNative>
    </div>

    {/* Loading vs non-loading comparison */}
    <div className="flex flex-wrap items-center gap-4">
      <ButtonNative loading testId="native-btn-loading-compare" variant={ButtonVariant.Primary}>
        {FM('components.buttonShowcase.loading')}
      </ButtonNative>
      <ButtonNative testId="native-btn-not-loading-compare" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </ButtonNative>
    </div>
    <CopyableCodeSnippet code="<ButtonNative loading variant={ButtonVariant.Primary}>Loading</ButtonNative>" />
  </section>
));

LoadingSection.displayName = 'LoadingSection';
