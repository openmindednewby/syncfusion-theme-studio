/**
 * Accordion - Theme-aware Syncfusion AccordionComponent wrapper.
 *
 * Maps BaseAccordionProps items to AccordionItemDirective children.
 * Supports single/multiple expand mode and light/dark theming.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/accordion/getting-started | Syncfusion Accordion docs}
 */
import { memo, forwardRef, useMemo } from 'react';

import {
  AccordionComponent,
  AccordionItemsDirective,
  AccordionItemDirective,
} from '@syncfusion/ej2-react-navigations';

import type { BaseAccordionProps } from '@/components/ui/shared/accordionTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';

interface Props extends BaseAccordionProps {}

const Accordion = forwardRef<AccordionComponent, Props>(
  (
    {
      items,
      testId,
      allowMultiple = false,
      className,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-accordion', modeClass);
    }, [mode]);

    const expandMode = allowMultiple ? 'Multiple' : 'Single';

    return (
      <div className={cn(cssClass, className)} data-testid={testId}>
        <AccordionComponent
          ref={ref}
          expandMode={expandMode}
        >
          <AccordionItemsDirective>
            {items.map((item) => (
              <AccordionItemDirective
                key={item.header}
                content={() => <div>{item.content}</div>}
                header={item.header}
              />
            ))}
          </AccordionItemsDirective>
        </AccordionComponent>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export default memo(Accordion);
export type { Props as AccordionProps };
