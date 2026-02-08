import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Dynamic import to avoid loading Syncfusion on login page
const registerLicenseAsync = async (key: string): Promise<void> => {
  const { registerLicense } = await import('@syncfusion/ej2-base');
  registerLicense(key);
};

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
        // Re-register license when key changes (async but fire-and-forget)
        if (key !== '') registerLicenseAsync(key).catch(() => undefined);
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
