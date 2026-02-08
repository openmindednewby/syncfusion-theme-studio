import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { registerLicense } from '@syncfusion/ej2-base';

interface LicenseState {
  licenseKey: string;
  setLicenseKey: (key: string) => void;
}

export const useLicenseStore = create<LicenseState>()(
  persist(
    (set) => ({
      licenseKey: '',
      setLicenseKey: (key: string) => {
        set({ licenseKey: key });
        // Re-register license when key changes
        if (key !== '') registerLicense(key);
      },
    }),
    {
      name: 'license-storage',
      onRehydrateStorage: () => (_state) => {
        // License registration is now handled lazily in MainLayout via initializeSyncfusionLazy()
        // No need to register on rehydration - this prevents duplicate registration
      },
    }
  )
);
