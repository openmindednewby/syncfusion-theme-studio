/**
 * IconButton - Theme-aware Syncfusion ButtonComponent in icon-only mode.
 *
 * Wraps ButtonComponent with variant/size styling, loading state,
 * and light/dark theming. Renders as a circular icon-only button.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/button/getting-started | Syncfusion Button docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import { ButtonSize } from '@/components/ui/shared/buttonSize';
import type { BaseIconButtonProps } from '@/components/ui/shared/iconButtonTypes';
import { IconButtonVariant } from '@/components/ui/shared/iconButtonTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseIconButtonProps {
  /** Click handler */
  onClick?: () => void;
}
export { IconButtonVariant, ButtonSize };

const VARIANT_CSS: Record<IconButtonVariant, string> = {
  [IconButtonVariant.Primary]: 'sf-icon-btn-primary',
  [IconButtonVariant.Secondary]: 'sf-icon-btn-secondary',
  [IconButtonVariant.Tertiary]: 'sf-icon-btn-tertiary',
};

const SIZE_CSS: Record<ButtonSize, string> = {
  [ButtonSize.Sm]: 'sf-icon-btn-sm',
  [ButtonSize.Md]: 'sf-icon-btn-md',
  [ButtonSize.Lg]: 'sf-icon-btn-lg',
};

const IconButton = forwardRef<ButtonComponent, Props>(
  (
    {
      variant = IconButtonVariant.Primary,
      size = ButtonSize.Md,
      className,
      testId,
      disabled = false,
      loading = false,
      icon,
      ariaLabel,
      onClick,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-icon-btn', modeClass, VARIANT_CSS[variant], SIZE_CSS[size]);
    }, [mode, variant, size]);

    const handleClick = useCallback(() => {
      if (isValueDefined(onClick)) onClick();
    }, [onClick]);

    return (
      <div className={className} data-testid={testId}>
        <ButtonComponent
          ref={ref}
          aria-busy={loading ? true : undefined}
          aria-label={ariaLabel}
          cssClass={cssClass}
          disabled={disabled || loading}
          isToggle={false}
          onClick={handleClick}
        >
          {loading ? (
            <span aria-hidden="true" className="sf-btn-spinner" />
          ) : (
            <span aria-hidden="true">{icon}</span>
          )}
        </ButtonComponent>
      </div>
    );
  },
);

IconButton.displayName = 'IconButton';

export default memo(IconButton);
export type { Props as IconButtonProps };
