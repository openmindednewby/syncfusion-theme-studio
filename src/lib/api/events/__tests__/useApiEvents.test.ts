import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { apiEventBus } from '../apiEventBus';

import type { ApiEvent } from '../apiEventTypes';

const mockAddToast = vi.fn();

vi.mock('@/components/ui/native', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- tsc TS2698 requires cast for spreading
  const actual = await importOriginal() as Record<string, unknown>;
  return {
    ...actual,
    useToast: () => ({ addToast: mockAddToast }),
  };
});

// Mock FM to return key as-is (already mocked in setup via i18n)
vi.mock('@/localization/helpers', () => ({
  FM: (key: string) => key,
}));

describe('useApiEvents', () => {
  beforeEach(() => {
    mockAddToast.mockClear();
    apiEventBus.clear();
  });

  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let useApiEventsModule: typeof import('../useApiEvents');

  beforeEach(async () => {
    useApiEventsModule = await import('../useApiEvents');
  });

  it('calls addToast when toast event is emitted', () => {
    renderHook(() => useApiEventsModule.useApiEvents());

    act(() => {
      const event: ApiEvent = {
        type: 'toast',
        severity: 'error' as never,
        message: 'errors.serverError',
      };
      apiEventBus.emit(event);
    });

    expect(mockAddToast).toHaveBeenCalledTimes(1);
    expect(mockAddToast).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'error',
        message: 'errors.serverError',
      }),
    );
  });

  it('returns activeModal as null initially', () => {
    const { result } = renderHook(() => useApiEventsModule.useApiEvents());

    expect(result.current.activeModal).toBeNull();
  });

  it('sets activeModal when modal event is emitted', () => {
    const { result } = renderHook(() => useApiEventsModule.useApiEvents());

    act(() => {
      const event: ApiEvent = {
        type: 'modal',
        modalComponent: 'TestModal',
        message: 'Test',
        severity: 'warning' as never,
      };
      apiEventBus.emit(event);
    });

    expect(result.current.activeModal).toBeDefined();
    expect(result.current.activeModal?.modalComponent).toBe('TestModal');
  });

  it('dismissModal clears activeModal', () => {
    const { result } = renderHook(() => useApiEventsModule.useApiEvents());

    act(() => {
      apiEventBus.emit({
        type: 'modal',
        modalComponent: 'TestModal',
        message: 'Test',
        severity: 'error' as never,
      });
    });

    expect(result.current.activeModal).toBeDefined();

    act(() => {
      result.current.dismissModal();
    });

    expect(result.current.activeModal).toBeNull();
  });

  it('unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => useApiEventsModule.useApiEvents());

    unmount();

    act(() => {
      apiEventBus.emit({
        type: 'toast',
        severity: 'error' as never,
        message: 'Should not be received',
      });
    });

    expect(mockAddToast).not.toHaveBeenCalled();
  });
});
