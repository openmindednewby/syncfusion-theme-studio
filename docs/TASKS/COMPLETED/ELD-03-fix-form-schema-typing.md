# ELD-03: Fix useFormWithSchema Type Safety

## Status: COMPLETED
## Priority: Medium
## Agent: frontend-dev

## Objective

Remove the triple block-level `eslint-disable` in `src/lib/forms/useFormWithSchema.ts` that suppressed `no-explicit-any`, `no-unsafe-assignment`, and `consistent-type-assertions`.

## Root Cause Analysis

Three type incompatibilities existed between react-hook-form, @hookform/resolvers/zod, and Zod 4 under `exactOptionalPropertyTypes: true`:

1. **zodResolver Input type**: `z.ZodType<TFieldValues>` defaults its second type parameter (`Input`) to `unknown`. The zodResolver Zod 4 overload requires `z4.$ZodType<Output, Input>` where `Input extends FieldValues`. Since `unknown` does not extend `FieldValues`, TypeScript could not match the Zod 4 overload.

2. **defaultValues type**: `Partial<TFieldValues>` is not assignable to `DefaultValues<TFieldValues>` (which is `DeepPartial<TFieldValues>`) under `exactOptionalPropertyTypes`.

3. **exactOptionalPropertyTypes with optional params**: Passing `defaultValues: DefaultValues<T> | undefined` (from a destructured optional parameter) to `UseFormProps.defaultValues?:` is invalid under `exactOptionalPropertyTypes` -- you cannot assign `undefined` to an optional property; you must omit the property entirely.

## Changes Made

### `src/lib/forms/useFormWithSchema.ts`

**Removed**:
- Block-level `/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions */`
- Block-level `/* eslint-enable ... */`
- Three `as any` type assertions
- One `as UseFormReturn<TFieldValues>` return assertion
- Misleading comment about strictOptionalPropertyTypes in module JSDoc

**Added**:
- `DefaultValues` type import from react-hook-form (replaces `Partial<TFieldValues>`)
- `isValueDefined` import from `@/utils/is`
- Explicit type parameters on `useForm<TFieldValues, unknown, TFieldValues>()` call
- Single `eslint-disable-next-line @typescript-eslint/consistent-type-assertions` with clear explanation
- Conditional spread `...(isValueDefined(defaultValues) ? { defaultValues } : {})` to handle `exactOptionalPropertyTypes`

**Net result**: 3 suppressed rules reduced to 1 narrow inline suppression. Zero `no-explicit-any` or `no-unsafe-assignment` suppressions remain.

## Verification

- [x] Block-level `eslint-disable` removed
- [x] `npx eslint src/lib/forms/useFormWithSchema.ts` -- zero errors
- [x] `npx tsc --noEmit` -- no new errors (only pre-existing: tableContentUtils.ts, DataGrid/index.tsx)
- [x] `npx vitest run` -- 927 pass, 1 pre-existing failure (cyberWatch theme preset, unrelated)
- [x] No callers broken -- public API (schema type, defaultValues type) is backward-compatible
