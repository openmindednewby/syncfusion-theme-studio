import type { ReactNode } from 'react';

/** Single tab item definition shared across native and Syncfusion */
export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab header */
  label: string;
  /** Tab panel content */
  content: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
}

/** Base tabs props shared between native and Syncfusion implementations */
export interface BaseTabsProps {
  /** Tab items to render */
  items: TabItem[];
  /** ID of the initially active tab */
  defaultActiveId?: string;
  /** Called when active tab changes */
  onChange?: (id: string) => void;
  /** Test ID for E2E testing */
  testId?: string;
  /** Tab layout orientation */
  orientation?: 'horizontal' | 'vertical';
}
