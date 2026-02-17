# ELD-03: Fix useFormWithSchema Type Safety

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the triple `eslint-disable` in `src/lib/forms/useFormWithSchema.ts:50` that suppresses `no-explicit-any`, `no-unsafe-assignment`, and `consistent-type-assertions`.

## Current State

```ts
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions */
const formResult = useForm({
  resolver: zodResolver(schema as any),
  mode,
  defaultValues: defaultValues as any,
});
return formResult as UseFormReturn<TFieldValues>;
/* eslint-enable ... */
```

The comment explains this exists because `zodResolver` and `useForm` have complex generic constraints that conflict with `exactOptionalPropertyTypes`. The runtime behavior is correct.

## Investigation Needed

1. Check if `@hookform/resolvers/zod` has updated types that resolve this (current version vs latest)
2. Check if a typed wrapper or overload of `zodResolver` exists that avoids the `as any`
3. Check if `react-hook-form` 7.x+ has improved generic inference that makes this unnecessary
4. If the `any` casts genuinely can't be removed (RHF/Zod type gap), convert to narrower `as unknown as X` assertions with `consistent-type-assertions` next-line disables and clear comments

## Implementation Plan

### Option A: Fix types (preferred)
If newer library versions resolve the type conflict, update the generics to work without assertions.

### Option B: Narrow the assertions
If the type gap is fundamental, replace `as any` with:
```ts
const formResult = useForm<TFieldValues>({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- zodResolver generic mismatch with exactOptionalPropertyTypes
  resolver: zodResolver(schema as z.ZodType<Record<string, unknown>>),
  mode,
  defaultValues,
});
```

The goal is to remove the block-level disable and use at most a single narrow `eslint-disable-next-line`.

## Verification

- [ ] Block-level `eslint-disable` removed
- [ ] `npm run lint:fix` — no new errors
- [ ] `npm run test:coverage` — form tests pass
- [ ] Manual test: Product form submit, validation errors, and form reset all work
