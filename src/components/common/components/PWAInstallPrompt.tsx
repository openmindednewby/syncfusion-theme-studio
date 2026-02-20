import { useCallback, useEffect, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const DISMISSED_KEY = 'pwa-install-dismissed';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const isBeforeInstallPromptEvent = (e: Event): e is BeforeInstallPromptEvent =>
  'prompt' in e && 'userChoice' in e;

export const PWAInstallPrompt = (): JSX.Element | null => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(DISMISSED_KEY) === 'true';
    if (wasDismissed) return;

    const handler = (e: Event): void => {
      if (isBeforeInstallPromptEvent(e)) setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = useCallback(async (): Promise<void> => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback((): void => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setDeferredPrompt(null);
  }, []);

  if (!deferredPrompt) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex max-w-sm flex-col gap-2 rounded-lg bg-surface-100 p-4 shadow-lg dark:bg-surface-800"
      data-testid={TestIds.PWA_INSTALL_PROMPT}
      role="complementary"
    >
      <p className="text-sm font-medium text-text-primary">{FM('pwa.installTitle')}</p>
      <p className="text-xs text-text-secondary">{FM('pwa.installDescription')}</p>
      <div className="flex gap-2">
        <button
          className="rounded bg-primary-700 px-3 py-1 text-sm text-white hover:bg-primary-800"
          data-testid={TestIds.PWA_INSTALL_BUTTON}
          type="button"
          onClick={handleInstall}
        >
          {FM('pwa.install')}
        </button>
        <button
          className="rounded px-3 py-1 text-sm text-text-secondary hover:bg-surface-200 dark:hover:bg-surface-700"
          data-testid={TestIds.PWA_INSTALL_DISMISS}
          type="button"
          onClick={handleDismiss}
        >
          {FM('pwa.notNow')}
        </button>
      </div>
    </div>
  );
};
