/**
 * MultipleSection demonstrates the Syncfusion AccordionComponent in
 * Multiple expand mode, allowing several panels to be open at once.
 */
import { memo } from 'react';

import {
  AccordionComponent,
  AccordionItemsDirective,
  AccordionItemDirective,
} from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';

const I18N_PREFIX = 'components.accordionShowcase.multiple';

export const MultipleSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.accordionShowcase.sections.multiple')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.accordionShowcase.sections.multipleDesc')}
      </p>
    </div>
    <AccordionComponent expandMode="Multiple">
      <AccordionItemsDirective>
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.projectsContent`)}
          header={FM(`${I18N_PREFIX}.projectsHeader`)}
        />
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.tasksContent`)}
          header={FM(`${I18N_PREFIX}.tasksHeader`)}
        />
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.teamContent`)}
          header={FM(`${I18N_PREFIX}.teamHeader`)}
        />
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.reportsContent`)}
          header={FM(`${I18N_PREFIX}.reportsHeader`)}
        />
      </AccordionItemsDirective>
    </AccordionComponent>
    <CopyableCodeSnippet code='<AccordionComponent expandMode="Multiple"><AccordionItemsDirective>...</AccordionItemsDirective></AccordionComponent>' />
  </section>
));

MultipleSection.displayName = 'MultipleSection';
