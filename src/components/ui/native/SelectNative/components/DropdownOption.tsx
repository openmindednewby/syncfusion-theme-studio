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

    return (
      /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-to-interactive-role -- WAI-ARIA listbox option pattern: keyboard handled on trigger via useKeyboardNavigation */
      <li
        aria-selected={isSelected}
        className="native-select-option"
        data-highlighted={isHighlighted}
        data-selected={isSelected}
        id={optionId}
        role="option"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {option.label}
      </li>
      /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-to-interactive-role */
    );
  },
);

DropdownOption.displayName = 'DropdownOption';

export default DropdownOption;
