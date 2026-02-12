import { type ReactNode } from 'react';

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';


import { ToastProvider, useToast } from './ToastContext';
import { buildToastClassName } from './ToastItem';
import { ToastSeverity, AUTO_DISMISS_MS, EXIT_ANIMATION_MS, MAX_VISIBLE_TOASTS } from './types';

import type { Toast } from './types';


const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <ToastProvider>{children}</ToastProvider>
);

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('crypto', { randomUUID: vi.fn(() => `uuid-${Date.now()}-${Math.random()}`) });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('useToast', () => {
  it('throws when used outside ToastProvider', () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used within a ToastProvider',
    );
  });

  it('returns addToast function inside provider', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.addToast).toBe('function');
  });
});

describe('addToast', () => {
  it('generates unique IDs for each toast', () => {
    let callCount = 0;
    vi.stubGlobal('crypto', {
      randomUUID: vi.fn(() => {
        callCount += 1;
        return `uuid-${callCount}`;
      }),
    });

    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({ severity: ToastSeverity.Success, title: 'A', message: 'msg-a' });
    });
    act(() => {
      result.current.addToast({ severity: ToastSeverity.Error, title: 'B', message: 'msg-b' });
    });

    expect(crypto.randomUUID).toHaveBeenCalledTimes(2);
  });
});

describe('auto-dismiss', () => {
  it('dismisses toast after AUTO_DISMISS_MS', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({ severity: ToastSeverity.Info, title: 'Test', message: 'msg' });
    });

    const container = document.querySelector('[data-testid="native-toast-container"]');
    expect(container).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(AUTO_DISMISS_MS);
    });

    // After AUTO_DISMISS_MS, toast enters dismissing state (exit animation)
    const dismissingToast = document.querySelector('.native-toast-dismissing');
    expect(dismissingToast).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(EXIT_ANIMATION_MS);
    });

    // After exit animation, toast is fully removed
    const remainingContainer = document.querySelector('[data-testid="native-toast-container"]');
    expect(remainingContainer).toBeNull();
  });

  it('clears auto-dismiss timer on manual dismiss', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({ severity: ToastSeverity.Warning, title: 'Test', message: 'msg' });
    });

    // Manually dismiss via close button
    const closeButton = document.querySelector('.native-toast-close') as HTMLButtonElement;
    expect(closeButton).toBeTruthy();

    act(() => {
      closeButton.click();
    });

    // Toast enters dismissing state
    const dismissingToast = document.querySelector('.native-toast-dismissing');
    expect(dismissingToast).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(EXIT_ANIMATION_MS);
    });

    // Toast removed
    expect(document.querySelector('[data-testid="native-toast-container"]')).toBeNull();

    // Advancing past AUTO_DISMISS_MS should not cause errors (timer was cleared)
    act(() => {
      vi.advanceTimersByTime(AUTO_DISMISS_MS);
    });
  });
});

describe('dismiss behavior', () => {
  it('marks toast as dismissing before removal', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({ severity: ToastSeverity.Error, title: 'Test', message: 'msg' });
    });

    expect(document.querySelector('.native-toast-dismissing')).toBeNull();

    const closeButton = document.querySelector('.native-toast-close') as HTMLButtonElement;

    act(() => {
      closeButton.click();
    });

    // Dismissing class applied
    expect(document.querySelector('.native-toast-dismissing')).toBeTruthy();
    // Toast still in DOM during exit animation
    expect(document.querySelector('[data-testid="native-toast-container"]')).toBeTruthy();
  });

  it('removes toast after EXIT_ANIMATION_MS', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({ severity: ToastSeverity.Success, title: 'Test', message: 'msg' });
    });

    const closeButton = document.querySelector('.native-toast-close') as HTMLButtonElement;

    act(() => {
      closeButton.click();
    });

    act(() => {
      vi.advanceTimersByTime(EXIT_ANIMATION_MS);
    });

    expect(document.querySelector('[data-testid="native-toast-container"]')).toBeNull();
  });
});

describe('max toast limit', () => {
  it('dismisses oldest toast when exceeding MAX_VISIBLE_TOASTS', () => {
    let callCount = 0;
    vi.stubGlobal('crypto', {
      randomUUID: vi.fn(() => {
        callCount += 1;
        return `uuid-${callCount}`;
      }),
    });

    const { result } = renderHook(() => useToast(), { wrapper });

    // Add MAX_VISIBLE_TOASTS + 1 toasts
    for (let i = 0; i <= MAX_VISIBLE_TOASTS; i += 1) 
      act(() => {
        result.current.addToast({ severity: ToastSeverity.Info, title: `Toast ${i}`, message: `msg-${i}` });
      });
    

    // The oldest toast should be in dismissing state
    const dismissingToasts = document.querySelectorAll('.native-toast-dismissing');
    expect(dismissingToasts.length).toBeGreaterThanOrEqual(1);
  });
});

describe('timer cleanup on unmount', () => {
  it('clears all timers when provider unmounts', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    const { result, unmount } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast({ severity: ToastSeverity.Info, title: 'A', message: 'msg' });
      result.current.addToast({ severity: ToastSeverity.Error, title: 'B', message: 'msg' });
    });

    unmount();

    // clearTimeout should have been called for the auto-dismiss timers
    expect(clearTimeoutSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
});

describe('buildToastClassName', () => {
  it('returns correct class for each severity', () => {
    const severities = [ToastSeverity.Success, ToastSeverity.Warning, ToastSeverity.Error, ToastSeverity.Info] as const;
    severities.forEach((severity) => {
      const toast: Toast = { id: '1', severity, title: 'T', message: 'M' };
      expect(buildToastClassName(toast)).toBe(`native-toast native-toast-${severity}`);
    });
  });

  it('appends dismissing class when toast is dismissing', () => {
    const toast: Toast = { id: '1', severity: ToastSeverity.Success, title: 'T', message: 'M', dismissing: true };
    expect(buildToastClassName(toast)).toBe('native-toast native-toast-success native-toast-dismissing');
  });

  it('does not append dismissing class when dismissing is false', () => {
    const toast: Toast = { id: '1', severity: ToastSeverity.Error, title: 'T', message: 'M', dismissing: false };
    expect(buildToastClassName(toast)).toBe('native-toast native-toast-error');
  });
});
