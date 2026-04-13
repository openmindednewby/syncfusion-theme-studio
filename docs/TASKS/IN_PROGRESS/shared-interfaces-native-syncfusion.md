# Shared Interfaces for Native/Syncfusion Component Pairs

## Problem Statement
Native and Syncfusion components have duplicated type definitions with inconsistent prop naming (e.g., `showRequired` vs `required`, different `onChange` signatures). This prevents plug-and-play swapping between implementations.

## Implementation Plan
1. Create shared base interfaces in `src/components/ui/shared/`
2. Update native components to extend shared interfaces
3. Update Syncfusion components to extend shared interfaces
4. Update form adapters for new onChange signatures
5. Update all consumers (showcases, forms) for renamed props
6. Run full verification suite

## Files to Create
- `src/components/ui/shared/selectTypes.ts`
- `src/components/ui/shared/inputTypes.ts`
- `src/components/ui/shared/buttonTypes.ts`
- `src/components/ui/shared/dialogTypes.ts`
- `src/components/ui/shared/alertTypes.ts`
- `src/components/ui/shared/datePickerTypes.ts`
- `src/components/ui/shared/index.ts`

## Files to Modify
- Native components: SelectNative, InputNative, ButtonNative, DialogNative, AlertNative, DatePickerNative, CheckboxNative
- Syncfusion components: Select, buttonVariant.ts
- Form adapters: FormNativeSelect
- Consumers: InteractiveSection, BasicSelectSection, NativeSelectSection, StatesSection (input), BasicSection (datepicker), WithLabelSection (checkbox), VariantsSection, FeaturesSection, NativeAlertsSection, ColorsSection, OrderForm, ContactForm, LoginForm, RegistrationForm, AlertNative.test.tsx
- Barrel exports: native/index.ts

## Success Criteria
- All shared interfaces created and exported
- `showRequired` renamed to `required` everywhere
- SelectNative onChange unified to `(value: string | number) => void`
- AlertNative `variant` renamed to `severity`
- ButtonVariant/ButtonSize centralized in shared
- Lint, tests, and build all pass
