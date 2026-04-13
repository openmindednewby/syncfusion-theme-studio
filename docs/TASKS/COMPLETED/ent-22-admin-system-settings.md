# ENT-22: Admin System Settings (Full)

## Status: COMPLETED
## Priority: Low
## Agent: frontend-dev

## Problem Statement

The Admin System Settings page was a stub using `NotImplementedPage`. It has been replaced with a full settings interface with 5 tabs: General, Security, Email, Notifications, Maintenance.

## Implementation Summary

### Backend (MockServer) -- Pre-existing
The backend was already fully implemented:
- `SystemSettings` entity with all fields
- `SystemSettingsDto` record
- `GetSystemSettingsQuery` + handler
- `UpdateSystemSettingsCommand` + handler
- `Get` and `Update` FastEndpoints at `/admin/settings`
- Seed data in `SeedData.cs`

### Frontend -- Implemented

#### New Files
- `src/features/admin/pages/SystemSettingsPage/index.tsx` -- Main page component with tab switching, API integration, toast notifications
- `src/features/admin/pages/SystemSettingsPage/types.ts` -- TypeScript interfaces for DTO and form data
- `src/features/admin/pages/SystemSettingsPage/constants.ts` -- Shared Tailwind classes, API path
- `src/features/admin/pages/SystemSettingsPage/utils/settingsTab.ts` -- SettingsTab const enum
- `src/features/admin/pages/SystemSettingsPage/utils/notifToggleField.ts` -- NotifToggleField const enum
- `src/features/admin/pages/SystemSettingsPage/hooks/useSystemSettings.ts` -- TanStack Query hooks for GET/PUT
- `src/features/admin/pages/SystemSettingsPage/components/SettingsTabs.tsx` -- Tab navigation
- `src/features/admin/pages/SystemSettingsPage/components/GeneralSettings.tsx` -- App name, timezone, language, date/currency format
- `src/features/admin/pages/SystemSettingsPage/components/SecuritySettings.tsx` -- Password policy, 2FA, session timeout
- `src/features/admin/pages/SystemSettingsPage/components/EmailSettings.tsx` -- SMTP config, test email button
- `src/features/admin/pages/SystemSettingsPage/components/NotificationSettings.tsx` -- Channel toggles, severity threshold
- `src/features/admin/pages/SystemSettingsPage/components/MaintenanceSettings.tsx` -- Maintenance mode toggle, scheduled window

#### Modified Files
- `src/features/admin/pages/AdminSystemSettingsPage.tsx` -- Re-exports from SystemSettingsPage
- `src/shared/testIds.business.ts` -- Added 40+ test IDs for all interactive elements
- `src/localization/locales/en.json` -- Added `systemSettings` i18n section with all labels

## Verification Results

- [x] ESLint passes (0 errors on all new files)
- [x] TypeScript compiles (0 errors in new files)
- [x] Vite build compiles successfully (pre-existing PWA workbox limit warning unrelated)
- [x] MockServer builds successfully (0 warnings, 0 errors)
- [x] All 5 settings tabs implemented
- [x] Forms pre-populate with current values from API
- [x] Save per-tab merges partial data with full DTO
- [x] Toast on success/error
- [x] i18n for all user-facing text
- [x] testIds for all interactive elements
- [x] Const enums in dedicated files
- [x] Module structure follows enforce-module-structure rules
