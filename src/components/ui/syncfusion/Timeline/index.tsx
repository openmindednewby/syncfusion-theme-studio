import { memo } from 'react';

import type { BaseTimelineProps, TimelineItem } from '@/components/ui/shared/timelineTypes';
import { isNotEmptyString } from '@/utils/is';

export type SyncfusionTimelineProps = BaseTimelineProps;

interface MarkerProps {
  item: TimelineItem;
  index: number;
  isLast: boolean;
  isVertical: boolean;
}

/** Renders the Syncfusion-styled timeline marker dot and connector line. */
const SfTimelineMarker = ({ item, index, isLast, isVertical }: MarkerProps): JSX.Element => {
  const isCompleted = item.status === 'completed';
  const isActive = item.status === 'active';

  return (
    <div className={`flex ${isVertical ? 'flex-col items-center' : 'flex-row items-center w-full'}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
          isCompleted ? 'text-white' : ''
        }`}
        style={{
          backgroundColor: isCompleted
            ? 'var(--component-timeline-active)'
            : 'var(--component-timeline-marker-bg)',
          borderColor: isCompleted || isActive
            ? 'var(--component-timeline-active)'
            : 'var(--component-timeline-connector)',
        }}
      >
        {item.icon ?? (isCompleted ? '\u2713' : index + 1)}
      </div>

      {!isLast && (
        <div
          className={`${isVertical ? 'h-8 w-0.5' : 'h-0.5 flex-1'}`}
          style={{
            backgroundColor: isCompleted
              ? 'var(--component-timeline-active)'
              : 'var(--component-timeline-connector)',
          }}
        />
      )}
    </div>
  );
};

interface ItemProps {
  item: TimelineItem;
  index: number;
  isLast: boolean;
  isVertical: boolean;
}

/** Renders a single Syncfusion-styled timeline step with marker, connector, and content. */
const SfTimelineItemRow = ({ item, index, isLast, isVertical }: ItemProps): JSX.Element => (
  <div
    className={`e-timeline-item flex ${isVertical ? 'flex-row' : 'flex-col items-center'} ${
      isVertical ? '' : 'flex-1'
    }`}
  >
    <SfTimelineMarker index={index} isLast={isLast} isVertical={isVertical} item={item} />

    {/* Content */}
    <div className={`${isVertical ? 'ml-3 pb-8' : 'mt-2 px-2 text-center'}`}>
      <p className="text-sm font-medium" style={{ color: 'var(--component-timeline-label)' }}>
        {item.label}
      </p>
      {isNotEmptyString(item.description) ? <p
          className="mt-0.5 text-xs"
          style={{ color: 'var(--component-timeline-connector)' }}
        >
          {item.description}
        </p> : null}
      {isNotEmptyString(item.timestamp) ? <p
          className="mt-0.5 text-xs"
          style={{ color: 'var(--component-timeline-connector)' }}
        >
          {item.timestamp}
        </p> : null}
    </div>
  </div>
);

const SyncfusionTimeline = memo(({
  items,
  orientation = 'vertical',
  testId = 'sf-timeline',
}: SyncfusionTimelineProps): JSX.Element => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`e-timeline flex ${isVertical ? 'flex-col' : 'flex-row'}`} data-testid={testId}>
      {items.map((item, index) => (
        <SfTimelineItemRow
          key={item.id}
          index={index}
          isLast={index === items.length - 1}
          isVertical={isVertical}
          item={item}
        />
      ))}
    </div>
  );
});

SyncfusionTimeline.displayName = 'SyncfusionTimeline';
export default SyncfusionTimeline;
