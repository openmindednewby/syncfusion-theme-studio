# Fix Visual QA Medium Severity Bugs

## Problem Statement
Four MEDIUM severity issues found during visual QA:
1. Dark mode FOUC on page load (white flash before CSS loads)
2. "Forgot Password" button is non-functional
3. Pricing page CTA buttons are non-functional
4. Hardcoded Tailwind color classes not theme-aware

## Implementation

### Issue #1: Dark mode FOUC
**File**: `index.html`
**Fix**: Added `.dark body` CSS rule to inline critical CSS, setting `background-color: #111827` and `color: #f9fafb` for dark mode. Also added `.dark #root:empty::after` to theme the loading spinner for dark mode.

### Issue #3: Forgot Password button
**Files**: `LoginFormPanel.tsx`, `LoginPage/index.tsx`, all 4 locale files
**Fix**: Added `onForgotPassword` prop to `LoginFormPanel`. In `LoginPage`, created `handleForgotPassword` callback that uses the existing `useToast` system to show an info toast: "Password reset is not available in demo mode." Added translation keys `login.forgotPasswordDemoTitle` and `login.forgotPasswordDemoMessage` in all 4 locales (en, he, es, de).

### Issue #4: Pricing CTA buttons
**File**: `PricingCards.tsx`
**Fix**: Added `useNavigate` from react-router-dom and `handleCtaClick` callback that navigates to `RoutePath.Login`. All three CTA buttons now navigate to the login page. Follows the same pattern as `CtaSection.tsx`.

### Issue #7: Hardcoded Tailwind colors
**Files modified** (13 files total):
- `OrderStatusBadge.tsx` - status badges
- `InvoiceStatusBadge.tsx` - status badges
- `ActivityLogGrid.tsx` - action badges + fallback
- `CustomersTable.tsx` - active/inactive badges + delete buttons
- `NotificationsList.tsx` - notification type dot colors
- `NotificationsList.test.ts` - updated test expectations
- `AccountSettings.tsx` - "Saved" text
- `AppearanceSettings.tsx` - "Saved" text
- `NotificationSettings.tsx` (settings) - "Saved" text
- `ProfileForm.tsx` - "Saved" text
- `UserStatusBadge.tsx` - active/inactive badges
- `StockBadge.tsx` - stock status badges
- `NotificationSettings.tsx` (admin) - toggle off color
- `StatusBadgeNative.test.tsx` - updated test fixture colors

**Color mapping applied**:
| Raw Tailwind | Theme Token |
|---|---|
| `bg-green-100 text-green-700` | `bg-success-50 text-success-700` |
| `bg-blue-100 text-blue-700` | `bg-info-50 text-info-700` |
| `bg-red-100 text-red-700` | `bg-error-50 text-error-700` |
| `bg-yellow-100 text-yellow-700` | `bg-warning-50 text-warning-700` |
| `bg-gray-100 text-gray-400/500` | `bg-surface-hover text-text-muted` |
| `bg-indigo-100 text-indigo-700` | `bg-primary-50 text-primary-700` |
| `bg-emerald-100 text-emerald-700` | `bg-success-50 text-success-700` |
| `bg-amber-100 text-amber-700` | `bg-warning-50 text-warning-700` |
| `text-green-600` | `text-success-500` |
| `text-red-500/600` | `text-error-500` |
| `bg-blue/red/green/yellow-500` | `bg-info/error/success/warning-500` |
| `bg-gray-300 dark:bg-gray-600` | `bg-surface-200 dark:bg-surface-700` |

## Quality Checks
- [x] `npx vitest run` - 117 test files, 1549 tests pass
- [x] `npx eslint` - all modified files pass (import/order disabled due to pre-existing bug)
- [x] `npx tsc --noEmit` - no new type errors (pre-existing errors in unrelated files)
- [x] No files over 300 lines

## Status: COMPLETED
