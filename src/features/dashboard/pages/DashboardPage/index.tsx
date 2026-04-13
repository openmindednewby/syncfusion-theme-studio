import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { HeadingNative, HeadingLevel, StatCardNative, TrendDirection, TextNative, TextVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeSettingsDrawerStore } from '@/stores/useThemeSettingsDrawerStore';

import {
  OrdersByStatusChart,
  RecentActivityWidget,
  RevenueChart,
  TopProductsChart,
  UserActivityChart,
} from './components';

const DashboardPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { open: openThemeSettings } = useThemeSettingsDrawerStore();

  const handleExploreComponents = (): void => {
    Promise.resolve(navigate(RoutePath.Components)).catch(() => undefined);
  };

  return (
    <div className="space-y-6" data-testid={TestIds.DASHBOARD_HEADING}>
      <HeadingNative level={HeadingLevel.H2}>{FM('dashboard.title')}</HeadingNative>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCardNative
          label={FM('dashboard.stats.totalUsers')}
          testId="stat-total-users"
          trend={{ value: '12.5%', direction: TrendDirection.Up }}
          value="1,234"
        />
        <StatCardNative
          label={FM('dashboard.stats.activeSessions')}
          testId="stat-active-sessions"
          trend={{ value: '3.2%', direction: TrendDirection.Up }}
          value="567"
        />
        <StatCardNative
          label={FM('dashboard.stats.revenue')}
          testId="stat-revenue"
          trend={{ value: '8.1%', direction: TrendDirection.Up }}
          value="$12,345"
        />
        <StatCardNative
          label={FM('dashboard.stats.growth')}
          testId="stat-growth"
          trend={{ value: '2.4%', direction: TrendDirection.Down }}
          value="+12.5%"
        />
      </div>

      {/* Charts Row 1: Revenue + Orders Donut */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <OrdersByStatusChart />
      </div>

      {/* Charts Row 2: Top Products + User Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopProductsChart />
        <UserActivityChart />
      </div>

      {/* Welcome Card and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <HeadingNative className="mb-4" level={HeadingLevel.H3}>{FM('dashboard.welcome')}</HeadingNative>
          <TextNative variant={TextVariant.Secondary}>{FM('dashboard.welcomeDescription')}</TextNative>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              aria-label="Explore Components"
              className="btn btn-primary"
              data-testid={TestIds.BTN_EXPLORE_COMPONENTS}
              type="button"
              onClick={handleExploreComponents}
            >
              {FM('dashboard.exploreComponents')}
            </button>
            <button
              aria-label="Theme Editor"
              className="btn btn-secondary"
              data-testid={TestIds.BTN_THEME_EDITOR}
              type="button"
              onClick={openThemeSettings}
            >
              {FM('dashboard.themeEditor')}
            </button>
          </div>
        </div>

        <RecentActivityWidget />
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
