import { memo, useCallback, type ChangeEvent, type RefObject } from 'react';

import DropdownOption from './DropdownOption';

import type { PopupPosition } from '../PopupPosition';
import type { SelectOption } from '../types';


interface DropdownPopupProps {
  isOpen: boolean;
  options: SelectOption[];
  highlightedIndex: number;
  selectedValue: string | number | undefined;
  position: PopupPosition;
  listboxId: string;
  optionIdPrefix: string;
  searchable: boolean;
  searchValue: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onSelect: (option: SelectOption) => void;
  onHighlight: (index: number) => void;
  onSearchChange: (value: string) => void;
}

/** Floating popup containing search input and option list. */
const DropdownPopup = memo(
  ({
    isOpen,
    options,
    highlightedIndex,
    selectedValue,
    position,
    listboxId,
    optionIdPrefix,
    searchable,
    searchValue,
    searchInputRef,
    onSelect,
    onHighlight,
    onSearchChange,
  }: DropdownPopupProps): JSX.Element => {
    const handleSearchInput = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
      [onSearchChange],
    );

    return (
      <div
        className="native-select-popup"
        data-open={isOpen}
        data-position={position}
      >
        {searchable ? (
          <div className="native-select-search">
            <input
              ref={searchInputRef}
              aria-label="Filter options"
              placeholder="Search..."
              type="text"
              value={searchValue}
              onChange={handleSearchInput}
            />
          </div>
        ) : null}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- WAI-ARIA listbox pattern */}
        <ul aria-label="Options" id={listboxId} role="listbox">
          {options.map((option, index) => (
            <DropdownOption
              key={option.value}
              index={index}
              isHighlighted={index === highlightedIndex}
              isSelected={option.value === selectedValue}
              option={option}
              optionId={`${optionIdPrefix}-${index}`}
              onHighlight={onHighlight}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </div>
    );
  },
);

DropdownPopup.displayName = 'DropdownPopup';

export default DropdownPopup;
