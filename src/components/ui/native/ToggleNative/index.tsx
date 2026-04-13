/**
 * ToggleNative - Zero-dependency themed toggle switch using native HTML.
 *
 * Renders a pill-shaped track with a sliding circular thumb,
 * following iOS/Android-style toggle conventions. Dimensions and
 * colors are driven by CSS variables from the theme injector.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, useCallback } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props {
  /** Whether the toggle is on */
  checked: boolean;
  /** Called with the new checked value when toggled */
  onChange: (checked: boolean) => void;
  /** Accessible label for screen readers */
  label?: string;
  /** Disables interaction */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes for the track */
  className?: string;
}

/**
 * Thumb offset uses calc() based on CSS variables so the toggle
 * adapts when track/thumb dimensions change via the theme editor.
 * OFF = inset from edge, ON = trackWidth - thumbSize - inset.
 */
const THUMB_INSET = '2px';

const THUMB_OFF_STYLE = { transform: `translateX(${THUMB_INSET})` } as const;
const THUMB_ON_STYLE = {
  transform: `translateX(calc(var(--component-toggle-track-width, 44px) - var(--component-toggle-thumb-size, 20px) - ${THUMB_INSET}))`,
} as const;

const ToggleNative = ({
  checked,
  onChange,
  label,
  disabled = false,
  testId,
  className,
}: Props): JSX.Element => {
  const handleClick = useCallback(() => {
    if (!disabled) onChange(!checked);
  }, [checked, disabled, onChange]);

  return (
    <button
      aria-checked={checked}
      aria-label={isValueDefined(label) ? label : undefined}
      className={cn(
        'toggle-track',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      data-testid={testId}
      disabled={disabled}
      role="switch"
      type="button"
      onClick={handleClick}
    >
      <span
        className="toggle-thumb"
        style={checked ? THUMB_ON_STYLE : THUMB_OFF_STYLE}
      />
    </button>
  );
};

ToggleNative.displayName = 'ToggleNative';

export default memo(ToggleNative);
export type { Props as ToggleNativeProps };
