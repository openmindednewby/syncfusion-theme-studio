/**
 * Contact Form - Native form example using FormNativeInput and FormNativeSelect
 */
import ButtonNative from '@/components/ui/ButtonNative';
import { FormNativeInput, FormNativeSelect } from '@/components/ui/form-fields';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import { contactSchema, type ContactFormData } from './schema';

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'sales', label: 'Sales Question' },
  { value: 'feedback', label: 'Feedback' },
];

interface Props {
  onSubmit: (data: ContactFormData) => void;
}

export const ContactForm = ({ onSubmit }: Props): JSX.Element => {
  const { control, handleSubmit, formState } = useFormWithSchema({ schema: contactSchema });
  const { isSubmitting } = formState;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormNativeInput
        fullWidth
        showRequired
        control={control}
        label={FM('forms.fields.name')}
        name="name"
        placeholder="John Doe"
        testId="contact-name"
      />

      <FormNativeInput
        fullWidth
        showRequired
        control={control}
        label={FM('forms.fields.email')}
        name="email"
        placeholder="email@example.com"
        testId="contact-email"
        type="email"
      />

      <FormNativeSelect
        fullWidth
        showRequired
        control={control}
        label={FM('forms.fields.subject')}
        name="subject"
        options={SUBJECT_OPTIONS}
        placeholder="Select a subject"
        testId="contact-subject"
      />

      <FormNativeInput
        fullWidth
        showRequired
        control={control}
        label={FM('forms.fields.message')}
        name="message"
        placeholder="Your message..."
        testId="contact-message"
      />

      <ButtonNative
        fullWidth
        disabled={isSubmitting}
        testId="contact-submit"
        type="submit"
        variant="primary"
      >
        {FM('forms.actions.send')}
      </ButtonNative>
    </form>
  );
};
