import { memo, useMemo } from 'react';

import {
  AreaSeries,
  Category,
  ChartComponent,
  DateTime,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { FM } from '@/localization/utils/helpers';

import { MONTHLY_REVENUE } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '320';

export const RevenueChart = memo((): JSX.Element => {
  const colors = useChartTheme();

  const primaryAxis = useMemo(() => ({
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
    <div className="card" data-testid="chart-revenue">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.revenueOverTime')}
      </h3>
      <ChartComponent
        background={colors.background}
        height={CHART_HEIGHT}
        legendSettings={{ visible: false }}
        primaryXAxis={primaryAxis}
        primaryYAxis={primaryYAxis}
        tooltip={{ enable: true }}
      >
        <Inject services={[AreaSeries, Category, DateTime, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            border={{ width: 2, color: colors.primaryColor }}
            dataSource={MONTHLY_REVENUE}
            fill={colors.primaryColor}
            name={FM('dashboard.charts.revenueLabel')}
            opacity={0.3}
            type="Area"
            xName="month"
            yName="revenue"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

RevenueChart.displayName = 'RevenueChart';
