import { type ReactNode, Suspense } from 'react';

import { I18nextProvider } from 'react-i18next';

import i18n from '@/localization/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * I18n Provider component that wraps the application with i18next context.
 * Uses Suspense to handle async loading of translations.
 */
export const I18nProvider = ({ children }: I18nProviderProps): JSX.Element => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
  </I18nextProvider>
);
