/**
 * Registration Form Component
 *
 * Demonstrates cross-field validation with password confirmation
 * and required checkbox for terms acceptance.
 */
import { FormProvider } from 'react-hook-form';

import { FormInput, FormCheckbox } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import {
  registrationFormSchema,
  defaultRegistrationFormValues,
  type RegistrationFormData,
} from './schema';

const FORM_CONFIG = { schema: registrationFormSchema, defaultValues: defaultRegistrationFormValues };

interface Props {
  onSubmit: (data: RegistrationFormData) => void;
}

export const RegistrationForm = ({ onSubmit }: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);

  const { handleSubmit, control, reset, formState } = form;
  const { isSubmitting, isDirty } = formState;

  function handleFormSubmit(data: RegistrationFormData): void {
    onSubmit(data);
    reset();
  }

  function handleReset(): void {
    reset();
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormInput<RegistrationFormData>
          fullWidth
          required
          control={control}
          label={FM('forms.registration.email')}
          name="email"
          placeholder={FM('forms.registration.emailPlaceholder')}
          testId="registration-form-email"
          type="email"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput<RegistrationFormData>
            fullWidth
            required
            control={control}
            helperText={FM('forms.registration.passwordHelper')}
            label={FM('forms.registration.password')}
            name="password"
            placeholder={FM('forms.registration.passwordPlaceholder')}
            testId="registration-form-password"
            type="password"
          />
          <FormInput<RegistrationFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.registration.confirmPassword')}
            name="confirmPassword"
            placeholder={FM('forms.registration.confirmPasswordPlaceholder')}
            testId="registration-form-confirm-password"
            type="password"
          />
        </div>

        <FormCheckbox<RegistrationFormData>
          showRequired
          control={control}
          label={FM('forms.registration.acceptTerms')}
          name="acceptTerms"
          testId="registration-form-terms"
        />

        <div className="flex justify-end gap-2 pt-2">
          <ButtonNative
            disabled={!isDirty}
            testId="registration-form-reset"
            type="button"
            variant={ButtonVariant.Outline}
            onClick={handleReset}
          >
            {FM('common.reset')}
          </ButtonNative>
          <ButtonNative
            disabled={isSubmitting}
            testId="registration-form-submit"
            type="submit"
            variant={ButtonVariant.Primary}
          >
            {FM('forms.registration.submit')}
          </ButtonNative>
        </div>
      </form>
    </FormProvider>
  );
}
