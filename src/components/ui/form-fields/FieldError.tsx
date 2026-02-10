/**
 * FieldError - Error message display for form fields
 *
 * Displays validation error messages with proper accessibility attributes.
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
      className="text-xs text-error-500 mt-1"
      data-testid={testId}
      role="alert"
    >
      {error}
    </span>
  );
};
