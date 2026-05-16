import { lazy, Suspense, type ComponentType } from 'react';

import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

import { ErrorBoundary, ProtectedRoute } from '@/components/common';
import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { PublicRoute } from '@/components/common/components/PublicRoute';
import { Permission } from '@/shared/permissions';

import { RoutePath, RouteRedirectTarget, RouteSegment } from './routePaths';
import { componentShowcaseRoutes } from './routes/componentShowcaseRoutes';
import {
  ActivityLogPage,
  AdminDocumentationPage,
  CalendarPage,
  ChatPage,
  DiagramPage,
  KanbanPage,
  LandingPage,
  AdminIntegrationsPage,
  AdminPluginsPage,
  AdminRoleManagementPage,
  AdminSupportPage,
  AdminSystemSettingsPage,
  AdminThemeEditorPage,
  AdminUserManagementPage,
  CustomersPage,
  DashboardKpisPage,
  DashboardMetricsPage,
  DashboardPage,
  ForbiddenPage,
  InventoryPage,
  InvoicesPage,
  OrdersPage,
  LoginPage,
  MapsPage,
  NativeComponentsPage,
  NativeFormsPage,
  NativeGridShowcase,
  NotFoundPage,
  NotificationsPage,
  NativeProductsPage,
  PricingPage,
  ProductsListPage,
  ServerErrorPage,
  SettingsPage,
  SyncfusionComponentsPage,
  SyncfusionFormsPage,
  SyncfusionGridPlayground,
  SyncfusionGridShowcase,
  UnauthorizedPage,
  UserProfilePage,
} from './routes/lazyPages';
import {
  AlertsIncidentsPage,
  AlertsManagementPage,
  IncidentsManagementPage,
  MarketplacePage,
} from './routes/lazySiemPages';

const LazyPage = ({ component }: LazyPageProps): JSX.Element => {
  const Component = component;
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

// Wrapper for lazy-loaded components
interface LazyPageProps {
  component: ComponentType;
}

// Lazy-loaded layout - keeps login page bundle small
const MainLayout = lazy(async () => ({
  default: (await import('@/components/layout/MainLayout')).MainLayout,
}));

const routes: RouteObject[] = [
  {
    path: RoutePath.Root,
    element: (
      <PublicRoute>
        <LazyPage component={LandingPage} />
      </PublicRoute>
    ),
  },
  {
    // Pathless layout route — all protected pages share MainLayout
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <MainLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      // Dashboard
      { path: RouteSegment.Dashboard, element: <LazyPage component={DashboardPage} /> },
      { path: RouteSegment.DashboardHome, element: <Navigate replace to="overview" /> },
      { path: RouteSegment.DashboardOverview, element: <LazyPage component={DashboardPage} /> },
      { path: RouteSegment.DashboardMetrics, element: <LazyPage component={DashboardMetricsPage} /> },
      { path: RouteSegment.DashboardKpis, element: <LazyPage component={DashboardKpisPage} /> },
      // Products
      { path: RouteSegment.Products, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
      { path: RouteSegment.ProductsNative, element: <LazyPage component={NativeProductsPage} /> },
      { path: RouteSegment.ProductsSyncfusion, element: <LazyPage component={ProductsListPage} /> },
      // Components overview
      { path: RouteSegment.Components, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
      { path: RouteSegment.ComponentsNative, element: <LazyPage component={NativeComponentsPage} /> },
      { path: RouteSegment.ComponentsSyncfusion, element: <LazyPage component={SyncfusionComponentsPage} /> },
      // Grid showcase
      { path: RouteSegment.ComponentsGrid, element: <Navigate replace to={RouteRedirectTarget.Native} /> },
      { path: RouteSegment.ComponentsGridNative, element: <LazyPage component={NativeGridShowcase} /> },
      { path: RouteSegment.ComponentsGridSyncfusion, element: <LazyPage component={SyncfusionGridShowcase} /> },
      { path: RouteSegment.ComponentsGridPlayground, element: <LazyPage component={SyncfusionGridPlayground} /> },
      // Component showcase pages (Button, Input, Select, DatePicker, Dialog, Alert, etc.)
      ...componentShowcaseRoutes,
      // Admin Hub
      {
        path: RouteSegment.AdminUserManagement,
        element: (
          <ProtectedRoute requiredPermission={Permission.ManageUsers}>
            <LazyPage component={AdminUserManagementPage} />
          </ProtectedRoute>
        ),
      },
      { path: RouteSegment.AdminRoleManagement, element: <LazyPage component={AdminRoleManagementPage} /> },
      { path: RouteSegment.AdminThemeEditor, element: <LazyPage component={AdminThemeEditorPage} /> },
      { path: RouteSegment.AdminSystemSettings, element: <LazyPage component={AdminSystemSettingsPage} /> },
      { path: RouteSegment.AdminIntegrations, element: <LazyPage component={AdminIntegrationsPage} /> },
      { path: RouteSegment.AdminPlugins, element: <LazyPage component={AdminPluginsPage} /> },
      { path: RouteSegment.AdminDocumentation, element: <LazyPage component={AdminDocumentationPage} /> },
      { path: RouteSegment.AdminSupport, element: <LazyPage component={AdminSupportPage} /> },
      // SIEM Features
      { path: RouteSegment.AlertsIncidents, element: <LazyPage component={AlertsIncidentsPage} /> },
      { path: RouteSegment.AlertsManagement, element: <LazyPage component={AlertsManagementPage} /> },
      { path: RouteSegment.IncidentsManagement, element: <LazyPage component={IncidentsManagementPage} /> },
      { path: RouteSegment.Marketplace, element: <LazyPage component={MarketplacePage} /> },
      // Forms
      { path: RouteSegment.Forms, element: <Navigate replace to={RouteRedirectTarget.Syncfusion} /> },
      { path: RouteSegment.FormsSyncfusion, element: <LazyPage component={SyncfusionFormsPage} /> },
      { path: RouteSegment.FormsNative, element: <LazyPage component={NativeFormsPage} /> },
      // App Pages
      { path: RouteSegment.Notifications, element: <LazyPage component={NotificationsPage} /> },
      { path: RouteSegment.UserProfile, element: <LazyPage component={UserProfilePage} /> },
      { path: RouteSegment.ActivityLog, element: <LazyPage component={ActivityLogPage} /> },
      // Business Pages
      { path: RouteSegment.Customers, element: <LazyPage component={CustomersPage} /> },
      { path: RouteSegment.Invoices, element: <LazyPage component={InvoicesPage} /> },
      { path: RouteSegment.Orders, element: <LazyPage component={OrdersPage} /> },
      { path: RouteSegment.Inventory, element: <LazyPage component={InventoryPage} /> },
      { path: RouteSegment.Settings, element: <LazyPage component={SettingsPage} /> },
      // Calendar
      { path: RouteSegment.Calendar, element: <LazyPage component={CalendarPage} /> },
      // Kanban
      { path: RouteSegment.Kanban, element: <LazyPage component={KanbanPage} /> },
      // Maps
      { path: RouteSegment.Maps, element: <LazyPage component={MapsPage} /> },
      // Chat
      { path: RouteSegment.Chat, element: <LazyPage component={ChatPage} /> },
      // Diagram
      { path: RouteSegment.Diagram, element: <LazyPage component={DiagramPage} /> },
      // Error Pages
      { path: RouteSegment.Unauthorized, element: <LazyPage component={UnauthorizedPage} /> },
      { path: RouteSegment.Forbidden, element: <LazyPage component={ForbiddenPage} /> },
      { path: RouteSegment.ServerError, element: <LazyPage component={ServerErrorPage} /> },
      // Catch-all: show 404 page for unknown paths
      { path: '*', element: <LazyPage component={NotFoundPage} /> },
    ],
  },
  {
    path: RoutePath.Login,
    element: (
      <PublicRoute>
        <LazyPage component={LoginPage} />
      </PublicRoute>
    ),
  },
  {
    path: RoutePath.Pricing,
    element: <LazyPage component={PricingPage} />,
  },
  // Catch-all: redirect unknown top-level paths to login
  { path: '*', element: <Navigate replace to={RoutePath.Root} /> },
];

export const router = createBrowserRouter(routes);
