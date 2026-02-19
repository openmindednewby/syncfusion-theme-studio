/** Single split button menu item */
export interface SplitButtonItem {
  id: string;
  text: string;
  disabled?: boolean;
}

/** Base split button props */
export interface BaseSplitButtonProps {
  className?: string;
  testId?: string;
  disabled?: boolean;
  items: SplitButtonItem[];
  children: React.ReactNode;
  onItemClick?: (item: SplitButtonItem) => void;
  onClick?: () => void;
}
