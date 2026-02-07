import { FM } from '@/localization/helpers';

const DashboardPage = (): JSX.Element => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-text-primary">{FM('dashboard.title')}</h2>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Stats cards */}
      <div className="card">
        <p className="text-sm text-text-secondary">{FM('dashboard.stats.totalUsers')}</p>
        <p className="mt-1 text-2xl font-bold text-text-primary">1,234</p>
      </div>
      <div className="card">
        <p className="text-sm text-text-secondary">{FM('dashboard.stats.activeSessions')}</p>
        <p className="mt-1 text-2xl font-bold text-text-primary">567</p>
      </div>
      <div className="card">
        <p className="text-sm text-text-secondary">{FM('dashboard.stats.revenue')}</p>
        <p className="mt-1 text-2xl font-bold text-text-primary">$12,345</p>
      </div>
      <div className="card">
        <p className="text-sm text-text-secondary">{FM('dashboard.stats.growth')}</p>
        <p className="mt-1 text-2xl font-bold text-success-500">+12.5%</p>
      </div>
    </div>

    <div className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">{FM('dashboard.welcome')}</h3>
      <p className="text-text-secondary">{FM('dashboard.welcomeDescription')}</p>
    </div>
  </div>
);

export default DashboardPage;
