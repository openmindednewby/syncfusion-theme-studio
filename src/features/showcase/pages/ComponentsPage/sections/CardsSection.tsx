import { memo } from 'react';

export const CardsSection = memo((): JSX.Element => (
  <>
    {/* Badges */}
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">Badges</h3>
      <div className="flex flex-wrap gap-4">
        <span className="badge badge-success">Success</span>
        <span className="badge badge-warning">Warning</span>
        <span className="badge badge-error">Error</span>
        <span className="badge badge-info">Info</span>
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
      <h3 className="mb-4 text-lg font-semibold text-text-primary">Cards</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h4 className="font-medium text-text-primary">Default Card</h4>
          <p className="mt-1 text-sm text-text-secondary">
            This is a default card with surface background.
          </p>
        </div>
        <div className="card card-elevated">
          <h4 className="font-medium text-text-primary">Elevated Card</h4>
          <p className="mt-1 text-sm text-text-secondary">
            This card has a subtle shadow for elevation.
          </p>
        </div>
      </div>
    </section>
  </>
));

CardsSection.displayName = 'CardsSection';
