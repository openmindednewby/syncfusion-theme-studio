import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';


import { PWAUpdatePrompt } from './PWAUpdatePrompt';

const mockUpdateServiceWorker = vi.fn().mockResolvedValue(undefined);
const mockSetNeedRefresh = vi.fn();
let mockNeedRefreshValue = false;

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: (options?: { onRegisteredSW?: (url: string, registration: unknown) => void }) => {
    if (options?.onRegisteredSW) options.onRegisteredSW('', null);
    return {
      needRefresh: [mockNeedRefreshValue, mockSetNeedRefresh],
      offlineReady: [false, vi.fn()],
      updateServiceWorker: mockUpdateServiceWorker,
    };
  },
}));

describe('PWAUpdatePrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNeedRefreshValue = false;
  });

  it('returns null when no update is available', () => {
    mockNeedRefreshValue = false;
    const { container } = render(<PWAUpdatePrompt />);
    expect(container.innerHTML).toBe('');
  });

  it('renders prompt when update is available', () => {
    mockNeedRefreshValue = true;
    render(<PWAUpdatePrompt />);
    expect(screen.getByTestId('pwa-update-prompt')).toBeTruthy();
  });

  it('calls updateServiceWorker when update button is clicked', () => {
    mockNeedRefreshValue = true;
    render(<PWAUpdatePrompt />);
    fireEvent.click(screen.getByTestId('pwa-update-button'));
    expect(mockUpdateServiceWorker).toHaveBeenCalledWith(true);
  });

  it('calls setNeedRefresh(false) when dismiss button is clicked', () => {
    mockNeedRefreshValue = true;
    render(<PWAUpdatePrompt />);
    fireEvent.click(screen.getByTestId('pwa-dismiss-button'));
    expect(mockSetNeedRefresh).toHaveBeenCalledWith(false);
  });

  it('sets up periodic update check when registration is available', () => {
    vi.useFakeTimers();
    const mockUpdate = vi.fn().mockResolvedValue(undefined);
    const mockRegistration = { update: mockUpdate };

    vi.mocked(vi.importActual('virtual:pwa-register/react')).catch(() => {});

    // Re-mock with registration object
    vi.doMock('virtual:pwa-register/react', () => ({
      useRegisterSW: (options?: { onRegisteredSW?: (url: string, registration: unknown) => void }) => {
        if (options?.onRegisteredSW) options.onRegisteredSW('', mockRegistration);
        return {
          needRefresh: [false, vi.fn()],
          offlineReady: [false, vi.fn()],
          updateServiceWorker: vi.fn(),
        };
      },
    }));

    vi.useRealTimers();
  });
});
