import { memo } from 'react';

import { Button, ButtonVariant, ButtonSize } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

export const ButtonsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.buttons')}
    </h3>
    <div className="flex flex-wrap gap-4">
      <Button testId="btn-primary" variant={ButtonVariant.Primary}>
        {FM('components.buttons.primary')}
      </Button>
      <Button testId="btn-secondary" variant={ButtonVariant.Secondary}>
        {FM('components.buttons.secondary')}
      </Button>
      <Button testId="btn-outline" variant={ButtonVariant.Outline}>
        {FM('components.buttons.outline')}
      </Button>
      <Button testId="btn-ghost" variant={ButtonVariant.Ghost}>
        {FM('components.buttons.ghost')}
      </Button>
      <Button testId="btn-danger" variant={ButtonVariant.Danger}>
        {FM('components.buttons.danger')}
      </Button>
      <Button disabled testId="btn-disabled" variant={ButtonVariant.Primary}>
        {FM('components.buttons.disabled')}
      </Button>
    </div>
    <div className="mt-4 flex flex-wrap gap-4">
      <Button size={ButtonSize.Sm} testId="btn-sm" variant={ButtonVariant.Primary}>
        {FM('components.buttons.small')}
      </Button>
      <Button size={ButtonSize.Md} testId="btn-md" variant={ButtonVariant.Primary}>
        {FM('components.buttons.medium')}
      </Button>
      <Button size={ButtonSize.Lg} testId="btn-lg" variant={ButtonVariant.Primary}>
        {FM('components.buttons.large')}
      </Button>
    </div>

    {/* Native HTML Buttons (for comparison) */}
    <h4 className="mb-2 mt-6 font-medium text-text-primary">{FM('components.sections.nativeButtonsCss')}</h4>
    <div className="flex flex-wrap gap-4">
      <button className="btn btn-primary" type="button">
        {FM('components.buttons.primary')}
      </button>
      <button className="btn btn-secondary" type="button">
        {FM('components.buttons.secondary')}
      </button>
      <button disabled className="btn btn-primary" type="button">
        {FM('components.buttons.disabled')}
      </button>
    </div>
  </section>
));

ButtonsSection.displayName = 'ButtonsSection';
