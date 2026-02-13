import { lazy, Suspense, type ComponentType } from 'react';

import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import { RoutePath, RouteRedirectTarget, RouteSegment } from './routePaths';
import { componentShowcaseRoutes } from './routes/componentShowcaseRoutes';
import {
  DashboardPage,
  LoginPage,
  NativeComponentsPage,
  NativeFormsPage,
  NativeGridShowcase,
  NativeProductsPage,
  ProductsListPage,
  SyncfusionComponentsPage,
  SyncfusionFormsPage,
  SyncfusionGridShowcase,
} from './routes/lazyPages';

// Lazy-loaded layout - keeps login page bundle small
const MainLayout = lazy(async () => ({
  default: (await import('@/components/layout/MainLayout')).MainLayout,
}));

// Wrapper for lazy-loaded components
interface LazyPageProps {
  component: ComponentType;
}

const LazyPage = ({ component }: LazyPageProps): JSX.Element => {
  const Component = component;
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

const routes: RouteObject[] = [
  { path: RoutePath.Root, element: <LazyPage component={LoginPage} /> },
  {
    path: RoutePath.Dashboard,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <LazyPage component={DashboardPage} /> },
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
      // Component showcase pages (Button, Input, Select, DatePicker, Dialog, Alert, etc.)
      ...componentShowcaseRoutes,
      // Forms
      { path: RouteSegment.Forms, element: <Navigate replace to={RouteRedirectTarget.Syncfusion} /> },
      { path: RouteSegment.FormsSyncfusion, element: <LazyPage component={SyncfusionFormsPage} /> },
      { path: RouteSegment.FormsNative, element: <LazyPage component={NativeFormsPage} /> },
      // Catch-all: redirect unknown dashboard paths to dashboard root
      { path: '*', element: <Navigate replace to={RoutePath.Dashboard} /> },
    ],
  },
  { path: RoutePath.Login, element: <LazyPage component={LoginPage} /> },
  // Catch-all: redirect unknown top-level paths to root
  { path: '*', element: <Navigate replace to={RoutePath.Root} /> },
];

export const router = createBrowserRouter(routes);
