/**
 * PaginationSection demonstrates the TableNative pagination feature
 * with configurable page sizes and page navigation.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative } from '@/components/ui/native';
import type { GridConfig } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const PAGE_SIZE_SMALL = 5;
const PAGE_SIZE_MEDIUM = 10;
const PAGE_SIZE_LARGE = 20;
const PAGE_SIZES = [PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];

const PAGINATION_GRID_CONFIG: GridConfig = {
  filter: { enabled: true },
  pagination: {
    enabled: true,
    pageSize: PAGE_SIZE_SMALL,
    pageSizes: PAGE_SIZES,
  },
};

export const PaginationSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.gridShowcase.sections.pagination')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.gridShowcase.sections.paginationDesc')}
      </p>
    </div>
    <TableNative
      ariaLabel={FM('components.gridShowcase.sections.pagination')}
      columns={EMPLOYEE_COLUMNS}
      data={EMPLOYEES}
      gridConfig={PAGINATION_GRID_CONFIG}
      testId={TestIds.NATIVE_GRID_PAGINATION}
    />
    <CopyableCodeSnippet code='<TableNative columns={columns} data={data} gridConfig={{ pagination: { enabled: true, pageSize: 5 } }} />' />
  </section>
));

PaginationSection.displayName = 'PaginationSection';
