import { lazy, Suspense, type ComponentType } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Lazy-loaded pages
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const PetsListPage = lazy(() => import('@/features/pets/pages/PetsListPage'));
const ComponentsPage = lazy(() => import('@/features/showcase/pages/ComponentsPage'));
const ThemeEditorPage = lazy(() => import('@/features/theme-editor/pages/ThemeEditorPage'));

// Wrapper for lazy-loaded components
function LazyPage({ component: Component }: { component: ComponentType }): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyPage component={DashboardPage} /> },
      { path: 'pets', element: <LazyPage component={PetsListPage} /> },
      { path: 'components', element: <LazyPage component={ComponentsPage} /> },
      { path: 'theme-editor', element: <LazyPage component={ThemeEditorPage} /> },
    ],
  },
  { path: '/login', element: <LazyPage component={LoginPage} /> },
];

export const router = createBrowserRouter(routes);
