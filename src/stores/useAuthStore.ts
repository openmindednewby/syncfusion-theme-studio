import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { FM } from '@/localization/utils/helpers';
import { type Permission, getPermissionsForRole } from '@/shared/permissions';
import { isValueDefined } from '@/utils/is';

const LOGIN_URL = '/mockapi/api/auth/login';
const AUTH_STORAGE_KEY = 'auth-storage';
const STORE_NAME = 'AuthStore';
const STORAGE_VERSION = 2;
const INVALID_CREDENTIALS_KEY = 'login.invalidCredentials';
const LOGIN_FAILED_KEY = 'login.loginFailed';

interface AuthUser {
  email: string;
  name: string;
  role: string;
}

interface LoginApiResponse {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
  checkAuth: () => void;
}

function buildUserFromResponse(data: LoginApiResponse): AuthUser {
  return {
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    role: data.role,
  };
}

function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : FM(LOGIN_FAILED_KEY);
}

async function callLoginApi(
  username: string,
  password: string,
): Promise<LoginApiResponse> {
  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      publicIp: '',
      username,
      password,
      recaptchaToken: '',
    }),
  });
  if (!res.ok) throw new Error(FM(INVALID_CREDENTIALS_KEY));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: LoginApiResponse = await res.json();
  return data;
}

type LoggedOutFields = Pick<
  AuthState,
  'isAuthenticated' | 'isLoading' | 'permissions' | 'token' | 'user'
>;

const LOGGED_OUT_STATE: LoggedOutFields = {
  token: null,
  user: null,
  permissions: [],
  isAuthenticated: false,
  isLoading: false,
};

function buildLoginSuccessState(data: LoginApiResponse): Partial<AuthState> {
  const user = buildUserFromResponse(data);
  return {
    token: data.token,
    user,
    permissions: getPermissionsForRole(data.role),
    isAuthenticated: true,
    isLoading: false,
  };
}

function deriveAuthFromPersistedState(
  state: Pick<AuthState, 'token' | 'user'>,
): Pick<AuthState, 'isAuthenticated' | 'isLoading' | 'permissions'> {
  const isAuthenticated = isValueDefined(state.token);
  const permissions =
    isAuthenticated && isValueDefined(state.user)
      ? getPermissionsForRole(state.user.role)
      : [];
  return { isAuthenticated, permissions, isLoading: false };
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...LOGGED_OUT_STATE,
        isLoading: true,

        login: async (email, password): Promise<string | null> => {
          set({ isLoading: true }, false, 'login/start');
          try {
            const data = await callLoginApi(email, password);
            set(buildLoginSuccessState(data), false, 'login/success');
            return null;
          } catch (err: unknown) {
            set({ isLoading: false }, false, 'login/error');
            return extractErrorMessage(err);
          }
        },

        logout: () => set(LOGGED_OUT_STATE, false, 'logout'),

        checkAuth: () =>
          set(
            (state) => deriveAuthFromPersistedState(state),
            false,
            'checkAuth',
          ),
      }),
      {
        name: AUTH_STORAGE_KEY,
        version: STORAGE_VERSION,
        partialize: (state) => ({ token: state.token, user: state.user }),
      },
    ),
    { name: STORE_NAME },
  ),
);
