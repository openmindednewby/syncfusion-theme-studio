import { useState, useCallback, useEffect, type ChangeEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { ButtonNative, ButtonVariant, HeadingNative, HeadingLevel, InputNative, TextNative, TextVariant } from '@/components/ui/native';
import { startPhasedPreload } from '@/config/preloadOrchestrator';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const DEFAULT_EMAIL = 'demo@example.com';
const DEFAULT_PASSWORD = 'demo123';

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  // Kick off phased background preloading (critical routes → remaining
  // routes → Syncfusion modules) so heavy chunks never block initial render.
  useEffect(() => {
    startPhasedPreload();
  }, []);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      // Demo login - redirect to dashboard (navigate may return Promise in React Router v7)
      Promise.resolve(navigate('/dashboard')).catch(() => undefined);
    },
    [navigate],
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="mb-6 text-center">
            <HeadingNative level={HeadingLevel.H1}>{FM('login.title')}</HeadingNative>
            <TextNative className="mt-1" variant={TextVariant.Secondary}>{FM('login.subtitle')}</TextNative>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputNative
              fullWidth
              label={FM('login.email')}
              placeholder={FM('login.emailPlaceholder')}
              testId={TestIds.LOGIN_USERNAME}
              type="email"
              value={email}
              onChange={handleEmailChange}
            />

            <InputNative
              fullWidth
              label={FM('login.password')}
              placeholder={FM('login.passwordPlaceholder')}
              testId={TestIds.LOGIN_PASSWORD}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <ButtonNative fullWidth testId={TestIds.LOGIN_SUBMIT} type="submit" variant={ButtonVariant.Primary}>
              {FM('login.submit')}
            </ButtonNative>
          </form>

          <TextNative className="mt-4 text-center" variant={TextVariant.Muted}>{FM('login.demoHint')}</TextNative>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
