import { lazy, Suspense, type ComponentType } from 'react';

import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { MainLayout } from '@/components/layout/MainLayout';

// Lazy-loaded pages
const DashboardPage = lazy(async () => import('@/features/dashboard/pages/DashboardPage'));
const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
const ProductsListPage = lazy(async () => import('@/features/products/pages/ProductsListPage'));
const ComponentsPage = lazy(async () => import('@/features/showcase/pages/ComponentsPage'));

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
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyPage component={DashboardPage} /> },
      { path: 'products', element: <LazyPage component={ProductsListPage} /> },
      { path: 'components', element: <LazyPage component={ComponentsPage} /> },
    ],
  },
  { path: '/login', element: <LazyPage component={LoginPage} /> },
];

export const router = createBrowserRouter(routes);
