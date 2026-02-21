/**
 * Breadcrumb - Theme-aware Syncfusion BreadcrumbComponent wrapper.
 *
 * Maps BaseBreadcrumbProps items to BreadcrumbItemDirective children.
 * Supports custom separators, click handlers, and light/dark theming.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/breadcrumb/getting-started | Syncfusion Breadcrumb docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import {
  BreadcrumbComponent,
  BreadcrumbItemsDirective,
  BreadcrumbItemDirective,
  type BreadcrumbClickEventArgs,
} from '@syncfusion/ej2-react-navigations';

import type { BaseBreadcrumbProps } from '@/components/ui/shared/breadcrumbTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseBreadcrumbProps {}

const DEFAULT_SEPARATOR = '/';

const Breadcrumb = forwardRef<BreadcrumbComponent, Props>(
  (
    {
      items,
      separator = DEFAULT_SEPARATOR,
      ariaLabel = 'Breadcrumb',
      testId,
      className,
      onItemClick,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-breadcrumb', modeClass);
    }, [mode]);

    const handleItemClick = useCallback(
      (args: BreadcrumbClickEventArgs) => {
        if (isValueDefined(onItemClick) && isValueDefined(args.item.text)) {
          Object.assign(args, { cancel: true });
          const found = items.find((i) => i.text === args.item.text);
          if (isValueDefined(found))
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Syncfusion provides DOM Event; BaseBreadcrumbProps expects React.MouseEvent
            onItemClick(found, args.event as unknown as React.MouseEvent<HTMLAnchorElement>);
        }
      },
      [items, onItemClick],
    );

    return (
      <div aria-label={ariaLabel} className={className} data-testid={testId}>
        <BreadcrumbComponent
          ref={ref}
          cssClass={cssClass}
          enableNavigation={false}
          itemClick={handleItemClick}
          separatorTemplate={() => <span>{separator}</span>}
        >
          <BreadcrumbItemsDirective>
            {items.map((item) => (
              <BreadcrumbItemDirective
                key={item.text}
                text={item.text}
                {...(isValueDefined(item.url) ? { url: item.url } : {})}
              />
            ))}
          </BreadcrumbItemsDirective>
        </BreadcrumbComponent>
      </div>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export default memo(Breadcrumb);
export type { Props as BreadcrumbProps };
