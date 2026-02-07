import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useThemeStore } from './useThemeStore';
import { createCustomTheme, createIncompleteTheme } from '../test/fixtures/themeFixtures';


describe('useThemeStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.setMode('light');
      result.current.resetTheme();
    });
  });

  describe('mode management', () => {
    it('has default mode as light', () => {
      const { result } = renderHook(() => useThemeStore());
      expect(result.current.mode).toBe('light');
    });

    it('sets mode to dark', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      expect(result.current.mode).toBe('dark');
    });

    it('sets mode to light from dark', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      act(() => result.current.setMode('light'));
      expect(result.current.mode).toBe('light');
    });

    it('toggles from light to dark', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('dark');
    });

    it('toggles from dark to light', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.setMode('dark'));
      act(() => result.current.toggleMode());
      expect(result.current.mode).toBe('light');
    });
  });

  describe('theme management', () => {
    it('has default theme with id "default"', () => {
      const { result } = renderHook(() => useThemeStore());
      expect(result.current.theme.id).toBe('default');
      expect(result.current.theme.name).toBe('Default Blue');
    });

    it('updates theme properties', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTheme({ name: 'Custom Theme' }));
      expect(result.current.theme.name).toBe('Custom Theme');
      expect(result.current.theme.id).toBe('default');
    });

    it('updates primary color shade', () => {
      const { result } = renderHook(() => useThemeStore());
      const newColor = '100 200 50';
      act(() => result.current.updatePrimaryColor('500', newColor));
      expect(result.current.theme.primary['500']).toBe(newColor);
    });

    it('resets theme to default', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => result.current.updateTheme({ name: 'Modified Theme' }));
      expect(result.current.theme.name).toBe('Modified Theme');
      act(() => result.current.resetTheme());
      expect(result.current.theme.name).toBe('Default Blue');
      expect(result.current.theme.id).toBe('default');
    });
  });

  describe('theme export/import', () => {
    it('exports theme as JSON string', () => {
      const { result } = renderHook(() => useThemeStore());
      const exported = result.current.exportTheme();
      expect(typeof exported).toBe('string');
      const parsed = JSON.parse(exported) as { id: string; name: string };
      expect(parsed.id).toBe('default');
      expect(parsed.name).toBe('Default Blue');
    });

    it('imports valid theme JSON successfully', () => {
      const { result } = renderHook(() => useThemeStore());
      const customTheme = createCustomTheme();
      let importResult = false;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(customTheme));
      });
      expect(importResult).toBe(true);
      expect(result.current.theme.id).toBe('custom');
      expect(result.current.theme.name).toBe('Custom Imported');
    });

    it('returns false for invalid JSON', () => {
      const { result } = renderHook(() => useThemeStore());
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme('invalid json');
      });
      expect(importResult).toBe(false);
      expect(result.current.theme.id).toBe('default');
    });

    it('returns false for JSON missing required fields', () => {
      const { result } = renderHook(() => useThemeStore());
      const incompleteTheme = createIncompleteTheme();
      let importResult = true;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(incompleteTheme));
      });
      expect(importResult).toBe(false);
      expect(result.current.theme.id).toBe('default');
    });
  });

  describe('theme roundtrip', () => {
    it('can export and re-import theme without data loss', () => {
      const { result } = renderHook(() => useThemeStore());
      act(() => {
        result.current.updateTheme({ name: 'Modified for Export' });
        result.current.updatePrimaryColor('500', '123 45 67');
      });
      const exported = result.current.exportTheme();
      act(() => result.current.resetTheme());
      expect(result.current.theme.name).toBe('Default Blue');
      let importResult = false;
      act(() => {
        importResult = result.current.importTheme(exported);
      });
      expect(importResult).toBe(true);
      expect(result.current.theme.name).toBe('Modified for Export');
      expect(result.current.theme.primary['500']).toBe('123 45 67');
    });
  });
});
