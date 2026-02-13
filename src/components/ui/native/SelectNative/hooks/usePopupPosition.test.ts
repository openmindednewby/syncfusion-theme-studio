import type { RefObject } from 'react';

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { MIN_SPACE_BELOW_PX } from '../constants';
import { PopupPosition } from '../PopupPosition';
import { usePopupPosition } from './usePopupPosition';

const VIEWPORT_HEIGHT = 800;
const TRIGGER_HEIGHT = 40;

function createTriggerRef(rect: Partial<DOMRect> | null): RefObject<HTMLButtonElement | null> {
  if (rect === null) {
    const nullRef: RefObject<HTMLButtonElement | null> = { current: null };
    return nullRef;
  }

  const element = {
    getBoundingClientRect: vi.fn(() => ({
      top: 0,
      left: 0,
      right: 100,
      width: 100,
      height: TRIGGER_HEIGHT,
      bottom: TRIGGER_HEIGHT,
      x: 0,
      y: 0,
      toJSON: vi.fn(),
      ...rect,
    })),
  } as unknown as HTMLButtonElement;

  const ref: RefObject<HTMLButtonElement | null> = { current: element };
  return ref;
}

describe('usePopupPosition', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns below by default when closed', () => {
    const ref = createTriggerRef({ bottom: 100 });
    const { result } = renderHook(() => usePopupPosition(ref, false));

    expect(result.current).toBe(PopupPosition.Below);
  });

  it('returns below when enough space exists below', () => {
    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT);

    const triggerBottom = 100;
    const ref = createTriggerRef({ bottom: triggerBottom });
    const { result } = renderHook(() => usePopupPosition(ref, true));

    const spaceBelow = VIEWPORT_HEIGHT - triggerBottom;
    expect(spaceBelow).toBeGreaterThanOrEqual(MIN_SPACE_BELOW_PX);
    expect(result.current).toBe(PopupPosition.Below);
  });

  it('returns above when not enough space below', () => {
    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT);

    const triggerBottom = VIEWPORT_HEIGHT - MIN_SPACE_BELOW_PX + 1;
    const ref = createTriggerRef({ bottom: triggerBottom });
    const { result } = renderHook(() => usePopupPosition(ref, true));

    expect(result.current).toBe(PopupPosition.Above);
  });

  it('returns below when space exactly equals minimum', () => {
    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT);

    const triggerBottom = VIEWPORT_HEIGHT - MIN_SPACE_BELOW_PX;
    const ref = createTriggerRef({ bottom: triggerBottom });
    const { result } = renderHook(() => usePopupPosition(ref, true));

    expect(result.current).toBe(PopupPosition.Below);
  });

  it('does not recalculate when ref is null', () => {
    const ref = createTriggerRef(null);
    const { result } = renderHook(() => usePopupPosition(ref, true));

    expect(result.current).toBe(PopupPosition.Below);
  });

  it('recalculates when isOpen changes to true', () => {
    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT);

    const triggerBottom = VIEWPORT_HEIGHT - MIN_SPACE_BELOW_PX + 1;
    const ref = createTriggerRef({ bottom: triggerBottom });
    let isOpen = false;

    const { result, rerender } = renderHook(() => usePopupPosition(ref, isOpen));

    expect(result.current).toBe(PopupPosition.Below);

    isOpen = true;
    rerender();

    expect(result.current).toBe(PopupPosition.Above);
  });

  it('returns above when trigger is near the bottom of viewport', () => {
    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT);

    const triggerBottom = VIEWPORT_HEIGHT - 10;
    const ref = createTriggerRef({ bottom: triggerBottom });
    const { result } = renderHook(() => usePopupPosition(ref, true));

    expect(result.current).toBe(PopupPosition.Above);
  });
});
