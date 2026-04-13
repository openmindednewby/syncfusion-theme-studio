import { memo, useCallback, type MouseEvent } from 'react';

import { ChipCloseIcon } from '@/components/icons';

import { CLASS } from '../constants';

interface ComboboxChipProps {
  label: string;
  value: string | number;
  onRemove: (value: string | number) => void;
}

/** Chip pill showing a selected value with a close icon. */
const ComboboxChip = memo(({ label, value, onRemove }: ComboboxChipProps): JSX.Element => {
  const handleClose = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onRemove(value);
    },
    [onRemove, value],
  );

  return (
    <span className={CLASS.CHIP}>
      <span className={CLASS.CHIP_LABEL}>{label}</span>
      <button
        aria-label={`Remove ${label}`}
        className={CLASS.CHIP_CLOSE}
        tabIndex={-1}
        type="button"
        onClick={handleClose}
      >
        <ChipCloseIcon />
      </button>
    </span>
  );
});

ComboboxChip.displayName = 'ComboboxChip';

export default ComboboxChip;
