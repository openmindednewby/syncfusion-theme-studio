import { forwardRef, memo, useCallback, type KeyboardEventHandler, type MouseEvent } from 'react';

import ChevronIcon from '../../SelectNative/components/ChevronIcon';
import { CLASS } from '../constants';
import ComboboxChip from './ComboboxChip';

import type { ComboboxOption } from '../types';

interface ComboboxTriggerProps {
  isOpen: boolean;
  hasError: boolean;
  disabled: boolean;
  selectedOptions: ComboboxOption[];
  placeholder: string;
  ariaLabel: string;
  triggerId: string;
  listboxId: string;
  activeDescendantId: string | undefined;
  onToggle: () => void;
  onKeyDown: KeyboardEventHandler;
  onRemove: (value: string | number) => void;
  onClearAll: () => void;
}

/** Trigger element displaying chips for selected values with clear-all and chevron. */
const ComboboxTrigger = forwardRef<HTMLDivElement, ComboboxTriggerProps>(
  (
    {
      isOpen,
      hasError,
      disabled,
      selectedOptions,
      placeholder,
      ariaLabel,
      triggerId,
      listboxId,
      activeDescendantId,
      onToggle,
      onKeyDown,
      onRemove,
      onClearAll,
    },
    ref,
  ): JSX.Element => {
    const isEmpty = selectedOptions.length === 0;

    const handleClear = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onClearAll();
      },
      [onClearAll],
    );

    const handleClearKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onClearAll();
        }
      },
      [onClearAll],
    );

    return (
      <div
        ref={ref}
        aria-activedescendant={activeDescendantId}
        aria-controls={listboxId}
        aria-disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className={CLASS.TRIGGER}
        data-error={hasError}
        data-placeholder={isEmpty}
        id={triggerId}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        onClick={onToggle}
        onKeyDown={onKeyDown}
      >
        {isEmpty ? (
          <span className="truncate">{placeholder}</span>
        ) : (
          <span className={CLASS.CHIPS}>
            {selectedOptions.map((opt) => (
              <ComboboxChip key={opt.value} label={opt.label} value={opt.value} onRemove={onRemove} />
            ))}
          </span>
        )}
        <span className={CLASS.ACTIONS}>
          {!isEmpty ? (
            <span
              aria-label="Clear all"
              className={CLASS.CLEAR}
              role="button"
              tabIndex={-1}
              onClick={handleClear}
              onKeyDown={handleClearKeyDown}
            >
              <svg aria-hidden="true" fill="none" height="100%" viewBox="0 0 16 16" width="100%">
                <path d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
              </svg>
            </span>
          ) : null}
          <ChevronIcon isOpen={isOpen} />
        </span>
      </div>
    );
  },
);

ComboboxTrigger.displayName = 'ComboboxTrigger';

export default memo(ComboboxTrigger);
