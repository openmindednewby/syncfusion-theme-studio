import { memo } from 'react';

import type { BaseTimelineProps } from '@/components/ui/shared/timelineTypes';
import { isNotEmptyString } from '@/utils/is';

export type TimelineNativeProps = BaseTimelineProps;

const TimelineNative = memo(({
  items,
  orientation = 'vertical',
  testId = 'timeline-native',
}: TimelineNativeProps): JSX.Element => {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={`flex ${isVertical ? 'flex-col' : 'flex-row'}`}
      data-testid={testId}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isCompleted = item.status === 'completed';
        const isActive = item.status === 'active';

        return (
          <div
            key={item.id}
            className={`flex ${isVertical ? 'flex-row' : 'flex-col items-center'} ${
              isVertical ? '' : 'flex-1'
            }`}
          >
            {/* Marker + Connector */}
            <div
              className={`flex ${isVertical ? 'flex-col items-center' : 'flex-row items-center w-full'}`}
            >
              {/* Marker */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold ${
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

              {/* Connector */}
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

            {/* Content */}
            <div className={`${isVertical ? 'ml-3 pb-8' : 'mt-2 px-2 text-center'}`}>
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--component-timeline-label)' }}
              >
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
      })}
    </div>
  );
});

TimelineNative.displayName = 'TimelineNative';

export default TimelineNative;
