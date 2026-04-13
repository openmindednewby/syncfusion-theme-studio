# Fix Visual QA Low-Severity Bugs (BUG-010 through BUG-018)

## Problem Statement
Visual QA identified 9 low-severity bugs across the SyncfusionThemeStudio app covering accessibility, i18n, production logging, navigation, hardcoded colors, and duplicate testIds.

## Bugs
- BUG-010: AppErrorFallback reload button missing aria-label
- BUG-011: SpecDataGrid hardcoded English strings (deprecated -- skip)
- BUG-012: console.warn left in production code in useSyncfusionFilters
- BUG-013: ThemeStudioLogo SVG missing aria-hidden
- BUG-014: Inline SVGs in FeaturesGrid and TestimonialsSection missing aria-hidden
- BUG-015: Pricing page navigation dead end
- BUG-016: ServerErrorPage uses hardcoded text-red-500
- BUG-017: Duplicate data-testid across error pages
- BUG-018: Hero section hardcoded aria-label strings

## Files Modified
- src/app/components/AppErrorFallback.tsx
- src/lib/grid/hooks/useSyncfusionFilters.ts
- src/components/icons/AppIcons.tsx
- src/features/landing/pages/LandingPage/components/FeaturesGrid.tsx
- src/features/landing/pages/LandingPage/components/TestimonialsSection.tsx
- src/features/pricing/pages/PricingPage/index.tsx
- src/features/errors/ServerErrorPage/index.tsx
- src/features/errors/UnauthorizedPage/index.tsx
- src/features/errors/ForbiddenPage/index.tsx
- src/features/not-found/NotFoundPage.tsx
- src/features/landing/pages/LandingPage/components/HeroSection.tsx
- src/shared/testIds.ts
- src/localization/locales/en.json (add pricing.backToHome key)

## Tests Created
- src/app/components/AppErrorFallback.test.ts
- src/lib/grid/hooks/useSyncfusionFilters.test.ts
- src/components/icons/AppIcons.test.tsx
- src/features/landing/pages/LandingPage/components/FeaturesGrid.test.tsx
- src/features/landing/pages/LandingPage/components/TestimonialsSection.test.tsx
- src/features/pricing/pages/PricingPage/PricingPage.test.tsx
- src/features/errors/ServerErrorPage/ServerErrorPage.test.tsx
- src/features/errors/error-pages.test.ts
- src/features/landing/pages/LandingPage/components/HeroSection.test.tsx

## Success Criteria
- All fixes applied
- All unit tests pass
- Lint passes
- Build passes
