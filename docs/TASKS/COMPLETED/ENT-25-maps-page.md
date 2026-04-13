# ENT-25: Maps / Geolocation Page

## Status: IN_PROGRESS

## Problem Statement
Add a Maps page using Syncfusion's Maps component showing worldwide office locations with markers, tooltips, bubble sizing, and a detail panel.

## Implementation Plan

### Files to Create
- `src/features/maps/pages/MapsPage/index.tsx` - Main page
- `src/features/maps/pages/MapsPage/components/WorldMap.tsx` - Syncfusion MapsComponent wrapper
- `src/features/maps/pages/MapsPage/components/LocationMarkers.tsx` - Marker layer
- `src/features/maps/pages/MapsPage/components/MapToolbar.tsx` - Layer toggle, zoom
- `src/features/maps/pages/MapsPage/components/LocationPanel.tsx` - Side detail panel
- `src/features/maps/pages/MapsPage/data/locationData.ts` - 15 office locations
- `src/features/maps/pages/MapsPage/types.ts` - Type definitions
- `src/features/maps/pages/MapsPage/constants.ts` - Constants

### Files to Modify
- `src/app/routes/routeSegment.ts` - Add Maps segment
- `src/app/routes/routePath.ts` - Add Maps path
- `src/app/routes/lazyPages.ts` - Add lazy import
- `src/app/router.tsx` - Add route
- `src/components/layout/Sidebar/sidebarNavData.ts` - Add nav item
- `src/components/layout/Sidebar/utils/iconName.ts` - Add MapPin icon
- `src/components/layout/Sidebar/utils/iconMap.ts` - Map icon
- `src/components/layout/Header/hooks/useHeaderBreadcrumbs.tsx` - Add maps breadcrumb
- `src/shared/testIds.ts` - Add test IDs
- `src/shared/permissions/utils/Permission.ts` - Add ViewMaps permission
- `src/shared/permissions/utils/rolePermissions.ts` - Grant permission
- `src/localization/locales/en.json` - Add translations
- `package.json` - Add @syncfusion/ej2-react-maps

## Success Criteria
- Map renders with world view
- Location markers display and are clickable
- Zoom and pan work smoothly
- Detail panel shows location info
- Respects dark/light theme
- Lint, build pass
