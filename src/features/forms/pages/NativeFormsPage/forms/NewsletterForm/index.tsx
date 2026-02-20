/**
 * Newsletter Form - Minimal native form example
 */
import { FormNativeInput } from '@/components/ui/form-fields';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/utils/helpers';

import { newsletterSchema, type NewsletterFormData } from './schema';

const FORM_CONFIG = { schema: newsletterSchema };

interface Props {
  onSubmit: (data: NewsletterFormData) => void;
}

export const NewsletterForm = ({ onSubmit }: Props): JSX.Element => {
  const { control, handleSubmit, formState } = useFormWithSchema(FORM_CONFIG);
  const { isSubmitting } = formState;

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1">
        <FormNativeInput
          fullWidth
          control={control}
          name="email"
          placeholder="Enter your email"
          testId="newsletter-email"
          type="email"
        />
      </div>
      <ButtonNative disabled={isSubmitting} testId="newsletter-submit" type="submit" variant={ButtonVariant.Primary}>
        {FM('forms.actions.subscribe')}
      </ButtonNative>
    </form>
  );
};
