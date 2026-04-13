/**
 * BasicGridSection demonstrates the TableNative component with
 * column sorting, inline filtering, and striped/hoverable rows.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative } from '@/components/ui/native';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import type { GridConfig } from '@/lib/grid/types';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const BASIC_GRID_CONFIG: GridConfig = {
  filter: { enabled: true },
};

export const BasicGridSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.basicDescription"
    testId="native-grid-showcase-basic"
    titleKey="gridShowcase.basicTitle"
  >
    <TableNative
      hoverable
      striped
      ariaLabel={FM('components.gridShowcase.sections.basicGrid')}
      columns={EMPLOYEE_COLUMNS}
      data={EMPLOYEES}
      gridConfig={BASIC_GRID_CONFIG}
      testId={TestIds.NATIVE_GRID_BASIC}
    />
    <CopyableCodeSnippet code='<TableNative striped hoverable columns={columns} data={data} gridConfig={gridConfig} />' />
  </ShowcaseSection>
));

BasicGridSection.displayName = 'BasicGridSection';
