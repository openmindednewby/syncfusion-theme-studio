import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useThemeSettingsDrawerStore } from './useThemeSettingsDrawerStore';

describe('useThemeSettingsDrawerStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useThemeSettingsDrawerStore());
    act(() => {
      result.current.close();
    });
  });

  describe('initial state', () => {
    it('starts with drawer closed (isOpen = false)', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('open functionality', () => {
    it('opens the drawer', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('calling open when already open has no effect', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('close functionality', () => {
    it('closes the drawer when open', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('calling close when already closed has no effect', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('toggle functionality', () => {
    it('toggles from closed to open', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('toggles from open to closed', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('toggles multiple times correctly', () => {
      const { result } = renderHook(() => useThemeSettingsDrawerStore());

      // Toggle 1: closed -> open
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);

      // Toggle 2: open -> closed
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);

      // Toggle 3: closed -> open
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('state persistence across hook instances', () => {
    it('shares state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useThemeSettingsDrawerStore());
      const { result: result2 } = renderHook(() => useThemeSettingsDrawerStore());

      // Initially both should show closed
      expect(result1.current.isOpen).toBe(false);
      expect(result2.current.isOpen).toBe(false);

      // Open via first instance
      act(() => {
        result1.current.open();
      });

      // Both instances should reflect the change
      expect(result1.current.isOpen).toBe(true);
      expect(result2.current.isOpen).toBe(true);
    });
  });
});
