/**
 * SplitButtonNative - Split button with dropdown using native HTML.
 *
 * Button + divider + dropdown chevron. Clicking the chevron opens a
 * dropdown menu. Uses theme CSS variables. No Syncfusion dependency.
 */
import {
  memo,
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ButtonHTMLAttributes,
} from 'react';

import type { SplitButtonItem } from '@/components/ui/shared/splitButtonTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Dropdown menu items */
  items: SplitButtonItem[];
  /** Primary button content */
  children: React.ReactNode;
  /** Callback when a dropdown item is clicked */
  onItemClick?: (item: SplitButtonItem) => void;
  /** Callback when the primary button is clicked */
  onClick?: () => void;
  /** Accessible label for the primary button */
  primaryAriaLabel?: string;
  /** Accessible label for the dropdown trigger */
  triggerAriaLabel?: string;
}

/** SVG chevron icon for the dropdown trigger */
const ChevronIcon = (): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const SplitButtonNative = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      testId,
      items,
      children,
      onItemClick,
      onClick,
      primaryAriaLabel = 'Primary action',
      triggerAriaLabel = 'Open dropdown',
      disabled,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback(() => {
      if (disabled !== true) setOpen((prev) => !prev);
    }, [disabled]);

    const handleItemClick = useCallback(
      (item: SplitButtonItem) => {
        if (item.disabled === true) return;
        onItemClick?.(item);
        setOpen(false);
      },
      [onItemClick],
    );

    const handlePrimaryClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

    /* Close dropdown when clicking outside */
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent): void => {
        const target = e.target;
        const isOutsideContainer = isValueDefined(containerRef.current) && target instanceof Node;
        if (isOutsideContainer && !containerRef.current.contains(target))
          setOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
      <div
        ref={containerRef}
        className={cn('native-split-btn', className)}
        data-testid={testId}
      >
        <button
          ref={ref}
          aria-label={primaryAriaLabel}
          className="native-split-btn-main"
          disabled={disabled}
          type="button"
          onClick={handlePrimaryClick}
          {...rest}
        >
          {children}
        </button>

        <span className="native-split-btn-divider" />

        <button
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={triggerAriaLabel}
          className="native-split-btn-trigger"
          data-testid={isValueDefined(testId) && testId !== '' ? `${testId}-trigger` : undefined}
          disabled={disabled}
          type="button"
          onClick={handleToggle}
        >
          <ChevronIcon />
        </button>

        {open ? (
          <div
            className="native-split-btn-dropdown"
            data-testid={isValueDefined(testId) && testId !== '' ? `${testId}-dropdown` : undefined}
            role="menu"
          >
            {items.map((item) => (
              <button
                key={item.id}
                aria-disabled={item.disabled === true ? true : undefined}
                className={cn(
                  'native-split-btn-item',
                  item.disabled === true && 'native-split-btn-item-disabled',
                )}
                data-testid={isValueDefined(testId) && testId !== '' ? `${testId}-item-${item.id}` : undefined}
                disabled={item.disabled}
                role="menuitem"
                type="button"
                onClick={() => handleItemClick(item)}
              >
                {item.text}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

SplitButtonNative.displayName = 'SplitButtonNative';

export default memo(SplitButtonNative);
export type { Props as SplitButtonNativeProps };
export type { SplitButtonItem };
