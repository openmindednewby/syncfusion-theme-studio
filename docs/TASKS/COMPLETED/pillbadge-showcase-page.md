# PillBadge Showcase Page

## Problem Statement
PillBadge is a widely-used primitive (12 consumers) but lacks a dedicated showcase page in the component library.

## Implementation Plan
1. Create showcase page at `src/features/components/pages/PillBadgeShowcase/index.tsx`
2. Add route segments, paths, prefix
3. Add lazy page import
4. Wire into componentShowcaseRoutes
5. Add sidebar navigation entry
6. Add test IDs
7. Add localization keys

## Files to Modify
- `src/features/components/pages/PillBadgeShowcase/index.tsx` (NEW)
- `src/app/routes/routeSegment.ts`
- `src/app/routes/routePath.ts`
- `src/app/routes/routePrefix.ts`
- `src/app/routes/lazyPages.ts`
- `src/app/routes/componentShowcaseRoutes.tsx`
- `src/components/layout/Sidebar/utils/sidebarComponentGroups.ts`
- `src/shared/testIds.components.ts`
- `src/localization/locales/en.json`

## Success Criteria
- [ ] Showcase page renders all 5 sections (status, semantic, trend, role, custom)
- [ ] Route navigates correctly
- [ ] Sidebar entry appears in alphabetical order
- [ ] All text uses FM() localization
- [ ] Lint, YAGNI, unit tests, build pass
