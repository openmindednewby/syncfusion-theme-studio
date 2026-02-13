/**
 * BasicSection demonstrates a simple accordion with three panels,
 * showcasing expand/collapse behavior in single-expand mode.
 */
import { memo, useMemo } from 'react';

import { AccordionNative } from '@/components/ui/native';
import type { AccordionItem } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

const I18N_PREFIX = 'components.accordionShowcase';

const buildBasicItems = (): AccordionItem[] => [
  {
    header: FM(`${I18N_PREFIX}.basic.gettingStartedHeader`),
    content: FM(`${I18N_PREFIX}.basic.gettingStartedContent`),
  },
  {
    header: FM(`${I18N_PREFIX}.basic.featuresHeader`),
    content: FM(`${I18N_PREFIX}.basic.featuresContent`),
  },
  {
    header: FM(`${I18N_PREFIX}.basic.themingHeader`),
    content: FM(`${I18N_PREFIX}.basic.themingContent`),
  },
];

export const BasicSection = memo((): JSX.Element => {
  const items = useMemo(() => buildBasicItems(), []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM(`${I18N_PREFIX}.sections.basic`)}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM(`${I18N_PREFIX}.sections.basicDesc`)}
        </p>
      </div>
      <AccordionNative items={items} testId={TestIds.NATIVE_ACCORDION_BASIC} />
    </section>
  );
});

BasicSection.displayName = 'BasicSection';
