/**
 * AlertNative - Zero-dependency themed alert using native HTML.
 *
 * Provides variant-based styling (success, warning, error, info),
 * optional title, dismissible behavior, and built-in SVG icons.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, useState, useCallback, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

/** Available alert style variants */
const enum AlertVariant {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

interface Props {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert title (optional) */
  title?: string;
  /** Alert content */
  children: ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Called when alert is dismissed */
  onDismiss?: () => void;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
}

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  [AlertVariant.Success]: 'alert-success',
  [AlertVariant.Warning]: 'alert-warning',
  [AlertVariant.Error]: 'alert-error',
  [AlertVariant.Info]: 'alert-info',
};

const ICON_PATHS: Record<AlertVariant, string> = {
  [AlertVariant.Success]: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  [AlertVariant.Warning]:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  [AlertVariant.Error]: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  [AlertVariant.Info]: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

const ICON_STROKE_WIDTH = 1.5;
const CLOSE_ICON_SIZE = 'h-4 w-4';

const AlertNative = ({
  variant = AlertVariant.Info,
  title,
  children,
  dismissible = false,
  onDismiss,
  showIcon = true,
  className,
  testId,
}: Props): JSX.Element | null => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    if (isValueDefined(onDismiss)) onDismiss();
  }, [onDismiss]);

  if (isDismissed) return null;

  return (
    <div
      className={cn('alert', VARIANT_CLASSES[variant], className)}
      data-testid={testId}
      role="alert"
    >
      {showIcon ? (
        <svg
          aria-hidden="true"
          className="alert-icon h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={ICON_STROKE_WIDTH}
          viewBox="0 0 24 24"
        >
          <path d={ICON_PATHS[variant]} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}

      <div className="alert-content">
        {isValueDefined(title) ? <p className="alert-title">{title}</p> : null}
        <div className="alert-description">{children}</div>
      </div>

      {dismissible ? (
        <button
          aria-label="Dismiss alert"
          className="alert-close"
          data-testid={isValueDefined(testId) ? `${testId}-dismiss` : undefined}
          type="button"
          onClick={handleDismiss}
        >
          <svg
            aria-hidden="true"
            className={CLOSE_ICON_SIZE}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
};

AlertNative.displayName = 'AlertNative';

export default memo(AlertNative);
export { AlertVariant };
export type { Props as AlertNativeProps };
