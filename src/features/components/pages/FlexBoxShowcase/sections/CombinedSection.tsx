import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FlexBox, FlexGapSize } from '@/features/components/shared/FlexBox';
import { FlexItem } from '@/features/components/shared/FlexItem';
import { FM } from '@/localization/helpers';

import { ItemLabel } from './helpers';

export const CombinedSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.flexBoxShowcase.combinedExample')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.flexBoxShowcase.combinedDescription')}
    </p>
    <FlexBox vertical gap={FlexGapSize.Middle} style={{ background: 'transparent', border: 'none', padding: 0 }} testId="flex-combined">
      {/* Top bar */}
      <FlexBox align="center" justify="space-between" testId="flex-combined-header" wrap={false}>
        <FlexItem style={{ fontWeight: '700' }}>
          <ItemLabel>{FM('components.flexBoxShowcase.logo')}</ItemLabel>
        </FlexItem>
        <FlexBox gap={FlexGapSize.Small} style={{ background: 'transparent', border: 'none', padding: 0 }} wrap={false}>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.nav', '1')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.nav', '2')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.nav', '3')}</ItemLabel></FlexItem>
        </FlexBox>
      </FlexBox>
      {/* Content area */}
      <FlexBox
        gap={FlexGapSize.Middle}
        style={{ background: 'transparent', border: 'none', padding: 0 }}
        testId="flex-combined-content"
        wrap={false}
      >
        <FlexBox vertical flex="0 0 200px" gap={FlexGapSize.Small} testId="flex-combined-sidebar">
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.sidebar')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.link', '1')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.link', '2')}</ItemLabel></FlexItem>
        </FlexBox>
        <FlexBox vertical flex="1" gap={FlexGapSize.Small} testId="flex-combined-main">
          <FlexItem style={{ minHeight: '120px' }}>
            <ItemLabel>{FM('components.flexBoxShowcase.mainContent')}</ItemLabel>
          </FlexItem>
        </FlexBox>
        <FlexBox vertical flex="0 0 150px" gap={FlexGapSize.Small} testId="flex-combined-aside">
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.aside')}</ItemLabel></FlexItem>
          <FlexItem><ItemLabel>{FM('components.flexBoxShowcase.widget')}</ItemLabel></FlexItem>
        </FlexBox>
      </FlexBox>
    </FlexBox>
    <CopyableCodeSnippet code={'<FlexBox vertical gap={FlexGapSize.Middle}>\n  <FlexBox align="center" justify="space-between">\n    <FlexItem>Logo</FlexItem>\n    <FlexBox gap={FlexGapSize.Small}>\n      <FlexItem>Nav 1</FlexItem>\n      <FlexItem>Nav 2</FlexItem>\n    </FlexBox>\n  </FlexBox>\n  <FlexBox gap={FlexGapSize.Middle}>\n    <FlexBox vertical flex="0 0 200px">Sidebar</FlexBox>\n    <FlexBox vertical flex="1">Main</FlexBox>\n  </FlexBox>\n</FlexBox>'} />
  </section>
));

CombinedSection.displayName = 'CombinedSection';
