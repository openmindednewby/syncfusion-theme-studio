import { memo } from 'react';

import { Button } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

export const ButtonsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">
      {FM('components.sections.buttons')}
    </h3>
    <div className="flex flex-wrap gap-4">
      <Button testId="btn-primary" variant="primary">
        {FM('components.buttons.primary')}
      </Button>
      <Button testId="btn-secondary" variant="secondary">
        {FM('components.buttons.secondary')}
      </Button>
      <Button testId="btn-outline" variant="outline">
        {FM('components.buttons.outline')}
      </Button>
      <Button testId="btn-ghost" variant="ghost">
        {FM('components.buttons.ghost')}
      </Button>
      <Button testId="btn-danger" variant="danger">
        {FM('components.buttons.danger')}
      </Button>
      <Button disabled testId="btn-disabled" variant="primary">
        {FM('components.buttons.disabled')}
      </Button>
    </div>
    <div className="mt-4 flex flex-wrap gap-4">
      <Button size="sm" testId="btn-sm" variant="primary">
        {FM('components.buttons.small')}
      </Button>
      <Button size="md" testId="btn-md" variant="primary">
        {FM('components.buttons.medium')}
      </Button>
      <Button size="lg" testId="btn-lg" variant="primary">
        {FM('components.buttons.large')}
      </Button>
    </div>

    {/* Native HTML Buttons (for comparison) */}
    <h4 className="mb-2 mt-6 font-medium text-text-primary">Native Buttons (CSS Classes)</h4>
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
