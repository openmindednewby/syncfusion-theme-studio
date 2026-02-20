/**
 * SizesSection - Demonstrates all Syncfusion Button size presets.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { Button, ButtonVariant, ButtonSize } from '@/components/ui/syncfusion';
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
      <Button size={ButtonSize.Sm} testId="sf-btn-showcase-sm" variant={ButtonVariant.Primary}>
        {FM('components.buttons.small')}
      </Button>
      <Button size={ButtonSize.Md} testId="sf-btn-showcase-md" variant={ButtonVariant.Primary}>
        {FM('components.buttons.medium')}
      </Button>
      <Button size={ButtonSize.Lg} testId="sf-btn-showcase-lg" variant={ButtonVariant.Primary}>
        {FM('components.buttons.large')}
      </Button>
    </div>
    <div className="flex flex-wrap items-center gap-4">
      <Button size={ButtonSize.Sm} testId="sf-btn-showcase-outline-sm" variant={ButtonVariant.Outline}>
        {FM('components.buttons.small')}
      </Button>
      <Button size={ButtonSize.Md} testId="sf-btn-showcase-outline-md" variant={ButtonVariant.Outline}>
        {FM('components.buttons.medium')}
      </Button>
      <Button size={ButtonSize.Lg} testId="sf-btn-showcase-outline-lg" variant={ButtonVariant.Outline}>
        {FM('components.buttons.large')}
      </Button>
    </div>
    <CopyableCodeSnippet code='<Button size={ButtonSize.Lg} variant={ButtonVariant.Primary}>Label</Button>' />
  </section>
));

SizesSection.displayName = 'SizesSection';
