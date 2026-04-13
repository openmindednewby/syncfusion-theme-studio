/**
 * ContactSection - Contact form with result display
 *
 * Reuses the existing native ContactForm in a 2-column layout
 * with FormResult to show submitted data (mirrors SyncfusionFormsPage pattern).
 */
import { useState, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';

import { FormResult } from '../../../SyncfusionFormsPage/components/FormResult';
import { FormSection } from '../../../SyncfusionFormsPage/components/FormSection';
import { ContactForm } from '../../forms/ContactForm';

import type { ContactFormData } from '../../forms/ContactForm/schema';

export const ContactSection = (): JSX.Element => {
  const [result, setResult] = useState<ContactFormData | null>(null);

  const handleSubmit = useCallback((data: ContactFormData) => {
    setResult(data);
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FormSection
        description={FM('forms.contact.description')}
        title={FM('forms.contact.title')}
      >
        <ContactForm onSubmit={handleSubmit} />
      </FormSection>
      <div className="lg:pt-[52px]">
        <FormResult data={result} />
      </div>
    </div>
  );
};
