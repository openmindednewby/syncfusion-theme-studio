/**
 * Login Form - Native form example using FormNativeInput
 */
import ButtonNative, { ButtonVariant } from '@/components/ui/ButtonNative';
import { FormNativeInput, FormCheckbox } from '@/components/ui/form-fields';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import { loginSchema, type LoginFormData } from './schema';

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm = ({ onSubmit }: Props): JSX.Element => {
  const { control, handleSubmit, formState } = useFormWithSchema({ schema: loginSchema });
  const { isSubmitting } = formState;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormNativeInput
        fullWidth
        showRequired
        control={control}
        label={FM('forms.fields.email')}
        name="email"
        placeholder="email@example.com"
        testId="login-email"
        type="email"
      />

      <FormNativeInput
        fullWidth
        showRequired
        control={control}
        label={FM('forms.fields.password')}
        name="password"
        testId="login-password"
        type="password"
      />

      <FormCheckbox
        control={control}
        label={FM('forms.fields.rememberMe')}
        name="rememberMe"
        testId="login-remember"
      />

      <ButtonNative
        fullWidth
        disabled={isSubmitting}
        testId="login-submit"
        type="submit"
        variant={ButtonVariant.Primary}
      >
        {FM('forms.actions.login')}
      </ButtonNative>
    </form>
  );
};
