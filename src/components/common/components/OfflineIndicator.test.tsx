import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { OfflineIndicator } from './OfflineIndicator';

describe('OfflineIndicator', () => {
  const originalOnLine = navigator.onLine;

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true, configurable: true });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'onLine', { value: originalOnLine, writable: true, configurable: true });
  });

  it('returns null when online', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true, configurable: true });
    const { container } = render(<OfflineIndicator />);
    expect(container.innerHTML).toBe('');
  });

  it('shows indicator when initially offline', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true, configurable: true });
    render(<OfflineIndicator />);
    expect(screen.getByTestId('offline-indicator')).toBeTruthy();
  });

  it('shows indicator when offline event fires', () => {
    render(<OfflineIndicator />);
    expect(screen.queryByTestId('offline-indicator')).toBeNull();

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(screen.getByTestId('offline-indicator')).toBeTruthy();
  });

  it('hides indicator when online event fires after being offline', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true, configurable: true });
    render(<OfflineIndicator />);
    expect(screen.getByTestId('offline-indicator')).toBeTruthy();

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(screen.queryByTestId('offline-indicator')).toBeNull();
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<OfflineIndicator />);
    unmount();

    const offlineCall = removeEventListenerSpy.mock.calls.find((call) => call[0] === 'offline');
    const onlineCall = removeEventListenerSpy.mock.calls.find((call) => call[0] === 'online');

    expect(offlineCall).toBeTruthy();
    expect(onlineCall).toBeTruthy();
    removeEventListenerSpy.mockRestore();
  });
});
