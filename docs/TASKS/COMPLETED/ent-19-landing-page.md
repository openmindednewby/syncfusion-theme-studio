# ENT-19: Landing / Marketing Page

## Status: COMPLETED
## Agent: frontend-dev

## Problem Statement
Add a public-facing landing page that serves as the "front door" before login. Hero section, feature highlights, testimonials, stats, CTA, and footer. Authenticated users should be redirected to /dashboard.

## Implementation Summary

### Files Created
- `src/features/landing/pages/LandingPage/index.tsx` - Main page component (6 sections)
- `src/features/landing/pages/LandingPage/components/HeroSection.tsx` - Headline, badge, CTA buttons
- `src/features/landing/pages/LandingPage/components/FeaturesGrid.tsx` - 8 feature cards with SVG icons
- `src/features/landing/pages/LandingPage/components/StatsBar.tsx` - 4 stats (users, uptime, components, support)
- `src/features/landing/pages/LandingPage/components/TestimonialsSection.tsx` - 3 customer quotes
- `src/features/landing/pages/LandingPage/components/CtaSection.tsx` - Bottom CTA with gradient card
- `src/features/landing/pages/LandingPage/components/LandingFooter.tsx` - Links and copyright
- `src/features/landing/data/landingData.ts` - Static data for features, testimonials, stats
- `src/shared/testIds.landing.ts` - Landing page test IDs (extracted to separate file)

### Files Modified
- `src/app/routes/lazyPages.ts` - Added LandingPage lazy import
- `src/app/router.tsx` - Updated root route (`/`) to render LandingPage inside PublicRoute
- `src/localization/locales/en.json` - Added `landing.*` translation keys
- `src/shared/testIds.ts` - Imported and spread LandingTestIds

### Design Decisions
- Root route (`/`) now shows LandingPage (wrapped in PublicRoute) instead of LoginPage
- PublicRoute redirects authenticated users to `/dashboard` automatically
- Login page remains accessible at `/login`
- All text uses `FM()` for i18n
- All sections have `data-testid` attributes
- Theme-aware via Tailwind semantic color tokens (bg-background, text-text-primary, etc.)
- Dark mode supported via Tailwind dark: variants
- Responsive with mobile-first grid layouts
- 8 feature cards with custom SVG icons
- Gradient decorative orbs in hero section

### Verification Results
- ESLint: PASSED (all landing files, testIds, router, lazyPages)
- TypeScript: PASSED (no errors in landing files via `tsc -b`)
- Build: Pre-existing failures in `spreadsheet` feature (missing `@syncfusion/ej2-react-spreadsheet`) - unrelated to this change
