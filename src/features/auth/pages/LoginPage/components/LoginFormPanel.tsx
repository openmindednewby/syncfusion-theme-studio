import type { ChangeEvent } from 'react';

import { ButtonNative, ButtonVariant, InputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

interface Props {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onForgotPassword: () => void;
}

const panelStyle: React.CSSProperties & Record<string, string> = {
  backgroundColor: 'var(--login-panel-bg)',
  '--component-input-label': 'var(--login-label)',
  '--component-input-background': 'var(--login-input-bg)',
  '--component-input-border-default': 'transparent',
  '--component-input-border-hover': 'transparent',
  '--component-input-border-focus': 'var(--login-focus-border)',
  '--component-input-focus-ring': 'var(--login-focus-ring)',
  '--component-input-border-radius': '8px',
  '--component-input-text-color': 'rgb(17 24 39)',
  '--component-input-placeholder': 'rgb(156 163 175)',
  '--component-button-primary-shadow': 'none',
  '--component-button-primary-bg': 'var(--login-btn-bg)',
  '--component-button-primary-bg-hover': 'var(--login-btn-hover)',
  '--component-button-primary-text': 'var(--login-btn-text)',
  '--component-button-primary-border': 'transparent',
  '--component-button-primary-border-radius': '8px',
};

const LoginFormPanel = ({ email, password, isLoading, error, onEmailChange, onPasswordChange, onSubmit, onForgotPassword }: Props): JSX.Element => (
  <div
    className="flex min-h-[256px] flex-col items-center justify-center sm:min-h-0 sm:w-1/2"
    style={panelStyle}
  >
    <form className="flex w-[322px] flex-col items-center gap-[14px]" onSubmit={onSubmit}>
      <InputNative
        fullWidth
        label={FM('login.username')}
        testId={TestIds.LOGIN_USERNAME}
        type="text"
        value={email}
        onChange={onEmailChange}
      />

      <div className="w-full">
        <InputNative
          fullWidth
          label={FM('login.password')}
          testId={TestIds.LOGIN_PASSWORD}
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <div className="mt-1 text-right">
          <button
            aria-label={FM('login.forgotPassword')}
            className="native-link-subtle"
            data-testid={TestIds.LOGIN_FORGOT_PASSWORD}
            type="button"
            onClick={onForgotPassword}
          >
            {FM('login.forgotPassword')}
          </button>
        </div>
      </div>

      {isValueDefined(error) ? (
        <p className="w-full text-sm text-error-500" data-testid={TestIds.LOGIN_ERROR} role="alert">
          {error}
        </p>
      ) : null}

      <ButtonNative
        className="native-btn-login"
        loading={isLoading}
        testId={TestIds.LOGIN_SUBMIT}
        type="submit"
        variant={ButtonVariant.Primary}
      >
        {FM('login.submit')}
      </ButtonNative>
    </form>
  </div>
);

export default LoginFormPanel;
