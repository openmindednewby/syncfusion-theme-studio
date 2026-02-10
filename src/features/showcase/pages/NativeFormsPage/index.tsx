/**
 * Native Forms Showcase Page
 *
 * Demonstrates React Hook Form + Zod integration with native HTML components.
 * Shows example forms with zero Syncfusion dependencies for optimal bundle size.
 */
import { useState, useCallback } from 'react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { ContactForm } from './forms/ContactForm';
import { LoginForm } from './forms/LoginForm';
import { NewsletterForm } from './forms/NewsletterForm';
import { FormResult } from '../SyncfusionFormsPage/components/FormResult';
import { FormSection } from '../SyncfusionFormsPage/components/FormSection';

import type { ContactFormData } from './forms/ContactForm/schema';
import type { LoginFormData } from './forms/LoginForm/schema';
import type { NewsletterFormData } from './forms/NewsletterForm/schema';

interface FormResults {
  login: Omit<LoginFormData, 'password'> | null;
  contact: ContactFormData | null;
  newsletter: NewsletterFormData | null;
}

const NativeFormsPage = (): JSX.Element => {
  const [results, setResults] = useState<FormResults>({
    login: null,
    contact: null,
    newsletter: null,
  });

  const handleLoginSubmit = useCallback((data: LoginFormData) => {
    // Omit password for security
    const safeData = {
      email: data.email,
      rememberMe: data.rememberMe,
    };
    setResults((prev) => ({ ...prev, login: safeData }));
  }, []);

  const handleContactSubmit = useCallback((data: ContactFormData) => {
    setResults((prev) => ({ ...prev, contact: data }));
  }, []);

  const handleNewsletterSubmit = useCallback((data: NewsletterFormData) => {
    setResults((prev) => ({ ...prev, newsletter: data }));
  }, []);

  return (
    <div className="space-y-8" data-testid={TestIds.NATIVE_FORMS_PAGE}>
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{FM('forms.native.page.title')}</h1>
        <p className="mt-2 text-text-secondary">{FM('forms.native.page.description')}</p>
      </div>

      {/* Performance Note */}
      <div className="rounded-md border border-primary-200 bg-primary-50 p-4">
        <h3 className="font-medium text-primary-800">{FM('forms.native.performance.title')}</h3>
        <p className="mt-1 text-sm text-primary-700">
          {FM('forms.native.performance.description')}
        </p>
      </div>

      {/* Login Form */}
      <div className="grid gap-4 lg:grid-cols-2">
        <FormSection
          description={FM('forms.login.description')}
          title={FM('forms.login.title')}
        >
          <LoginForm onSubmit={handleLoginSubmit} />
        </FormSection>
        <div className="lg:pt-[52px]">
          <FormResult data={results.login} />
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid gap-4 lg:grid-cols-2">
        <FormSection
          description={FM('forms.contact.description')}
          title={FM('forms.contact.title')}
        >
          <ContactForm onSubmit={handleContactSubmit} />
        </FormSection>
        <div className="lg:pt-[52px]">
          <FormResult data={results.contact} />
        </div>
      </div>

      {/* Newsletter Form */}
      <FormSection
        description={FM('forms.newsletter.description')}
        title={FM('forms.newsletter.title')}
      >
        <NewsletterForm onSubmit={handleNewsletterSubmit} />
        <div className="mt-4">
          <FormResult data={results.newsletter} />
        </div>
      </FormSection>
    </div>
  );
};

export default NativeFormsPage;
