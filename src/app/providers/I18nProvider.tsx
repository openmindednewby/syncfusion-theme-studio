import { type ReactNode, Suspense } from 'react';

import { I18nextProvider } from 'react-i18next';

import i18n from '@/localization/utils/i18n';

const LOADING_TEXT = 'Loading...';

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * I18n Provider component that wraps the application with i18next context.
 * Uses Suspense to handle async loading of translations.
 */
export const I18nProvider = ({ children }: I18nProviderProps): JSX.Element => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>{LOADING_TEXT}</div>}>{children}</Suspense>
  </I18nextProvider>
);
