import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { HeadingNative, HeadingLevel, TextNative, TextVariant } from '@/components/ui/native';
import { SyncfusionDescription } from '@/components/ui/syncfusion';
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
        <HeadingNative level={HeadingLevel.H2} testId="sf-pairing-heading">
          {FM('components.textDescriptionShowcase.articleTitle')}
        </HeadingNative>
        <SyncfusionDescription testId="sf-pairing-description">
          {FM('components.textDescriptionShowcase.withHeading')}
        </SyncfusionDescription>
        <TextNative testId="sf-pairing-body" variant={TextVariant.Body}>
          {FM('components.textDescriptionShowcase.longContent')}
        </TextNative>
      </div>

      <div className="space-y-2">
        <HeadingNative level={HeadingLevel.H3} testId="sf-pairing-section-heading">
          {FM('components.textDescriptionShowcase.sectionTitle')}
        </HeadingNative>
        <TextNative testId="sf-pairing-section-body" variant={TextVariant.Body}>
          {FM('components.textDescriptionShowcase.longContent')}
        </TextNative>
        <SyncfusionDescription as="span" testId="sf-pairing-caption">
          {FM('components.textDescriptionShowcase.withBody')}
        </SyncfusionDescription>
      </div>
    </div>
    <CopyableCodeSnippet code='<HeadingNative level={HeadingLevel.H2}>Title</HeadingNative><SyncfusionDescription>Subtitle</SyncfusionDescription>' />
  </section>
));

TypographyPairingSection.displayName = 'TypographyPairingSection';
