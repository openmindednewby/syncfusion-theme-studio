import { registerLicense } from '@syncfusion/ej2-base';

import { isValueDefined, isNotEmptyString } from '@/utils/is';

/**
 * Syncfusion License Registration
 *
 * The license key is registered immediately at app startup.
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

export function initializeSyncfusion(): void {
  // Try to get user-provided key from localStorage first
  const userKey = getStoredLicenseKey();
  if (isValueDefined(userKey)) {
    registerLicense(userKey);
    return;
  }

  // Use default license key
  registerLicense(DEFAULT_LICENSE_KEY);
}
