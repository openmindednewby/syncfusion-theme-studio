import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useMultiSelectState } from './useMultiSelectState';

import type { ComboboxOption } from '../types';

const INITIAL_HIGHLIGHT = -1;
const OPT_A: ComboboxOption = { value: 'a', label: 'Option A' };
const OPT_NUMERIC: ComboboxOption = { value: 42, label: 'Numeric' };

describe('useMultiSelectState', () => {
  describe('initial state', () => {
    it('starts closed with no highlight', () => {
      const { result } = renderHook(() => useMultiSelectState([], vi.fn()));

      expect(result.current.isOpen).toBe(false);
      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT);
    });
  });

  describe('toggle / open / close', () => {
    it('opens and closes via toggle', () => {
      const { result } = renderHook(() => useMultiSelectState([], vi.fn()));

      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(true);

      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
    });

    it('resets highlight on close', () => {
      const { result } = renderHook(() => useMultiSelectState([], vi.fn()));

      act(() => result.current.open());
      act(() => result.current.setHighlightedIndex(2));
      act(() => result.current.close());

      expect(result.current.highlightedIndex).toBe(INITIAL_HIGHLIGHT);
    });
  });

  describe('toggleOption', () => {
    it('adds a value when not present', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useMultiSelectState([], onChange));

      act(() => result.current.toggleOption(OPT_A));

      expect(onChange).toHaveBeenCalledWith(['a']);
    });

    it('removes a value when already present', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useMultiSelectState(['a', 'b'], onChange));

      act(() => result.current.toggleOption(OPT_A));

      expect(onChange).toHaveBeenCalledWith(['b']);
    });

    it('handles numeric values', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useMultiSelectState([42], onChange));

      act(() => result.current.toggleOption(OPT_NUMERIC));

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('does not close the popup after toggling', () => {
      const { result } = renderHook(() => useMultiSelectState([], vi.fn()));

      act(() => result.current.open());
      act(() => result.current.toggleOption(OPT_A));

      expect(result.current.isOpen).toBe(true);
    });

    it('does not throw when onChange is undefined', () => {
      const { result } = renderHook(() => useMultiSelectState([], undefined));

      expect(() => {
        act(() => result.current.toggleOption(OPT_A));
      }).not.toThrow();
    });
  });

  describe('removeValue', () => {
    it('removes a specific value from the selection', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useMultiSelectState(['a', 'b'], onChange));

      act(() => result.current.removeValue('a'));

      expect(onChange).toHaveBeenCalledWith(['b']);
    });
  });

  describe('clearAll', () => {
    it('calls onChange with empty array', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useMultiSelectState(['a', 'b'], onChange));

      act(() => result.current.clearAll());

      expect(onChange).toHaveBeenCalledWith([]);
    });
  });
});
