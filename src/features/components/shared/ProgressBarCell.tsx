import { memo } from 'react';
import type { CSSProperties } from 'react';

interface ProgressBarCellProps {
  value: number;
  maxValue: number;
  testId?: string;
}

const FULL_PERCENT = 100;

const TRACK_STYLE: CSSProperties = {
  width: '100%',
  height: '8px',
  borderRadius: 'var(--radius-sm, 4px)',
  background: 'var(--color-border, #e5e7eb)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
};

const CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '80px',
};

const LABEL_STYLE: CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  color: 'rgb(var(--color-text-secondary, 107 114 128))',
  minWidth: '36px',
  textAlign: 'right',
};

const ProgressBarCell = memo(({ value, maxValue, testId }: ProgressBarCellProps): JSX.Element => {
  const percent = Math.round((value / maxValue) * FULL_PERCENT);

  const fillStyle: CSSProperties = {
    width: `${String(percent)}%`,
    height: '100%',
    borderRadius: 'var(--radius-sm, 4px)',
    background: 'rgb(var(--color-primary-500))',
    transition: 'width 0.2s ease',
  };

  return (
    <div data-testid={testId} style={CONTAINER_STYLE}>
      <div style={TRACK_STYLE}>
        <div style={fillStyle} />
      </div>
      <span style={LABEL_STYLE}>{percent}%</span>
    </div>
  );
});

ProgressBarCell.displayName = 'ProgressBarCell';

export { ProgressBarCell };
