/**
 * BasicSection demonstrates a Syncfusion AccordionComponent with three
 * panels, showcasing default expand/collapse behavior.
 */
import { memo } from 'react';

import {
  AccordionComponent,
  AccordionItemsDirective,
  AccordionItemDirective,
} from '@syncfusion/ej2-react-navigations';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

const I18N_PREFIX = 'components.accordionShowcase';

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM(`${I18N_PREFIX}.sections.basic`)}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM(`${I18N_PREFIX}.sections.basicDesc`)}
      </p>
    </div>
    <AccordionComponent expandedIndices={[0]}>
      <AccordionItemsDirective>
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.basic.gettingStartedContent`)}
          header={FM(`${I18N_PREFIX}.basic.gettingStartedHeader`)}
        />
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.basic.featuresContent`)}
          header={FM(`${I18N_PREFIX}.basic.featuresHeader`)}
        />
        <AccordionItemDirective
          content={FM(`${I18N_PREFIX}.basic.themingContent`)}
          header={FM(`${I18N_PREFIX}.basic.themingHeader`)}
        />
      </AccordionItemsDirective>
    </AccordionComponent>
    <CopyableCodeSnippet code='<AccordionComponent expandedIndices={[0]}><AccordionItemsDirective><AccordionItemDirective header="Title" content="Content" /></AccordionItemsDirective></AccordionComponent>' />
  </section>
));

BasicSection.displayName = 'BasicSection';
