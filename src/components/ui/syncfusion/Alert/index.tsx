/**
 * Alert - Theme-aware Syncfusion MessageComponent wrapper.
 *
 * Provides variant-based styling (success, warning, error, info),
 * configurable display variants (text, outlined, filled), and dismissible behavior.
 * Automatically applies light/dark mode CSS classes from the theme store.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/message/getting-started | Syncfusion Message docs}
 */
import { memo, useMemo, useEffect } from 'react';

import { MessageComponent } from '@syncfusion/ej2-react-notifications';

import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';
import { cn } from '@/utils/cn';

import { AlertDisplayVariant } from './alertDisplayVariant';
import { AlertSeverity } from './alertSeverity';

export { AlertDisplayVariant, AlertSeverity };

/** Map our variant names to Syncfusion Severity enum string values */
const SEVERITY_MAP: Record<AlertSeverity, string> = {
  [AlertSeverity.Info]: 'Info',
  [AlertSeverity.Success]: 'Success',
  [AlertSeverity.Warning]: 'Warning',
  [AlertSeverity.Error]: 'Error',
};

/** Map our display variants to Syncfusion Variant enum string values */
const DISPLAY_VARIANT_MAP: Record<AlertDisplayVariant, string> = {
  [AlertDisplayVariant.Text]: 'Text',
  [AlertDisplayVariant.Outlined]: 'Outlined',
  [AlertDisplayVariant.Filled]: 'Filled',
};

export interface Props {
  /** Alert severity variant */
  severity?: AlertSeverity;
  /** Alert display variant */
  displayVariant?: AlertDisplayVariant;
  /** Whether to show close icon */
  showCloseIcon?: boolean;
  /** Whether to show severity icon */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Alert content */
  children: React.ReactNode;
}

const Alert = ({
  severity = AlertSeverity.Info,
  displayVariant = AlertDisplayVariant.Filled,
  showCloseIcon = false,
  showIcon = true,
  className,
  testId,
  children,
}: Props): JSX.Element => {
  const { mode } = useThemeStore();

  // Load notifications CSS on mount
  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Notifications).catch(() => {});
  }, []);

  const cssClass = useMemo(() => {
    const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
    return cn('sf-alert', modeClass, className);
  }, [mode, className]);

  return (
    <div data-testid={testId}>
      <MessageComponent
        cssClass={cssClass}
        severity={SEVERITY_MAP[severity]}
        showCloseIcon={showCloseIcon}
        showIcon={showIcon}
        variant={DISPLAY_VARIANT_MAP[displayVariant]}
      >
        {children}
      </MessageComponent>
    </div>
  );
};

Alert.displayName = 'Alert';

export default memo(Alert);
export type { Props as AlertProps };
