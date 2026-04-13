/**
 * Native User Form Component
 *
 * Form for creating and editing users via the MockServer Users API.
 * Uses native HTML inputs (FormNativeInput) instead of Syncfusion components.
 */
import { useEffect } from 'react';

import { FormNativeInput } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { nativeUserFormSchema, defaultNativeUserFormValues, type NativeUserFormData } from './schema';

const FORM_CONFIG = { schema: nativeUserFormSchema, defaultValues: defaultNativeUserFormValues };

interface Props {
  onSubmit: (data: NativeUserFormData) => void;
  defaultValues?: Partial<NativeUserFormData>;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const NativeUserForm = ({ onSubmit, defaultValues, isSubmitting, isEditing }: Props): JSX.Element => {
  const { handleSubmit, control, reset, formState } = useFormWithSchema(FORM_CONFIG);
  const { isDirty } = formState;

  useEffect(() => {
    if (isValueDefined(defaultValues)) reset({ ...defaultNativeUserFormValues, ...defaultValues });
    else reset(defaultNativeUserFormValues);
  }, [defaultValues, reset]);

  function handleFormSubmit(data: NativeUserFormData): void {
    onSubmit(data);
  }

  function handleReset(): void {
    reset(defaultNativeUserFormValues);
  }

  const submitLabel = isEditing ? FM('forms.user.update') : FM('forms.user.create');

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormNativeInput<NativeUserFormData>
          fullWidth
          required
          control={control}
          label={FM('forms.user.firstName')}
          name="firstName"
          placeholder={FM('forms.user.firstNamePlaceholder')}
          testId="native-user-form-first-name"
        />
        <FormNativeInput<NativeUserFormData>
          fullWidth
          required
          control={control}
          label={FM('forms.user.lastName')}
          name="lastName"
          placeholder={FM('forms.user.lastNamePlaceholder')}
          testId="native-user-form-last-name"
        />
      </div>

      <FormNativeInput<NativeUserFormData>
        fullWidth
        required
        control={control}
        label={FM('forms.user.email')}
        name="email"
        placeholder={FM('forms.user.emailPlaceholder')}
        testId="native-user-form-email"
        type="email"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormNativeInput<NativeUserFormData>
          fullWidth
          control={control}
          helperText={FM('forms.user.phoneHelper')}
          label={FM('forms.user.phone')}
          name="phone"
          placeholder={FM('forms.user.phonePlaceholder')}
          testId="native-user-form-phone"
          type="tel"
        />
        <FormNativeInput<NativeUserFormData>
          fullWidth
          required
          control={control}
          label={FM('forms.user.username')}
          name="username"
          placeholder={FM('forms.user.usernamePlaceholder')}
          testId="native-user-form-username"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <ButtonNative
          disabled={!isDirty && !isEditing}
          testId="native-user-form-reset"
          type="button"
          variant={ButtonVariant.Outline}
          onClick={handleReset}
        >
          {FM('common.reset')}
        </ButtonNative>
        <ButtonNative
          disabled={isSubmitting}
          testId="native-user-form-submit"
          type="submit"
          variant={ButtonVariant.Primary}
        >
          {submitLabel}
        </ButtonNative>
      </div>
    </form>
  );
};
