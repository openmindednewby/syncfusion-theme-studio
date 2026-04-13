import { useState, useCallback, useMemo, type ChangeEvent } from 'react';

import { useNavigate, type NavigateFunction } from 'react-router-dom';

import { useAuthStore } from '@/stores/useAuthStore';
import { isValueDefined } from '@/utils/is';

type LoginFn = (email: string, password: string) => Promise<string | null>;

interface LoginFormState {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  setCredentials: (email: string, password: string) => void;
}

const selectLogin = (s: { login: LoginFn }): LoginFn => s.login;
const selectIsStoreLoading = (s: { isLoading: boolean }): boolean => s.isLoading;

const DEFAULT_EMAIL = 'demo@example.com';
const DEFAULT_PASSWORD = 'demo123';

async function handleLoginSubmit(
  login: LoginFn,
  navigate: NavigateFunction,
  email: string,
  password: string,
): Promise<string | null> {
  const errorMessage = await login(email, password);
  if (!isValueDefined(errorMessage)) await navigate('/dashboard');
  return errorMessage;
}

function useInputHandlers(
  setEmail: (v: string) => void,
  setPassword: (v: string) => void,
  setError: (v: string | null) => void,
): Pick<LoginFormState, 'onEmailChange' | 'onPasswordChange' | 'setCredentials'> {
  const onEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    [setEmail],
  );
  const onPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [setPassword],
  );
  const setCredentials = useCallback(
    (newEmail: string, newPassword: string) => {
      setEmail(newEmail);
      setPassword(newPassword);
      setError(null);
    },
    [setEmail, setPassword, setError],
  );
  return { onEmailChange, onPasswordChange, setCredentials };
}

interface SubmitDeps {
  login: LoginFn;
  navigate: NavigateFunction;
  email: string;
  password: string;
}

function useSubmitHandler(
  deps: SubmitDeps,
  setError: (v: string | null) => void,
  setIsSubmitting: (v: boolean) => void,
): (e: React.FormEvent) => Promise<void> {
  return useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);
      const result = await handleLoginSubmit(deps.login, deps.navigate, deps.email, deps.password);
      setError(result);
      setIsSubmitting(false);
    },
    [deps.email, deps.password, deps.login, deps.navigate, setError, setIsSubmitting],
  );
}

export function useLoginForm(): LoginFormState {
  const navigate = useNavigate();
  const login = useAuthStore(selectLogin);
  const isStoreLoading = useAuthStore(selectIsStoreLoading);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlers = useInputHandlers(setEmail, setPassword, setError);
  const submitDeps = useMemo(
    () => ({ login, navigate, email, password }),
    [login, navigate, email, password],
  );
  const onSubmit = useSubmitHandler(submitDeps, setError, setIsSubmitting);

  return {
    email,
    password,
    isLoading: isSubmitting || isStoreLoading,
    error,
    onSubmit,
    ...handlers,
  };
}
