/**
 * BasicGridSection demonstrates the TableNative component with
 * column sorting, inline filtering, and striped/hoverable rows.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative } from '@/components/ui/native';
import type { GridConfig } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const BASIC_GRID_CONFIG: GridConfig = {
  filter: { enabled: true },
};

export const BasicGridSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.gridShowcase.sections.basicGrid')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.gridShowcase.sections.basicGridDesc')}
      </p>
    </div>
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
  </section>
));

BasicGridSection.displayName = 'BasicGridSection';
