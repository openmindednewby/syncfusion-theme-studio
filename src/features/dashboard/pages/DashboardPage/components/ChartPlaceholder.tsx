import { memo } from 'react';

const CHART_HEIGHT = 192;
const CHART_PLACEHOLDER_WIDTH = 100;
const CHART_BAR_WIDTH_1 = 60;
const CHART_BAR_WIDTH_2 = 80;
const CHART_BAR_WIDTH_3 = 40;
const CHART_BAR_WIDTH_4 = 90;
const CHART_BAR_WIDTH_5 = 70;
const BAR_WIDTH = 24;

interface ChartPlaceholderProps {
  title: string;
  testId: string;
}

export const ChartPlaceholder = memo(({ title, testId }: ChartPlaceholderProps): JSX.Element => (
  <div className="card" data-testid={testId}>
    <h3 className="mb-4 text-lg font-semibold text-text-primary">{title}</h3>
    <div
      className="flex items-end justify-around rounded-md bg-surface-elevated p-4"
      style={{ height: CHART_HEIGHT }}
    >
      {/* Placeholder bar chart visualization */}
      <div
        className="rounded-t bg-primary-500"
        style={{ width: BAR_WIDTH, height: `${CHART_BAR_WIDTH_1}%` }}
      />
      <div
        className="rounded-t bg-primary-400"
        style={{ width: BAR_WIDTH, height: `${CHART_BAR_WIDTH_2}%` }}
      />
      <div
        className="rounded-t bg-primary-500"
        style={{ width: BAR_WIDTH, height: `${CHART_BAR_WIDTH_3}%` }}
      />
      <div
        className="rounded-t bg-primary-400"
        style={{ width: BAR_WIDTH, height: `${CHART_BAR_WIDTH_4}%` }}
      />
      <div
        className="rounded-t bg-primary-500"
        style={{ width: BAR_WIDTH, height: `${CHART_BAR_WIDTH_5}%` }}
      />
      <div
        className="rounded-t bg-primary-400"
        style={{ width: BAR_WIDTH, height: `${CHART_PLACEHOLDER_WIDTH}%` }}
      />
    </div>
  </div>
));

ChartPlaceholder.displayName = 'ChartPlaceholder';
