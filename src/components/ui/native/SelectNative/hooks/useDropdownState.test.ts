import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useDropdownState } from './useDropdownState';

import type { SelectOption } from '../types';

const INITIAL_HIGHLIGHT_INDEX = -1;

const MOCK_OPTION: SelectOption = { value: 'opt1', label: 'Option 1' };
const MOCK_OPTION_NUMERIC: SelectOption = { value: 42, label: 'Numeric' };

describe('useDropdownState', () => {
  describe('initial state', () => {
    it('starts with isOpen=false', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      expect(result.current.isOpen).toBe(false);
    });

    it('starts with highlightedIndex=-1', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT_INDEX);
    });
  });

  describe('toggle', () => {
    it('sets isOpen to true when currently false', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('sets isOpen to false when currently true', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.toggle();
      });
      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('resets highlightedIndex when closing via toggle', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.toggle();
      });
      act(() => {
        result.current.setHighlightedIndex(3);
      });
      act(() => {
        result.current.toggle();
      });

      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT_INDEX);
    });
  });

  describe('open', () => {
    it('sets isOpen to true', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('resets highlightedIndex when opening', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.setHighlightedIndex(2);
      });
      act(() => {
        result.current.open();
      });

      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT_INDEX);
    });
  });

  describe('close', () => {
    it('sets isOpen to false', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('resets highlightedIndex', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.setHighlightedIndex(5);
      });
      act(() => {
        result.current.close();
      });

      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT_INDEX);
    });
  });

  describe('select', () => {
    it('calls onChange with the option value', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useDropdownState(onChange));

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.select(MOCK_OPTION);
      });

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith('opt1');
    });

    it('handles numeric option values', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useDropdownState(onChange));

      act(() => {
        result.current.select(MOCK_OPTION_NUMERIC);
      });

      expect(onChange).toHaveBeenCalledWith(42);
    });

    it('closes the dropdown after selecting', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.select(MOCK_OPTION);
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('resets highlightedIndex after selecting', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.open();
      });
      act(() => {
        result.current.setHighlightedIndex(2);
      });
      act(() => {
        result.current.select(MOCK_OPTION);
      });

      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT_INDEX);
    });

    it('does not throw when onChange is undefined', () => {
      const { result } = renderHook(() => useDropdownState(undefined));

      expect(() => {
        act(() => {
          result.current.select(MOCK_OPTION);
        });
      }).not.toThrow();
    });
  });

  describe('setHighlightedIndex', () => {
    it('updates the highlighted index', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.setHighlightedIndex(3);
      });

      expect(result.current.highlightedIndex).toBe(3);
    });

    it('allows setting to zero', () => {
      const { result } = renderHook(() => useDropdownState(vi.fn()));

      act(() => {
        result.current.setHighlightedIndex(0);
      });

      expect(result.current.highlightedIndex).toBe(0);
    });
  });
});
