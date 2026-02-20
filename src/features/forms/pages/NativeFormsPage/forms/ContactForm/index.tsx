/**
 * Contact Form - Native form example using FormNativeInput and FormNativeSelect
 */
import { FormNativeInput, FormNativeSelect } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import { contactSchema, type ContactFormData } from './schema';

const FORM_CONFIG = { schema: contactSchema };
const SUBJECT_OPTIONS = [
  { value: 'general', label: FM('forms.contact.subject.general') },
  { value: 'support', label: FM('forms.contact.subject.support') },
  { value: 'sales', label: FM('forms.contact.subject.sales') },
  { value: 'feedback', label: FM('forms.contact.subject.feedback') },
];

interface Props {
  onSubmit: (data: ContactFormData) => void;
  /** External submitting state (e.g. from a mutation) */
  isSubmitting?: boolean;
}

export const ContactForm = ({ onSubmit, isSubmitting: externalSubmitting }: Props): JSX.Element => {
  const { control, handleSubmit, formState } = useFormWithSchema(FORM_CONFIG);
  const isSubmitting = formState.isSubmitting || (externalSubmitting ?? false);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormNativeInput
        fullWidth
        required
        control={control}
        label={FM('forms.fields.name')}
        name="name"
        placeholder={FM('forms.contact.namePlaceholder')}
        testId="contact-name"
      />

      <FormNativeInput
        fullWidth
        required
        control={control}
        label={FM('forms.fields.email')}
        name="email"
        placeholder={FM('forms.contact.emailPlaceholder')}
        testId="contact-email"
        type="email"
      />

      <FormNativeSelect
        fullWidth
        required
        control={control}
        label={FM('forms.fields.subject')}
        name="subject"
        options={SUBJECT_OPTIONS}
        placeholder={FM('forms.contact.subjectPlaceholder')}
        testId="contact-subject"
      />

      <FormNativeInput
        fullWidth
        required
        control={control}
        label={FM('forms.fields.message')}
        name="message"
        placeholder={FM('forms.contact.messagePlaceholder')}
        testId="contact-message"
      />

      <ButtonNative
        fullWidth
        disabled={isSubmitting}
        testId="contact-submit"
        type="submit"
        variant={ButtonVariant.Primary}
      >
        {FM('forms.actions.send')}
      </ButtonNative>
    </form>
  );
};
