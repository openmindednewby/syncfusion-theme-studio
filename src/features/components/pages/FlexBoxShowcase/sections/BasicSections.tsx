import { memo } from 'react';

import { FlexBox } from '@/features/components/shared/FlexBox';
import { FlexItem } from '@/features/components/shared/FlexItem';
import { FM } from '@/localization/helpers';

import { BASIC_ITEMS, ItemLabel } from './helpers';

export const BasicSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.basicUsage')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.basicDescription')}
    </p>
    <FlexBox testId="flex-basic">
      {BASIC_ITEMS.map((n) => (
        <FlexItem key={n} testId={`flex-basic-item-${n}`}>
          <ItemLabel>{FM('components.flexBoxShowcase.item', String(n))}</ItemLabel>
        </FlexItem>
      ))}
    </FlexBox>
  </section>
));

BasicSection.displayName = 'BasicSection';

export const VerticalSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.verticalLayout')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.verticalDescription')}
    </p>
    <FlexBox vertical style={{ maxWidth: '300px' }} testId="flex-vertical">
      {BASIC_ITEMS.map((n) => (
        <FlexItem key={n} testId={`flex-vertical-item-${n}`}>
          <ItemLabel>{FM('components.flexBoxShowcase.item', String(n))}</ItemLabel>
        </FlexItem>
      ))}
    </FlexBox>
  </section>
));

VerticalSection.displayName = 'VerticalSection';
