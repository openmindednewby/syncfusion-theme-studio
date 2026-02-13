/**
 * StatesSection - Demonstrates disabled, loading, icons, and full-width states.
 */
import { memo } from 'react';

import { Button, ButtonVariant, ButtonSize } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

const StarIcon = (): JSX.Element => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const ArrowIcon = (): JSX.Element => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

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
      <Button disabled testId="sf-btn-showcase-disabled-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.disabled')}
      </Button>
      <Button disabled testId="sf-btn-showcase-disabled-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.disabled')}
      </Button>
      <Button disabled testId="sf-btn-showcase-disabled-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.disabled')}
      </Button>
    </div>

    {/* Loading state */}
    <div className="flex flex-wrap gap-4">
      <Button loading testId="sf-btn-showcase-loading" variant={ButtonVariant.Primary}>
        {FM('components.buttonShowcase.loading')}
      </Button>
      <Button loading testId="sf-btn-showcase-loading-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttonShowcase.loading')}
      </Button>
    </div>

    {/* With icons */}
    <h4 className="font-medium text-text-primary">
      {FM('components.buttonShowcase.withIcons')}
    </h4>
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<StarIcon />} testId="sf-btn-showcase-left-icon" variant={ButtonVariant.Primary}>
        {FM('components.buttonShowcase.withLeftIcon')}
      </Button>
      <Button rightIcon={<ArrowIcon />} testId="sf-btn-showcase-right-icon" variant={ButtonVariant.Outline}>
        {FM('components.buttonShowcase.withRightIcon')}
      </Button>
      <Button
        leftIcon={<StarIcon />}
        rightIcon={<ArrowIcon />}
        testId="sf-btn-showcase-both-icons"
        variant={ButtonVariant.Secondary}
      >
        {FM('components.buttonShowcase.withIcons')}
      </Button>
    </div>

    {/* Full-width buttons */}
    <h4 className="font-medium text-text-primary">
      {FM('components.buttonShowcase.sections.fullWidth')}
    </h4>
    <p className="text-sm text-text-secondary">
      {FM('components.buttonShowcase.sections.fullWidthDesc')}
    </p>
    <div className="flex max-w-md flex-col gap-3">
      <Button fullWidth testId="sf-btn-showcase-full-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </Button>
      <Button
        fullWidth
        size={ButtonSize.Lg}
        testId="sf-btn-showcase-full-outline"
        variant={ButtonVariant.Outline}
      >
        {FM('components.buttons.outline')}
      </Button>
    </div>
  </section>
));

StatesSection.displayName = 'StatesSection';
