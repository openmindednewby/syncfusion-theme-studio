# Task: Native Select Transformation, Shared Interfaces & Theme Extensions

## Status: IN PROGRESS

## Objective
Transform native select into custom dropdown, unify component interfaces, extend theme system.

## Phases
1. **Shared Interfaces** - Base interfaces in `components/ui/shared/` for all native/Syncfusion pairs
2. **Custom Native Select** - Replace HTML `<select>` with custom dropdown using CSS variables
3. **Theme Extensions** - Add 12 new SelectConfig properties + 4 missing CSS variable injections
4. **SelectEditor Split** - Break editor into sub-sections to stay under line limits

## Execution Order
1. Phase 1 + Phase 3 in parallel (independent)
2. Phase 2 after both complete (depends on shared types + CSS variables)
3. Consumer updates
4. Verification + testing

## Files Created
- `src/components/ui/shared/selectTypes.ts` - BaseSelectOption, BaseSelectProps
- `src/components/ui/shared/inputTypes.ts` - BaseInputProps
- `src/components/ui/shared/buttonTypes.ts` - BaseButtonProps, ButtonVariant, ButtonSize
- `src/components/ui/shared/dialogTypes.ts` - BaseDialogProps, BaseDialogButton
- `src/components/ui/shared/alertTypes.ts` - BaseAlertProps
- `src/components/ui/shared/datePickerTypes.ts` - BaseDatePickerProps
- `src/components/ui/shared/index.ts` - barrel
- `src/components/ui/native/SelectNative/hooks/*.ts` - 5 custom hooks
- `src/components/ui/native/SelectNative/components/*.tsx` - 4 sub-components
- `src/styles/layers/native-overrides.css`
- `SelectEditorSections/*.tsx` - 7 editor sub-sections

## Files Modified
- `feedbackComponentTypes.ts` - +12 SelectConfig properties
- `feedbackInjector.ts` - +16 CSS variable injections
- `defaultFeedbackLight.ts` / `defaultFeedbackDark.ts` - new defaults
- `SelectEditor.tsx` - thin orchestrator
- `SelectNative/index.tsx` - full rewrite
- Native components: InputNative, ButtonNative, DialogNative, AlertNative
- Form fields: FormNativeSelect, FormSelect
- Showcase sections: InteractiveSection, BasicSelectSection, NativeSelectSection
- `en.json` - new localization keys
- `syncfusion-overrides.css` - use new CSS variables

## Verification
- [ ] `npm run lint:fix` passes
- [ ] `npm run test:coverage` passes
- [ ] `npx vite build` succeeds
- [ ] Unit tests for hooks
- [ ] E2E tests for select
