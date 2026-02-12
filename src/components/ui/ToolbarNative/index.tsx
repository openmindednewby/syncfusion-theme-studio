/**
 * ToolbarNative - Zero-dependency themed toolbar using native HTML.
 *
 * Renders a horizontal toolbar with `role="toolbar"` for proper
 * ARIA semantics. Supports buttons with icons/text, separators,
 * and theming via Tailwind CSS utility classes.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

/** Toolbar item that is a clickable button */
interface ToolbarButton {
  type: 'button';
  /** Button text (optional if icon provided) */
  text?: string;
  /** Icon element to render before text */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Tooltip text */
  tooltip?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
}

/** Visual separator between toolbar items */
interface ToolbarSeparator {
  type: 'separator';
}

type ToolbarItem = ToolbarButton | ToolbarSeparator;

interface Props {
  /** Array of toolbar items */
  items: ToolbarItem[];
  /** Accessible label for the toolbar */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}

const isSeparator = (item: ToolbarItem): item is ToolbarSeparator =>
  item.type === 'separator';

const ToolbarNative = ({
  items,
  ariaLabel = 'Toolbar',
  testId,
  className,
}: Props): JSX.Element => (
  <div
    aria-label={ariaLabel}
    className={cn(
      'flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1',
      className,
    )}
    data-testid={testId}
    role="toolbar"
  >
    {items.map((item, index) => {
      if (isSeparator(item))
        return (
          <div
            key={`sep-${String(index)}`}
            aria-orientation="vertical"
            className="mx-1 h-6 w-px bg-border"
            role="separator"
          />
        );

      return (
        <button
          key={isValueDefined(item.text) ? item.text : `btn-${String(index)}`}
          aria-label={item.tooltip ?? item.text}
          className={cn(
            'inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm',
            'text-text-primary transition-colors',
            'hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-500',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
          data-testid={item.testId}
          disabled={item.disabled}
          title={item.tooltip}
          type="button"
          onClick={item.onClick}
        >
          {isValueDefined(item.icon) ? (
            <span aria-hidden="true" className="h-4 w-4">
              {item.icon}
            </span>
          ) : null}
          {isValueDefined(item.text) ? <span>{item.text}</span> : null}
        </button>
      );
    })}
  </div>
);

ToolbarNative.displayName = 'ToolbarNative';

export default memo(ToolbarNative);
export type { Props as ToolbarNativeProps, ToolbarItem, ToolbarButton, ToolbarSeparator };
