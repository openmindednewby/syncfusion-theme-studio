import { memo, useMemo } from 'react';

import {
  Inject,
  SparklineComponent,
  SparklineTooltip,
} from '@syncfusion/ej2-react-charts';

import PillBadge from '@/components/ui/native/PillBadge';

import { useChartTheme } from '../../../hooks/useChartTheme';

import type { SparkPoint } from '../../../data/chartData';

const SPARK_HEIGHT = '50';
const SPARK_WIDTH = '120';
const SPARK_CONTAINER_STYLE = { width: '120px', height: '50px', flexShrink: 0 } as const;

interface KpiSparkCardProps {
  label: string;
  value: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
  sparkData: SparkPoint[];
  testId: string;
}

export const KpiSparkCard = memo(({
  label,
  value,
  trend,
  sparkData,
  testId,
}: KpiSparkCardProps): JSX.Element => {
  const colors = useChartTheme();

  const sparkColor = trend.isPositive ? colors.successColor : colors.errorColor;

  const padding = useMemo(() => ({
    left: 2, right: 2, top: 2, bottom: 2,
  }), []);

  const accentClass = trend.isPositive ? 'border-l-4 border-l-success-500' : 'border-l-4 border-l-error-500';
  const pillClass = trend.isPositive ? 'bg-success-500/10 text-success-500' : 'bg-error-500/10 text-error-500';

  return (
    <div className={`card flex items-center justify-between ${accentClass}`} data-testid={testId}>
      <div>
        <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
        <p className="mt-1 text-3xl font-bold text-text-primary">{value}</p>
        <PillBadge className="mt-2 inline-block" colorClass={pillClass}>
          {trend.isPositive ? '+' : ''}
          {trend.value}
        </PillBadge>
      </div>
      <div style={SPARK_CONTAINER_STYLE}>
        <SparklineComponent
          border={{ color: sparkColor, width: 2 }}
          containerArea={{ background: 'transparent' }}
          dataSource={sparkData}
          fill={sparkColor}
          height={SPARK_HEIGHT}
          lineWidth={2}
          opacity={0.4}
          padding={padding}
          tooltipSettings={{ visible: true, trackLineSettings: { visible: true } }}
          type="Area"
          valueType="Numeric"
          width={SPARK_WIDTH}
          xName="x"
          yName="y"
        >
          <Inject services={[SparklineTooltip]} />
        </SparklineComponent>
      </div>
    </div>
  );
});

KpiSparkCard.displayName = 'KpiSparkCard';
