import { lazy } from 'react';

// Trading Features
export const AlertsIncidentsPage = lazy(
  async () => import('@/features/alerts-incidents/AlertsIncidentsPage'),
);
export const AlertsManagementPage = lazy(
  async () => import('@/features/alerts-incidents/pages/AlertsManagementPage'),
);
export const IncidentsManagementPage = lazy(
  async () => import('@/features/alerts-incidents/pages/IncidentsManagementPage'),
);
export const MarketplacePage = lazy(async () => import('@/features/marketplace/MarketplacePage'));
