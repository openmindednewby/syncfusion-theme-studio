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

import { CONVERSION_FUNNEL } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '360';

export const ConversionFunnelChart = memo((): JSX.Element => {
  const colors = useChartTheme();

  const primaryXAxis = useMemo(() => ({
    valueType: 'Category' as const,
    labelStyle: { color: colors.labelColor },
    majorGridLines: { width: 0 },
  }), [colors.labelColor]);

  const primaryYAxis = useMemo(() => ({
    labelStyle: { color: colors.labelColor },
    majorGridLines: { color: colors.gridLineColor },
  }), [colors.labelColor, colors.gridLineColor]);

  const funnelData = useMemo(() => {
    const stageColors = [
      colors.primaryColor,
      colors.infoColor,
      colors.secondaryColor,
      colors.warningColor,
      colors.successColor,
    ];
    return CONVERSION_FUNNEL.map((item, index) => ({
      ...item,
      color: stageColors[index],
    }));
  }, [colors]);

  return (
    <div className="card" data-testid="chart-conversion-funnel">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.conversionFunnel')}
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
            dataSource={funnelData}
            name={FM('dashboard.charts.visitorsLabel')}
            pointColorMapping="color"
            type="Bar"
            xName="stage"
            yName="count"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

ConversionFunnelChart.displayName = 'ConversionFunnelChart';
