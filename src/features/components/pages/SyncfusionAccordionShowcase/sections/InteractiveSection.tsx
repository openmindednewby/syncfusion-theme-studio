/**
 * InteractiveSection demonstrates expand/collapse events and
 * programmatic toggling via the Syncfusion AccordionComponent ref.
 */
import { memo, useCallback, useRef, useState } from 'react';

import type { ExpandEventArgs } from '@syncfusion/ej2-navigations';
import {
  AccordionComponent,
  AccordionItemsDirective,
  AccordionItemDirective,
} from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const I18N_PREFIX = 'components.accordionShowcase.interactive';
const TOTAL_FAQ_ITEMS = 4;

const INACTIVE_BUTTON_STYLE = 'bg-surface-hover text-text-primary hover:bg-surface-active';

export const InteractiveSection = memo((): JSX.Element => {
  const accordionRef = useRef<AccordionComponent>(null);
  const [lastEvent, setLastEvent] = useState<string>(FM(`${I18N_PREFIX}.noneOpenLabel`));

  const handleExpanding = useCallback((args: ExpandEventArgs) => {
    const action = args.isExpanded === true
      ? FM(`${I18N_PREFIX}.expandedLabel`)
      : FM(`${I18N_PREFIX}.collapsedLabel`);
    const name = args.element?.querySelector('.e-acrdn-header-content')?.textContent ?? '';
    setLastEvent(`${action}: ${name}`);
  }, []);

  const handleExpandAll = useCallback(() => {
    const acc = accordionRef.current;
    if (!acc) return;
    for (let i = 0; i < TOTAL_FAQ_ITEMS; i++) 
      acc.expandItem(true, i);
    
  }, []);

  const handleCollapseAll = useCallback(() => {
    const acc = accordionRef.current;
    if (!acc) return;
    for (let i = 0; i < TOTAL_FAQ_ITEMS; i++) 
      acc.expandItem(false, i);
    
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.accordionShowcase.sections.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.accordionShowcase.sections.interactiveDesc')}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${INACTIVE_BUTTON_STYLE}`}
            data-testid={TestIds.SYNCFUSION_ACCORDION_EXPAND_ALL}
            type="button"
            onClick={handleExpandAll}
          >
            {FM(`${I18N_PREFIX}.expandAllLabel`)}
          </button>
          <button
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${INACTIVE_BUTTON_STYLE}`}
            data-testid={TestIds.SYNCFUSION_ACCORDION_COLLAPSE_ALL}
            type="button"
            onClick={handleCollapseAll}
          >
            {FM(`${I18N_PREFIX}.collapseAllLabel`)}
          </button>
        </div>
        <span className="text-sm text-text-secondary">{lastEvent}</span>
      </div>
      <AccordionComponent
        ref={accordionRef}
        expanding={handleExpanding}
        expandMode="Multiple"
      >
        <AccordionItemsDirective>
          <AccordionItemDirective
            content={FM(`${I18N_PREFIX}.faqContent1`)}
            header={FM(`${I18N_PREFIX}.faqHeader1`)}
          />
          <AccordionItemDirective
            content={FM(`${I18N_PREFIX}.faqContent2`)}
            header={FM(`${I18N_PREFIX}.faqHeader2`)}
          />
          <AccordionItemDirective
            content={FM(`${I18N_PREFIX}.faqContent3`)}
            header={FM(`${I18N_PREFIX}.faqHeader3`)}
          />
          <AccordionItemDirective
            content={FM(`${I18N_PREFIX}.faqContent4`)}
            header={FM(`${I18N_PREFIX}.faqHeader4`)}
          />
        </AccordionItemsDirective>
      </AccordionComponent>
      <CopyableCodeSnippet code='<AccordionComponent ref={accordionRef} expandMode="Multiple" expanding={handleExpanding}>...</AccordionComponent>' />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
