import { type CSSProperties, memo, type ReactNode } from 'react';

import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';

interface PillBadgeProps {
  children: ReactNode;
  /** Color classes (e.g. 'bg-success-50 text-success-700') */
  colorClass: string;
  /** Additional class names */
  className?: string;
  testId?: string;
}

export type { PillBadgeProps };

const PILL_BASE = 'whitespace-nowrap';

const PillBadge = memo(({
  children,
  className,
  colorClass,
  testId,
}: PillBadgeProps): JSX.Element => {
  const { theme, mode } = useThemeStore();
  const config = theme.components[mode].pillBadge;

  const style: CSSProperties = {
    borderRadius: config.borderRadius,
    fontSize: config.fontSize,
    fontWeight: config.fontWeight,
    paddingBottom: config.paddingY,
    paddingLeft: config.paddingX,
    paddingRight: config.paddingX,
    paddingTop: config.paddingY,
  };

  return (
    <span
      className={cn(PILL_BASE, colorClass, className)}
      data-testid={testId}
      style={style}
    >
      {children}
    </span>
  );
});

PillBadge.displayName = 'PillBadge';

export default PillBadge;
