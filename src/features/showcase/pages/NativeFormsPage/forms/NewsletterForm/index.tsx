/**
 * Newsletter Form - Minimal native form example
 */
import ButtonNative from '@/components/ui/ButtonNative';
import { FormNativeInput } from '@/components/ui/form-fields';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import { newsletterSchema, type NewsletterFormData } from './schema';

interface Props {
  onSubmit: (data: NewsletterFormData) => void;
}

export const NewsletterForm = ({ onSubmit }: Props): JSX.Element => {
  const { control, handleSubmit, formState } = useFormWithSchema({ schema: newsletterSchema });
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
      <ButtonNative disabled={isSubmitting} testId="newsletter-submit" type="submit" variant="primary">
        {FM('forms.actions.subscribe')}
      </ButtonNative>
    </form>
  );
};
