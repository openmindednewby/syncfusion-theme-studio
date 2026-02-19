import { memo } from 'react';

import { FlexBox, FlexGapSize } from '@/features/components/shared/FlexBox';
import { FlexItem } from '@/features/components/shared/FlexItem';
import { FM } from '@/localization/helpers';

import { ItemLabel } from './helpers';

export const FlexPropertySection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.flexProperty')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.flexDescription')}
    </p>
    <FlexBox gap={FlexGapSize.Middle} style={{ background: 'transparent', border: 'none', padding: 0 }} testId="flex-property" wrap={false}>
      <FlexBox vertical flex="1" gap={FlexGapSize.Small} testId="flex-prop-col1">
        <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.flexOne')}</ItemLabel></FlexItem>
        <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterA')}</ItemLabel></FlexItem>
      </FlexBox>
      <FlexBox vertical flex="2" gap={FlexGapSize.Small} testId="flex-prop-col2">
        <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.flexTwo')}</ItemLabel></FlexItem>
        <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterB')}</ItemLabel></FlexItem>
      </FlexBox>
      <FlexBox vertical flex="1" gap={FlexGapSize.Small} testId="flex-prop-col3">
        <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.flexOne')}</ItemLabel></FlexItem>
        <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterC')}</ItemLabel></FlexItem>
      </FlexBox>
    </FlexBox>
  </section>
));

FlexPropertySection.displayName = 'FlexPropertySection';

export const CustomElementSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.customElement')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.customElementDescription')}
    </p>
    <FlexBox component="section" gap={FlexGapSize.Middle} testId="flex-custom-element" wrap={false}>
      <FlexItem component="article">
        <ItemLabel>{FM('components.flexBoxShowcase.article', '1')}</ItemLabel>
      </FlexItem>
      <FlexItem component="article">
        <ItemLabel>{FM('components.flexBoxShowcase.article', '2')}</ItemLabel>
      </FlexItem>
      <FlexItem component="aside">
        <ItemLabel>{FM('components.flexBoxShowcase.aside')}</ItemLabel>
      </FlexItem>
    </FlexBox>
  </section>
));

CustomElementSection.displayName = 'CustomElementSection';
