# ENT-04: Orders Page

## Status: COMPLETED
## Priority: High
## Agent: frontend-dev

## Problem Statement

Create a full Orders management page. The MockServer has complete CRUD endpoints at `/api/orders` and Orval has already generated React Query hooks. No frontend page existed.

## Implementation Summary

### Files Created
- `src/features/orders/OrdersPage/index.tsx` - Page container with status filter, CRUD logic
- `src/features/orders/OrdersPage/sections/OrdersTable.tsx` - Table display with delete confirmation
- `src/features/orders/OrdersPage/sections/OrderStatusBadge.tsx` - Color-coded status badge
- `src/features/orders/OrdersPage/sections/OrderDialog.tsx` - Create order dialog with dynamic line items
- `src/features/orders/OrdersPage/sections/index.ts` - Barrel export
- `src/features/orders/OrdersPage/index.test.ts` - 11 unit tests for filterByStatus and formatCurrency
- `src/shared/testIds.business.ts` - Extracted business page test IDs
- `src/shared/testIds.sidebar.ts` - Extracted sidebar navigation test IDs

### Files Modified
- `src/app/routes/lazyPages.ts` - Added OrdersPage lazy export
- `src/app/routes/routePath.ts` - Added Orders = '/orders'
- `src/app/routes/routeSegment.ts` - Added Orders = 'orders'
- `src/app/routes/routePrefix.ts` - Added Orders = '/orders'
- `src/app/router.tsx` - Added /orders route
- `src/components/layout/Sidebar/utils/sidebarNavChildren.ts` - Added Orders to BUSINESS_CHILDREN
- `src/components/layout/Header/hooks/useHeaderBreadcrumbs.tsx` - Added orders breadcrumb mapping
- `src/shared/testIds.ts` - Refactored to import from business/sidebar files (kept under 200 line limit)
- `src/localization/locales/en.json` - Added orders i18n keys and sidebar.nav.orders

## Quality Results
- ESLint: PASS (0 errors)
- Unit Tests: 11/11 PASS
- TypeScript: 0 new errors (pre-existing kanban/calendar errors only)
- File lengths: All within limits

## Success Criteria
- [x] `/orders` route loads Orders page
- [x] Table shows paginated orders from MockServer API
- [x] Can create orders via dialog with dynamic line items
- [x] Can delete orders with confirmation
- [x] Order status badges with appropriate colors
- [x] Status filtering works correctly
- [x] Sidebar navigation includes Orders under Business
- [x] Breadcrumb shows "Orders" label
- [x] All i18n keys added
- [x] Lint passes, tests pass
