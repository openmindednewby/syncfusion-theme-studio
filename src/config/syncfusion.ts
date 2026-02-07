import { registerLicense } from '@syncfusion/ej2-base';

/**
 * Syncfusion License Registration
 *
 * To use Syncfusion components, you need a valid license key.
 * Get a free community license or purchase one at:
 * https://www.syncfusion.com/sales/products/react
 *
 * Set the VITE_SYNCFUSION_LICENSE_KEY environment variable
 * or replace the placeholder below.
 */
// Vite's import.meta.env doesn't have our custom env var types
const envValue: unknown = import.meta.env['VITE_SYNCFUSION_LICENSE_KEY'];
const SYNCFUSION_LICENSE_KEY: string =
  typeof envValue === 'string' ? envValue : '';

export function initializeSyncfusion(): void {
  if (SYNCFUSION_LICENSE_KEY !== '') registerLicense(SYNCFUSION_LICENSE_KEY);
  else
    console.warn(
      '[Syncfusion] No license key found. Set VITE_SYNCFUSION_LICENSE_KEY in .env file.'
    );
}
