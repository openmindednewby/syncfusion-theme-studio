export default function DashboardPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats cards */}
        <div className="card">
          <p className="text-sm text-text-secondary">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">1,234</p>
        </div>
        <div className="card">
          <p className="text-sm text-text-secondary">Active Sessions</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">567</p>
        </div>
        <div className="card">
          <p className="text-sm text-text-secondary">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">$12,345</p>
        </div>
        <div className="card">
          <p className="text-sm text-text-secondary">Growth</p>
          <p className="mt-1 text-2xl font-bold text-success-500">+12.5%</p>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Welcome to Theme Studio</h3>
        <p className="text-text-secondary">
          This is a customizable admin portal template built with React, Vite, Tailwind CSS, and
          Syncfusion components. Use the Theme Editor to customize colors, typography, and more.
        </p>
      </div>
    </div>
  );
}
