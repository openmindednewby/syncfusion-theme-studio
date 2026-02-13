import type { ReactNode } from 'react';

/** Avatar size variants shared across native and Syncfusion */
export const enum AvatarSize {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

/** Base avatar props shared between native and Syncfusion implementations */
export interface BaseAvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Initials to display as fallback */
  initials?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Whether to show the online/status indicator */
  showStatus?: boolean;
  /** Custom color for the status indicator */
  statusColor?: string;
  /** Custom icon as fallback (takes priority over initials) */
  icon?: ReactNode;
  /** Test ID for E2E testing */
  testId?: string;
}
