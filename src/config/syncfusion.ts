import { isValueDefined, isNotEmptyString } from '@/utils/is';

/**
 * Syncfusion License Registration
 *
 * The license key is registered lazily when entering protected routes.
 * Users can also enter their own key on the login page (stored in localStorage).
 *
 * Get a free community license or purchase one at:
 * https://www.syncfusion.com/sales/products/react
 */

// Default license key - used if no user-provided key is stored
const DEFAULT_LICENSE_KEY =
  'Ngo9BigBOggjGyl/VkR+XU9Ff1RBQmJJYVF2R2VJflx6dFVMZV5BJAtUQF1hT35Rdk1iXHxWdHVVRWJaWkd0';

// Storage key for user-provided license
const LICENSE_STORAGE_KEY = 'license-storage';

interface StoredLicense {
  state?: {
    licenseKey?: string;
  };
}

function isStoredLicense(value: unknown): value is StoredLicense {
  return typeof value === 'object' && isValueDefined(value);
}

function getStoredLicenseKey(): string | undefined {
  try {
    const stored = localStorage.getItem(LICENSE_STORAGE_KEY);
    if (!isNotEmptyString(stored)) return undefined;

    const parsed: unknown = JSON.parse(stored);
    if (!isStoredLicense(parsed)) return undefined;

    const userKey = parsed.state?.licenseKey;
    if (isNotEmptyString(userKey)) return userKey;

    return undefined;
  } catch {
    return undefined;
  }
}

// Dynamic import to avoid loading Syncfusion on login page
async function registerLicenseAsync(key: string): Promise<void> {
  const { registerLicense } = await import('@syncfusion/ej2-base');
  registerLicense(key);
}

export function initializeSyncfusion(): void {
  // Try to get user-provided key from localStorage first
  const userKey = getStoredLicenseKey();
  if (isValueDefined(userKey)) {
    registerLicenseAsync(userKey).catch(() => undefined);
    return;
  }

  // Use default license key
  registerLicenseAsync(DEFAULT_LICENSE_KEY).catch(() => undefined);
}
