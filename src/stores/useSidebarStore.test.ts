import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useSidebarStore } from './useSidebarStore';

describe('useSidebarStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useSidebarStore());
    act(() => {
      result.current.setCollapsed(false);
    });
  });

  describe('initial state', () => {
    it('starts with sidebar expanded (isCollapsed = false)', () => {
      const { result } = renderHook(() => useSidebarStore());
      expect(result.current.isCollapsed).toBe(false);
    });
  });

  describe('toggle functionality', () => {
    it('toggles from expanded to collapsed', () => {
      const { result } = renderHook(() => useSidebarStore());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isCollapsed).toBe(true);
    });

    it('toggles from collapsed to expanded', () => {
      const { result } = renderHook(() => useSidebarStore());

      // First collapse
      act(() => {
        result.current.setCollapsed(true);
      });

      // Then toggle
      act(() => {
        result.current.toggle();
      });

      expect(result.current.isCollapsed).toBe(false);
    });

    it('toggles multiple times correctly', () => {
      const { result } = renderHook(() => useSidebarStore());

      // Toggle 1: expanded -> collapsed
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isCollapsed).toBe(true);

      // Toggle 2: collapsed -> expanded
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isCollapsed).toBe(false);

      // Toggle 3: expanded -> collapsed
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isCollapsed).toBe(true);
    });
  });

  describe('setCollapsed functionality', () => {
    it('sets collapsed state to true', () => {
      const { result } = renderHook(() => useSidebarStore());

      act(() => {
        result.current.setCollapsed(true);
      });

      expect(result.current.isCollapsed).toBe(true);
    });

    it('sets collapsed state to false', () => {
      const { result } = renderHook(() => useSidebarStore());

      // First collapse
      act(() => {
        result.current.setCollapsed(true);
      });

      // Then expand
      act(() => {
        result.current.setCollapsed(false);
      });

      expect(result.current.isCollapsed).toBe(false);
    });

    it('setting same state has no effect', () => {
      const { result } = renderHook(() => useSidebarStore());

      // Set to false when already false
      act(() => {
        result.current.setCollapsed(false);
      });

      expect(result.current.isCollapsed).toBe(false);

      // Set to true
      act(() => {
        result.current.setCollapsed(true);
      });

      // Set to true again
      act(() => {
        result.current.setCollapsed(true);
      });

      expect(result.current.isCollapsed).toBe(true);
    });
  });

  describe('state persistence across hook instances', () => {
    it('shares state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useSidebarStore());
      const { result: result2 } = renderHook(() => useSidebarStore());

      // Initially both should show expanded
      expect(result1.current.isCollapsed).toBe(false);
      expect(result2.current.isCollapsed).toBe(false);

      // Toggle via first instance
      act(() => {
        result1.current.toggle();
      });

      // Both instances should reflect the change
      expect(result1.current.isCollapsed).toBe(true);
      expect(result2.current.isCollapsed).toBe(true);
    });
  });
});
