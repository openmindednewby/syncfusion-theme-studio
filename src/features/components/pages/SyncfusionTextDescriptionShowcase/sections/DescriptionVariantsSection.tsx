import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { HeadingNative, HeadingLevel } from '@/components/ui/native';
import { SyncfusionDescription } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

export const DescriptionVariantsSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.textDescriptionShowcase.sections.variants')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.textDescriptionShowcase.sections.variantsDesc')}
      </p>
    </div>
    <div className="space-y-6">
      <SyncfusionDescription testId="sf-desc-standalone">
        {FM('components.textDescriptionShowcase.standalone')}
      </SyncfusionDescription>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H2} testId="sf-desc-heading-h2">{FM('components.textDescriptionShowcase.headingH2')}</HeadingNative>
        <SyncfusionDescription testId="sf-desc-below-h2">
          {FM('components.textDescriptionShowcase.belowHeading')}
        </SyncfusionDescription>
      </div>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H3} testId="sf-desc-heading-h3">{FM('components.textDescriptionShowcase.headingH3')}</HeadingNative>
        <SyncfusionDescription testId="sf-desc-below-h3">
          {FM('components.textDescriptionShowcase.shortContent')}
        </SyncfusionDescription>
      </div>
    </div>
    <CopyableCodeSnippet code='<SyncfusionDescription>Your description text here</SyncfusionDescription>' />
  </section>
));

DescriptionVariantsSection.displayName = 'DescriptionVariantsSection';
