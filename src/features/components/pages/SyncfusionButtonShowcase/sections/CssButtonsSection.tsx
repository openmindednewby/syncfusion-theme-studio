/**
 * CssButtonsSection - Native HTML buttons styled with CSS utility classes.
 */
import { memo } from 'react';

import { FM } from '@/localization/helpers';

export const CssButtonsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.buttonShowcase.sections.cssButtons')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.buttonShowcase.sections.cssButtonsDesc')}
      </p>
    </div>
    <div className="flex flex-wrap gap-4">
      <button className="btn btn-primary" data-testid="sf-btn-showcase-css-primary" type="button">
        {FM('components.buttons.primary')}
      </button>
      <button className="btn btn-secondary" data-testid="sf-btn-showcase-css-secondary" type="button">
        {FM('components.buttons.secondary')}
      </button>
      <button disabled className="btn btn-primary" data-testid="sf-btn-showcase-css-disabled" type="button">
        {FM('components.buttons.disabled')}
      </button>
    </div>
  </section>
));

CssButtonsSection.displayName = 'CssButtonsSection';
