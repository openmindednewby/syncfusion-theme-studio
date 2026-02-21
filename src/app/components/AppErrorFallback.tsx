import { FM } from '@/localization/utils/helpers';

/**
 * Top-level error fallback displayed when the entire app crashes.
 *
 * Uses FM() which calls i18n.t() directly on the singleton — this works even
 * when the React I18nProvider has thrown, since it bypasses React context.
 */
export const AppErrorFallback = (): JSX.Element => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-8 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <div className="text-6xl">{FM('common.warningSymbol')}</div>
    <h1 className="text-xl font-semibold">{FM('common.somethingWentWrong')}</h1>
    <p className="max-w-md text-center text-gray-600 dark:text-gray-400">
      {FM('errors.criticalError')}
    </p>
    <button
      className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      type="button"
      onClick={handleReload}
    >
      {FM('common.reloadPage')}
    </button>
  </div>
);

function handleReload(): void {
  window.location.reload();
}