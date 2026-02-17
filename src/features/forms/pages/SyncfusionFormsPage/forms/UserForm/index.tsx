/**
 * User Form Component
 *
 * Form for creating and editing users via the MockServer Users API.
 * Uses Syncfusion TextBox components with react-hook-form + Zod validation.
 */
import { useEffect } from 'react';

import { FormProvider } from 'react-hook-form';

import { FormInput } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

import { userFormSchema, defaultUserFormValues, type UserFormData } from './schema';

const FORM_CONFIG = { schema: userFormSchema, defaultValues: defaultUserFormValues };

interface Props {
  onSubmit: (data: UserFormData) => void;
  defaultValues?: Partial<UserFormData>;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const UserForm = ({ onSubmit, defaultValues, isSubmitting, isEditing }: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);

  const { handleSubmit, control, reset, formState } = form;
  const { isDirty } = formState;

  useEffect(() => {
    if (isValueDefined(defaultValues)) reset({ ...defaultUserFormValues, ...defaultValues });
    else reset(defaultUserFormValues);
  }, [defaultValues, reset]);

  function handleFormSubmit(data: UserFormData): void {
    onSubmit(data);
  }

  function handleReset(): void {
    reset(defaultUserFormValues);
  }

  const submitLabel = isEditing ? FM('forms.user.update') : FM('forms.user.create');

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput<UserFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.user.firstName')}
            name="firstName"
            placeholder={FM('forms.user.firstNamePlaceholder')}
            testId="user-form-first-name"
          />
          <FormInput<UserFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.user.lastName')}
            name="lastName"
            placeholder={FM('forms.user.lastNamePlaceholder')}
            testId="user-form-last-name"
          />
        </div>

        <FormInput<UserFormData>
          fullWidth
          required
          control={control}
          label={FM('forms.user.email')}
          name="email"
          placeholder={FM('forms.user.emailPlaceholder')}
          testId="user-form-email"
          type="email"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput<UserFormData>
            fullWidth
            control={control}
            helperText={FM('forms.user.phoneHelper')}
            label={FM('forms.user.phone')}
            name="phone"
            placeholder={FM('forms.user.phonePlaceholder')}
            testId="user-form-phone"
            type="tel"
          />
          <FormInput<UserFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.user.username')}
            name="username"
            placeholder={FM('forms.user.usernamePlaceholder')}
            testId="user-form-username"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <ButtonNative
            disabled={!isDirty && !isEditing}
            testId="user-form-reset"
            type="button"
            variant={ButtonVariant.Outline}
            onClick={handleReset}
          >
            {FM('common.reset')}
          </ButtonNative>
          <ButtonNative
            disabled={isSubmitting}
            testId="user-form-submit"
            type="submit"
            variant={ButtonVariant.Primary}
          >
            {submitLabel}
          </ButtonNative>
        </div>
      </form>
    </FormProvider>
  );
};
