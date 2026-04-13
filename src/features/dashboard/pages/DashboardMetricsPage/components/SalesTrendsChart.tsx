import { memo, useMemo } from 'react';

import {
  Category,
  ChartComponent,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { FM } from '@/localization/utils/helpers';

import { SALES_TRENDS } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '360';
const LINE_WIDTH = 2;
const MARKER_SIZE = 6;

export const SalesTrendsChart = memo((): JSX.Element => {
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
    <div className="card" data-testid="chart-sales-trends">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.salesTrends')}
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
        <Inject services={[LineSeries, Category, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={SALES_TRENDS}
            fill={colors.primaryColor}
            marker={{ visible: true, width: MARKER_SIZE, height: MARKER_SIZE, fill: colors.primaryColor }}
            name={FM('dashboard.charts.thisYear')}
            type="Line"
            width={LINE_WIDTH}
            xName="month"
            yName="thisYear"
          />
          <SeriesDirective
            dashArray="5,5"
            dataSource={SALES_TRENDS}
            fill={colors.secondaryColor}
            marker={{ visible: true, width: MARKER_SIZE, height: MARKER_SIZE, fill: colors.secondaryColor }}
            name={FM('dashboard.charts.lastYear')}
            type="Line"
            width={LINE_WIDTH}
            xName="month"
            yName="lastYear"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

SalesTrendsChart.displayName = 'SalesTrendsChart';
