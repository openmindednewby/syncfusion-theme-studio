import { memo } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

// Chart placeholder constants
const CHART_HEIGHT = 192;
const CHART_PLACEHOLDER_WIDTH = 100;
const CHART_BAR_WIDTH_1 = 60;
const CHART_BAR_WIDTH_2 = 80;
const CHART_BAR_WIDTH_3 = 40;
const CHART_BAR_WIDTH_4 = 90;
const CHART_BAR_WIDTH_5 = 70;

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  testId: string;
}

const StatCard = memo(({ label, value, trend, testId }: StatCardProps): JSX.Element => (
  <div className="card" data-testid={testId}>
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
    {trend ? (
      <p
        className={`mt-1 text-sm ${trend.isPositive ? 'text-success-500' : 'text-error-500'}`}
      >
        {trend.isPositive ? '+' : ''}
        {trend.value}
      </p>
    ) : null}
  </div>
));

StatCard.displayName = 'StatCard';

interface ChartPlaceholderProps {
  title: string;
  testId: string;
}

const ChartPlaceholder = memo(({ title, testId }: ChartPlaceholderProps): JSX.Element => (
  <div className="card" data-testid={testId}>
    <h3 className="mb-4 text-lg font-semibold text-text-primary">{title}</h3>
    <div
      className="flex items-end justify-around rounded-md bg-surface-elevated p-4"
      style={{ height: CHART_HEIGHT }}
    >
      {/* Placeholder bar chart visualization */}
      <div
        className="rounded-t bg-primary-500"
        style={{ width: 24, height: `${CHART_BAR_WIDTH_1}%` }}
      />
      <div
        className="rounded-t bg-primary-400"
        style={{ width: 24, height: `${CHART_BAR_WIDTH_2}%` }}
      />
      <div
        className="rounded-t bg-primary-500"
        style={{ width: 24, height: `${CHART_BAR_WIDTH_3}%` }}
      />
      <div
        className="rounded-t bg-primary-400"
        style={{ width: 24, height: `${CHART_BAR_WIDTH_4}%` }}
      />
      <div
        className="rounded-t bg-primary-500"
        style={{ width: 24, height: `${CHART_BAR_WIDTH_5}%` }}
      />
      <div
        className="rounded-t bg-primary-400"
        style={{ width: 24, height: `${CHART_PLACEHOLDER_WIDTH}%` }}
      />
    </div>
  </div>
));

ChartPlaceholder.displayName = 'ChartPlaceholder';

interface ActivityItemProps {
  title: string;
  time: string;
  icon: 'success' | 'warning' | 'info';
}

const ActivityItem = memo(({ title, time, icon }: ActivityItemProps): JSX.Element => {
  const iconClasses = {
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
    info: 'bg-info-50 text-info-500',
  };

  return (
    <div className="flex items-center gap-3 py-3">
      <div className={`rounded-full p-2 ${iconClasses[icon]}`}>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-xs text-text-muted">{time}</p>
      </div>
    </div>
  );
});

ActivityItem.displayName = 'ActivityItem';

const DashboardPage = (): JSX.Element => (
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
          <button className="btn btn-primary" data-testid="btn-explore-components" type="button">
            Explore Components
          </button>
          <button className="btn btn-secondary" data-testid="btn-theme-editor" type="button">
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

export default DashboardPage;
