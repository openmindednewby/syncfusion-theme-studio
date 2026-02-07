import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { useThemeStore } from '@/stores/useThemeStore';

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const themeLabel =
    mode === 'light' ? FM('login.themeSwitchDark') : FM('login.themeSwitchLight');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Demo login - just redirect to dashboard
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Theme toggle */}
        <div className="mb-4 flex justify-end">
          <button
            aria-label={themeLabel}
            className="rounded-md p-2 text-text-secondary hover:bg-surface"
            type="button"
            onClick={toggleMode}
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="card">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-text-primary">{FM('login.title')}</h1>
            <p className="mt-1 text-text-secondary">{FM('login.subtitle')}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-text-primary" htmlFor="email">
                {FM('login.email')}
              </label>
              <input
                required
                className="input"
                id="email"
                placeholder={FM('login.emailPlaceholder')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-text-primary"
                htmlFor="password"
              >
                {FM('login.password')}
              </label>
              <input
                required
                className="input"
                id="password"
                placeholder={FM('login.passwordPlaceholder')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-full" type="submit">
              {FM('login.submit')}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-text-muted">{FM('login.demoHint')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
