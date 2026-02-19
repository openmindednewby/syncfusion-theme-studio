import { memo } from 'react';

import { FlexBox } from '@/features/components/shared/FlexBox';
import { FlexItem } from '@/features/components/shared/FlexItem';
import { FM } from '@/localization/helpers';

import { ALIGN_VALUES, ItemLabel, JUSTIFY_VALUES, SectionLabel } from './helpers';

export const JustifySection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.justifyContent')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.justifyDescription')}
    </p>
    <div className="space-y-3">
      {JUSTIFY_VALUES.map((value) => (
        <div key={value}>
          <SectionLabel text={value} />
          <FlexBox justify={value} testId={`flex-justify-${value}`} wrap={false}>
            <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.itemNum', '1')}</ItemLabel></FlexItem>
            <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.itemNum', '2')}</ItemLabel></FlexItem>
            <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.itemNum', '3')}</ItemLabel></FlexItem>
          </FlexBox>
        </div>
      ))}
    </div>
  </section>
));

JustifySection.displayName = 'JustifySection';

export const AlignSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.alignItems')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.alignDescription')}
    </p>
    <div className="space-y-3">
      {ALIGN_VALUES.map((value) => (
        <div key={value}>
          <SectionLabel text={value} />
          <FlexBox align={value} style={{ minHeight: '80px' }} testId={`flex-align-${value}`} wrap={false}>
            <FlexItem style={{ padding: '8px 16px' }}>
              <ItemLabel>{FM('components.flexBoxShowcase.short')}</ItemLabel>
            </FlexItem>
            <FlexItem style={{ padding: '20px 16px' }}>
              <ItemLabel>{FM('components.flexBoxShowcase.tall')}</ItemLabel>
            </FlexItem>
            <FlexItem style={{ padding: '12px 16px' }}>
              <ItemLabel>{FM('components.flexBoxShowcase.medium')}</ItemLabel>
            </FlexItem>
          </FlexBox>
        </div>
      ))}
    </div>
  </section>
));

AlignSection.displayName = 'AlignSection';
