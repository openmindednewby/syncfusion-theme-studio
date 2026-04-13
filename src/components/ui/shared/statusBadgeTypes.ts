/** Configuration for a single status entry in StatusBadgeNative */
export interface StatusConfig {
  /** Localization key for the label */
  labelKey: string;
  /** Tailwind classes for background and text color */
  className: string;
}

/** Base status badge props shared between native and Syncfusion implementations */
export interface BaseStatusBadgeProps<TKey extends string | number = string> {
  /** The current status value */
  status: TKey | undefined;
  /** Map from status key to visual configuration */
  statusMap: ReadonlyMap<TKey, StatusConfig>;
  /** Test ID for E2E testing */
  testId?: string;
  /** Fallback text when status is unknown (defaults to em dash) */
  fallbackText?: string;
}
