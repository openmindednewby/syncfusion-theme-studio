import { HeadingNative, HeadingLevel, TextNative, TextVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import { KpiSparkCard } from './components';
import {
  KPI_GROWTH_SPARK,
  KPI_ORDERS_SPARK,
  KPI_REVENUE_SPARK,
  KPI_USERS_SPARK,
} from '../../data/chartData';

const DashboardKpisPage = (): JSX.Element => (
  <div className="space-y-6" data-testid="dashboard-kpis">
    <div>
      <HeadingNative level={HeadingLevel.H2}>{FM('dashboard.kpis.title')}</HeadingNative>
      <TextNative className="mt-1" variant={TextVariant.Secondary}>
        {FM('dashboard.kpis.description')}
      </TextNative>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <KpiSparkCard
        label={FM('dashboard.kpis.totalRevenue')}
        sparkData={KPI_REVENUE_SPARK}
        testId="kpi-revenue"
        trend={{ value: '18.2%', isPositive: true }}
        value="$730,500"
      />
      <KpiSparkCard
        label={FM('dashboard.kpis.totalUsers')}
        sparkData={KPI_USERS_SPARK}
        testId="kpi-users"
        trend={{ value: '12.5%', isPositive: true }}
        value="1,234"
      />
      <KpiSparkCard
        label={FM('dashboard.kpis.totalOrders')}
        sparkData={KPI_ORDERS_SPARK}
        testId="kpi-orders"
        trend={{ value: '5.8%', isPositive: true }}
        value="1,428"
      />
      <KpiSparkCard
        label={FM('dashboard.kpis.growthRate')}
        sparkData={KPI_GROWTH_SPARK}
        testId="kpi-growth"
        trend={{ value: '1.2%', isPositive: false }}
        value="12.5%"
      />
    </div>
  </div>
);

export default DashboardKpisPage;
