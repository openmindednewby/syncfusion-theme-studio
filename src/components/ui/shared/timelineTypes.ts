import type { ReactNode } from 'react';

/** Single timeline item definition shared across native and Syncfusion */
export interface TimelineItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label for the timeline step */
  label: string;
  /** Optional description text */
  description?: string;
  /** Step completion status */
  status?: 'completed' | 'active' | 'pending';
  /** Custom icon rendered in the marker */
  icon?: ReactNode;
  /** Optional timestamp display */
  timestamp?: string;
}

/** Base timeline props shared between native and Syncfusion implementations */
export interface BaseTimelineProps {
  /** Timeline items to render */
  items: TimelineItem[];
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Test ID for E2E testing */
  testId?: string;
}
