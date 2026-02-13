# Forms Showcase API Integration — Master Plan

## Status: TODO
## Priority: High (Syncfusion) / Medium (Native)

## Overview

Upgrade the existing Syncfusion Forms Showcase and Native Forms Showcase pages to use the MockServer API instead of local-only state. Both pages already exist with working forms (React Hook Form + Zod validation), but currently only store results in `useState`. The goal is to wire them to real CRUD operations via the generated Orval hooks.

## Current State

### Syncfusion Forms Page (`src/features/forms/pages/SyncfusionFormsPage/`)
- **4 static forms**: Contact, Registration, Product, Search
- All use React Hook Form + Zod + Syncfusion components
- Results shown via `FormResult` component (JSON display of local state)
- No API calls whatsoever

### Native Forms Page (`src/features/forms/pages/NativeFormsPage/`)
- **3 static forms**: Login, Contact, Newsletter
- All use React Hook Form + Zod + native HTML elements
- Results shown via shared `FormResult` component
- No API calls whatsoever

### Available MockServer Hooks (already generated via Orval)
| Domain | Hooks | Endpoint Pattern |
|--------|-------|-----------------|
| Products | List, GetById, Search, Create, Update, Delete, ListCategories, ListByCategory | `/api/products/*` |
| Users | List, GetById, Search, Create, Update, Delete | `/api/users/*` |
| Orders | List, GetById, Create, Update, Delete | `/api/orders/*` |
| Notifications | List, UnreadCount | `/api/notifications/*` |

## Architecture Decisions

1. **Keep existing form structure** — Don't rewrite forms, wire them to API
2. **Replace local `FormResult` with API response** — Show server response, not local state
3. **Add DataGrids below forms** — Show server-side data that forms create/modify
4. **Query invalidation on mutations** — After create/update/delete, refetch list queries
5. **Toast notifications** — Show success/error feedback on API operations
6. **Loading states** — Show loading indicators during API calls
7. **Adapt schemas where needed** — Map form fields to `CreateXxxRequest` models

## Task Breakdown

### Syncfusion Forms Page (High Priority)

| # | Task | Description | File |
|---|------|-------------|------|
| 1 | [Syncfusion Product CRUD](./sf-01-product-crud.md) | Wire Product Form to Products API + add DataGrid | `sf-01-product-crud.md` |
| 2 | [Syncfusion User Management](./sf-02-user-management.md) | Replace Registration with User CRUD form + DataGrid | `sf-02-user-management.md` |
| 3 | [Syncfusion Product Search](./sf-03-product-search.md) | Wire Search Form to Products Search API + results grid | `sf-03-product-search.md` |
| 4 | [Syncfusion Page Layout Update](./sf-04-page-layout.md) | Update SyncfusionFormsPage index to compose upgraded sections | `sf-04-page-layout.md` |

### Native Forms Page (Medium Priority)

| # | Task | Description | File |
|---|------|-------------|------|
| 5 | [Native User Lookup](./nf-05-user-lookup.md) | Wire Login Form to Users Search API | `nf-05-user-lookup.md` |
| 6 | [Native User Creation](./nf-06-user-creation.md) | Wire Contact Form to Users Create API | `nf-06-user-creation.md` |
| 7 | [Native Order Form](./nf-07-order-form.md) | Replace Newsletter with Order creation form | `nf-07-order-form.md` |
| 8 | [Native Page Layout Update](./nf-08-page-layout.md) | Update NativeFormsPage index to compose upgraded sections | `nf-08-page-layout.md` |

### Verification

| # | Task | Description | File |
|---|------|-------------|------|
| 9 | [Quality Gate + Code Review](./09-quality-gate-review.md) | Run lint, tests, build + code standards review | `09-quality-gate-review.md` |

## Dependency Graph

```
sf-01, sf-02, sf-03 (independent, parallelizable)
         |
         v
       sf-04 (depends on sf-01, sf-02, sf-03)

nf-05, nf-06, nf-07 (independent, parallelizable)
         |
         v
       nf-08 (depends on nf-05, nf-06, nf-07)

sf-04, nf-08
    |
    v
  09 (quality gate + code review)
```

## Agent Delegation Strategy

### Wave 1 — Parallel (6 agents)
Launch all independent form tasks simultaneously:
- **frontend-dev** agent: `sf-01-product-crud.md` (Syncfusion Product CRUD)
- **frontend-dev** agent: `sf-02-user-management.md` (Syncfusion User Management)
- **frontend-dev** agent: `sf-03-product-search.md` (Syncfusion Product Search)
- **frontend-dev** agent: `nf-05-user-lookup.md` (Native User Lookup)
- **frontend-dev** agent: `nf-06-user-creation.md` (Native User Creation)
- **frontend-dev** agent: `nf-07-order-form.md` (Native Order Form)

### Wave 2 — Page Layout Composition (2 agents)
After Wave 1 completes:
- **frontend-dev** agent: `sf-04-page-layout.md` (Compose Syncfusion page)
- **frontend-dev** agent: `nf-08-page-layout.md` (Compose Native page)

### Wave 3 — Verification (2 agents in parallel)
After Wave 2 completes:
- **quality-gate** agent: Run lint, unit tests, build
- **code-reviewer** agent: Standards compliance review

## Key Patterns to Follow

### Orval Hook Usage (from ProductsListPage reference)
```typescript
const { data, isLoading } = useMockServerWebProductsList(
  { page: 1, pageSize: 10 },
);
const products = data?.data?.items ?? [];
```

### Mutation with Query Invalidation
```typescript
const queryClient = useQueryClient();
const createProduct = useMockServerWebProductsCreate({
  mutation: {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMockServerWebProductsListQueryKey() });
    },
  },
});
```

### Form Submission → API Call
```typescript
const handleSubmit = (formData: ProductFormData) => {
  createProduct.mutate({
    data: {
      title: formData.productName,
      price: formData.price,
      category: formData.category,
    },
  });
};
```
