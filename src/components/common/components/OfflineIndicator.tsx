import { useEffect, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

export const OfflineIndicator = (): JSX.Element | null => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = (): void => setIsOffline(true);
    const goOnline = (): void => setIsOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-center bg-amber-500 px-4 py-2 text-sm font-medium text-white"
      data-testid={TestIds.OFFLINE_INDICATOR}
      role="status"
    >
      {FM('pwa.offlineMessage')}
    </div>
  );
};
