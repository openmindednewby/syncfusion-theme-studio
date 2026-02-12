/**
 * ToggleNative - Zero-dependency themed toggle switch using native HTML.
 *
 * Renders a pill-shaped track with a sliding circular thumb,
 * following iOS/Android-style toggle conventions. Supports theming
 * via CSS variables and Tailwind utility classes.
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

/** Horizontal offset (Tailwind translate-x) when the thumb is in the "on" position */
const THUMB_TRANSLATE_ON = 'translate-x-5';
/** Horizontal offset (Tailwind translate-x) when the thumb is in the "off" position */
const THUMB_TRANSLATE_OFF = 'translate-x-0.5';

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
        'toggle-track h-6 w-11',
        checked ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600',
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
        className={cn(
          'toggle-thumb h-5 w-5 translate-y-0',
          checked ? THUMB_TRANSLATE_ON : THUMB_TRANSLATE_OFF,
        )}
      />
    </button>
  );
};

ToggleNative.displayName = 'ToggleNative';

export default memo(ToggleNative);
export type { Props as ToggleNativeProps };
