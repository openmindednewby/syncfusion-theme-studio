import { memo, useCallback } from 'react';

import { CLASS, CHECKBOX_SIZE } from '../constants';

import type { ComboboxOption as OptionType } from '../types';

interface ComboboxOptionProps {
  option: OptionType;
  index: number;
  isHighlighted: boolean;
  isSelected: boolean;
  optionId: string;
  onToggle: (option: OptionType) => void;
  onHighlight: (index: number) => void;
}

/** Individual option with a checkbox indicator for multi-select. */
const ComboboxOption = memo(
  ({ option, index, isHighlighted, isSelected, optionId, onToggle, onHighlight }: ComboboxOptionProps): JSX.Element => {
    const handleClick = useCallback(() => onToggle(option), [onToggle, option]);
    const handleMouseEnter = useCallback(() => onHighlight(index), [onHighlight, index]);
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(option);
      }
    }, [onToggle, option]);

    return (
      <div
        aria-selected={isSelected}
        className="native-select-option"
        data-highlighted={isHighlighted}
        data-selected={isSelected}
        id={optionId}
        role="option"
        tabIndex={-1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
      >
        <span className={CLASS.CHECKBOX} data-checked={isSelected}>
          <svg aria-hidden="true" fill="none" height={CHECKBOX_SIZE} viewBox="0 0 13 13" width={CHECKBOX_SIZE}>
            {isSelected ? (
              <path d="M3 6.5L5.5 9L10 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            ) : null}
          </svg>
        </span>
        {option.label}
      </div>
    );
  },
);

ComboboxOption.displayName = 'ComboboxOption';

export default ComboboxOption;
