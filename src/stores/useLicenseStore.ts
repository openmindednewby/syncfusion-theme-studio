import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { registerLicense } from '@syncfusion/ej2-base';

import { isValueDefined } from '@/utils/is';

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
      onRehydrateStorage: () => (state) => {
        // Register license after hydration
        const hasLicenseKey = isValueDefined(state) && state.licenseKey !== '';
        if (hasLicenseKey) registerLicense(state.licenseKey);
      },
    }
  )
);
