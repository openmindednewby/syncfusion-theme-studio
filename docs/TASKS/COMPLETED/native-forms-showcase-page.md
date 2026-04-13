# Task: Create Native Forms Showcase Page

> **Reference**: [Forms Architecture Guide](../../code-standards/forms-architecture.md)

## Status: COMPLETED

## Problem Statement

The application needs a showcase page demonstrating forms built with native HTML inputs (no Syncfusion dependencies). This is critical for performance on public-facing pages like login, registration, and contact forms where minimal bundle size is essential.

## Why Native Forms?

| Aspect | Syncfusion | Native |
|--------|------------|--------|
| Bundle size | ~200KB+ | ~0KB (just HTML) |
| First paint | Slower | Faster |
| Use case | Dashboard forms | Login, public pages |
| Features | Rich (masks, pickers) | Basic |
| Theme integration | Full | CSS variables |

## Requirements

### Functional Requirements

1. **Form Types to Demonstrate**:
   - Login form (email + password)
   - Registration form (basic fields)
   - Contact form (name, email, message)
   - Newsletter subscription (single email field)
   - Search form (inline)

2. **Field Types to Cover**:
   - Text input
   - Email input
   - Password input (with show/hide toggle)
   - Textarea
   - Checkbox
   - Radio group
   - Native select
   - Number input

3. **Validation Scenarios**:
   - Required fields
   - Email format
   - Password min length
   - Password confirmation match
   - Terms acceptance checkbox

4. **UI Features**:
   - Themed error styling (uses CSS variables)
   - Helper text
   - Loading states
   - Password visibility toggle
   - Form reset

### Non-Functional Requirements

- **Zero Syncfusion Dependencies**: Must not import any Syncfusion packages
- **Performance**: Target < 50KB JS for form components
- **Accessibility**: Full keyboard navigation, screen reader support
- **Theme Compatible**: Use existing CSS variable system
- **SSR Safe**: No window/document access on import

## Implementation Plan

### Phase 1: Native Field Adapters

1. **Create Native Form Fields**
   ```
   src/components/ui/form-fields/
   ├── FormNativeInput.tsx      # Text, email, password, number
   ├── FormNativeSelect.tsx     # Native <select>
   ├── FormNativeTextarea.tsx   # <textarea>
   ├── FormNativeCheckbox.tsx   # Single checkbox
   ├── FormNativeRadioGroup.tsx # Radio button group
   └── FormPasswordInput.tsx    # Password with visibility toggle
   ```

2. **Create Native-Only Styles**
   ```css
   /* src/styles/layers/components-forms-native.css */
   @layer components {
     .form-native-input { ... }
     .form-native-select { ... }
     .form-native-error { ... }
   }
   ```

### Phase 2: Showcase Page

1. **Create Page Structure**
   ```
   src/features/showcase/pages/NativeFormsPage/
   ├── index.tsx
   ├── forms/
   │   ├── LoginForm/
   │   │   ├── index.tsx
   │   │   └── schema.ts
   │   ├── RegistrationForm/
   │   │   ├── index.tsx
   │   │   └── schema.ts
   │   ├── ContactForm/
   │   │   ├── index.tsx
   │   │   └── schema.ts
   │   └── NewsletterForm/
   │       ├── index.tsx
   │       └── schema.ts
   └── components/
       └── FormCard.tsx
   ```

2. **Add Route**
   - Add `/showcase/native-forms` route
   - Add navigation link

3. **Performance Comparison Section**
   - Show bundle size comparison
   - Explain when to use native vs Syncfusion

### Phase 3: Native Button Component

Create a lightweight button to pair with native forms:

```typescript
// src/components/ui/native/ButtonNative/index.tsx
interface ButtonNativeProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}
```

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `src/components/ui/form-fields/FormNativeInput.tsx` | Native input adapter |
| `src/components/ui/form-fields/FormNativeSelect.tsx` | Native select adapter |
| `src/components/ui/form-fields/FormNativeTextarea.tsx` | Textarea adapter |
| `src/components/ui/form-fields/FormNativeCheckbox.tsx` | Checkbox adapter |
| `src/components/ui/form-fields/FormNativeRadioGroup.tsx` | Radio group adapter |
| `src/components/ui/form-fields/FormPasswordInput.tsx` | Password with toggle |
| `src/components/ui/native/ButtonNative/index.tsx` | Native button |
| `src/styles/layers/components-forms-native.css` | Native form styles |
| `src/features/showcase/pages/NativeFormsPage/index.tsx` | Page component |
| `src/features/showcase/pages/NativeFormsPage/forms/*` | Example forms |

### Modified Files

| File | Change |
|------|--------|
| `src/app/routes.tsx` | Add native forms route |
| `src/styles/login.css` | Import native form styles |
| `src/components/ui/form-fields/index.ts` | Export native adapters |
| `src/components/ui/native/index.ts` | Export ButtonNative |

## Success Criteria

- [ ] All native field adapters created
- [ ] Zero imports from `@syncfusion/*` packages
- [ ] Native form styles using CSS variables
- [ ] 4+ example forms implemented
- [ ] Password visibility toggle working
- [ ] Validation on blur with i18n
- [ ] Page accessible at `/showcase/native-forms`
- [ ] Bundle analysis shows no Syncfusion in native forms
- [ ] All fields have testID
- [ ] No ESLint errors
- [ ] Build completes successfully

## Testing Requirements

### Unit Tests
- Schema validation tests
- Password toggle functionality

### E2E Tests
- Navigate to native forms page
- Fill and submit each form
- Test password visibility toggle
- Verify validation errors

### Performance Tests
- Verify no Syncfusion chunks loaded on native forms page
- Measure Time to Interactive

## CSS Variable Integration

Native form components must use the existing theme variables:

```css
.form-native-input {
  background-color: var(--component-input-background);
  border-color: var(--component-input-border-default);
  color: var(--component-input-text-color);
}

.form-native-input:focus {
  border-color: var(--component-input-border-focus);
  box-shadow: 0 0 0 3px rgb(var(--color-primary-500) / 0.1);
}

.form-native-input.has-error {
  border-color: rgb(var(--color-error-500));
}
```

## Estimated Effort

| Phase | Effort |
|-------|--------|
| Phase 1: Native Adapters | 1-2 days |
| Phase 2: Showcase Page | 1-2 days |
| Phase 3: Button + Polish | 0.5 days |
| Testing | 0.5 days |
| **Total** | **3-5 days** |

## Notes

- This task depends on completing Syncfusion forms first (reuses form infrastructure)
- Native forms should be the default for login page
- Consider migrating existing LoginPage to use new native form components
- The `FormPasswordInput` with visibility toggle is a common pattern worth getting right
