import { memo } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  testId: string;
}

export const StatCard = memo(({ label, value, trend, testId }: StatCardProps): JSX.Element => (
  <div className="card" data-testid={testId}>
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
    {trend ? (
      <p className={`mt-1 text-sm ${trend.isPositive ? 'text-success-500' : 'text-error-500'}`}>
        {trend.isPositive ? '+' : ''}
        {trend.value}
      </p>
    ) : null}
  </div>
));

StatCard.displayName = 'StatCard';
