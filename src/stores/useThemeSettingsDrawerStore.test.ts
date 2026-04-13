import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useThemeSettingsDrawerStore } from './useThemeSettingsDrawerStore';

const STORAGE_KEY = 'theme-settings-panel';

describe('useThemeSettingsDrawerStore', () => {
  beforeEach(() => {
    // Clear localStorage and reset store before each test
    localStorage.removeItem(STORAGE_KEY);
    // Clear Zustand internal state by accessing the store directly
    useThemeSettingsDrawerStore.setState({ isOpen: true });
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  describe('initial state', () => {
    it('defaults to panel open (isOpen = true)', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('open functionality', () => {
    it('opens the panel', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      // First close it
      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);

      // Then open it
      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);
    });

    it('calling open when already open has no effect', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('close functionality', () => {
    it('closes the panel when open', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('calling close when already closed has no effect', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('toggle functionality', () => {
    it('toggles from open to closed', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('toggles from closed to open', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);
    });

    it('toggles multiple times correctly', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      // Start open (default)
      expect(result.current.isOpen).toBe(true);

      // Toggle 1: open -> closed
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);

      // Toggle 2: closed -> open
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);

      // Toggle 3: open -> closed
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('state persistence across hook instances', () => {
    it('shares state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useThemeSettingsDrawerStore());
      const { result: result2 } = renderHook(() => useThemeSettingsDrawerStore());

      // Initially both should show open
      expect(result1.current.isOpen).toBe(true);
      expect(result2.current.isOpen).toBe(true);

      // Close via first instance
      act(() => {
        result1.current.close();
      });

      // Both instances should reflect the change
      expect(result1.current.isOpen).toBe(false);
      expect(result2.current.isOpen).toBe(false);
    });
  });

  describe('localStorage persistence', () => {
    it('persists state to localStorage', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.close();
      });

      // Check localStorage has the state
      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.state.isOpen).toBe(false);
    });

    it('restores state from localStorage on mount', async () => {
      // Pre-populate localStorage with closed state
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: { isOpen: false }, version: 0 })
      );

      // Reset the store to pick up localStorage
      await act(async () => {
        await useThemeSettingsDrawerStore.persist.rehydrate();
      });

      const { result } = renderHook(() => useThemeSettingsDrawerStore());
      expect(result.current.isOpen).toBe(false);
    });
  });
});
