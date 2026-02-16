import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { HeadingNative, HeadingLevel, TextNative, TextVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';

import { ActivityItem, ChartPlaceholder, StatCard } from './components';

const DashboardPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const handleExploreComponents = (): void => {
    // navigate may return Promise in React Router v7
    Promise.resolve(navigate(RoutePath.Components)).catch(() => undefined);
  };

  return (
    <div className="space-y-6" data-testid={TestIds.DASHBOARD_HEADING}>
      <HeadingNative level={HeadingLevel.H2}>{FM('dashboard.title')}</HeadingNative>

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
        <ChartPlaceholder testId="chart-revenue" title={FM('dashboard.charts.revenueOverview')} />
        <ChartPlaceholder testId="chart-users" title={FM('dashboard.charts.userActivity')} />
      </div>

      {/* Welcome Card and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <HeadingNative className="mb-4" level={HeadingLevel.H3}>{FM('dashboard.welcome')}</HeadingNative>
          <TextNative variant={TextVariant.Secondary}>{FM('dashboard.welcomeDescription')}</TextNative>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="btn btn-primary"
              data-testid={TestIds.BTN_EXPLORE_COMPONENTS}
              type="button"
              onClick={handleExploreComponents}
            >
              {FM('dashboard.exploreComponents')}
            </button>
            <button
              className="btn btn-secondary"
              data-testid={TestIds.BTN_THEME_EDITOR}
              type="button"
              onClick={openThemeSettings}
            >
              {FM('dashboard.themeEditor')}
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <HeadingNative className="mb-4" level={HeadingLevel.H3}>{FM('dashboard.recentActivity')}</HeadingNative>
          <div className="divide-y divide-border">
            <ActivityItem icon="success" time={FM('dashboard.activity.twoMinutesAgo')} title={FM('dashboard.activity.newUserRegistered')} />
            <ActivityItem icon="info" time={FM('dashboard.activity.oneHourAgo')} title={FM('dashboard.activity.themeUpdated')} />
            <ActivityItem icon="warning" time={FM('dashboard.activity.threeHoursAgo')} title={FM('dashboard.activity.apiRateLimitReached')} />
            <ActivityItem icon="success" time={FM('dashboard.activity.fiveHoursAgo')} title={FM('dashboard.activity.backupCompleted')} />
          </div>
        </div>
      </div>

      {/* Color Showcase */}
      <div className="card">
        <HeadingNative className="mb-4" level={HeadingLevel.H3}>{FM('dashboard.colorsInAction')}</HeadingNative>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-primary-500 p-4 text-white">
            <p className="font-semibold">{FM('dashboard.colorPrimary')}</p>
            <p className="text-sm opacity-90">{FM('dashboard.colorPrimaryDesc')}</p>
          </div>
          <div className="rounded-lg bg-success-500 p-4 text-white">
            <p className="font-semibold">{FM('dashboard.colorSuccess')}</p>
            <p className="text-sm opacity-90">{FM('dashboard.colorSuccessDesc')}</p>
          </div>
          <div className="rounded-lg bg-warning-500 p-4 text-white">
            <p className="font-semibold">{FM('dashboard.colorWarning')}</p>
            <p className="text-sm opacity-90">{FM('dashboard.colorWarningDesc')}</p>
          </div>
          <div className="rounded-lg bg-error-500 p-4 text-white">
            <p className="font-semibold">{FM('dashboard.colorError')}</p>
            <p className="text-sm opacity-90">{FM('dashboard.colorErrorDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
