import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { useModeStore } from './useModeStore';

describe('useModeStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Reset store state
    const { result } = renderHook(() => useModeStore());
    act(() => {
      result.current.setMode('light');
    });

    // Mock document.documentElement
    vi.spyOn(document.documentElement.classList, 'add');
    vi.spyOn(document.documentElement.classList, 'remove');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts with light mode', () => {
      const { result } = renderHook(() => useModeStore());
      expect(result.current.mode).toBe('light');
    });
  });

  describe('setMode', () => {
    it('sets mode to dark', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.setMode('dark');
      });

      expect(result.current.mode).toBe('dark');
    });

    it('sets mode to light', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.setMode('dark');
        result.current.setMode('light');
      });

      expect(result.current.mode).toBe('light');
    });

    it('adds dark class to document when setting dark mode', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.setMode('dark');
      });

      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('removes dark class from document when setting light mode', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.setMode('light');
      });

      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('dark');
    });
  });

  describe('toggleMode', () => {
    it('toggles from light to dark', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.toggleMode();
      });

      expect(result.current.mode).toBe('dark');
    });

    it('toggles from dark to light', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.setMode('dark');
        result.current.toggleMode();
      });

      expect(result.current.mode).toBe('light');
    });

    it('updates document classes on toggle', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.toggleMode();
      });

      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });
  });

  describe('persistence', () => {
    it('persists mode to localStorage', () => {
      const { result } = renderHook(() => useModeStore());

      act(() => {
        result.current.setMode('dark');
      });

      const stored = JSON.parse(localStorage.getItem('theme-storage') ?? '{}');
      expect(stored.state.mode).toBe('dark');
    });
  });
});
