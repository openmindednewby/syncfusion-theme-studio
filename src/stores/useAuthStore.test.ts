import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useAuthStore } from './useAuthStore';

const MOCK_TOKEN = 'mock-jwt-abc123';
const MOCK_USER_EMAIL = 'demo@example.com';
const MOCK_USER_NAME = 'John Doe';
const MOCK_USER_ROLE = 'admin';

const MOCK_LOGIN_RESPONSE = {
  token: MOCK_TOKEN,
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: MOCK_USER_EMAIL,
  role: MOCK_USER_ROLE,
};

function resetStore(): void {
  useAuthStore.setState({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });
}

describe('useAuthStore', () => {
  beforeEach(() => {
    resetStore();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts with null token and unauthenticated', () => {
      const state = useAuthStore.getState();

      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('login', () => {
    it('sets token and user on successful login', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_LOGIN_RESPONSE,
      } as Response);

      const result = await useAuthStore.getState().login('demo@example.com', 'demo123');

      expect(result).toBeNull();
      const state = useAuthStore.getState();
      expect(state.token).toBe(MOCK_TOKEN);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.email).toBe(MOCK_USER_EMAIL);
      expect(state.user?.name).toBe(MOCK_USER_NAME);
      expect(state.user?.role).toBe(MOCK_USER_ROLE);
    });

    it('returns error message on failed login', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 401,
      } as Response);

      const result = await useAuthStore.getState().login('bad', 'bad');

      expect(result).toBeTruthy();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().token).toBeNull();
    });

    it('sets isLoading to false after login completes', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_LOGIN_RESPONSE,
      } as Response);

      await useAuthStore.getState().login('demo@example.com', 'demo123');

      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    it('clears token and user on logout', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => MOCK_LOGIN_RESPONSE,
      } as Response);

      await useAuthStore.getState().login('demo@example.com', 'demo123');
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('checkAuth', () => {
    it('marks authenticated when token exists', () => {
      useAuthStore.setState({ token: MOCK_TOKEN, isLoading: true });

      useAuthStore.getState().checkAuth();

      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });

    it('marks unauthenticated when no token', () => {
      useAuthStore.setState({ token: null, isLoading: true });

      useAuthStore.getState().checkAuth();

      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });
});
