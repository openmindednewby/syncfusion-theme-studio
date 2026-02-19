import { memo } from 'react';

import { FlexBox, FlexGapSize } from '@/features/components/shared/FlexBox';
import { FlexItem } from '@/features/components/shared/FlexItem';
import { FM } from '@/localization/helpers';

import { ItemLabel, SectionLabel, WRAP_ITEMS } from './helpers';

export const GapSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.gapSizes')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.gapDescription')}
    </p>
    <div className="space-y-3">
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.smallGap')} />
        <FlexBox gap={FlexGapSize.Small} testId="flex-gap-small" wrap={false}>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterA')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterB')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterC')}</ItemLabel></FlexItem>
        </FlexBox>
      </div>
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.middleGap')} />
        <FlexBox gap={FlexGapSize.Middle} testId="flex-gap-middle" wrap={false}>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterA')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterB')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterC')}</ItemLabel></FlexItem>
        </FlexBox>
      </div>
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.largeGap')} />
        <FlexBox gap={FlexGapSize.Large} testId="flex-gap-large" wrap={false}>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterA')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterB')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterC')}</ItemLabel></FlexItem>
        </FlexBox>
      </div>
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.customGap')} />
        <FlexBox gap="32px" testId="flex-gap-custom" wrap={false}>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterA')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterB')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.letterC')}</ItemLabel></FlexItem>
        </FlexBox>
      </div>
    </div>
  </section>
));

GapSection.displayName = 'GapSection';

export const WrapSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.wrapBehavior')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.wrapDescription')}
    </p>
    <div className="space-y-3">
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.noWrap')} />
        <FlexBox style={{ overflow: 'auto' }} testId="flex-nowrap" wrap={false}>
          {WRAP_ITEMS.map((n) => (
            <FlexItem key={n} style={{ minWidth: '100px' }}>
              <ItemLabel>{FM('components.flexBoxShowcase.item', String(n))}</ItemLabel>
            </FlexItem>
          ))}
        </FlexBox>
      </div>
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.wrap')} />
        <FlexBox wrap testId="flex-wrap">
          {WRAP_ITEMS.map((n) => (
            <FlexItem key={n} style={{ minWidth: '100px' }}>
              <ItemLabel>{FM('components.flexBoxShowcase.item', String(n))}</ItemLabel>
            </FlexItem>
          ))}
        </FlexBox>
      </div>
      <div>
        <SectionLabel text={FM('components.flexBoxShowcase.wrapReverse')} />
        <FlexBox testId="flex-wrap-reverse" wrap="wrap-reverse">
          {WRAP_ITEMS.map((n) => (
            <FlexItem key={n} style={{ minWidth: '100px' }}>
              <ItemLabel>{FM('components.flexBoxShowcase.item', String(n))}</ItemLabel>
            </FlexItem>
          ))}
        </FlexBox>
      </div>
    </div>
  </section>
));

WrapSection.displayName = 'WrapSection';
