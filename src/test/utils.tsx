import { type ReactElement, type ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { render, type RenderOptions, type RenderResult } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface WrapperProps {
  children: ReactNode;
}

const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

const AllProviders = ({ children }: WrapperProps): JSX.Element => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
