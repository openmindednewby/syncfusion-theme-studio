import { memo, useCallback, type ChangeEvent, type RefObject } from 'react';

import ComboboxOption from './ComboboxOption';

import type { PopupPosition } from '../../SelectNative/utils/PopupPosition';
import type { ComboboxOption as OptionType } from '../types';

interface ComboboxPopupProps {
  isOpen: boolean;
  options: OptionType[];
  highlightedIndex: number;
  selectedValues: ReadonlyArray<string | number>;
  position: PopupPosition;
  listboxId: string;
  optionIdPrefix: string;
  searchable: boolean;
  searchValue: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onToggle: (option: OptionType) => void;
  onHighlight: (index: number) => void;
  onSearchChange: (value: string) => void;
}

/** Floating popup with checkbox options for multi-select. */
const ComboboxPopup = memo(
  ({
    isOpen,
    options,
    highlightedIndex,
    selectedValues,
    position,
    listboxId,
    optionIdPrefix,
    searchable,
    searchValue,
    searchInputRef,
    onToggle,
    onHighlight,
    onSearchChange,
  }: ComboboxPopupProps): JSX.Element => {
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
        <div aria-label="Options" aria-multiselectable="true" id={listboxId} role="listbox">
          {options.map((option, index) => (
            <ComboboxOption
              key={option.value}
              index={index}
              isHighlighted={index === highlightedIndex}
              isSelected={selectedValues.includes(option.value)}
              option={option}
              optionId={`${optionIdPrefix}-${index}`}
              onHighlight={onHighlight}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    );
  },
);

ComboboxPopup.displayName = 'ComboboxPopup';

export default ComboboxPopup;
