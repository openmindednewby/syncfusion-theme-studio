// Mock chart data for dashboard visualizations

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

// --- Revenue Over Time (Area chart, 12 months) ---

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export const MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: MONTHS[0], revenue: 42000 },
  { month: MONTHS[1], revenue: 38500 },
  { month: MONTHS[2], revenue: 51200 },
  { month: MONTHS[3], revenue: 47800 },
  { month: MONTHS[4], revenue: 55300 },
  { month: MONTHS[5], revenue: 62100 },
  { month: MONTHS[6], revenue: 58400 },
  { month: MONTHS[7], revenue: 64700 },
  { month: MONTHS[8], revenue: 71200 },
  { month: MONTHS[9], revenue: 68900 },
  { month: MONTHS[10], revenue: 78500 },
  { month: MONTHS[11], revenue: 92300 },
];

// --- Orders by Status (Donut chart) ---

export interface OrderStatus {
  status: string;
  count: number;
}

export const ORDERS_BY_STATUS: OrderStatus[] = [
  { status: 'Pending', count: 142 },
  { status: 'Shipped', count: 328 },
  { status: 'Delivered', count: 891 },
  { status: 'Cancelled', count: 67 },
];

// --- Top Products (Bar chart, top 5 by revenue) ---

export interface TopProduct {
  product: string;
  revenue: number;
}

export const TOP_PRODUCTS: TopProduct[] = [
  { product: 'Wireless Headphones', revenue: 28400 },
  { product: 'Smart Watch Pro', revenue: 22100 },
  { product: 'USB-C Hub', revenue: 18700 },
  { product: 'Ergonomic Keyboard', revenue: 15200 },
  { product: 'Portable Charger', revenue: 12800 },
];

// --- User Activity (Line chart, 30 days) ---

export interface DailyActivity {
  day: number;
  users: number;
}

const DAILY_USERS_BASE = 120;
const DAILY_VARIANCE = 80;
const ACTIVITY_DAYS = 30;
const ACTIVITY_WAVE_PERIOD = 7;
const ACTIVITY_LINEAR_SLOPE = 2;

export const USER_ACTIVITY: DailyActivity[] = Array.from(
  { length: ACTIVITY_DAYS },
  (_, i) => ({
    day: i + 1,
    users: DAILY_USERS_BASE + Math.round(
      DAILY_VARIANCE * Math.sin((i / ACTIVITY_WAVE_PERIOD) * Math.PI) + (i * ACTIVITY_LINEAR_SLOPE),
    ),
  }),
);

// --- Sales Trends (multi-line, this year vs last year) ---

export interface SalesTrend {
  month: string;
  thisYear: number;
  lastYear: number;
}

export const SALES_TRENDS: SalesTrend[] = [
  { month: MONTHS[0], thisYear: 31000, lastYear: 26000 },
  { month: MONTHS[1], thisYear: 28500, lastYear: 24500 },
  { month: MONTHS[2], thisYear: 39200, lastYear: 31200 },
  { month: MONTHS[3], thisYear: 36800, lastYear: 29800 },
  { month: MONTHS[4], thisYear: 43300, lastYear: 35300 },
  { month: MONTHS[5], thisYear: 50100, lastYear: 38100 },
  { month: MONTHS[6], thisYear: 46400, lastYear: 36400 },
  { month: MONTHS[7], thisYear: 52700, lastYear: 40700 },
  { month: MONTHS[8], thisYear: 59200, lastYear: 45200 },
  { month: MONTHS[9], thisYear: 56900, lastYear: 42900 },
  { month: MONTHS[10], thisYear: 66500, lastYear: 50500 },
  { month: MONTHS[11], thisYear: 80300, lastYear: 58300 },
];

// --- Category Distribution (Stacked bar) ---

export interface CategoryData {
  category: string;
  electronics: number;
  clothing: number;
  homeGoods: number;
  sports: number;
}

export const CATEGORY_DISTRIBUTION: CategoryData[] = [
  { category: 'Q1', electronics: 18200, clothing: 12100, homeGoods: 8400, sports: 5300 },
  { category: 'Q2', electronics: 21500, clothing: 14300, homeGoods: 9800, sports: 7100 },
  { category: 'Q3', electronics: 24800, clothing: 16700, homeGoods: 11200, sports: 8900 },
  { category: 'Q4', electronics: 32100, clothing: 21500, homeGoods: 14600, sports: 10200 },
];

// --- Conversion Funnel ---

export interface FunnelStep {
  stage: string;
  count: number;
}

export const CONVERSION_FUNNEL: FunnelStep[] = [
  { stage: 'Visitors', count: 12400 },
  { stage: 'Product Views', count: 8200 },
  { stage: 'Add to Cart', count: 3600 },
  { stage: 'Checkout', count: 1800 },
  { stage: 'Purchase', count: 1240 },
];

// --- KPI Sparkline Data ---

export interface SparkPoint {
  x: number;
  y: number;
}

const SPARKLINE_POINTS = 12;

// KPI sparkline generation parameters
const USERS_BASE = 800;
const USERS_SLOPE = 38;
const USERS_WAVE_AMP = 60;

const ORDERS_BASE = 95;
const ORDERS_SLOPE = 12;
const ORDERS_WAVE_AMP = 20;

const GROWTH_BASE = 5;
const GROWTH_WAVE_DIVISOR = 2;
const GROWTH_WAVE_AMP = 4;
const GROWTH_LINEAR_SLOPE = 0.8;

export const KPI_REVENUE_SPARK: SparkPoint[] = MONTHLY_REVENUE.map(
  (d, i) => ({ x: i, y: d.revenue }),
);

export const KPI_USERS_SPARK: SparkPoint[] = Array.from(
  { length: SPARKLINE_POINTS },
  (_, i) => ({ x: i, y: USERS_BASE + Math.round(i * USERS_SLOPE + Math.sin(i) * USERS_WAVE_AMP) }),
);

export const KPI_ORDERS_SPARK: SparkPoint[] = Array.from(
  { length: SPARKLINE_POINTS },
  (_, i) => ({ x: i, y: ORDERS_BASE + Math.round(i * ORDERS_SLOPE + Math.cos(i) * ORDERS_WAVE_AMP) }),
);

export const KPI_GROWTH_SPARK: SparkPoint[] = Array.from(
  { length: SPARKLINE_POINTS },
  (_, i) => ({ x: i, y: GROWTH_BASE + Math.round(Math.sin(i / GROWTH_WAVE_DIVISOR) * GROWTH_WAVE_AMP + i * GROWTH_LINEAR_SLOPE) }),
);
