import { forwardRef, memo, type KeyboardEventHandler } from 'react';

import { isValueDefined } from '@/utils/is';

import ChevronIcon from './ChevronIcon';

interface DropdownTriggerProps {
  isOpen: boolean;
  hasError: boolean;
  disabled: boolean;
  selectedLabel: string | undefined;
  placeholder: string;
  triggerId: string;
  listboxId: string;
  activeDescendantId: string | undefined;
  onToggle: () => void;
  onKeyDown: KeyboardEventHandler;
}

/** Button that displays the selected value and toggles the dropdown. */
const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (
    {
      isOpen,
      hasError,
      disabled,
      selectedLabel,
      placeholder,
      triggerId,
      listboxId,
      activeDescendantId,
      onToggle,
      onKeyDown,
    },
    ref,
  ): JSX.Element => {
    const displayText = selectedLabel ?? placeholder;
    const isPlaceholder = !isValueDefined(selectedLabel);

    return (
      <button
        ref={ref}
        aria-activedescendant={activeDescendantId}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="native-select-trigger"
        data-error={hasError}
        data-placeholder={isPlaceholder}
        disabled={disabled}
        id={triggerId}
        role="combobox"
        type="button"
        onClick={onToggle}
        onKeyDown={onKeyDown}
      >
        <span className="truncate">{displayText}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
    );
  },
);

DropdownTrigger.displayName = 'DropdownTrigger';

export default memo(DropdownTrigger);
