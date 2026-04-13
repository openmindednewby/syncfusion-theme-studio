import type { ReactNode } from 'react';

import type { TrendDirection } from '@/components/ui/shared/trendDirection';

/** Trend indicator configuration */
export interface StatCardTrend {
  /** Display value (e.g. "12.5%") */
  value: string;
  /** Direction of the trend */
  direction: TrendDirection;
}

/** Base stat card props shared between native and Syncfusion implementations */
export interface BaseStatCardProps {
  /** Metric label */
  label: string;
  /** Metric value */
  value: string | number;
  /** Optional trend indicator */
  trend?: StatCardTrend;
  /** Optional leading icon */
  icon?: ReactNode;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
