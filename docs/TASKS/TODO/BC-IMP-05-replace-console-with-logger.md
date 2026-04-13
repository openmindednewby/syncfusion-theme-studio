# BC-IMP-05: Replace console.log/warn with Logger Utility

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Problem

6 files use raw `console.log` or `console.warn` instead of the project's `logger` utility at `src/utils/logger.ts`.

### Occurrences

| # | File | Statement | Notes |
|---|------|-----------|-------|
| 1 | `src/features/showcase/pages/NativeFormsPage/forms/RegistrationForm/index.tsx:43` | `console.log('Registration form submitted:', data)` | Demo form |
| 2 | `src/features/showcase/pages/NativeFormsPage/forms/ContactForm/index.tsx:44` | `console.log('Contact form submitted:', data)` | Demo form |
| 3 | `src/features/showcase/pages/NativeFormsPage/forms/NewsletterForm/index.tsx:38` | `console.log('Newsletter form submitted:', data)` | Demo form |
| 4 | `src/features/showcase/pages/NativeFormsPage/forms/LoginForm/index.tsx:48` | `console.log('Login form submitted:', data)` | Demo form |
| 5 | `src/components/Content/components/ContentImage.tsx:192` | `console.warn('[ContentImage] Public URL fetch failed:', ...)` | Production code |
| 6 | `src/components/Content/components/ContentImage.tsx:237` | `console.warn('[ContentImage] Not rendering:', ...)` | Production code |

Items 1-4 are showcase/demo forms but should still use `logger` for consistency.
Items 5-6 are production code and should definitely use `logger.warn()`.

## Solution

1. Replace `console.log(...)` with `logger.info(...)` in showcase forms
2. Replace `console.warn(...)` with `logger.warn(...)` in ContentImage
3. Import `logger` from `@/utils/logger` in each file

## Benefits

- Prevents debug logs leaking to production builds
- Consistent logging through the project's logger utility
- Logger supports structured output, log levels, and can be configured per environment

## Linter Enforcement

Add ESLint `no-console` rule with zero exceptions:
```json
{
  "no-console": ["error", { "allow": [] }]
}
```
This forces all logging through the `logger` utility. The `logger.ts` file itself can have an eslint-disable comment.
