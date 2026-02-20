/**
 * VariantsSection - Demonstrates all Syncfusion Button variant styles.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { Button, ButtonVariant } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

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
      <Button testId="sf-btn-showcase-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </Button>
      <Button testId="sf-btn-showcase-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.secondary')}
      </Button>
      <Button testId="sf-btn-showcase-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.outline')}
      </Button>
      <Button testId="sf-btn-showcase-ghost" variant={ButtonVariant.Ghost}>
        {FM('components.buttons.ghost')}
      </Button>
      <Button testId="sf-btn-showcase-danger" variant={ButtonVariant.Danger}>
        {FM('components.buttons.danger')}
      </Button>
    </div>
    <CopyableCodeSnippet code='<Button variant={ButtonVariant.Primary}>Label</Button>' />
  </section>
));

VariantsSection.displayName = 'VariantsSection';
