import { memo, useCallback } from 'react';

import type { SelectOption } from '../types';

interface DropdownOptionProps {
  option: SelectOption;
  index: number;
  isHighlighted: boolean;
  isSelected: boolean;
  optionId: string;
  onSelect: (option: SelectOption) => void;
  onHighlight: (index: number) => void;
}

/** Individual option within the dropdown popup with hover and selected states. */
const DropdownOption = memo(
  ({
    option,
    index,
    isHighlighted,
    isSelected,
    optionId,
    onSelect,
    onHighlight,
  }: DropdownOptionProps): JSX.Element => {
    const handleClick = useCallback(() => onSelect(option), [onSelect, option]);
    const handleMouseEnter = useCallback(() => onHighlight(index), [onHighlight, index]);
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(option);
      }
    }, [onSelect, option]);

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
        {option.label}
      </div>
    );
  },
);

DropdownOption.displayName = 'DropdownOption';

export default DropdownOption;
