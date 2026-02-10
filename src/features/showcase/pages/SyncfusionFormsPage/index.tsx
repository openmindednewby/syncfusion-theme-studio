/**
 * Syncfusion Forms Showcase Page
 *
 * Demonstrates React Hook Form + Zod integration with Syncfusion components.
 * Shows 4 example forms with different validation patterns.
 */
import { useState, useCallback } from 'react';

import { FM } from '@/localization/helpers';

import { FormResult } from './components/FormResult';
import { FormSection } from './components/FormSection';
import { ContactForm } from './forms/ContactForm';
import { ProductForm } from './forms/ProductForm';
import { RegistrationForm } from './forms/RegistrationForm';
import { SearchForm } from './forms/SearchForm';

import type { ContactFormData } from './forms/ContactForm/schema';
import type { ProductFormData } from './forms/ProductForm/schema';
import type { RegistrationFormData } from './forms/RegistrationForm/schema';
import type { SearchFormData } from './forms/SearchForm/schema';

interface FormResults {
  contact: ContactFormData | null;
  registration: Omit<RegistrationFormData, 'password' | 'confirmPassword'> | null;
  product: ProductFormData | null;
  search: SearchFormData | null;
}

const SyncfusionFormsPage = (): JSX.Element => {
  const [results, setResults] = useState<FormResults>({
    contact: null,
    registration: null,
    product: null,
    search: null,
  });

  const handleContactSubmit = useCallback((data: ContactFormData) => {
    setResults((prev) => ({ ...prev, contact: data }));
  }, []);

  const handleRegistrationSubmit = useCallback((data: RegistrationFormData) => {
    // Omit password fields from display for security
    const safeData = {
      email: data.email,
      acceptTerms: data.acceptTerms,
    };
    setResults((prev) => ({ ...prev, registration: safeData }));
  }, []);

  const handleProductSubmit = useCallback((data: ProductFormData) => {
    setResults((prev) => ({ ...prev, product: data }));
  }, []);

  const handleSearchSubmit = useCallback((data: SearchFormData) => {
    setResults((prev) => ({ ...prev, search: data }));
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{FM('forms.page.title')}</h1>
        <p className="mt-2 text-text-secondary">{FM('forms.page.description')}</p>
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

      {/* Registration Form */}
      <div className="grid gap-4 lg:grid-cols-2">
        <FormSection
          description={FM('forms.registration.description')}
          title={FM('forms.registration.title')}
        >
          <RegistrationForm onSubmit={handleRegistrationSubmit} />
        </FormSection>
        <div className="lg:pt-[52px]">
          <FormResult data={results.registration} />
        </div>
      </div>

      {/* Product Form */}
      <div className="grid gap-4 lg:grid-cols-2">
        <FormSection
          description={FM('forms.product.description')}
          title={FM('forms.product.title')}
        >
          <ProductForm onSubmit={handleProductSubmit} />
        </FormSection>
        <div className="lg:pt-[52px]">
          <FormResult data={results.product} />
        </div>
      </div>

      {/* Search Form */}
      <FormSection
        description={FM('forms.search.description')}
        title={FM('forms.search.title')}
      >
        <SearchForm onSubmit={handleSearchSubmit} />
        <div className="mt-4">
          <FormResult data={results.search} />
        </div>
      </FormSection>
    </div>
  );
};

export default SyncfusionFormsPage;
