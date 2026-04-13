# CUL-12: Code Review — Standards Compliance

## Status: TODO
## Priority: High
## Depends on: CUL-10
## Agent: code-reviewer

## Objective

Review all culture settings code for compliance with project architectural patterns, coding standards, and consistency with the existing codebase.

## Review Scope

All files created or modified by CUL-01 through CUL-10.

## Review Checklist

### Architecture Patterns

- [ ] **Store pattern**: `cultureActions.ts` follows `animationActions.ts` pattern exactly
- [ ] **Defaults pattern**: `defaultCulture.ts` follows `defaultAnimations.ts` pattern
- [ ] **Enum pattern**: Each enum in its own file, uses `const enum`, numeric values
- [ ] **Type barrel**: `types/index.ts` exports all new types correctly
- [ ] **Lazy loading**: CultureSection is lazy-imported in the drawer (not eagerly loaded)
- [ ] **CLDR loading**: Follows `loadSyncfusionCss.ts` lazy-loading pattern

### Decoupling

- [ ] `cultureResolver.ts` has NO imports from the Zustand store (avoids circular dependency)
- [ ] Store actions call `setActiveCulture()` — not the other way around
- [ ] `FD()` reads from resolver, not from store directly
- [ ] `useCultureFormat()` is the only React-aware consumer of culture config

### Coding Standards

- [ ] No magic numbers — all numeric values are named constants or enum members
- [ ] No hardcoded strings for format patterns — use constants or derive from config
- [ ] Functions under 50 lines
- [ ] Components under 200 lines
- [ ] Files under 300 lines
- [ ] Complex conditions (>2 operators) extracted to named variables
- [ ] Single-statement if/else without braces

### Type Safety

- [ ] No `any` types
- [ ] No type assertions unless absolutely necessary (with comment explaining why)
- [ ] `Partial<CultureConfig>` used for partial updates (not full object)
- [ ] Enum members used instead of raw numbers

### Accessibility & i18n

- [ ] All interactive elements have `testID`, `accessibilityLabel`, `accessibilityHint`
- [ ] All user-facing text uses `t()` function (no hardcoded English)
- [ ] Form controls have associated labels

### Naming Conventions

- [ ] Files: camelCase for modules, PascalCase for components
- [ ] Types/Interfaces: PascalCase
- [ ] Constants: SCREAMING_SNAKE_CASE
- [ ] Functions: camelCase
- [ ] Enum members: PascalCase
- [ ] Test IDs: kebab-case strings

### Consistency with Existing Code

- [ ] Import aliases use `@/` prefix consistently
- [ ] Store selector pattern matches existing usage
- [ ] Hook naming follows `use*` convention
- [ ] Error handling is consistent with existing patterns
- [ ] Preset files all have identical structure for the `culture` field

## Expected Output

Return one of:
- **REVIEW_PASSED** — all checks pass
- **REVIEW_FAILED** — with specific issues and remediation instructions
