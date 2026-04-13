/**
 * Native Forms Showcase Page
 *
 * Demonstrates React Hook Form + Zod integration with native HTML components.
 * Mirrors the SyncfusionFormsPage structure using TableNative instead of DataGrid,
 * plus a comprehensive All Components showcase form.
 */
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { AllComponentsSection } from './sections/AllComponentsSection';
import { ContactSection } from './sections/ContactSection';
import { NativeProductCrudSection } from './sections/ProductCrudSection';
import { NativeProductSearchSection } from './sections/ProductSearchSection';
import { NativeUserManagementSection } from './sections/UserManagementSection';
import { FormSection } from '../SyncfusionFormsPage/components/FormSection';

const NativeFormsPage = (): JSX.Element => {
  return (
    <div className="space-y-8" data-testid={TestIds.NATIVE_FORMS_PAGE}>
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{FM('forms.native.page.title')}</h1>
        <p className="mt-2 text-text-secondary">{FM('forms.native.page.description')}</p>
      </div>

      {/* Performance Note */}
      <div className="rounded-md border border-primary-500/30 bg-primary-500/10 p-4">
        <h2 className="font-medium text-primary-700 dark:text-primary-300">{FM('forms.native.performance.title')}</h2>
        <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
          {FM('forms.native.performance.description')}
        </p>
      </div>

      {/* Contact Form + Result */}
      <ContactSection />

      {/* User Management Section */}
      <NativeUserManagementSection />

      {/* Product CRUD Section */}
      <NativeProductCrudSection />

      {/* Product Search */}
      <FormSection
        description={FM('forms.search.description')}
        title={FM('forms.search.title')}
      >
        <NativeProductSearchSection />
      </FormSection>

      {/* All Components Showcase */}
      <AllComponentsSection />
    </div>
  );
};

export default NativeFormsPage;
