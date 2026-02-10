import { lazy, Suspense, type ComponentType } from 'react';

import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Lazy-loaded layout - keeps login page bundle small
const MainLayout = lazy(async () => ({
  default: (await import('@/components/layout/MainLayout')).MainLayout,
}));

// Lazy-loaded pages
const DashboardPage = lazy(async () => import('@/features/dashboard/pages/DashboardPage'));
const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
const ProductsListPage = lazy(async () => import('@/features/products/pages/ProductsListPage'));
const NativeComponentsPage = lazy(async () => import('@/features/showcase/pages/NativeComponentsPage'));
const SyncfusionComponentsPage = lazy(async () => import('@/features/showcase/pages/SyncfusionComponentsPage'));
const DataGridPage = lazy(async () => import('@/features/showcase/pages/DataGridPage'));
const SyncfusionFormsPage = lazy(async () => import('@/features/showcase/pages/SyncfusionFormsPage'));
const NativeFormsPage = lazy(async () => import('@/features/showcase/pages/NativeFormsPage'));

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
  // Login is the landing page
  { path: '/', element: <LazyPage component={LoginPage} /> },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <LazyPage component={DashboardPage} /> },
      { path: 'products', element: <LazyPage component={ProductsListPage} /> },
      // Components routes - redirect /components to /components/native
      { path: 'components', element: <Navigate replace to="native" /> },
      { path: 'components/native', element: <LazyPage component={NativeComponentsPage} /> },
      { path: 'components/syncfusion', element: <LazyPage component={SyncfusionComponentsPage} /> },
      { path: 'components/grid', element: <LazyPage component={DataGridPage} /> },
      // Forms routes - redirect /forms to /forms/syncfusion
      { path: 'forms', element: <Navigate replace to="syncfusion" /> },
      { path: 'forms/syncfusion', element: <LazyPage component={SyncfusionFormsPage} /> },
      { path: 'forms/native', element: <LazyPage component={NativeFormsPage} /> },
    ],
  },
  // Keep /login as alias for backwards compatibility
  { path: '/login', element: <LazyPage component={LoginPage} /> },
];

export const router = createBrowserRouter(routes);
