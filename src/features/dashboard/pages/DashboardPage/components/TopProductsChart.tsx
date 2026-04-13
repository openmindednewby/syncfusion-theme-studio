import { memo, useMemo } from 'react';

import {
  BarSeries,
  Category,
  ChartComponent,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { FM } from '@/localization/utils/helpers';

import { TOP_PRODUCTS } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '320';

export const TopProductsChart = memo((): JSX.Element => {
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
    <div className="card" data-testid="chart-top-products">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.topProducts')}
      </h3>
      <ChartComponent
        background={colors.background}
        height={CHART_HEIGHT}
        legendSettings={{ visible: false }}
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={{ enable: true }}
      >
        <Inject services={[BarSeries, Category, Tooltip, DataLabel]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            cornerRadius={{ topRight: 4, bottomRight: 4 }}
            dataSource={TOP_PRODUCTS}
            fill={colors.secondaryColor}
            name={FM('dashboard.charts.revenueLabel')}
            type="Bar"
            xName="product"
            yName="revenue"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

TopProductsChart.displayName = 'TopProductsChart';
