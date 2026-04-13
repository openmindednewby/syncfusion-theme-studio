# ENT-03: Dashboard Charts

## Status: COMPLETED
## Priority: High
## Agent: frontend-dev

## Problem Statement

Dashboard pages currently show placeholder bar chart visualizations (ChartPlaceholder) and "Not Implemented" pages for Metrics and KPIs. Need to replace these with real Syncfusion charts that respect the theme system.

## Changes Made

### Package Installation
- Installed `@syncfusion/ej2-react-charts@^32.2.3`

### New Files Created
- `src/features/dashboard/data/chartData.ts` -- Mock data with realistic seasonal revenue, order statuses, product names, user activity, sales trends, category distribution, conversion funnel, and KPI sparklines
- `src/features/dashboard/hooks/useChartTheme.ts` -- Hook that converts RGB space-separated theme colors to hex for Syncfusion charts; derives background, text, grid, label, and palette colors from theme store + mode
- `src/features/dashboard/pages/DashboardPage/components/RevenueChart.tsx` -- Area chart, 12 months
- `src/features/dashboard/pages/DashboardPage/components/OrdersByStatusChart.tsx` -- Donut chart with per-status colors
- `src/features/dashboard/pages/DashboardPage/components/TopProductsChart.tsx` -- Horizontal bar chart, top 5 products
- `src/features/dashboard/pages/DashboardPage/components/UserActivityChart.tsx` -- Line chart, 30 days of activity
- `src/features/dashboard/pages/DashboardMetricsPage/index.tsx` -- Metrics page (was "Not Implemented")
- `src/features/dashboard/pages/DashboardMetricsPage/components/SalesTrendsChart.tsx` -- Multi-line (this year vs last year)
- `src/features/dashboard/pages/DashboardMetricsPage/components/CategoryDistributionChart.tsx` -- Stacked bar chart
- `src/features/dashboard/pages/DashboardMetricsPage/components/ConversionFunnelChart.tsx` -- Color-coded funnel bar chart
- `src/features/dashboard/pages/DashboardKpisPage/index.tsx` -- KPI page with sparkline cards
- `src/features/dashboard/pages/DashboardKpisPage/components/KpiSparkCard.tsx` -- KPI card with inline sparkline

### Modified Files
- `src/features/dashboard/pages/DashboardPage/index.tsx` -- Replaced ChartPlaceholder with 4 real charts
- `src/features/dashboard/pages/DashboardPage/components/index.ts` -- Updated exports (removed ChartPlaceholder, added 4 chart components)
- `src/localization/locales/en.json` -- Added i18n keys for charts, metrics, and KPI sections

### Removed Files
- `src/features/dashboard/pages/DashboardPage/components/ChartPlaceholder.tsx` -- Replaced by real charts
- `src/features/dashboard/pages/DashboardMetricsPage.tsx` -- Replaced by directory module
- `src/features/dashboard/pages/DashboardKpisPage.tsx` -- Replaced by directory module

## Verification Results
- TypeScript: 0 errors
- ESLint: 0 errors
- Vite build: Succeeds (charts lazy-loaded as separate chunk)
- All files under 300 lines (max 177)
- All components under 200 lines (max 133)
- All text via FM()
- No hardcoded color literals
- No magic numbers
