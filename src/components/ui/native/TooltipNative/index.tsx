import { memo, useState, useRef, useCallback, useEffect } from 'react';

import { TooltipPlacement } from '@/components/ui/shared/tooltipTypes';
import type { BaseTooltipProps } from '@/components/ui/shared/tooltipTypes';

export type TooltipNativeProps = BaseTooltipProps;

export { TooltipPlacement };

const DELAY_DEFAULT = 200;

const TooltipNative = memo(({
  content,
  children,
  placement = TooltipPlacement.Top,
  delay = DELAY_DEFAULT,
  testId = 'tooltip-native',
}: TooltipNativeProps): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const placementClasses: Record<TooltipPlacement, string> = {
    [TooltipPlacement.Top]: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    [TooltipPlacement.Bottom]: 'top-full left-1/2 -translate-x-1/2 mt-2',
    [TooltipPlacement.Left]: 'right-full top-1/2 -translate-y-1/2 mr-2',
    [TooltipPlacement.Right]: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses: Record<TooltipPlacement, string> = {
    [TooltipPlacement.Top]: 'top-full left-1/2 -translate-x-1/2 border-t-[6px] border-x-[6px] border-x-transparent',
    [TooltipPlacement.Bottom]: 'bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-x-[6px] border-x-transparent',
    [TooltipPlacement.Left]: 'left-full top-1/2 -translate-y-1/2 border-l-[6px] border-y-[6px] border-y-transparent',
    [TooltipPlacement.Right]: 'right-full top-1/2 -translate-y-1/2 border-r-[6px] border-y-[6px] border-y-transparent',
  };

  const arrowBorderSide: Record<TooltipPlacement, string> = {
    [TooltipPlacement.Top]: 'borderTopColor',
    [TooltipPlacement.Bottom]: 'borderBottomColor',
    [TooltipPlacement.Left]: 'borderLeftColor',
    [TooltipPlacement.Right]: 'borderRightColor',
  };

  return (
    <span
      className="relative inline-flex"
      data-testid={testId}
      role="button"
      tabIndex={0}
      onBlur={hide}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {visible ? <span
          className={`absolute z-50 whitespace-nowrap rounded px-2 py-1 text-xs font-medium shadow-sm ${placementClasses[placement]}`}
          role="tooltip"
          style={{
            backgroundColor: 'var(--component-tooltip-bg)',
            color: 'var(--component-tooltip-text)',
            borderColor: 'var(--component-tooltip-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          {content}
          <span
            className={`absolute h-0 w-0 ${arrowClasses[placement]}`}
            style={{ [arrowBorderSide[placement]]: 'var(--component-tooltip-arrow)' }}
          />
        </span> : null}
    </span>
  );
});

TooltipNative.displayName = 'TooltipNative';

export default TooltipNative;
