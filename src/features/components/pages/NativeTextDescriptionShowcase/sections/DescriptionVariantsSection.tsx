import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DescriptionNative, HeadingNative, HeadingLevel } from '@/components/ui/native';
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
      <DescriptionNative testId="desc-standalone">
        {FM('components.textDescriptionShowcase.standalone')}
      </DescriptionNative>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H1} testId="desc-heading-h1">{FM('components.textDescriptionShowcase.headingH1')}</HeadingNative>
        <DescriptionNative testId="desc-below-h1">
          {FM('components.textDescriptionShowcase.belowHeading')}
        </DescriptionNative>
      </div>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H2} testId="desc-heading-h2">{FM('components.textDescriptionShowcase.headingH2')}</HeadingNative>
        <DescriptionNative testId="desc-below-h2">
          {FM('components.textDescriptionShowcase.belowHeading')}
        </DescriptionNative>
      </div>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H3} testId="desc-heading-h3">{FM('components.textDescriptionShowcase.headingH3')}</HeadingNative>
        <DescriptionNative testId="desc-below-h3">
          {FM('components.textDescriptionShowcase.shortContent')}
        </DescriptionNative>
      </div>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H4} testId="desc-heading-h4">{FM('components.textDescriptionShowcase.headingH4')}</HeadingNative>
        <DescriptionNative testId="desc-below-h4">
          {FM('components.textDescriptionShowcase.shortContent')}
        </DescriptionNative>
      </div>
    </div>
    <CopyableCodeSnippet code={'<HeadingNative level={HeadingLevel.H2}>Section Title</HeadingNative>\n<DescriptionNative>Description text below the heading.</DescriptionNative>'} />
  </section>
));

DescriptionVariantsSection.displayName = 'DescriptionVariantsSection';
