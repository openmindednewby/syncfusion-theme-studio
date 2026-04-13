# Task: Create Syncfusion Forms Showcase Page

> **Reference**: [Forms Architecture Guide](../../code-standards/forms-architecture.md)

## Status: COMPLETED

## Problem Statement

The application needs a dedicated showcase page demonstrating how to build forms using Syncfusion components with the new React Hook Form + Zod architecture. This page will serve as both a reference implementation and a visual demonstration of form capabilities.

## Requirements

### Functional Requirements

1. **Form Types to Demonstrate**:
   - Contact/Inquiry form (basic fields)
   - User Registration form (with password confirmation)
   - Product Entry form (with select, date picker, grid integration)
   - Search/Filter form (inline, horizontal layout)

2. **Field Types to Cover**:
   - Text inputs (required, optional, with validation)
   - Email with format validation
   - Password with strength indicator
   - Phone with format mask
   - Select/Dropdown with static and dynamic options
   - DatePicker with min/max constraints
   - DateRangePicker
   - Checkbox and Radio groups
   - Numeric inputs with range validation
   - Textarea for long text

3. **Validation Scenarios**:
   - Required fields
   - Format validation (email, phone, URL)
   - Min/max length
   - Custom validation (password strength)
   - Cross-field validation (password confirmation)
   - Async validation (email uniqueness - simulated)
   - Real-time validation on blur

4. **UI Features**:
   - Error message display
   - Helper text
   - Loading states during submission
   - Success/error notifications
   - Form reset functionality
   - Dirty state indicator

### Non-Functional Requirements

- **Performance**: Form should not cause unnecessary re-renders
- **Accessibility**: All fields must have proper labels, aria attributes
- **i18n**: All text must use translation keys
- **Theming**: Must integrate with existing theme system
- **Testing**: testID on all interactive elements

## Implementation Plan

### Phase 1: Foundation

1. **Install Dependencies**
   ```bash
   npm install react-hook-form zod @hookform/resolvers
   ```

2. **Create Form Infrastructure**
   - `src/lib/forms/index.ts` - Public exports
   - `src/lib/forms/useFormWithSchema.ts` - Enhanced hook
   - `src/lib/forms/zodErrorMap.ts` - i18n error mapping
   - `src/lib/forms/schemas/common.ts` - Reusable validators

3. **Create Syncfusion Field Adapters**
   - `src/components/ui/form-fields/FormInput.tsx`
   - `src/components/ui/form-fields/FormSelect.tsx`
   - `src/components/ui/form-fields/FormDatePicker.tsx`
   - `src/components/ui/form-fields/FormCheckbox.tsx`
   - `src/components/ui/form-fields/FieldError.tsx`
   - `src/components/ui/form-fields/index.ts`

### Phase 2: Showcase Page

1. **Create Page Structure**
   ```
   src/features/showcase/pages/SyncfusionFormsPage/
   ├── index.tsx              # Main page component
   ├── forms/
   │   ├── ContactForm/
   │   │   ├── index.tsx
   │   │   └── schema.ts
   │   ├── RegistrationForm/
   │   │   ├── index.tsx
   │   │   └── schema.ts
   │   ├── ProductForm/
   │   │   ├── index.tsx
   │   │   └── schema.ts
   │   └── SearchForm/
   │       ├── index.tsx
   │       └── schema.ts
   └── components/
       ├── FormSection.tsx     # Section wrapper
       └── FormResult.tsx      # Display submitted data
   ```

2. **Add Route**
   - Add `/showcase/syncfusion-forms` route
   - Add navigation link to showcase sidebar

3. **Create Example Forms**
   - Each form in its own folder with schema and component
   - Show submitted data in a preview panel

### Phase 3: Documentation Integration

1. **Add Inline Documentation**
   - Code comments explaining patterns
   - "View Source" button for each form

2. **Add to Navigation**
   - Link from main showcase page
   - Breadcrumb navigation

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `src/lib/forms/index.ts` | Form library exports |
| `src/lib/forms/useFormWithSchema.ts` | Enhanced form hook |
| `src/lib/forms/zodErrorMap.ts` | i18n error mapping |
| `src/lib/forms/schemas/common.ts` | Reusable validators |
| `src/components/ui/form-fields/FormInput.tsx` | Input adapter |
| `src/components/ui/form-fields/FormSelect.tsx` | Select adapter |
| `src/components/ui/form-fields/FormDatePicker.tsx` | DatePicker adapter |
| `src/components/ui/form-fields/FormCheckbox.tsx` | Checkbox adapter |
| `src/components/ui/form-fields/FieldError.tsx` | Error display |
| `src/components/ui/form-fields/index.ts` | Barrel exports |
| `src/features/showcase/pages/SyncfusionFormsPage/index.tsx` | Page component |
| `src/features/showcase/pages/SyncfusionFormsPage/forms/*` | Example forms |

### Modified Files

| File | Change |
|------|--------|
| `src/app/routes.tsx` | Add route for forms page |
| `src/localization/en.json` | Add form/validation translations |
| `package.json` | Add form dependencies |

## Success Criteria

- [ ] All dependencies installed and configured
- [ ] Form infrastructure (hook, schemas, error map) created
- [ ] All 4 Syncfusion field adapters working
- [ ] 4 example forms implemented
- [ ] Validation working on blur with i18n messages
- [ ] Async validation demo working
- [ ] Page accessible via route `/showcase/syncfusion-forms`
- [ ] All fields have testID for E2E testing
- [ ] No ESLint errors
- [ ] Unit tests for schemas pass
- [ ] Build completes successfully

## Testing Requirements

### Unit Tests
- Schema validation tests for each form
- Common validator tests

### E2E Tests
- Navigate to forms page
- Fill and submit each form type
- Verify validation error display
- Verify successful submission

## Dependencies

- react-hook-form: ^7.x
- zod: ^3.x
- @hookform/resolvers: ^3.x

## Estimated Effort

| Phase | Effort |
|-------|--------|
| Phase 1: Foundation | 1-2 days |
| Phase 2: Showcase Page | 2-3 days |
| Phase 3: Documentation | 0.5 days |
| Testing | 1 day |
| **Total** | **4.5-6.5 days** |

## Notes

- This task should be completed BEFORE the native forms page
- The form infrastructure created here will be reused by native forms
- Follow the patterns in `forms-architecture.md` exactly
