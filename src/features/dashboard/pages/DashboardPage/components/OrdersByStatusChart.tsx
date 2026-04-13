import { memo, useMemo } from 'react';

import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Inject,
  PieSeries,
} from '@syncfusion/ej2-react-charts';

import { FM } from '@/localization/utils/helpers';

import { ORDERS_BY_STATUS } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '320';
const DONUT_INNER_RADIUS = '55%';
const START_ANGLE = 0;
const END_ANGLE = 360;

export const OrdersByStatusChart = memo((): JSX.Element => {
  const colors = useChartTheme();

  const palette = useMemo(() => [
    colors.warningColor,
    colors.infoColor,
    colors.successColor,
    colors.errorColor,
  ], [colors]);

  return (
    <div className="card" data-testid="chart-orders-status">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.ordersByStatus')}
      </h3>
      <AccumulationChartComponent
        enableSmartLabels
        background={colors.background}
        height={CHART_HEIGHT}
        legendSettings={{
          visible: true,
          position: 'Bottom',
          textStyle: { color: colors.labelColor },
        }}
        tooltip={{ enable: true }}
      >
        <Inject services={[PieSeries, AccumulationTooltip, AccumulationLegend, AccumulationDataLabel]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataLabel={{
              visible: true,
              position: 'Outside',
              font: { color: colors.labelColor },
            }}
            dataSource={ORDERS_BY_STATUS}
            endAngle={END_ANGLE}
            innerRadius={DONUT_INNER_RADIUS}
            palettes={palette}
            startAngle={START_ANGLE}
            xName="status"
            yName="count"
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
});

OrdersByStatusChart.displayName = 'OrdersByStatusChart';
