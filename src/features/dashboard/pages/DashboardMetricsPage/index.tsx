import { HeadingNative, HeadingLevel, TextNative, TextVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

import { CategoryDistributionChart, ConversionFunnelChart, SalesTrendsChart } from './components';

const DashboardMetricsPage = (): JSX.Element => (
  <div className="space-y-6" data-testid="dashboard-metrics">
    <div>
      <HeadingNative level={HeadingLevel.H2}>{FM('dashboard.metrics.title')}</HeadingNative>
      <TextNative className="mt-1" variant={TextVariant.Secondary}>
        {FM('dashboard.metrics.description')}
      </TextNative>
    </div>

    {/* Sales Trends (full width) */}
    <SalesTrendsChart />

    {/* Category Distribution + Conversion Funnel */}
    <div className="grid gap-6 lg:grid-cols-2">
      <CategoryDistributionChart />
      <ConversionFunnelChart />
    </div>
  </div>
);

export default DashboardMetricsPage;
