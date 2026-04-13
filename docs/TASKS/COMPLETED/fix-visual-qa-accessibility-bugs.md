# Fix Visual QA Accessibility Bugs

## Problem Statement
Visual QA identified 9 accessibility and theme bugs across multiple components. Bugs range from missing `aria-label` attributes to dark mode styling gaps and language label typos.

## Bugs to Fix
1. **BUG-001**: Missing `aria-label` on error page "Go Home" buttons (Unauthorized, Forbidden, ServerError)
2. **BUG-002**: Missing `aria-label` on pricing card CTA buttons
3. **BUG-003**: Missing `aria-label` on landing CTA section button
4. **BUG-004**: Missing `aria-label` on Maps location list buttons
5. **BUG-005**: Pricing toggle lacks `role="switch"` and `aria-checked`
6. **BUG-006**: `document.documentElement.lang` not updated when language changes
7. **BUG-007**: Spanish language label misspelled as "Espanol" (missing tilde)
8. **BUG-008**: UserRoleBadge missing dark mode variants
9. **BUG-009**: AppErrorFallback hardcoded colors -- SKIPPED (intentional: renders before theme CSS loads)

## Files Modified
- `src/features/errors/UnauthorizedPage/index.tsx`
- `src/features/errors/ForbiddenPage/index.tsx`
- `src/features/errors/ServerErrorPage/index.tsx`
- `src/features/pricing/pages/PricingPage/components/PricingCards.tsx`
- `src/features/landing/pages/LandingPage/components/CtaSection.tsx`
- `src/features/maps/pages/MapsPage/components/LocationMarkers.tsx`
- `src/features/pricing/pages/PricingPage/components/PricingToggle.tsx`
- `src/components/layout/Header/components/LanguageSwitcher.tsx`
- `src/features/admin/pages/UserManagementPage/sections/UserRoleBadge.tsx`

## Test Files Created
- `src/features/errors/UnauthorizedPage/index.test.tsx`
- `src/features/errors/ForbiddenPage/index.test.tsx`
- `src/features/errors/ServerErrorPage/index.test.tsx`
- `src/features/pricing/pages/PricingPage/components/PricingCards.test.tsx`
- `src/features/landing/pages/LandingPage/components/CtaSection.test.tsx`
- `src/features/maps/pages/MapsPage/components/LocationMarkers.test.tsx`
- `src/features/pricing/pages/PricingPage/components/PricingToggle.test.tsx`
- `src/components/layout/Header/components/LanguageSwitcher.test.ts`
- `src/features/admin/pages/UserManagementPage/sections/UserRoleBadge.test.ts`

## Success Criteria
- All aria-label attributes are present on interactive elements
- PricingToggle has role="switch" and aria-checked
- Document lang attribute is set when language changes
- Spanish label has correct tilde
- UserRoleBadge has dark mode classes
- All unit tests pass
- Lint passes

## Results
- 140 test files, 1631 tests all pass (including 9 new test files, 24 new tests)
- BUG-009 skipped: AppErrorFallback uses hardcoded Tailwind colors intentionally because it renders as a top-level crash fallback before theme CSS loads

## Status: COMPLETED
