import { useNavigate } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';

import { ActivityItem, ChartPlaceholder, StatCard } from './components';

const DashboardPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const handleExploreComponents = (): void => {
    // navigate may return Promise in React Router v7
    Promise.resolve(navigate('/dashboard/components')).catch(() => undefined);
  };

  return (
    <div className="space-y-6" data-testid={TestIds.DASHBOARD_HEADING}>
      <h2 className="text-2xl font-bold text-text-primary">{FM('dashboard.title')}</h2>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={FM('dashboard.stats.totalUsers')}
          testId="stat-total-users"
          trend={{ value: '12.5%', isPositive: true }}
          value="1,234"
        />
        <StatCard
          label={FM('dashboard.stats.activeSessions')}
          testId="stat-active-sessions"
          trend={{ value: '3.2%', isPositive: true }}
          value="567"
        />
        <StatCard
          label={FM('dashboard.stats.revenue')}
          testId="stat-revenue"
          trend={{ value: '8.1%', isPositive: true }}
          value="$12,345"
        />
        <StatCard
          label={FM('dashboard.stats.growth')}
          testId="stat-growth"
          trend={{ value: '2.4%', isPositive: false }}
          value="+12.5%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPlaceholder testId="chart-revenue" title="Revenue Overview" />
        <ChartPlaceholder testId="chart-users" title="User Activity" />
      </div>

      {/* Welcome Card and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">{FM('dashboard.welcome')}</h3>
          <p className="text-text-secondary">{FM('dashboard.welcomeDescription')}</p>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="btn btn-primary"
              data-testid={TestIds.BTN_EXPLORE_COMPONENTS}
              type="button"
              onClick={handleExploreComponents}
            >
              Explore Components
            </button>
            <button
              className="btn btn-secondary"
              data-testid={TestIds.BTN_THEME_EDITOR}
              type="button"
              onClick={openThemeSettings}
            >
              Theme Editor
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">Recent Activity</h3>
          <div className="divide-y divide-border">
            <ActivityItem icon="success" time="2 minutes ago" title="New user registered" />
            <ActivityItem icon="info" time="1 hour ago" title="Theme updated" />
            <ActivityItem icon="warning" time="3 hours ago" title="API rate limit reached" />
            <ActivityItem icon="success" time="5 hours ago" title="Backup completed" />
          </div>
        </div>
      </div>

      {/* Color Showcase */}
      <div className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Theme Colors in Action</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-primary-500 p-4 text-white">
            <p className="font-semibold">Primary</p>
            <p className="text-sm opacity-90">Main brand color</p>
          </div>
          <div className="rounded-lg bg-success-500 p-4 text-white">
            <p className="font-semibold">Success</p>
            <p className="text-sm opacity-90">Positive actions</p>
          </div>
          <div className="rounded-lg bg-warning-500 p-4 text-white">
            <p className="font-semibold">Warning</p>
            <p className="text-sm opacity-90">Caution states</p>
          </div>
          <div className="rounded-lg bg-error-500 p-4 text-white">
            <p className="font-semibold">Error</p>
            <p className="text-sm opacity-90">Error states</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
