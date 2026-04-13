/**
 * PaginationSection demonstrates TableNative with external NativePagination
 * controlling page navigation and page size selection.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative } from '@/components/ui/native';
import { NativePagination } from '@/features/components/shared/NativePagination';
import { PaginationVariant } from '@/features/components/shared/NativePagination/types';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const PAGE_SIZE_SMALL = 5;
const PAGE_SIZE_MEDIUM = 10;
const PAGE_SIZE_LARGE = 20;
const PAGE_SIZES = [PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];
const INITIAL_PAGE = 1;

export const PaginationSection = memo((): JSX.Element => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_SMALL);
  const totalPages = Math.ceil(EMPLOYEES.length / pageSize);
  const handlePageChange = useCallback((p: number) => setPage(p), []);
  const handleSizeChange = useCallback((s: number) => { setPageSize(s); setPage(INITIAL_PAGE); }, []);

  const pagedData = useMemo(
    () => EMPLOYEES.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.paginationDescription"
      testId="native-grid-showcase-pagination"
      titleKey="gridShowcase.paginationTitle"
    >
      <TableNative
        ariaLabel={FM('components.gridShowcase.sections.pagination')}
        columns={EMPLOYEE_COLUMNS}
        data={pagedData}
        testId={TestIds.NATIVE_GRID_PAGINATION}
      />
      <NativePagination currentPage={page} pageSize={pageSize} pageSizes={PAGE_SIZES} testId="native-grid-pagination-default" totalItems={EMPLOYEES.length} totalPages={totalPages} onPageChange={handlePageChange} onPageSizeChange={handleSizeChange} />
      <CopyableCodeSnippet code='<TableNative columns={columns} data={pagedData} />\n<NativePagination currentPage={page} pageSize={pageSize} pageSizes={PAGE_SIZES} totalItems={data.length} totalPages={totalPages} onPageChange={handlePageChange} onPageSizeChange={handleSizeChange} />' />
      <h4 className="text-sm font-medium text-text-primary">{FM('showcase.sections.nativePaginationVariants')}</h4>
      <div className="space-y-3">
        <NativePagination currentPage={page} pageSize={pageSize} testId="native-grid-pagination-nopagesize" totalItems={EMPLOYEES.length} totalPages={totalPages} variant={PaginationVariant.NoPageSize} onPageChange={handlePageChange} />
        <NativePagination currentPage={page} pageSize={pageSize} testId="native-grid-pagination-compact" totalItems={EMPLOYEES.length} totalPages={totalPages} variant={PaginationVariant.Compact} onPageChange={handlePageChange} />
      </div>
    </ShowcaseSection>
  );
});

PaginationSection.displayName = 'PaginationSection';
