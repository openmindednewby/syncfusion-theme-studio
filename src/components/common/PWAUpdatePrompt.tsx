import { useRegisterSW } from 'virtual:pwa-register/react';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;
const UPDATE_CHECK_INTERVAL_MS = MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND;

export const PWAUpdatePrompt = (): JSX.Element | null => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (_url, registration) => {
      if (!registration) return;
      setInterval(() => {
        registration.update().catch(() => {});
      }, UPDATE_CHECK_INTERVAL_MS);
    },
  });

  if (!needRefresh) return null;

  const handleUpdate = (): void => {
    updateServiceWorker(true).catch(() => {});
  };

  const handleDismiss = (): void => {
    setNeedRefresh(false);
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-surface-100 p-4 shadow-lg dark:bg-surface-800"
      data-testid={TestIds.PWA_UPDATE_PROMPT}
      role="alert"
    >
      <span className="text-sm text-text-primary">{FM('pwa.updateAvailable')}</span>
      <button
        className="rounded bg-primary-700 px-3 py-1 text-sm text-white hover:bg-primary-800"
        data-testid={TestIds.PWA_UPDATE_BUTTON}
        type="button"
        onClick={handleUpdate}
      >
        {FM('pwa.update')}
      </button>
      <button
        className="rounded px-3 py-1 text-sm text-text-secondary hover:bg-surface-200 dark:hover:bg-surface-700"
        data-testid={TestIds.PWA_DISMISS_BUTTON}
        type="button"
        onClick={handleDismiss}
      >
        {FM('pwa.dismiss')}
      </button>
    </div>
  );
};
