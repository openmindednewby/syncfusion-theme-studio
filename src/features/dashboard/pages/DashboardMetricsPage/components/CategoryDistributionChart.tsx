import { memo, useMemo } from 'react';

import {
  Category,
  ChartComponent,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  StackingBarSeries,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { FM } from '@/localization/utils/helpers';

import { CATEGORY_DISTRIBUTION } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '360';

export const CategoryDistributionChart = memo((): JSX.Element => {
  const colors = useChartTheme();

  const primaryXAxis = useMemo(() => ({
    valueType: 'Category' as const,
    labelStyle: { color: colors.labelColor },
    majorGridLines: { width: 0 },
  }), [colors.labelColor]);

  const primaryYAxis = useMemo(() => ({
    labelFormat: '${value}',
    labelStyle: { color: colors.labelColor },
    majorGridLines: { color: colors.gridLineColor },
  }), [colors.labelColor, colors.gridLineColor]);

  return (
    <div className="card" data-testid="chart-category-distribution">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.categoryDistribution')}
      </h3>
      <ChartComponent
        background={colors.background}
        height={CHART_HEIGHT}
        legendSettings={{
          visible: true,
          position: 'Top',
          textStyle: { color: colors.labelColor },
        }}
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={{ enable: true }}
      >
        <Inject services={[StackingBarSeries, Category, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={CATEGORY_DISTRIBUTION}
            fill={colors.primaryColor}
            name={FM('dashboard.charts.electronics')}
            type="StackingBar"
            xName="category"
            yName="electronics"
          />
          <SeriesDirective
            dataSource={CATEGORY_DISTRIBUTION}
            fill={colors.secondaryColor}
            name={FM('dashboard.charts.clothing')}
            type="StackingBar"
            xName="category"
            yName="clothing"
          />
          <SeriesDirective
            dataSource={CATEGORY_DISTRIBUTION}
            fill={colors.successColor}
            name={FM('dashboard.charts.homeGoods')}
            type="StackingBar"
            xName="category"
            yName="homeGoods"
          />
          <SeriesDirective
            dataSource={CATEGORY_DISTRIBUTION}
            fill={colors.warningColor}
            name={FM('dashboard.charts.sports')}
            type="StackingBar"
            xName="category"
            yName="sports"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

CategoryDistributionChart.displayName = 'CategoryDistributionChart';
