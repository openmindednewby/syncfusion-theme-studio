# SF-04: Syncfusion Forms Page Layout Update

## Status: TODO
## Priority: High
## Depends on: sf-01, sf-02, sf-03
## Agent: frontend-dev

## Objective

Update the SyncfusionFormsPage index to compose the upgraded CRUD sections (Product CRUD, User Management, Product Search) and remove the old static form layout. Keep the Contact Form as a client-side validation showcase.

## Current State

- `src/features/forms/pages/SyncfusionFormsPage/index.tsx`
- Imports 4 forms: ContactForm, ProductForm, RegistrationForm, SearchForm
- Renders each with `FormSection` wrapper + `FormResult` display
- All local state via `useState<FormResults>`

## Target State

The page should showcase 4 sections:
1. **Product CRUD** — `ProductCrudSection` (from sf-01)
2. **User Management** — `UserManagementSection` (from sf-02)
3. **Product Search** — `ProductSearchSection` (from sf-03)
4. **Contact Form** — Keep existing ContactForm as client-side only showcase (demonstrates pure validation without API)

## Implementation Steps

### 1. Update Page Index
**File**: `src/features/forms/pages/SyncfusionFormsPage/index.tsx`
- Remove old `FormResults` state and handler callbacks
- Import new section components: `ProductCrudSection`, `UserManagementSection`, `ProductSearchSection`
- Keep `ContactForm` with `FormSection` + `FormResult` (local state only — validation showcase)
- Layout: stack sections vertically with `space-y-8`
- Each section wrapped in `FormSection` with title/description

### 2. Update localization keys if needed
- Add new FM keys for section titles/descriptions if the existing ones don't fit
- E.g., `forms.productCrud.title`, `forms.productCrud.description`
- E.g., `forms.userManagement.title`, `forms.userManagement.description`

### 3. Update TestIds
- Add new TestIds for the CRUD sections if needed
- Keep existing `TestIds.FORMS_SHOWCASE_PAGE`

## Page Structure

```tsx
<div data-testid={TestIds.FORMS_SHOWCASE_PAGE}>
  {/* Page Header */}
  <h1>{FM('forms.page.title')}</h1>
  <p>{FM('forms.page.description')}</p>

  {/* Product CRUD Section */}
  <FormSection title={...} description={...}>
    <ProductCrudSection />
  </FormSection>

  {/* User Management Section */}
  <FormSection title={...} description={...}>
    <UserManagementSection />
  </FormSection>

  {/* Product Search Section */}
  <FormSection title={...} description={...}>
    <ProductSearchSection />
  </FormSection>

  {/* Contact Form — Client-side validation showcase */}
  <FormSection title={...} description={...}>
    <ContactForm onSubmit={handleContactSubmit} />
    <FormResult data={contactResult} />
  </FormSection>
</div>
```

## Acceptance Criteria

- [ ] Page renders all 4 sections without errors
- [ ] Product CRUD section shows form + DataGrid
- [ ] User Management section shows form + DataGrid
- [ ] Product Search section shows search form + results grid
- [ ] Contact Form remains as client-side validation showcase
- [ ] Page stays under 300 lines (delegate to section components)
- [ ] No broken imports or unused code
