import { useState, useEffect, useRef, useMemo, type RefObject } from 'react';

import type { SelectOption } from '../types';

interface SearchFilterResult {
  filteredOptions: SelectOption[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchInputRef: RefObject<HTMLInputElement>;
}

/**
 * Provides type-to-filter functionality for dropdown options.
 * Resets search text when the popup closes.
 */
export function useSearchFilter(
  options: SelectOption[],
  isOpen: boolean,
): SearchFilterResult {
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) setSearchValue('');
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (searchValue.length === 0) return options;

    const query = searchValue.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, searchValue]);

  return { filteredOptions, searchValue, setSearchValue, searchInputRef };
}
