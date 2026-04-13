import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useSearchFilter } from './useSearchFilter';

import type { SelectOption } from '../types';

const MOCK_OPTIONS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'apricot', label: 'Apricot' },
];

describe('useSearchFilter', () => {
  describe('filteredOptions', () => {
    it('returns all options when search is empty', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      expect(result.current.filteredOptions).toEqual(MOCK_OPTIONS);
    });

    it('filters options by label case-insensitively', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      act(() => {
        result.current.setSearchValue('ap');
      });

      expect(result.current.filteredOptions).toHaveLength(2);
      expect(result.current.filteredOptions).toEqual([
        { value: 'apple', label: 'Apple' },
        { value: 'apricot', label: 'Apricot' },
      ]);
    });

    it('matches case-insensitively with uppercase query', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      act(() => {
        result.current.setSearchValue('BANANA');
      });

      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0]!.value).toBe('banana');
    });

    it('returns empty array when no options match', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      act(() => {
        result.current.setSearchValue('xyz');
      });

      expect(result.current.filteredOptions).toHaveLength(0);
    });

    it('matches partial substrings within labels', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      act(() => {
        result.current.setSearchValue('an');
      });

      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0]!.value).toBe('banana');
    });
  });

  describe('searchValue', () => {
    it('starts with empty string', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      expect(result.current.searchValue).toBe('');
    });

    it('updates via setSearchValue', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      act(() => {
        result.current.setSearchValue('test');
      });

      expect(result.current.searchValue).toBe('test');
    });
  });

  describe('reset on close', () => {
    it('resets search when isOpen changes to false', () => {
      let isOpen = true;
      const { result, rerender } = renderHook(() =>
        useSearchFilter(MOCK_OPTIONS, isOpen),
      );

      act(() => {
        result.current.setSearchValue('cherry');
      });
      expect(result.current.searchValue).toBe('cherry');

      isOpen = false;
      rerender();

      expect(result.current.searchValue).toBe('');
      expect(result.current.filteredOptions).toEqual(MOCK_OPTIONS);
    });

    it('does not reset search when isOpen remains true', () => {
      const { result, rerender } = renderHook(() =>
        useSearchFilter(MOCK_OPTIONS, true),
      );

      act(() => {
        result.current.setSearchValue('ap');
      });

      rerender();

      expect(result.current.searchValue).toBe('ap');
    });
  });

  describe('searchInputRef', () => {
    it('provides a valid ref object', () => {
      const { result } = renderHook(() => useSearchFilter(MOCK_OPTIONS, true));

      expect(result.current.searchInputRef).toBeDefined();
      expect(result.current.searchInputRef.current).toBeNull();
    });
  });

  describe('options reactivity', () => {
    it('refilters when options change', () => {
      let options = MOCK_OPTIONS;
      const { result, rerender } = renderHook(() =>
        useSearchFilter(options, true),
      );

      act(() => {
        result.current.setSearchValue('ap');
      });
      expect(result.current.filteredOptions).toHaveLength(2);

      options = [
        { value: 'apple', label: 'Apple' },
        { value: 'mango', label: 'Mango' },
      ];
      rerender();

      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0]!.value).toBe('apple');
    });
  });
});
