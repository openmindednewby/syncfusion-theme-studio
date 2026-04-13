import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/useAuthStore';

import {
  attachAuthHeader,
  handleUnauthorizedResponse,
  registerAuthInterceptor,
  registerAuthResponseInterceptor,
} from './authInterceptor';

const MOCK_TOKEN = 'mock-jwt-token-123';
const HTTP_UNAUTHORIZED = 401;
const HTTP_SERVER_ERROR = 500;

interface ConfigLike {
  headers: { set: ReturnType<typeof vi.fn> };
}

function createConfig(): ConfigLike {
  return { headers: { set: vi.fn() } };
}

function createAxiosError(status: number): { response: { status: number } } {
  return { response: { status } };
}

describe('authInterceptor', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null, isAuthenticated: false, isLoading: false });
    vi.restoreAllMocks();
  });

  describe('attachAuthHeader', () => {
    it('sets Authorization header when token exists', () => {
      useAuthStore.setState({ token: MOCK_TOKEN });
      const config = createConfig();

      attachAuthHeader(config as never);

      expect(config.headers.set).toHaveBeenCalledWith('Authorization', `Bearer ${MOCK_TOKEN}`);
    });

    it('does not set header when token is null', () => {
      const config = createConfig();

      attachAuthHeader(config as never);

      expect(config.headers.set).not.toHaveBeenCalled();
    });
  });

  describe('handleUnauthorizedResponse', () => {
    it('calls logout on 401 response', async () => {
      useAuthStore.setState({ token: MOCK_TOKEN, isAuthenticated: true });
      const error = createAxiosError(HTTP_UNAUTHORIZED);

      await expect(handleUnauthorizedResponse(error as never)).rejects.toBe(error);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().token).toBeNull();
    });

    it('does not logout on non-401 errors', async () => {
      useAuthStore.setState({ token: MOCK_TOKEN, isAuthenticated: true });
      const error = createAxiosError(HTTP_SERVER_ERROR);

      await expect(handleUnauthorizedResponse(error as never)).rejects.toBe(error);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
  });

  describe('registerAuthInterceptor', () => {
    it('registers request interceptor on the axios instance', () => {
      const mockUse = vi.fn().mockReturnValue(7);
      const instance = { interceptors: { request: { use: mockUse } } };

      const id = registerAuthInterceptor(instance as never);

      expect(mockUse).toHaveBeenCalledTimes(1);
      expect(id).toBe(7);
    });
  });

  describe('registerAuthResponseInterceptor', () => {
    it('registers response interceptor on the axios instance', () => {
      const mockUse = vi.fn().mockReturnValue(3);
      const instance = { interceptors: { response: { use: mockUse } } };

      const id = registerAuthResponseInterceptor(instance as never);

      expect(mockUse).toHaveBeenCalledTimes(1);
      expect(id).toBe(3);
    });
  });
});
