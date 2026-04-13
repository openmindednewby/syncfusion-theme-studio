/** Single item in a grid dropdown menu */
export interface GridDropdownItem {
  /** i18n key for the item label */
  labelKey: string;
  /** Test ID for E2E testing */
  testId: string;
  /** Whether this item is styled as a danger/destructive action */
  danger?: boolean;
  /** Click handler */
  onClick?: () => void;
}
