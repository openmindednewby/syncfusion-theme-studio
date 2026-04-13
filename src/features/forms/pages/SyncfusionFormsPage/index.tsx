/**
 * Syncfusion Forms Showcase Page
 *
 * Demonstrates React Hook Form + Zod integration with Syncfusion components.
 * Shows example forms with different validation patterns, plus a product
 * CRUD section and search section with API-backed results in a DataGrid.
 */
import { useState, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { FormResult } from './components/FormResult';
import { FormSection } from './components/FormSection';
import { ContactForm } from './forms/ContactForm';
import { ProductCrudSection } from './sections/ProductCrudSection';
import { ProductSearchSection } from './sections/ProductSearchSection';
import { UserManagementSection } from './sections/UserManagementSection';

import type { ContactFormData } from './forms/ContactForm/schema';

interface FormResults {
  contact: ContactFormData | null;
}

const SyncfusionFormsPage = (): JSX.Element => {
  const [results, setResults] = useState<FormResults>({
    contact: null,
  });

  const handleContactSubmit = useCallback((data: ContactFormData) => {
    setResults((prev) => ({ ...prev, contact: data }));
  }, []);

  return (
    <div className="space-y-8" data-testid={TestIds.FORMS_SHOWCASE_PAGE}>
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

      {/* User Management Section */}
      <UserManagementSection />

      {/* Product CRUD Section */}
      <ProductCrudSection />

      {/* Product Search */}
      <FormSection
        description={FM('forms.search.description')}
        title={FM('forms.search.title')}
      >
        <ProductSearchSection />
      </FormSection>
    </div>
  );
};

export default SyncfusionFormsPage;
