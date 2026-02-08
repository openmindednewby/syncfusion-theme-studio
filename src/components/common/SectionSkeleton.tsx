import { memo } from 'react';

import { cn } from '@/utils/cn';

interface Props {
  /** Section title to display */
  title: string;
  /** Fixed height of the skeleton - MUST match actual content height to prevent CLS */
  height?: string;
  /** Additional CSS classes */
  className?: string;
}

const SKELETON_ROWS = 3;

/**
 * Section skeleton component that reserves exact space to prevent Cumulative Layout Shift (CLS).
 * Uses CSS containment to tell the browser the exact dimensions before content loads.
 */
const SectionSkeletonComponent = ({
  title,
  height = '200px',
  className,
}: Props): JSX.Element => (
  <section
    className={cn('space-y-6', className)}
    style={{
      // Use fixed height and contain to prevent CLS
      height,
      contain: 'strict',
      contentVisibility: 'auto',
      containIntrinsicBlockSize: height,
    }}
  >
    <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
    <div
      aria-busy="true"
      aria-label={`Loading ${title}`}
      className="animate-pulse space-y-4"
    >
      {/* Skeleton rows */}
      {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
        <div key={`skeleton-row-${String(index)}`} className="flex gap-4">
          <div className="h-4 w-1/4 rounded bg-surface-elevated" />
          <div className="h-4 w-1/2 rounded bg-surface-elevated" />
          <div className="h-4 w-1/4 rounded bg-surface-elevated" />
        </div>
      ))}
      {/* Larger skeleton block */}
      <div className="h-24 w-full rounded bg-surface-elevated" />
    </div>
  </section>
);

export const SectionSkeleton = memo(SectionSkeletonComponent);
