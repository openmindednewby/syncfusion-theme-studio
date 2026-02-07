import { memo } from 'react';

import { Button } from '@/components/ui';

export const ButtonsSection = memo((): JSX.Element => (
  <section className="card">
    <h3 className="mb-4 text-lg font-semibold text-text-primary">Syncfusion Buttons</h3>
    <div className="flex flex-wrap gap-4">
      <Button testId="btn-primary" variant="primary">
        Primary
      </Button>
      <Button testId="btn-secondary" variant="secondary">
        Secondary
      </Button>
      <Button testId="btn-outline" variant="outline">
        Outline
      </Button>
      <Button testId="btn-ghost" variant="ghost">
        Ghost
      </Button>
      <Button testId="btn-danger" variant="danger">
        Danger
      </Button>
      <Button disabled testId="btn-disabled" variant="primary">
        Disabled
      </Button>
    </div>
    <div className="mt-4 flex flex-wrap gap-4">
      <Button size="sm" testId="btn-sm" variant="primary">
        Small
      </Button>
      <Button size="md" testId="btn-md" variant="primary">
        Medium
      </Button>
      <Button size="lg" testId="btn-lg" variant="primary">
        Large
      </Button>
    </div>

    {/* Native HTML Buttons (for comparison) */}
    <h4 className="mb-2 mt-6 font-medium text-text-primary">Native Buttons (CSS Classes)</h4>
    <div className="flex flex-wrap gap-4">
      <button className="btn btn-primary" type="button">
        Primary
      </button>
      <button className="btn btn-secondary" type="button">
        Secondary
      </button>
      <button disabled className="btn btn-primary" type="button">
        Disabled
      </button>
    </div>
  </section>
));

ButtonsSection.displayName = 'ButtonsSection';
