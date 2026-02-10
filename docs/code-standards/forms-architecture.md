# Forms Architecture Guide

> **Complete reference** for building high-performance, type-safe forms in SyncfusionThemeStudio.

This guide covers form state management, validation, and UI patterns that work with both Syncfusion and native components.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Schema-First Validation](#schema-first-validation)
5. [Form State Management](#form-state-management)
6. [Field Adapters](#field-adapters)
7. [Native vs Syncfusion Forms](#native-vs-syncfusion-forms)
8. [i18n Integration](#i18n-integration)
9. [Async Validation](#async-validation)
10. [Performance Optimization](#performance-optimization)
11. [Preloading Strategy](#preloading-strategy)
12. [Testing Forms](#testing-forms)
13. [Migration from Legacy Pattern](#migration-from-legacy-pattern)

---

## Architecture Overview

Forms are built on three separated layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    VALIDATION LAYER (Zod)                       │
│  Schema definitions, type inference, reusable validators        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              STATE MANAGEMENT LAYER (React Hook Form)           │
│  Form values, dirty/touched state, submission, errors           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    UI LAYER (Field Adapters)                    │
│  Syncfusion wrappers, native inputs, themed form fields         │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Architecture?

| Requirement | Solution |
|-------------|----------|
| Type safety | Zod schemas with `z.infer<>` for automatic types |
| Performance | React Hook Form's uncontrolled approach (minimal re-renders) |
| Flexibility | Field adapters work with Syncfusion AND native inputs |
| Reusability | Shared schemas, common validators, composable patterns |
| i18n | Custom Zod error map with translation keys |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Validation | **Zod** | Schema definition, type inference, custom validators |
| State | **React Hook Form** | Form state, dirty tracking, submission handling |
| Resolver | **@hookform/resolvers** | Zod integration with RHF |
| UI | **Syncfusion / Native** | Themed input components |

### Bundle Size

| Package | Size (gzipped) |
|---------|----------------|
| react-hook-form | ~3.4 KB |
| zod | ~4.5 KB |
| @hookform/resolvers | ~0.6 KB |
| **Total** | **~8.5 KB** |

---

## Folder Structure

```
src/
├── lib/forms/
│   ├── index.ts                    # Public API exports
│   ├── useFormWithSchema.ts        # Enhanced form hook
│   ├── zodErrorMap.ts              # i18n error message mapping
│   └── schemas/
│       ├── common.ts               # Reusable validators (email, phone, etc.)
│       └── index.ts                # Schema exports
│
├── components/ui/form-fields/
│   ├── index.ts                    # Barrel exports
│   ├── FormInput.tsx               # Syncfusion TextBox adapter
│   ├── FormSelect.tsx              # Syncfusion DropDown adapter
│   ├── FormDatePicker.tsx          # Syncfusion DatePicker adapter
│   ├── FormCheckbox.tsx            # Syncfusion Checkbox adapter
│   ├── FormNativeInput.tsx         # Native input adapter
│   ├── FormNativeSelect.tsx        # Native select adapter
│   ├── FormField.tsx               # Generic field wrapper
│   └── FieldError.tsx              # Error message display
│
└── features/
    └── [feature-name]/
        └── forms/
            ├── schema.ts           # Feature-specific Zod schema
            ├── types.ts            # Inferred types (optional)
            └── useFormData.ts      # Form-specific hook (optional)
```

---

## Schema-First Validation

### Basic Schema Pattern

```typescript
// src/features/user-settings/forms/schema.ts
import { z } from 'zod';
import { emailSchema, passwordSchema, phoneSchema } from '@/lib/forms/schemas/common';

export const userSettingsSchema = z.object({
  email: emailSchema,
  phone: phoneSchema.optional(),
  password: passwordSchema,
  confirmPassword: z.string(),
  notifications: z.boolean().default(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordMismatch',
  path: ['confirmPassword'],
});

// Infer TypeScript type from schema
export type UserSettingsForm = z.infer<typeof userSettingsSchema>;
```

### Common Validators

```typescript
// src/lib/forms/schemas/common.ts
import { z } from 'zod';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;
const MIN_PASSWORD_LENGTH = 8;

export const emailSchema = z
  .string()
  .min(1, 'validation.required')
  .regex(EMAIL_REGEX, 'validation.invalidEmail');

export const phoneSchema = z
  .string()
  .regex(PHONE_REGEX, 'validation.invalidPhone');

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, 'validation.passwordTooShort');

export const requiredString = z
  .string()
  .min(1, 'validation.required');

export const optionalString = z
  .string()
  .optional()
  .transform((val) => val || undefined);

export const positiveNumber = z
  .number()
  .positive('validation.mustBePositive');

export const dateSchema = z
  .date({ required_error: 'validation.required' });

export const futureDateSchema = z
  .date()
  .refine((date) => date > new Date(), 'validation.mustBeFutureDate');
```

---

## Form State Management

### Enhanced Form Hook

```typescript
// src/lib/forms/useFormWithSchema.ts
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

interface UseFormWithSchemaOptions<T extends z.ZodType>
  extends Omit<UseFormProps<z.infer<T>>, 'resolver'> {
  schema: T;
}

export function useFormWithSchema<T extends z.ZodType>({
  schema,
  ...formOptions
}: UseFormWithSchemaOptions<T>): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onBlur', // Validate on blur for performance
    ...formOptions,
  });
}
```

### Form Component Pattern

```typescript
// Example: src/features/contact/ContactForm.tsx
import { type FormEvent, useCallback } from 'react';

import { FormInput, FormSelect, FormDatePicker } from '@/components/ui/form-fields';
import { Button } from '@/components/ui/syncfusion';
import { useFormWithSchema } from '@/lib/forms';
import { FM } from '@/localization/helpers';

import { contactSchema, type ContactForm as ContactFormType } from './schema';

interface Props {
  onSubmit: (data: ContactFormType) => Promise<void>;
  initialValues?: Partial<ContactFormType>;
}

export function ContactForm({ onSubmit, initialValues }: Props): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useFormWithSchema({
    schema: contactSchema,
    defaultValues: initialValues,
  });

  const handleFormSubmit = useCallback(
    async (data: ContactFormType) => {
      await onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

  const onFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      handleSubmit(handleFormSubmit)(e);
    },
    [handleSubmit, handleFormSubmit]
  );

  return (
    <form onSubmit={onFormSubmit} noValidate>
      <FormInput
        name="name"
        control={control}
        label={FM('form.name')}
        placeholder={FM('form.namePlaceholder')}
      />

      <FormInput
        name="email"
        control={control}
        label={FM('form.email')}
        type="email"
      />

      <FormSelect
        name="category"
        control={control}
        label={FM('form.category')}
        dataSource={categories}
        fields={{ text: 'label', value: 'value' }}
      />

      <FormDatePicker
        name="preferredDate"
        control={control}
        label={FM('form.preferredDate')}
        min={new Date()}
      />

      <Button
        variant="primary"
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {FM('form.submit')}
      </Button>
    </form>
  );
}
```

---

## Field Adapters

Field adapters bridge React Hook Form with Syncfusion/native components.

### Syncfusion Input Adapter

```typescript
// src/components/ui/form-fields/FormInput.tsx
import { memo, useCallback, useMemo } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { Input } from '@/components/ui/syncfusion';
import type { InputProps } from '@/components/ui/syncfusion/Input';
import { FM } from '@/localization/helpers';

import { FieldError } from './FieldError';

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'input' | 'blur' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
}

function FormInputInner<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...inputProps
}: FormInputProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = fieldState.isTouched && !!fieldState.error;
        const errorMessage = hasError ? FM(fieldState.error?.message ?? '') : undefined;

        return (
          <div className="form-field">
            <Input
              {...inputProps}
              label={label}
              value={field.value ?? ''}
              input={useCallback(
                (args: { value: string }) => field.onChange(args.value),
                [field]
              )}
              blur={field.onBlur}
              error={errorMessage}
              helperText={!hasError ? helperText : undefined}
              ref={field.ref}
            />
            <FieldError error={errorMessage} />
          </div>
        );
      }}
    />
  );
}

export const FormInput = memo(FormInputInner) as typeof FormInputInner;
```

### Syncfusion Select Adapter

```typescript
// src/components/ui/form-fields/FormSelect.tsx
import { memo, useCallback } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { Select } from '@/components/ui/syncfusion';
import type { SelectProps } from '@/components/ui/syncfusion/Select';
import { FM } from '@/localization/helpers';

import { FieldError } from './FieldError';

interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'value' | 'change' | 'blur' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
}

function FormSelectInner<T extends FieldValues>({
  name,
  control,
  label,
  ...selectProps
}: FormSelectProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = fieldState.isTouched && !!fieldState.error;
        const errorMessage = hasError ? FM(fieldState.error?.message ?? '') : undefined;

        return (
          <div className="form-field">
            <Select
              {...selectProps}
              label={label}
              value={field.value}
              change={useCallback(
                (args: { value: unknown }) => field.onChange(args.value),
                [field]
              )}
              blur={field.onBlur}
              error={errorMessage}
              ref={field.ref}
            />
            <FieldError error={errorMessage} />
          </div>
        );
      }}
    />
  );
}

export const FormSelect = memo(FormSelectInner) as typeof FormSelectInner;
```

### Native Input Adapter

```typescript
// src/components/ui/form-fields/FormNativeInput.tsx
import { memo, useCallback } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { InputNative, type InputNativeProps } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

import { FieldError } from './FieldError';

interface FormNativeInputProps<T extends FieldValues>
  extends Omit<InputNativeProps, 'value' | 'onChange' | 'onBlur' | 'error'> {
  name: FieldPath<T>;
  control: Control<T>;
}

function FormNativeInputInner<T extends FieldValues>({
  name,
  control,
  ...inputProps
}: FormNativeInputProps<T>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = fieldState.isTouched && !!fieldState.error;
        const errorMessage = hasError ? FM(fieldState.error?.message ?? '') : undefined;

        return (
          <div className="form-field">
            <InputNative
              {...inputProps}
              value={field.value ?? ''}
              onChange={useCallback(
                (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value),
                [field]
              )}
              onBlur={field.onBlur}
              error={errorMessage}
              ref={field.ref}
            />
            <FieldError error={errorMessage} />
          </div>
        );
      }}
    />
  );
}

export const FormNativeInput = memo(FormNativeInputInner) as typeof FormNativeInputInner;
```

### Error Display Component

```typescript
// src/components/ui/form-fields/FieldError.tsx
import { memo } from 'react';

interface FieldErrorProps {
  error?: string;
}

function FieldErrorInner({ error }: FieldErrorProps): JSX.Element | null {
  if (!error) return null;

  return (
    <span
      className="text-xs text-error-500 mt-1"
      role="alert"
      aria-live="polite"
    >
      {error}
    </span>
  );
}

export const FieldError = memo(FieldErrorInner);
```

---

## Native vs Syncfusion Forms

### When to Use Which

| Scenario | Use Syncfusion | Use Native |
|----------|----------------|------------|
| Login page | ❌ | ✅ (performance) |
| Public forms | ❌ | ✅ (bundle size) |
| Dashboard forms | ✅ | ❌ |
| Complex inputs (grid, date range) | ✅ | ❌ |
| Simple contact form | Either | ✅ (lighter) |

### Syncfusion Form Example

```typescript
// Full Syncfusion form with DataGrid integration
import { FormInput, FormSelect, FormDatePicker } from '@/components/ui/form-fields';

function ProductForm({ control }: { control: Control<ProductFormType> }) {
  return (
    <>
      <FormInput name="productName" control={control} label="Product Name" />
      <FormSelect
        name="category"
        control={control}
        label="Category"
        dataSource={categories}
        fields={{ text: 'name', value: 'id' }}
      />
      <FormDatePicker
        name="releaseDate"
        control={control}
        label="Release Date"
        min={new Date()}
      />
    </>
  );
}
```

### Native Form Example

```typescript
// Lightweight native form for login
import { FormNativeInput } from '@/components/ui/form-fields';
import { ButtonNative } from '@/components/ui/native';

function LoginForm({ control, isSubmitting }: LoginFormProps) {
  return (
    <>
      <FormNativeInput
        name="email"
        control={control}
        label="Email"
        type="email"
        autoComplete="email"
      />
      <FormNativeInput
        name="password"
        control={control}
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <ButtonNative variant="primary" type="submit" loading={isSubmitting}>
        Sign In
      </ButtonNative>
    </>
  );
}
```

---

## i18n Integration

### Zod Error Map

```typescript
// src/lib/forms/zodErrorMap.ts
import { z } from 'zod';
import i18n from '@/localization/i18n';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // If message is already a translation key, use it
  if (issue.message?.startsWith('validation.')) {
    return { message: i18n.t(issue.message) };
  }

  // Default Zod errors mapped to translation keys
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === 'string') return { message: i18n.t('validation.required') };
      return { message: i18n.t('validation.invalidType') };

    case z.ZodIssueCode.too_small:
      if (issue.type === 'string') {
        if (issue.minimum === 1) return { message: i18n.t('validation.required') };
        return { message: i18n.t('validation.minLength', { min: issue.minimum }) };
      }
      return { message: i18n.t('validation.tooSmall', { min: issue.minimum }) };

    case z.ZodIssueCode.too_big:
      return { message: i18n.t('validation.maxLength', { max: issue.maximum }) };

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') return { message: i18n.t('validation.invalidEmail') };
      if (issue.validation === 'url') return { message: i18n.t('validation.invalidUrl') };
      return { message: i18n.t('validation.invalidFormat') };

    default:
      return { message: ctx.defaultError };
  }
};

// Set globally on app initialization
z.setErrorMap(customErrorMap);

export { customErrorMap };
```

### Translation Keys

```json
// localization/en/validation.json
{
  "validation": {
    "required": "This field is required",
    "invalidEmail": "Please enter a valid email address",
    "invalidPhone": "Please enter a valid phone number",
    "passwordTooShort": "Password must be at least 8 characters",
    "passwordMismatch": "Passwords do not match",
    "minLength": "Must be at least {{min}} characters",
    "maxLength": "Must be no more than {{max}} characters",
    "mustBePositive": "Must be a positive number",
    "mustBeFutureDate": "Date must be in the future",
    "invalidType": "Invalid value",
    "invalidFormat": "Invalid format",
    "invalidUrl": "Please enter a valid URL",
    "tooSmall": "Value must be at least {{min}}"
  }
}
```

---

## Async Validation

### Email Uniqueness Check

```typescript
// Schema with async refinement
export const registrationSchema = z.object({
  email: emailSchema
    .refine(
      async (email) => {
        const exists = await checkEmailExists(email);
        return !exists;
      },
      { message: 'validation.emailTaken' }
    ),
  username: requiredString,
  password: passwordSchema,
});

// API call
async function checkEmailExists(email: string): Promise<boolean> {
  const response = await fetch(`/api/users/check-email?email=${encodeURIComponent(email)}`);
  const data = await response.json();
  return data.exists;
}
```

### Debounced Validation

```typescript
// For performance, debounce async checks
import { useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

function useAsyncEmailValidation() {
  const debouncedCheck = useRef(
    debounce(async (email: string, callback: (exists: boolean) => void) => {
      const exists = await checkEmailExists(email);
      callback(exists);
    }, 500)
  ).current;

  return useCallback((email: string) => {
    return new Promise<boolean>((resolve) => {
      debouncedCheck(email, resolve);
    });
  }, [debouncedCheck]);
}
```

---

## Performance Optimization

### Key Principles

| Principle | Implementation |
|-----------|----------------|
| Minimal re-renders | RHF uses refs, not controlled inputs |
| Validate on blur | `mode: 'onBlur'` in form config |
| Memoized adapters | All field adapters use `memo()` |
| Lazy validation | Async validations are debounced |

### Performance Patterns

```typescript
// 1. Use mode: 'onBlur' to prevent validation on every keystroke
const form = useFormWithSchema({
  schema: mySchema,
  mode: 'onBlur', // Only validate when field loses focus
});

// 2. Memoize change handlers in adapters
const handleChange = useCallback(
  (args: { value: string }) => field.onChange(args.value),
  [field]
);

// 3. Use Controller for complex components, register for simple inputs
// Controller: More overhead but needed for non-standard components
// register: Lighter but only works with standard HTML inputs

// 4. Avoid watching all fields - watch specific ones
const email = watch('email'); // Good: specific field
const values = watch(); // Bad: re-renders on any change

// 5. Use formState selectors
const { isSubmitting, isDirty } = formState; // Good: destructure
const formState = useFormState(); // Bad: new object every render
```

### Bundle Splitting

Form libraries should be code-split for login page performance:

```typescript
// Login page uses native inputs (no Syncfusion)
import { FormNativeInput } from '@/components/ui/form-fields';

// Dashboard forms lazy-load Syncfusion adapters
const FormInput = lazy(() => import('@/components/ui/form-fields/FormInput'));
const FormSelect = lazy(() => import('@/components/ui/form-fields/FormSelect'));
```

---

## Preloading Strategy

### What to Preload

| Module | When to Preload | Location |
|--------|-----------------|----------|
| react-hook-form | After login form loads | Main entry |
| zod | After login form loads | Main entry |
| Syncfusion form components | On dashboard navigation | MainLayout |
| Form field adapters | On dashboard navigation | MainLayout |

### Implementation

```typescript
// src/config/preloadForms.ts
export function preloadFormLibraries(): void {
  const preload = (): void => {
    // Core form libraries
    import('react-hook-form').catch(() => undefined);
    import('zod').catch(() => undefined);
    import('@hookform/resolvers/zod').catch(() => undefined);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload, { timeout: 3000 });
  } else {
    setTimeout(preload, 1000);
  }
}

export function preloadSyncfusionFormComponents(): void {
  const preload = (): void => {
    // Syncfusion form-related components
    import('@syncfusion/ej2-react-inputs').catch(() => undefined);
    import('@syncfusion/ej2-react-dropdowns').catch(() => undefined);
    import('@syncfusion/ej2-react-calendars').catch(() => undefined);
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload, { timeout: 3000 });
  } else {
    setTimeout(preload, 1000);
  }
}
```

### Where to Call Preloading

```typescript
// src/features/auth/pages/LoginPage/index.tsx
import { preloadFormLibraries } from '@/config/preloadForms';

function LoginPage() {
  // Preload form libraries when login page mounts
  useEffect(() => {
    preloadFormLibraries();
  }, []);

  // ... rest of login page
}

// src/components/layout/MainLayout/index.tsx
import { preloadSyncfusionFormComponents } from '@/config/preloadForms';

function MainLayout() {
  // Preload Syncfusion form components when dashboard loads
  useEffect(() => {
    preloadSyncfusionFormComponents();
  }, []);

  // ... rest of layout
}
```

---

## Testing Forms

### Unit Tests (Schema Validation)

```typescript
// src/features/contact/forms/__tests__/schema.test.ts
import { contactSchema } from '../schema';

describe('contactSchema', () => {
  it('validates valid data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world',
    };

    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John',
      email: 'not-an-email',
      message: 'Hello',
    };

    const result = contactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['email']);
    }
  });

  it('requires name field', () => {
    const missingName = {
      email: 'john@example.com',
      message: 'Hello',
    };

    const result = contactSchema.safeParse(missingName);
    expect(result.success).toBe(false);
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/tests/contact-form.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Contact Form', () => {
  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/contact');
    await page.getByTestId('submit-button').click();

    await expect(page.getByText('This field is required')).toBeVisible();
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.goto('/contact');
    await page.getByTestId('email-input').fill('not-an-email');
    await page.getByTestId('email-input').blur();

    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('submits form with valid data', async ({ page }) => {
    await page.goto('/contact');
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john@example.com');
    await page.getByTestId('message-input').fill('Hello world');
    await page.getByTestId('submit-button').click();

    await expect(page.getByText('Message sent successfully')).toBeVisible();
  });
});
```

---

## Migration from Legacy Pattern

### Old Pattern (FormType/FormFields)

```typescript
// Old approach - separate files for type, fields, initial state
// formType.ts
export enum FormFields {
  Email = 'email',
  Name = 'name',
}
export interface FormType {
  [FormFields.Email]: string;
  [FormFields.Name]: string;
}

// getInitialFormState.ts
export function getInitialFormState(): FormType {
  return { email: '', name: '' };
}
```

### New Pattern (Schema-First)

```typescript
// New approach - schema is the source of truth
// schema.ts
import { z } from 'zod';
import { emailSchema, requiredString } from '@/lib/forms/schemas/common';

export const myFormSchema = z.object({
  email: emailSchema,
  name: requiredString,
});

// Type is inferred automatically
export type MyFormType = z.infer<typeof myFormSchema>;

// Default values in form hook
const form = useFormWithSchema({
  schema: myFormSchema,
  defaultValues: { email: '', name: '' },
});
```

### Migration Steps

1. Create Zod schema from existing FormType
2. Remove FormFields enum (use string paths)
3. Remove getInitialFormState (use defaultValues)
4. Replace manual validation with schema
5. Update components to use field adapters

---

## Quick Reference

### Form Setup Checklist

- [ ] Create Zod schema in `features/[name]/forms/schema.ts`
- [ ] Use `useFormWithSchema` hook
- [ ] Use appropriate field adapters (Syncfusion or Native)
- [ ] Add `noValidate` to form element
- [ ] Handle loading state with `isSubmitting`
- [ ] Add testID props for E2E testing
- [ ] Write schema unit tests

### Common Schemas

```typescript
import { z } from 'zod';

// Required string
z.string().min(1, 'validation.required')

// Optional string that becomes undefined when empty
z.string().optional().transform(v => v || undefined)

// Email
z.string().email('validation.invalidEmail')

// Number in range
z.number().min(0).max(100)

// Enum value
z.enum(['option1', 'option2', 'option3'])

// Date in future
z.date().refine(d => d > new Date(), 'validation.futureDate')

// Checkbox (boolean)
z.boolean().default(false)

// Array with min/max
z.array(z.string()).min(1, 'validation.selectAtLeastOne')
```

---

*Last Updated: 2026-02-10*
