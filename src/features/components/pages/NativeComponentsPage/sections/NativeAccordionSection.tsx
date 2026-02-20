import { memo } from 'react';

import { AccordionNative } from '@/components/ui/native';
import type { AccordionItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const buildAccordionItems = (): AccordionItem[] => [
  {
    header: FM('components.nativeAccordion.whatIsHeader'),
    content: FM('components.nativeAccordion.whatIsContent'),
  },
  {
    header: FM('components.nativeAccordion.howToUseHeader'),
    content: FM('components.nativeAccordion.howToUseContent'),
  },
  {
    header: FM('components.nativeAccordion.customizationHeader'),
    content: FM('components.nativeAccordion.customizationContent'),
  },
];

export const NativeAccordionSection = memo((): JSX.Element => {
  const singleExpandItems = buildAccordionItems();
  const multiExpandItems = buildAccordionItems();

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.nativeAccordion')}
      </h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM('components.nativeAccordion.singleExpand')}
          </h4>
          <AccordionNative items={singleExpandItems} testId="native-accordion-single" />
        </div>
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM('components.nativeAccordion.multipleExpand')}
          </h4>
          <AccordionNative allowMultiple items={multiExpandItems} testId="native-accordion-multi" />
        </div>
      </div>
    </section>
  );
});

NativeAccordionSection.displayName = 'NativeAccordionSection';
