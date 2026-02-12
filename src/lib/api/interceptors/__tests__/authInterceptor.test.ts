import { vi, describe, it, expect } from 'vitest';

import { attachAuthHeader, registerAuthInterceptor } from '../authInterceptor';

interface ConfigLike {
  headers: { set: ReturnType<typeof vi.fn> };
}

function createConfig(): ConfigLike {
  return {
    headers: { set: vi.fn() },
  };
}

describe('authInterceptor', () => {
  describe('attachAuthHeader', () => {
    it('returns the config object unchanged (no-op stub)', () => {
      const config = createConfig();

      const result = attachAuthHeader(config as never);

      expect(result).toBe(config);
    });

    it('does not set any headers (stub behavior)', () => {
      const config = createConfig();

      attachAuthHeader(config as never);

      expect(config.headers.set).not.toHaveBeenCalled();
    });
  });

  describe('registerAuthInterceptor', () => {
    it('registers request interceptor on the axios instance', () => {
      const mockUse = vi.fn().mockReturnValue(7);
      const instance = {
        interceptors: { request: { use: mockUse } },
      };

      const id = registerAuthInterceptor(instance as never);

      expect(mockUse).toHaveBeenCalledTimes(1);
      expect(id).toBe(7);
    });

    it('passes attachAuthHeader as the interceptor function', () => {
      const mockUse = vi.fn().mockReturnValue(0);
      const instance = {
        interceptors: { request: { use: mockUse } },
      };

      registerAuthInterceptor(instance as never);

      const interceptorFn = mockUse.mock.calls[0]?.[0];
      expect(interceptorFn).toBe(attachAuthHeader);
    });
  });
});
