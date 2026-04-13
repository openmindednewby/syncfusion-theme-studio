import { useCallback, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { useToast, ToastSeverity } from '@/components/ui/native';
import { startPhasedPreload } from '@/config/preloadOrchestrator';
import { FM } from '@/localization/utils/helpers';

import { LoginBackground, LoginBrandPanel, LoginDemoCredentials, LoginFormPanel } from './components';
import { useLoginForm } from './hooks/useLoginForm';

/** Toggle gradient animation on the brand panel. */
const ANIMATE_GRADIENT = true;

const LoginPage = (): JSX.Element => {
  const { email, password, isLoading, error, onEmailChange, onPasswordChange, onSubmit, setCredentials } = useLoginForm();
  const { addToast } = useToast();

  const handleForgotPassword = useCallback(() => {
    addToast({
      severity: ToastSeverity.Info,
      title: FM('login.forgotPasswordDemoTitle'),
      message: FM('login.forgotPasswordDemoMessage'),
    });
  }, [addToast]);

  useEffect(() => {
    startPhasedPreload();
  }, []);

  return (
    <main
      className="relative flex w-full min-h-screen items-center justify-center overflow-x-hidden p-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <LoginBackground />
      <div className="absolute left-4 top-4 z-20 sm:left-8 sm:top-8">
        <Link
          className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          data-testid="login-back-to-home"
          to={RoutePath.Root}
        >
          {FM('login.backToHome')}
        </Link>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="flex w-full max-w-[926px] min-h-[425px] flex-col overflow-hidden rounded-[18px] sm:h-[305px] sm:min-h-0 sm:flex-row"
          style={{ boxShadow: '20px 20px 20px -13px rgba(0, 0, 0, 0.25)' }}
        >
          <LoginBrandPanel animateGradient={ANIMATE_GRADIENT} />
          <LoginFormPanel
            email={email}
            error={error}
            isLoading={isLoading}
            password={password}
            onEmailChange={onEmailChange}
            onForgotPassword={handleForgotPassword}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
          />
        </div>
        <LoginDemoCredentials onSelectCredentials={setCredentials} />
      </div>
    </main>
  );
};

export default LoginPage;
