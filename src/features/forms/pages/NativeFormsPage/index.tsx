/**
 * Native Forms Showcase Page
 *
 * Demonstrates React Hook Form + Zod integration with native HTML components.
 * Shows example forms with zero Syncfusion dependencies for optimal bundle size.
 */
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { OrderSection } from './sections/OrderSection';
import { UserCreationSection } from './sections/UserCreationSection';
import { UserLookupSection } from './sections/UserLookupSection';
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
        <h3 className="font-medium text-primary-700 dark:text-primary-300">{FM('forms.native.performance.title')}</h3>
        <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
          {FM('forms.native.performance.description')}
        </p>
      </div>

      {/* User Lookup (Login Form + API) */}
      <FormSection
        description={FM('forms.login.description')}
        title={FM('forms.login.title')}
      >
        <UserLookupSection />
      </FormSection>

      {/* User Creation (Contact Form + API) */}
      <UserCreationSection />

      {/* Order Form */}
      <FormSection
        description={FM('forms.order.description')}
        title={FM('forms.order.title')}
      >
        <OrderSection />
      </FormSection>
    </div>
  );
};

export default NativeFormsPage;
