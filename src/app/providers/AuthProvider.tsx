import { type ReactNode, useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

const selectCheckAuth = (s: { checkAuth: () => void }): (() => void) => s.checkAuth;

export function AuthProvider({ children }: AuthProviderProps): ReactNode {
  const checkAuth = useAuthStore(selectCheckAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
}
