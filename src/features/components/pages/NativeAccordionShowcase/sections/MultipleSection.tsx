/**
 * MultipleSection demonstrates single-expand vs multi-expand accordion
 * modes side by side, showing how the allowMultiple prop changes behavior.
 */
import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { AccordionNative } from '@/components/ui/native';
import type { AccordionItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const I18N_PREFIX = 'components.accordionShowcase.multiple';

const buildPanelItems = (): AccordionItem[] => [
  {
    header: FM(`${I18N_PREFIX}.projectsHeader`),
    content: FM(`${I18N_PREFIX}.projectsContent`),
  },
  {
    header: FM(`${I18N_PREFIX}.tasksHeader`),
    content: FM(`${I18N_PREFIX}.tasksContent`),
  },
  {
    header: FM(`${I18N_PREFIX}.teamHeader`),
    content: FM(`${I18N_PREFIX}.teamContent`),
  },
  {
    header: FM(`${I18N_PREFIX}.reportsHeader`),
    content: FM(`${I18N_PREFIX}.reportsContent`),
  },
];

export const MultipleSection = memo((): JSX.Element => {
  const items = useMemo(() => buildPanelItems(), []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.accordionShowcase.sections.multiple')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.accordionShowcase.sections.multipleDesc')}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM(`${I18N_PREFIX}.singleModeLabel`)}
          </h4>
          <p className="text-xs text-text-secondary">
            {FM(`${I18N_PREFIX}.singleModeDesc`)}
          </p>
          <AccordionNative items={items} testId={TestIds.NATIVE_ACCORDION_SINGLE} />
        </div>
        <div className="space-y-3">
          <h4 className="font-medium text-text-secondary">
            {FM(`${I18N_PREFIX}.multiModeLabel`)}
          </h4>
          <p className="text-xs text-text-secondary">
            {FM(`${I18N_PREFIX}.multiModeDesc`)}
          </p>
          <AccordionNative allowMultiple items={items} testId={TestIds.NATIVE_ACCORDION_MULTI} />
        </div>
      </div>
      <CopyableCodeSnippet code='<AccordionNative allowMultiple items={items} />' />
    </section>
  );
});

MultipleSection.displayName = 'MultipleSection';
