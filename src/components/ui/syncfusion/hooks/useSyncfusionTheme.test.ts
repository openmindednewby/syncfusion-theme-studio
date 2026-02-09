import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';


import { useSyncfusionTheme, getButtonClasses } from './useSyncfusionTheme';

// Mock useThemeStore
const mockMode = { current: 'light' as 'light' | 'dark' };
vi.mock('@/stores/useThemeStore', () => ({
  useThemeStore: () => ({
    mode: mockMode.current,
  }),
}));

describe('useSyncfusionTheme', () => {
  beforeEach(() => {
    mockMode.current = 'light';
  });

  describe('modeClass', () => {
    it('returns sf-light in light mode', () => {
      mockMode.current = 'light';
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.modeClass).toBe('sf-light');
    });

    it('returns sf-dark in dark mode', () => {
      mockMode.current = 'dark';
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.modeClass).toBe('sf-dark');
    });
  });

  describe('baseClass', () => {
    it('returns the base theme prefix', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.baseClass).toBe('sf-themed');
    });
  });

  describe('button classes', () => {
    it('returns correct primary button classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.button.primary).toContain('e-primary');
      expect(result.current.button.primary).toContain('sf-btn-primary');
    });

    it('returns correct secondary button classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.button.secondary).toContain('e-info');
      expect(result.current.button.secondary).toContain('sf-btn-secondary');
    });

    it('returns correct outline button classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.button.outline).toContain('e-outline');
      expect(result.current.button.outline).toContain('sf-btn-outline');
    });

    it('returns correct ghost button classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.button.ghost).toContain('e-flat');
      expect(result.current.button.ghost).toContain('sf-btn-ghost');
    });

    it('returns correct danger button classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.button.danger).toContain('e-danger');
      expect(result.current.button.danger).toContain('sf-btn-danger');
    });
  });

  describe('buttonSize classes', () => {
    it('returns correct small size classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.buttonSize.sm).toContain('e-small');
      expect(result.current.buttonSize.sm).toContain('sf-size-sm');
    });

    it('returns correct medium size classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.buttonSize.md).toContain('sf-size-md');
    });

    it('returns correct large size classes', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.buttonSize.lg).toContain('e-large');
      expect(result.current.buttonSize.lg).toContain('sf-size-lg');
    });
  });

  describe('input classes', () => {
    it('returns base input class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.input.base).toBe('sf-input');
    });

    it('returns error input class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.input.error).toContain('e-error');
      expect(result.current.input.error).toContain('sf-input-error');
    });
  });

  describe('select classes', () => {
    it('returns base select class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.select.base).toBe('sf-select');
    });

    it('returns error select class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.select.error).toContain('e-error');
      expect(result.current.select.error).toContain('sf-select-error');
    });
  });

  describe('dataGrid classes', () => {
    it('returns base dataGrid class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.dataGrid.base).toBe('sf-datagrid');
    });
  });

  describe('datePicker classes', () => {
    it('returns base datePicker class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.datePicker.base).toBe('sf-datepicker');
    });

    it('returns error datePicker class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.datePicker.error).toContain('e-error');
      expect(result.current.datePicker.error).toContain('sf-datepicker-error');
    });
  });

  describe('dialog classes', () => {
    it('returns base dialog class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.dialog.base).toBe('sf-dialog');
    });

    it('returns confirm dialog class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.dialog.confirm).toBe('sf-dialog-confirm');
    });

    it('returns danger dialog class', () => {
      const { result } = renderHook(() => useSyncfusionTheme());
      expect(result.current.dialog.danger).toBe('sf-dialog-danger');
    });
  });
});

describe('getButtonClasses', () => {
  it('returns correct classes for primary button in light mode', () => {
    const classes = getButtonClasses('primary', 'md', 'light');
    expect(classes).toContain('sf-themed');
    expect(classes).toContain('sf-light');
    expect(classes).toContain('e-primary');
    expect(classes).toContain('sf-btn-primary');
    expect(classes).toContain('sf-size-md');
  });

  it('returns correct classes for danger button in dark mode', () => {
    const classes = getButtonClasses('danger', 'lg', 'dark');
    expect(classes).toContain('sf-themed');
    expect(classes).toContain('sf-dark');
    expect(classes).toContain('e-danger');
    expect(classes).toContain('sf-btn-danger');
    expect(classes).toContain('e-large');
    expect(classes).toContain('sf-size-lg');
  });

  it('returns correct classes for outline button with small size', () => {
    const classes = getButtonClasses('outline', 'sm', 'light');
    expect(classes).toContain('e-outline');
    expect(classes).toContain('sf-btn-outline');
    expect(classes).toContain('e-small');
    expect(classes).toContain('sf-size-sm');
  });
});
