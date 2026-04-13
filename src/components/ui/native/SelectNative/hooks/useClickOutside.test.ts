import type { RefObject } from 'react';

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { useClickOutside } from './useClickOutside';

function createMockRef(element: HTMLElement | null): RefObject<HTMLDivElement | null> {
  const ref: RefObject<HTMLDivElement | null> = { current: element as HTMLDivElement | null };
  return ref;
}

function fireMouseDown(target: EventTarget): void {
  const event = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(event, 'target', { value: target });
  document.dispatchEvent(event);
}

describe('useClickOutside', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls callback when clicking outside the ref element', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);

    const callback = vi.fn();
    const ref = createMockRef(container);

    renderHook(() => useClickOutside(ref, callback, true));

    fireMouseDown(outsideElement);

    expect(callback).toHaveBeenCalledOnce();

    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('does not call callback when clicking inside the ref element', () => {
    const container = document.createElement('div');
    const childElement = document.createElement('span');
    container.appendChild(childElement);
    document.body.appendChild(container);

    const callback = vi.fn();
    const ref = createMockRef(container);

    renderHook(() => useClickOutside(ref, callback, true));

    fireMouseDown(childElement);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('does not call callback when clicking the ref element itself', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const callback = vi.fn();
    const ref = createMockRef(container);

    renderHook(() => useClickOutside(ref, callback, true));

    fireMouseDown(container);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('does not attach listener when isActive is false', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);

    const callback = vi.fn();
    const ref = createMockRef(container);

    renderHook(() => useClickOutside(ref, callback, false));

    fireMouseDown(outsideElement);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('attaches listener when isActive changes to true', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);

    const callback = vi.fn();
    const ref = createMockRef(container);
    let isActive = false;

    const { rerender } = renderHook(() => useClickOutside(ref, callback, isActive));

    fireMouseDown(outsideElement);
    expect(callback).not.toHaveBeenCalled();

    isActive = true;
    rerender();

    fireMouseDown(outsideElement);
    expect(callback).toHaveBeenCalledOnce();

    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('cleans up listener on unmount', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);

    const callback = vi.fn();
    const ref = createMockRef(container);

    const { unmount } = renderHook(() => useClickOutside(ref, callback, true));

    unmount();

    fireMouseDown(outsideElement);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('handles null ref gracefully', () => {
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);

    const callback = vi.fn();
    const ref = createMockRef(null);

    renderHook(() => useClickOutside(ref, callback, true));

    fireMouseDown(outsideElement);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(outsideElement);
  });

  it('calls callback on touchstart outside the ref element', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);

    const callback = vi.fn();
    const ref = createMockRef(container);

    renderHook(() => useClickOutside(ref, callback, true));

    const touchEvent = new Event('touchstart', { bubbles: true });
    Object.defineProperty(touchEvent, 'target', { value: outsideElement });
    document.dispatchEvent(touchEvent);

    expect(callback).toHaveBeenCalledOnce();

    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('does not call callback on touchstart inside the ref element', () => {
    const container = document.createElement('div');
    const childElement = document.createElement('span');
    container.appendChild(childElement);
    document.body.appendChild(container);

    const callback = vi.fn();
    const ref = createMockRef(container);

    renderHook(() => useClickOutside(ref, callback, true));

    const touchEvent = new Event('touchstart', { bubbles: true });
    Object.defineProperty(touchEvent, 'target', { value: childElement });
    document.dispatchEvent(touchEvent);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(container);
  });

  it('does not re-register listeners when only the callback changes', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const ref = createMockRef(container);

    const { rerender } = renderHook(
      ({ cb }) => useClickOutside(ref, cb, true),
      { initialProps: { cb: callback1 } },
    );

    const initialAddCount = addSpy.mock.calls.length;
    const initialRemoveCount = removeSpy.mock.calls.length;

    // Change only the callback — listeners should NOT be re-registered
    rerender({ cb: callback2 });

    expect(addSpy.mock.calls.length).toBe(initialAddCount);
    expect(removeSpy.mock.calls.length).toBe(initialRemoveCount);

    // Verify the new callback is invoked (via callbackRef pattern)
    const outsideElement = document.createElement('button');
    document.body.appendChild(outsideElement);
    fireMouseDown(outsideElement);
    expect(callback2).toHaveBeenCalledOnce();
    expect(callback1).not.toHaveBeenCalled();

    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
