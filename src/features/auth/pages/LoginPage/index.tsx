import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/stores/useThemeStore';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            type="button"
            onClick={toggleMode}
            className="rounded-md p-2 text-text-secondary hover:bg-surface"
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="card">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-text-primary">Welcome Back</h1>
            <p className="mt-1 text-text-secondary">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-primary">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-text-primary"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-text-muted">
            Demo login - any credentials will work
          </p>
        </div>
      </div>
    </div>
  );
}
