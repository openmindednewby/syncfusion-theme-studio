/**
 * Fab - Theme-aware Syncfusion FabComponent wrapper.
 *
 * Provides a floating action button with position support,
 * optional extended label, and light/dark theming.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/floating-action-button/getting-started | Syncfusion FAB docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import { FabComponent } from '@syncfusion/ej2-react-buttons';

import type { BaseFabProps } from '@/components/ui/shared/fabTypes';
import { FabPosition } from '@/components/ui/shared/fabTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseFabProps {
  /** Click handler */
  onClick?: () => void;
}
export { FabPosition };

const POSITION_MAP: Record<FabPosition, string> = {
  [FabPosition.BottomRight]: 'BottomRight',
  [FabPosition.BottomLeft]: 'BottomLeft',
  [FabPosition.TopRight]: 'TopRight',
  [FabPosition.TopLeft]: 'TopLeft',
};

const Fab = forwardRef<FabComponent, Props>(
  (
    {
      className,
      testId,
      disabled = false,
      icon,
      label,
      position = FabPosition.BottomRight,
      ariaLabel,
      onClick,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-fab', modeClass);
    }, [mode]);

    const handleClick = useCallback(() => {
      if (isValueDefined(onClick)) onClick();
    }, [onClick]);

    const content = isValueDefined(label) && label !== '' ? label : undefined;

    return (
      <div className={className} data-testid={testId}>
        <FabComponent
          ref={ref}
          aria-label={ariaLabel}
          content={content}
          cssClass={cssClass}
          disabled={disabled}
          iconCss="e-icons"
          position={POSITION_MAP[position]}
          onClick={handleClick}
        >
          <span aria-hidden="true">{icon}</span>
        </FabComponent>
      </div>
    );
  },
);

Fab.displayName = 'Fab';

export default memo(Fab);
export type { Props as FabProps };
