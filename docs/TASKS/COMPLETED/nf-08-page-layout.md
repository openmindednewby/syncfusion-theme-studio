# NF-08: Native Forms Page Layout Update

## Status: TODO
## Priority: Medium
## Depends on: nf-05, nf-06, nf-07
## Agent: frontend-dev

## Objective

Update the NativeFormsPage index to compose the upgraded sections (User Lookup, User Creation, Order Creation) replacing the old static forms layout.

## Current State

- `src/features/forms/pages/NativeFormsPage/index.tsx`
- Imports 3 forms: LoginForm, ContactForm, NewsletterForm
- Renders each with `FormSection` wrapper + `FormResult` display
- All local state via `useState<FormResults>`

## Target State

The page should showcase 3 sections:
1. **User Lookup** — `UserLookupSection` (from nf-05)
2. **User Creation** — `UserCreationSection` (from nf-06)
3. **Order Creation** — `OrderSection` (from nf-07)

## Implementation Steps

### 1. Update Page Index
**File**: `src/features/forms/pages/NativeFormsPage/index.tsx`
- Remove old `FormResults` state and handler callbacks
- Remove `PASSWORD_MASK` constant
- Import new section components: `UserLookupSection`, `UserCreationSection`, `OrderSection`
- Keep the "Performance Note" banner (it's still relevant — native HTML, no Syncfusion)
- Layout: stack sections vertically with `space-y-8`
- Each section wrapped in `FormSection` with title/description

### 2. Update localization keys if needed
- Add new FM keys for section titles/descriptions
- E.g., `forms.native.userLookup.title`, `forms.native.userCreation.title`, `forms.native.orders.title`

### 3. Update TestIds
- Keep existing `TestIds.NATIVE_FORMS_PAGE`
- Add new TestIds for sections if needed

## Page Structure

```tsx
<div data-testid={TestIds.NATIVE_FORMS_PAGE}>
  {/* Page Header */}
  <h1>{FM('forms.native.page.title')}</h1>
  <p>{FM('forms.native.page.description')}</p>

  {/* Performance Note */}
  <div className="...">
    <h3>{FM('forms.native.performance.title')}</h3>
    <p>{FM('forms.native.performance.description')}</p>
  </div>

  {/* User Lookup Section */}
  <FormSection title={...} description={...}>
    <UserLookupSection />
  </FormSection>

  {/* User Creation Section */}
  <FormSection title={...} description={...}>
    <UserCreationSection />
  </FormSection>

  {/* Order Creation Section */}
  <FormSection title={...} description={...}>
    <OrderSection />
  </FormSection>
</div>
```

## Acceptance Criteria

- [ ] Page renders all 3 sections without errors
- [ ] User Lookup section shows login form + user details
- [ ] User Creation section shows contact form + recent users
- [ ] Order Creation section shows order form + recent orders
- [ ] Performance Note banner preserved
- [ ] Page stays under 300 lines (delegate to section components)
- [ ] No broken imports or unused code
