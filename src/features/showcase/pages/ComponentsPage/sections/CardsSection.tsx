import { memo } from 'react';

import { FM } from '@/localization/helpers';

export const CardsSection = memo((): JSX.Element => (
  <>
    {/* Badges */}
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.badges')}
      </h3>
      <div className="flex flex-wrap gap-4">
        <span className="badge badge-success">{FM('components.badges.success')}</span>
        <span className="badge badge-warning">{FM('components.badges.warning')}</span>
        <span className="badge badge-error">{FM('components.badges.error')}</span>
        <span className="badge badge-info">{FM('components.badges.info')}</span>
      </div>
    </section>

    {/* Native Inputs (for comparison) */}
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">Native Inputs (CSS Classes)</h3>
      <div className="max-w-sm space-y-4">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-text-primary"
            htmlFor="demo-input"
          >
            Text Input
          </label>
          <input className="input" id="demo-input" placeholder="Type something..." type="text" />
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium text-text-primary"
            htmlFor="demo-email"
          >
            Email Input
          </label>
          <input className="input" id="demo-email" placeholder="you@example.com" type="email" />
        </div>
      </div>
    </section>

    {/* Cards */}
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.cards')}
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h4 className="font-medium text-text-primary">{FM('components.cards.default')}</h4>
          <p className="mt-1 text-sm text-text-secondary">{FM('components.cards.defaultDesc')}</p>
        </div>
        <div className="card card-elevated">
          <h4 className="font-medium text-text-primary">{FM('components.cards.elevated')}</h4>
          <p className="mt-1 text-sm text-text-secondary">{FM('components.cards.elevatedDesc')}</p>
        </div>
      </div>
    </section>
  </>
));

CardsSection.displayName = 'CardsSection';
