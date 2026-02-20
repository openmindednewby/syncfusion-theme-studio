import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { PWAInstallPrompt } from './PWAInstallPrompt';

describe('PWAInstallPrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('returns null when no beforeinstallprompt event has fired', () => {
    const { container } = render(<PWAInstallPrompt />);
    expect(container.innerHTML).toBe('');
  });

  it('shows install prompt when beforeinstallprompt event fires', () => {
    render(<PWAInstallPrompt />);

    act(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      Object.assign(event, {
        prompt: vi.fn().mockResolvedValue(undefined),
        userChoice: Promise.resolve({ outcome: 'accepted' }),
      });
      window.dispatchEvent(event);
    });

    expect(screen.getByTestId('pwa-install-prompt')).toBeTruthy();
  });

  it('calls prompt() when install button is clicked', async () => {
    const mockPrompt = vi.fn().mockResolvedValue(undefined);
    render(<PWAInstallPrompt />);

    act(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      Object.assign(event, {
        prompt: mockPrompt,
        userChoice: Promise.resolve({ outcome: 'accepted' }),
      });
      window.dispatchEvent(event);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('pwa-install-button'));
    });

    expect(mockPrompt).toHaveBeenCalled();
  });

  it('persists dismissal in localStorage and hides prompt', () => {
    render(<PWAInstallPrompt />);

    act(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      Object.assign(event, {
        prompt: vi.fn().mockResolvedValue(undefined),
        userChoice: Promise.resolve({ outcome: 'dismissed' }),
      });
      window.dispatchEvent(event);
    });

    fireEvent.click(screen.getByTestId('pwa-install-dismiss'));

    expect(localStorage.getItem('pwa-install-dismissed')).toBe('true');
    expect(screen.queryByTestId('pwa-install-prompt')).toBeNull();
  });

  it('does not show prompt if previously dismissed', () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    render(<PWAInstallPrompt />);

    act(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      Object.assign(event, {
        prompt: vi.fn().mockResolvedValue(undefined),
        userChoice: Promise.resolve({ outcome: 'dismissed' }),
      });
      window.dispatchEvent(event);
    });

    expect(screen.queryByTestId('pwa-install-prompt')).toBeNull();
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<PWAInstallPrompt />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('beforeinstallprompt', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
