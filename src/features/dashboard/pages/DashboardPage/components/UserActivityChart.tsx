import { memo, useMemo } from 'react';

import {
  Category,
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from '@syncfusion/ej2-react-charts';

import { FM } from '@/localization/utils/helpers';

import { USER_ACTIVITY } from '../../../data/chartData';
import { useChartTheme } from '../../../hooks/useChartTheme';

const CHART_HEIGHT = '320';
const LINE_WIDTH = 2;

export const UserActivityChart = memo((): JSX.Element => {
  const colors = useChartTheme();

  const primaryXAxis = useMemo(() => ({
    valueType: 'Category' as const,
    labelStyle: { color: colors.labelColor },
    majorGridLines: { width: 0 },
    interval: 5,
  }), [colors.labelColor]);

  const primaryYAxis = useMemo(() => ({
    labelStyle: { color: colors.labelColor },
    majorGridLines: { color: colors.gridLineColor },
  }), [colors.labelColor, colors.gridLineColor]);

  return (
    <div className="card" data-testid="chart-user-activity">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('dashboard.charts.userActivity')}
      </h3>
      <ChartComponent
        background={colors.background}
        height={CHART_HEIGHT}
        legendSettings={{ visible: false }}
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={{ enable: true }}
      >
        <Inject services={[LineSeries, Category, Tooltip]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={USER_ACTIVITY}
            fill={colors.successColor}
            marker={{ visible: true, width: 6, height: 6, fill: colors.successColor }}
            name={FM('dashboard.charts.activeUsersLabel')}
            type="Line"
            width={LINE_WIDTH}
            xName="day"
            yName="users"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
});

UserActivityChart.displayName = 'UserActivityChart';
