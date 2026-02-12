import { lazy, Suspense, type ComponentType } from 'react';

import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

import { RoutePath, RouteRedirectTarget, RouteSegment } from './routePaths';

// Lazy-loaded layout - keeps login page bundle small
const MainLayout = lazy(async () => ({
  default: (await import('@/components/layout/MainLayout')).MainLayout,
}));

// Lazy-loaded pages
const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
const DashboardPage = lazy(async () => import('@/features/dashboard/pages/DashboardPage'));
const NativeProductsPage = lazy(async () => import('@/features/products/pages/NativeProductsPage'));
const ProductsListPage = lazy(async () => import('@/features/products/pages/ProductsListPage'));
const NativeComponentsPage = lazy(async () => import('@/features/components/pages/NativeComponentsPage'));
const SyncfusionComponentsPage = lazy(
  async () => import('@/features/components/pages/SyncfusionComponentsPage'),
);
const NativeGridShowcase = lazy(async () => import('@/features/components/pages/NativeGridShowcase'));
const SyncfusionGridShowcase = lazy(
  async () => import('@/features/components/pages/SyncfusionGridShowcase'),
);
const SyncfusionFormsPage = lazy(async () => import('@/features/forms/pages/SyncfusionFormsPage'));
const NativeFormsPage = lazy(async () => import('@/features/forms/pages/NativeFormsPage'));

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
      // Components
      {
        path: RouteSegment.Components,
        element: <Navigate replace to={RouteRedirectTarget.Native} />,
      },
      {
        path: RouteSegment.ComponentsNative,
        element: <LazyPage component={NativeComponentsPage} />,
      },
      {
        path: RouteSegment.ComponentsSyncfusion,
        element: <LazyPage component={SyncfusionComponentsPage} />,
      },
      // Grid showcase
      {
        path: RouteSegment.ComponentsGrid,
        element: <Navigate replace to={RouteRedirectTarget.Native} />,
      },
      {
        path: RouteSegment.ComponentsGridNative,
        element: <LazyPage component={NativeGridShowcase} />,
      },
      {
        path: RouteSegment.ComponentsGridSyncfusion,
        element: <LazyPage component={SyncfusionGridShowcase} />,
      },
      // Forms
      {
        path: RouteSegment.Forms,
        element: <Navigate replace to={RouteRedirectTarget.Syncfusion} />,
      },
      {
        path: RouteSegment.FormsSyncfusion,
        element: <LazyPage component={SyncfusionFormsPage} />,
      },
      { path: RouteSegment.FormsNative, element: <LazyPage component={NativeFormsPage} /> },
    ],
  },
  { path: RoutePath.Login, element: <LazyPage component={LoginPage} /> },
];

export const router = createBrowserRouter(routes);
