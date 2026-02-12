# Task 10: Create Mock Server Mutator + Regenerate Hooks

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `frontend-dev`
> **Depends on**: Task 09
> **Blocks**: None

---

## Objective

Create the Orval mutator for the mock server API (following the exact same pattern as `dummyjsonMutator.ts`) and regenerate all API hooks.

## Changes

### 1. Create mutator: `src/api/mutators/mockserverMutator.ts`

Follow the existing `dummyjsonMutator.ts` pattern:

```typescript
import { apiClient } from '@/lib/api/axiosInstance';

import type { AxiosRequestConfig, AxiosResponse, RawAxiosResponseHeaders } from 'axios';

const MOCKSERVER_BASE_URL = '/mockapi';

function convertHeaders(axiosHeaders: RawAxiosResponseHeaders): Headers {
  const headers = new Headers();
  Object.entries(axiosHeaders).forEach(([key, value]) => {
    if (typeof value === 'string') headers.append(key, value);
  });
  return headers;
}

export const mockserverInstance = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const method = options?.method ?? 'GET';
  const headersRecord: Record<string, string> = {};

  if (options?.headers instanceof Headers)
    options.headers.forEach((value, key) => {
      headersRecord[key] = value;
    });
  else if (options?.headers) Object.assign(headersRecord, options.headers);

  const config: AxiosRequestConfig = {
    url,
    method,
    baseURL: MOCKSERVER_BASE_URL,
    headers: headersRecord,
    data: options?.body,
  };

  if (options?.signal) config.signal = options.signal;

  const response: AxiosResponse<unknown> = await apiClient(config);

  const result: unknown = {
    data: response.data,
    status: response.status,
    headers: convertHeaders(response.headers),
  };

  return result as T;
};

export default mockserverInstance;
```

### 2. Regenerate hooks

```bash
npm run api:generate
```

This will:
- Generate `src/api/generated/mockserver/` with all React Query hooks
- Generate `src/api/generated/mockserver/models/` with TypeScript interfaces
- Run prettier on the output

### 3. Verify generated output

The generated hooks should include:
- `useGetAllProducts` / `useGetProductById` / `useSearchProducts` (queries)
- `useCreateProduct` / `useUpdateProduct` / `useDeleteProduct` (mutations)
- `useGetAllUsers` / `useGetUserById` / etc.
- `useGetAllOrders` / etc.
- `useGetNotifications` / `useGetUnreadCount`
- All TypeScript model interfaces (Product, User, Order, etc.)

## Verification

```bash
cd SyncfusionThemeStudio

# Generate hooks
npm run api:generate

# Verify generated files exist
ls src/api/generated/mockserver/

# Lint check
npm run lint

# Type check
npm run typecheck

# Unit tests still pass
npm run test:coverage
```

## Success Criteria

- [ ] `mockserverMutator.ts` created following dummyjson pattern
- [ ] Base URL points to `/mockapi` (Vite proxy path)
- [ ] `npm run api:generate` succeeds without errors
- [ ] Generated hooks exist in `src/api/generated/mockserver/`
- [ ] Generated models exist in `src/api/generated/mockserver/models/`
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test:coverage` passes (no regressions)
