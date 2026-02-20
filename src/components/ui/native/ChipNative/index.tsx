/**
 * ChipNative - Zero-dependency themed chip/tag using native HTML.
 *
 * Provides styled chips with variant support (default, primary, success,
 * warning, danger), removable close button, and disabled state.
 * Uses CSS variable theming via `.native-chip` classes.
 */
import { memo, useCallback, type KeyboardEvent, type MouseEvent } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';

import { ChipVariant } from './chipVariant';

export { ChipVariant } from './chipVariant';

interface Props {
  /** Chip label text */
  children: string;
  /** Visual variant */
  variant?: ChipVariant;
  /** Show close button */
  removable?: boolean;
  /** Click handler for the chip body */
  onClick?: () => void;
  /** Called when close button is clicked */
  onRemove?: () => void;
  /** Disables interaction */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}

const VARIANT_CLASS: Record<ChipVariant, string> = {
  [ChipVariant.Default]: '',
  [ChipVariant.Primary]: 'native-chip-primary',
  [ChipVariant.Success]: 'native-chip-success',
  [ChipVariant.Warning]: 'native-chip-warning',
  [ChipVariant.Danger]: 'native-chip-danger',
};

const ChipNative = ({
  children,
  variant = ChipVariant.Default,
  removable = false,
  onClick,
  onRemove,
  disabled = false,
  testId,
  className,
}: Props): JSX.Element => {
  const handleRemove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    },
    [onRemove],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onClick?.();
    },
    [onClick],
  );

  return (
    <span
      className={cn(
        'native-chip',
        VARIANT_CLASS[variant],
        disabled && 'native-chip-disabled',
        className,
      )}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={onClick && !disabled ? handleKeyDown : undefined}
    >
      {children}
      {removable ? (
        <button
          aria-label={FM('common.remove')}
          className="native-chip-close"
          disabled={disabled}
          type="button"
          onClick={handleRemove}
        >
          {FM('common.closeSymbol')}
        </button>
      ) : null}
    </span>
  );
};

ChipNative.displayName = 'ChipNative';

export default memo(ChipNative);
export type { Props as ChipNativeProps };
