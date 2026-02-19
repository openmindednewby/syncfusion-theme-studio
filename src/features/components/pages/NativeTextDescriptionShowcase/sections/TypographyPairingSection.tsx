import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { DescriptionNative, HeadingNative, HeadingLevel, TextNative, TextVariant } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

export const TypographyPairingSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.textDescriptionShowcase.sections.typographyPairing')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.textDescriptionShowcase.sections.typographyPairingDesc')}
      </p>
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H2} testId="pairing-heading">
          {FM('components.textDescriptionShowcase.articleTitle')}
        </HeadingNative>
        <DescriptionNative testId="pairing-description">
          {FM('components.textDescriptionShowcase.withHeading')}
        </DescriptionNative>
        <TextNative testId="pairing-body" variant={TextVariant.Body}>
          {FM('components.textDescriptionShowcase.longContent')}
        </TextNative>
      </div>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H3} testId="pairing-section-heading">
          {FM('components.textDescriptionShowcase.sectionTitle')}
        </HeadingNative>
        <TextNative testId="pairing-section-body" variant={TextVariant.Body}>
          {FM('components.textDescriptionShowcase.longContent')}
        </TextNative>
        <DescriptionNative as="span" testId="pairing-caption">
          {FM('components.textDescriptionShowcase.withBody')}
        </DescriptionNative>
      </div>
    </div>
    <CopyableCodeSnippet code={'<HeadingNative level={HeadingLevel.H2}>Article Title</HeadingNative>\n<DescriptionNative>Subtitle or description</DescriptionNative>\n<TextNative variant={TextVariant.Body}>Body content...</TextNative>'} />
  </section>
));

TypographyPairingSection.displayName = 'TypographyPairingSection';
