# ENT-03: Dashboard Charts

## Status: TODO
## Priority: High
## Depends on: None
## Agent: frontend-dev

## Objective

Add real, interactive charts to the Dashboard pages using Syncfusion's charting components. The Dashboard currently has KPI cards and metrics text but no actual chart visualizations.

## Syncfusion Packages

- `@syncfusion/ej2-react-charts` — Line, Bar, Area, Pie, Donut, Sparkline
- `@syncfusion/ej2-react-circulargauge` — Gauge widgets (optional)

## Implementation Plan

### 1. Install Syncfusion Chart Package

```bash
npm install @syncfusion/ej2-react-charts
```

### 2. Dashboard Overview Page (`/dashboard`)

Add chart widgets to the overview grid:

- **Revenue Over Time** — Area/Line chart (monthly revenue, 12 months)
- **Orders by Status** — Donut/Pie chart (pending, shipped, delivered, cancelled)
- **Top Products** — Horizontal bar chart (top 5 by revenue)
- **User Activity** — Sparkline or small line chart (daily active users, 30 days)

### 3. Dashboard Metrics Page (`/dashboard/home/metrics`)

- **Sales Trends** — Multi-line chart (this year vs last year)
- **Category Distribution** — Stacked bar chart (product categories)
- **Conversion Funnel** — Funnel chart or horizontal stacked bar

### 4. Dashboard KPIs Page (`/dashboard/home/kpis`)

- **KPI Cards with Sparklines** — Each KPI card gets a small inline sparkline showing trend
- **Gauge widgets** — Target vs actual for key metrics

### 5. Mock Data

- Create `src/features/dashboard/data/chartData.ts` with realistic mock data
- Use Bogus-style patterns: seasonal revenue, realistic product names, sensible ranges
- Data should respond to dark/light theme (chart colors from theme tokens)

### 6. Theme Integration

- Charts must use theme colors (primary, secondary, accent from theme store)
- Dark mode: dark backgrounds, light text, adjusted color palette
- Light mode: white backgrounds, dark text

## Success Criteria

- [ ] Dashboard overview shows 4 chart widgets
- [ ] Metrics page shows 3 analytical charts
- [ ] KPIs page shows sparklines in KPI cards
- [ ] All charts respect dark/light theme
- [ ] Charts are responsive (resize with container)
- [ ] Chart data is realistic and well-labeled
