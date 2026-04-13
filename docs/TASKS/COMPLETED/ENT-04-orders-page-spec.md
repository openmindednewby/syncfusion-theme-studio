# ENT-04: Orders Page

## Status: TODO
## Priority: High
## Depends on: None
## Agent: frontend-dev

## Objective

Create a full Orders management page. The MockServer already has complete CRUD endpoints for Orders (`/api/orders`), but there is no frontend page.

## Existing Backend

| Method | Route | Notes |
|--------|-------|-------|
| GET | `/api/orders` | Paginated list |
| GET | `/api/orders/{Id}` | Single order |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/{Id}` | Update order |
| DELETE | `/api/orders/{Id}` | Delete order |

## Implementation Plan

### 1. Route + Navigation

- Add `/orders` route to `router.tsx`
- Add "Orders" item to sidebar navigation under appropriate section
- Add i18n keys for orders page

### 2. API Hooks (Orval)

- Generate hooks via `npm run api:generate` (if not already generated)
- Verify hooks exist for all order endpoints in `src/api/generated/mockserver/orders/`

### 3. Orders Page Structure

```
src/features/orders/
├── pages/
│   └── OrdersPage/
│       ├── index.tsx              # Page container
│       ├── components/
│       │   ├── OrdersTable.tsx    # Syncfusion DataGrid
│       │   ├── OrdersToolbar.tsx  # Search, filters, add button
│       │   ├── OrderDialog.tsx    # Create/Edit dialog
│       │   └── OrderStatusBadge.tsx
│       └── hooks/
│           └── useOrdersPage.ts   # Page-level logic
├── types.ts
└── constants.ts
```

### 4. OrdersTable (Syncfusion DataGrid)

- Columns: Order ID, Customer, Date, Status, Items Count, Total, Actions
- Features: Sorting, paging, filtering, column chooser
- Row actions: View, Edit, Delete (with confirmation dialog)
- Status column with colored badges (Pending, Processing, Shipped, Delivered, Cancelled)

### 5. OrderDialog

- Create/Edit form with:
  - Customer selection (dropdown from users)
  - Order items (add/remove line items with product, quantity, price)
  - Status selection
  - Auto-calculated total
- Use React Hook Form + Zod validation

### 6. i18n

- Add all orders-related keys to `en.json`

## Success Criteria

- [ ] `/orders` route loads Orders page
- [ ] DataGrid shows paginated orders from MockServer
- [ ] Can create, edit, delete orders via dialog
- [ ] Order status badges with appropriate colors
- [ ] Sorting, filtering, paging work correctly
- [ ] Responsive layout
