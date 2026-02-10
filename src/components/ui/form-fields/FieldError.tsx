/**
 * FieldError - Error message display for form fields
 *
 * Displays validation error messages with proper accessibility attributes.
 * Uses CSS variables from the theme editor for customizable appearance.
 * Returns null when no error is present.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { isValueDefined } from '@/utils/is';

interface FieldErrorProps {
  /** Error message to display */
  error?: string;
  /** Test ID for E2E testing */
  testId?: string;
}

export const FieldError = ({ error, testId }: FieldErrorProps): JSX.Element | null => {
  if (!isValueDefined(error) || error === '') return null;

  return (
    <span
      aria-live="polite"
      className="field-error mt-1 inline-flex items-center gap-1"
      data-testid={testId}
      role="alert"
      style={{
        color: 'var(--component-error-msg-text-color, rgb(239 68 68))',
        fontSize: 'var(--component-error-msg-font-size, 0.75rem)',
        fontWeight: 'var(--component-error-msg-font-weight, 400)',
        animationName: 'var(--component-error-msg-animation, fadeIn)',
        animationDuration: 'var(--component-error-msg-animation-duration, 200ms)',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'both',
      }}
    >
      {error}
    </span>
  );
};
