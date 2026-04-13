# DatePickerNative Hooks Unit Tests

## Problem Statement
The `useCalendarState` and `useCalendarKeyboard` hooks in `DatePickerNative` lack unit tests. Tests should be co-located next to source files per project convention.

## Files to Create
- `src/components/ui/native/DatePickerNative/hooks/useCalendarState.test.ts`
- `src/components/ui/native/DatePickerNative/hooks/useCalendarKeyboard.test.ts`

## Files Referenced (read-only)
- `src/components/ui/native/DatePickerNative/hooks/useCalendarState.ts`
- `src/components/ui/native/DatePickerNative/hooks/useCalendarKeyboard.ts`
- `src/components/ui/native/DatePickerNative/constants.ts`
- `src/components/ui/native/DatePickerNative/types.ts`

## Implementation Plan
1. Read source files and understand behavior
2. Read existing test patterns from SelectNative hooks
3. Write useCalendarState.test.ts covering: initial state, day grid structure, today detection, month navigation, year boundary wrapping, initial date parsing
4. Write useCalendarKeyboard.test.ts covering: arrow key navigation, Enter/Space selection, Escape close, focus clamping, unhandled keys
5. Run tests to verify they pass

## Success Criteria
- All tests pass with `npm test -- --testPathPattern="useCalendarState|useCalendarKeyboard"`
- Tests focus on logic, not rendering
- Named constants instead of magic numbers
- Edge cases covered (year boundaries, focus clamping)
