export default function ComponentsPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Components</h2>

      {/* Buttons */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <button type="button" className="btn btn-primary">
            Primary
          </button>
          <button type="button" className="btn btn-secondary">
            Secondary
          </button>
          <button type="button" className="btn btn-primary" disabled>
            Disabled
          </button>
        </div>
      </section>

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

      {/* Inputs */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Inputs</h3>
        <div className="max-w-sm space-y-4">
          <div>
            <label htmlFor="demo-input" className="mb-1 block text-sm font-medium text-text-primary">
              Text Input
            </label>
            <input id="demo-input" type="text" className="input" placeholder="Type something..." />
          </div>
          <div>
            <label htmlFor="demo-email" className="mb-1 block text-sm font-medium text-text-primary">
              Email Input
            </label>
            <input
              id="demo-email"
              type="email"
              className="input"
              placeholder="you@example.com"
            />
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

      {/* Colors */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Primary Colors</h3>
        <div className="flex flex-wrap gap-2">
          {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
            <div
              key={shade}
              className={`flex h-12 w-12 items-center justify-center rounded bg-primary-${shade} text-xs font-medium ${
                Number(shade) >= 500 ? 'text-white' : 'text-gray-900'
              }`}
            >
              {shade}
            </div>
          ))}
        </div>
      </section>

      {/* Syncfusion placeholder */}
      <section className="card bg-primary-50">
        <h3 className="mb-2 text-lg font-semibold text-primary-700">Syncfusion Components</h3>
        <p className="text-primary-600">
          After running <code className="rounded bg-primary-100 px-1 py-0.5">npm install</code>,
          Syncfusion components (DataGrid, DatePicker, etc.) will be available here.
        </p>
      </section>
    </div>
  );
}
