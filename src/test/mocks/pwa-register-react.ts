import { vi } from 'vitest';

export function useRegisterSW(_options?: {
  onRegisteredSW?: (url: string, registration: unknown) => void;
}): {
  needRefresh: [boolean, (val: boolean) => void];
  offlineReady: [boolean, (val: boolean) => void];
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
} {
  if (_options?.onRegisteredSW) _options.onRegisteredSW('', null);
  return {
    needRefresh: [false, vi.fn()],
    offlineReady: [false, vi.fn()],
    updateServiceWorker: vi.fn().mockResolvedValue(undefined),
  };
}
