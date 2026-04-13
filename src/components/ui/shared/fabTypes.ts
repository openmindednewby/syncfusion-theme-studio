/** FAB position on screen */
export const enum FabPosition {
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
  TopRight = 'top-right',
  TopLeft = 'top-left',
}

/** Base FAB props */
export interface BaseFabProps {
  className?: string;
  testId?: string;
  disabled?: boolean;
  icon: React.ReactNode;
  label?: string;
  position?: FabPosition;
  ariaLabel: string;
}
