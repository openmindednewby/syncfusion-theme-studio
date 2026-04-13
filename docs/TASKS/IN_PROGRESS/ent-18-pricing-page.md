# ENT-18: Pricing Page

## Status: IN_PROGRESS
## Priority: Low
## Agent: frontend-dev

## Problem Statement

Add a public Pricing page showing three subscription tiers (Free, Pro, Enterprise) with feature comparison, monthly/yearly toggle, and FAQ accordion. The page must be public (no auth required), theme-aware (dark/light), and follow all code standards.

## Implementation Plan

### Files to Create
1. `src/features/pricing/pages/PricingPage/index.tsx` - Main page component
2. `src/features/pricing/pages/PricingPage/components/PricingCards.tsx` - 3 tier cards
3. `src/features/pricing/pages/PricingPage/components/PricingToggle.tsx` - Monthly/Yearly toggle
4. `src/features/pricing/pages/PricingPage/components/FeatureComparison.tsx` - Feature comparison table
5. `src/features/pricing/pages/PricingPage/components/PricingFaq.tsx` - FAQ accordion
6. `src/features/pricing/pages/PricingPage/hooks/usePricingToggle.ts` - Toggle state hook
7. `src/features/pricing/pages/PricingPage/hooks/usePricingToggle.test.ts` - Hook test
8. `src/features/pricing/data/pricingData.ts` - Plans, features, prices
9. `src/features/pricing/types.ts` - TypeScript types
10. `src/features/pricing/constants.ts` - Constants

### Files to Modify
1. `src/app/routes/routePath.ts` - Add Pricing path
2. `src/app/routes/routeSegment.ts` - Add Pricing segment
3. `src/app/routes/lazyPages.ts` - Add lazy import
4. `src/app/router.tsx` - Add public route
5. `src/localization/locales/en.json` - Add pricing translations
6. `src/shared/testIds.ts` or new `testIds.pricing.ts` - Add test IDs

### Routing Strategy
The pricing page should be a PUBLIC route accessible without login, but unlike the login page (which redirects authenticated users to dashboard), the pricing page should be accessible to ALL users (both authenticated and not). This means it should NOT use `PublicRoute` (which redirects authenticated users), and should NOT be inside the `ProtectedRoute` layout. It needs its own top-level route entry.

## Success Criteria
- [ ] Three pricing tier cards displayed
- [ ] Monthly/Yearly toggle changes prices
- [ ] Feature comparison table is complete
- [ ] FAQ accordion works
- [ ] Responsive layout
- [ ] Theme-aware (dark/light)
- [ ] Public route (no auth required)
- [ ] i18n translations
- [ ] Test IDs for all interactive elements
- [ ] Unit test for usePricingToggle hook
- [ ] Lint, build pass
