/**
 * StatesSection - Demonstrates disabled, loading, icons, and full-width states.
 */
import { memo } from 'react';

import { StarIcon, ArrowIcon } from '@/components/icons';
import { Button, ButtonVariant, ButtonSize } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

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
