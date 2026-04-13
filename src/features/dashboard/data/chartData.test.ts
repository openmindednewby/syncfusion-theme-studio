import { describe, it, expect } from 'vitest';

import {
  MONTHLY_REVENUE,
  ORDERS_BY_STATUS,
  TOP_PRODUCTS,
  USER_ACTIVITY,
  SALES_TRENDS,
  CATEGORY_DISTRIBUTION,
  CONVERSION_FUNNEL,
  KPI_REVENUE_SPARK,
  KPI_USERS_SPARK,
  KPI_ORDERS_SPARK,
  KPI_GROWTH_SPARK,
} from './chartData';

const MONTHS_COUNT = 12;
const ACTIVITY_DAYS_COUNT = 30;
const TOP_PRODUCTS_COUNT = 5;
const QUARTERS_COUNT = 4;
const FUNNEL_STAGES_COUNT = 5;
const ORDER_STATUSES_COUNT = 4;

describe('chartData', () => {
  describe('MONTHLY_REVENUE', () => {
    it('contains 12 months of data', () => {
      expect(MONTHLY_REVENUE).toHaveLength(MONTHS_COUNT);
    });

    it('each entry has a month string and positive revenue', () => {
      for (const entry of MONTHLY_REVENUE) {
        expect(typeof entry.month).toBe('string');
        expect(entry.month.length).toBeGreaterThan(0);
        expect(entry.revenue).toBeGreaterThan(0);
      }
    });

    it('starts with Jan and ends with Dec', () => {
      expect(MONTHLY_REVENUE[0]!.month).toBe('Jan');
      expect(MONTHLY_REVENUE[MONTHS_COUNT - 1]!.month).toBe('Dec');
    });
  });

  describe('ORDERS_BY_STATUS', () => {
    it('contains all order status categories', () => {
      expect(ORDERS_BY_STATUS).toHaveLength(ORDER_STATUSES_COUNT);
      const statuses = ORDERS_BY_STATUS.map((o) => o.status);
      expect(statuses).toContain('Pending');
      expect(statuses).toContain('Shipped');
      expect(statuses).toContain('Delivered');
      expect(statuses).toContain('Cancelled');
    });

    it('all counts are positive integers', () => {
      for (const entry of ORDERS_BY_STATUS) {
        expect(Number.isInteger(entry.count)).toBe(true);
        expect(entry.count).toBeGreaterThan(0);
      }
    });
  });

  describe('TOP_PRODUCTS', () => {
    it('contains 5 products', () => {
      expect(TOP_PRODUCTS).toHaveLength(TOP_PRODUCTS_COUNT);
    });

    it('products are sorted by revenue in descending order', () => {
      for (let i = 1; i < TOP_PRODUCTS.length; i++) 
        expect(TOP_PRODUCTS[i - 1]!.revenue).toBeGreaterThanOrEqual(TOP_PRODUCTS[i]!.revenue);
      
    });
  });

  describe('USER_ACTIVITY', () => {
    it('contains 30 days of data', () => {
      expect(USER_ACTIVITY).toHaveLength(ACTIVITY_DAYS_COUNT);
    });

    it('days are numbered 1 through 30', () => {
      expect(USER_ACTIVITY[0]!.day).toBe(1);
      expect(USER_ACTIVITY[ACTIVITY_DAYS_COUNT - 1]!.day).toBe(ACTIVITY_DAYS_COUNT);
    });

    it('all user counts are positive', () => {
      for (const entry of USER_ACTIVITY) 
        expect(entry.users).toBeGreaterThan(0);
      
    });
  });

  describe('SALES_TRENDS', () => {
    it('contains 12 months of year-over-year data', () => {
      expect(SALES_TRENDS).toHaveLength(MONTHS_COUNT);
    });

    it('thisYear values are greater than lastYear values for each month', () => {
      for (const entry of SALES_TRENDS) 
        expect(entry.thisYear).toBeGreaterThan(entry.lastYear);
      
    });
  });

  describe('CATEGORY_DISTRIBUTION', () => {
    it('contains 4 quarters of data', () => {
      expect(CATEGORY_DISTRIBUTION).toHaveLength(QUARTERS_COUNT);
    });

    it('each quarter has all category values as positive numbers', () => {
      for (const entry of CATEGORY_DISTRIBUTION) {
        expect(entry.electronics).toBeGreaterThan(0);
        expect(entry.clothing).toBeGreaterThan(0);
        expect(entry.homeGoods).toBeGreaterThan(0);
        expect(entry.sports).toBeGreaterThan(0);
      }
    });
  });

  describe('CONVERSION_FUNNEL', () => {
    it('contains 5 funnel stages', () => {
      expect(CONVERSION_FUNNEL).toHaveLength(FUNNEL_STAGES_COUNT);
    });

    it('each subsequent stage has fewer or equal counts (funnel narrows)', () => {
      for (let i = 1; i < CONVERSION_FUNNEL.length; i++) 
        expect(CONVERSION_FUNNEL[i - 1]!.count).toBeGreaterThanOrEqual(CONVERSION_FUNNEL[i]!.count);
      
    });
  });

  describe('KPI sparkline data', () => {
    it('KPI_REVENUE_SPARK has 12 points derived from MONTHLY_REVENUE', () => {
      expect(KPI_REVENUE_SPARK).toHaveLength(MONTHS_COUNT);
      expect(KPI_REVENUE_SPARK[0]!.x).toBe(0);
      expect(KPI_REVENUE_SPARK[0]!.y).toBe(MONTHLY_REVENUE[0]!.revenue);
    });

    it('KPI_USERS_SPARK has 12 points with positive y values', () => {
      expect(KPI_USERS_SPARK).toHaveLength(MONTHS_COUNT);
      for (const point of KPI_USERS_SPARK) 
        expect(point.y).toBeGreaterThan(0);
      
    });

    it('KPI_ORDERS_SPARK has 12 points with positive y values', () => {
      expect(KPI_ORDERS_SPARK).toHaveLength(MONTHS_COUNT);
      for (const point of KPI_ORDERS_SPARK) 
        expect(point.y).toBeGreaterThan(0);
      
    });

    it('KPI_GROWTH_SPARK has 12 points', () => {
      expect(KPI_GROWTH_SPARK).toHaveLength(MONTHS_COUNT);
    });
  });
});
