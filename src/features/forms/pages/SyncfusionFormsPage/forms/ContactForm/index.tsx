/**
 * Contact Form Component
 *
 * Basic form demonstrating required fields and email validation.
 * Uses Syncfusion Input components with react-hook-form.
 */
import { FormProvider } from 'react-hook-form';

import { FormInput } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import { contactFormSchema, defaultContactFormValues, type ContactFormData } from './schema';

const FORM_CONFIG = { schema: contactFormSchema, defaultValues: defaultContactFormValues };

interface Props {
  onSubmit: (data: ContactFormData) => void;
}

export const ContactForm = ({ onSubmit }: Props): JSX.Element => {
  const form = useFormWithSchema(FORM_CONFIG);

  const { handleSubmit, control, reset, formState } = form;
  const { isSubmitting, isDirty } = formState;

  function handleFormSubmit(data: ContactFormData): void {
    onSubmit(data);
    reset();
  }

  function handleReset(): void {
    reset();
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput<ContactFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.contact.name')}
            name="name"
            placeholder={FM('forms.contact.namePlaceholder')}
            testId="contact-form-name"
          />
          <FormInput<ContactFormData>
            fullWidth
            required
            control={control}
            label={FM('forms.contact.email')}
            name="email"
            placeholder={FM('forms.contact.emailPlaceholder')}
            testId="contact-form-email"
            type="email"
          />
        </div>

        <FormInput<ContactFormData>
          fullWidth
          control={control}
          helperText={FM('forms.contact.phoneHelper')}
          label={FM('forms.contact.phone')}
          name="phone"
          placeholder={FM('forms.contact.phonePlaceholder')}
          testId="contact-form-phone"
          type="tel"
        />

        <FormInput<ContactFormData>
          fullWidth
          required
          control={control}
          label={FM('forms.contact.message')}
          name="message"
          placeholder={FM('forms.contact.messagePlaceholder')}
          testId="contact-form-message"
        />

        <div className="flex justify-end gap-2 pt-2">
          <ButtonNative
            disabled={!isDirty}
            testId="contact-form-reset"
            type="button"
            variant={ButtonVariant.Outline}
            onClick={handleReset}
          >
            {FM('common.reset')}
          </ButtonNative>
          <ButtonNative
            disabled={isSubmitting}
            testId="contact-form-submit"
            type="submit"
            variant={ButtonVariant.Primary}
          >
            {FM('forms.contact.submit')}
          </ButtonNative>
        </div>
      </form>
    </FormProvider>
  );
}
