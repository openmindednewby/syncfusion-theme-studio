import { useState, useCallback, type ChangeEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { ButtonNative, InputNative } from '@/components/ui';
import { preloadSyncfusionModules } from '@/config/syncfusionLazy';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useLicenseStore } from '@/stores/useLicenseStore';
import { useThemeStore } from '@/stores/useThemeStore';

const DEFAULT_EMAIL = 'demo@example.com';
const DEFAULT_PASSWORD = 'demo123';
const DEFAULT_LICENSE_KEY =
  'Ngo9BigBOggjGyl/VkR+XU9Ff1RBQmJJYVF2R2VJflx6dFVMZV5BJAtUQF1hT35Rdk1iXHxWdHVVRWJaWkd0';

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeStore();
  const { licenseKey, setLicenseKey } = useLicenseStore();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  // Use stored key if available, otherwise use default
  const [localLicenseKey, setLocalLicenseKey] = useState(
    licenseKey !== '' ? licenseKey : DEFAULT_LICENSE_KEY,
  );

  const themeLabel =
    mode === 'light' ? FM('login.themeSwitchDark') : FM('login.themeSwitchLight');
  const themeIcon = mode === 'light' ? 'moon' : 'sun';

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleLicenseKeyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalLicenseKey(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      // Save license key if provided
      if (localLicenseKey !== '') setLicenseKey(localLicenseKey);

      // Preload Syncfusion modules in background before navigation
      preloadSyncfusionModules();

      // Demo login - redirect to dashboard
      navigate('/dashboard');
    },
    [navigate, localLicenseKey, setLicenseKey],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Theme toggle */}
        <div className="mb-4 flex justify-end">
          <button
            aria-label={themeLabel}
            className="rounded-md p-2 text-text-secondary hover:bg-surface"
            data-testid={TestIds.THEME_TOGGLE}
            type="button"
            onClick={toggleMode}
          >
            {themeIcon === 'moon' ? (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            )}
          </button>
        </div>

        <div className="card">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-text-primary">{FM('login.title')}</h1>
            <p className="mt-1 text-text-secondary">{FM('login.subtitle')}</p>
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

            <div className="border-t border-border pt-4">
              <InputNative
                fullWidth
                label={FM('login.licenseKey')}
                placeholder={FM('login.licenseKeyPlaceholder')}
                testId={TestIds.LOGIN_LICENSE_KEY}
                type="text"
                value={localLicenseKey}
                onChange={handleLicenseKeyChange}
              />
              <p className="mt-1 text-xs text-text-muted">{FM('login.licenseKeyHint')}</p>
            </div>

            <ButtonNative fullWidth testId={TestIds.LOGIN_SUBMIT} type="submit" variant="primary">
              {FM('login.submit')}
            </ButtonNative>
          </form>

          <p className="mt-4 text-center text-sm text-text-muted">{FM('login.demoHint')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
