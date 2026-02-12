/**
 * Synchronous Syncfusion License Registration (module-level side-effect)
 *
 * Import this file for its side-effect in any module that renders Syncfusion
 * components. The license is registered at module evaluation time — before
 * React creates any component instances — eliminating the race condition
 * that caused trial-version banners on page refresh.
 *
 * This file is only statically imported by MainLayout (which is lazy-loaded),
 * so it never enters the login page's critical path.
 */
import { registerLicense } from '@syncfusion/ej2-base';

const LICENSE_KEY: string = String(import.meta.env['VITE_SYNCFUSION_LICENSE_KEY'] ?? '');

if (LICENSE_KEY !== '') registerLicense(LICENSE_KEY);
