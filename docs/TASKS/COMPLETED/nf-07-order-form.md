# NF-07: Native Order Creation Form

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Replace the Newsletter Form with an Order Creation form that uses the MockServer Orders API. This demonstrates a more complex native HTML form with dynamic item rows and demonstrates the Orders CRUD endpoints.

## Changes Made

### New Files
1. **`src/features/forms/pages/NativeFormsPage/forms/OrderForm/schema.ts`** (14 lines)
   - Zod schema with `userId` (coerced number, positive) and `items` array
   - Each item has `productId` (coerced number, positive) and `quantity` (coerced int, positive)
   - Array requires minimum 1 item

2. **`src/features/forms/pages/NativeFormsPage/forms/OrderForm/index.tsx`** (148 lines)
   - Props: `users: UserDto[]`, `products: ProductDto[]`, `onSubmit`, `isSubmitting`
   - User selector via `FormNativeSelect` with users from API
   - Dynamic item rows via `useFieldArray` from react-hook-form
   - Each row: product `FormNativeSelect` + quantity `FormNativeInput` + remove button
   - "Add Item" button appends new rows
   - Calculated order total using `useMemo` over watched items
   - Submit button with loading state

3. **`src/features/forms/pages/NativeFormsPage/sections/OrderSection/index.tsx`** (123 lines)
   - Orchestrates OrderForm + recent orders table
   - Uses `useMockServerWebUsersList` for user dropdown data
   - Uses `useMockServerWebProductsList` for product dropdown data
   - Uses `useMockServerWebOrdersCreate` for form submission
   - Uses `useMockServerWebOrdersList` for recent orders display
   - Maps form data to `CreateOrderRequest` (adds productTitle, unitPrice from product data)
   - Invalidates orders list query on successful creation
   - Native HTML table showing recent orders (ID, User ID, Items Count, Total, Status, Date)

### Modified Files
4. **`src/features/forms/pages/NativeFormsPage/index.tsx`** - Replaced Newsletter section with Order section
5. **`src/localization/locales/en.json`** - Added `forms.order.*` keys and `validation.minOneItem`

## Verification Results

- Lint (`eslint --fix`): All new files pass with 0 errors
- Unit tests (`vitest run --coverage`): 773 passed, 0 failed
- Typecheck (`tsc --noEmit`): No errors in new files
- File sizes: schema 14 lines, OrderForm 148 lines, OrderSection 123 lines -- all under limits

## Acceptance Criteria

- [x] Order form creates orders via MockServer API
- [x] User dropdown populated from API
- [x] Product dropdown populated from API
- [x] Dynamic item rows (add/remove)
- [x] Order total calculated from items
- [x] Recent orders list displayed below
- [x] Loading state during mutation
- [x] Query invalidation after creation
- [x] All native HTML, no Syncfusion components
- [x] Files under 300 lines, components under 200 lines
