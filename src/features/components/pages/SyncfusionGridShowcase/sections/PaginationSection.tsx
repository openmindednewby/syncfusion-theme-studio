/**
 * Pagination section: demonstrates DataGrid with external NativePagination
 * controlling page navigation and page size selection.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { NativePagination } from '@/features/components/shared/NativePagination';
import { PaginationVariant } from '@/features/components/shared/NativePagination/types';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_STATUS,
  COL_WIDTH_DEPARTMENT,
  PAGE_SIZE_FIVE,
} from '../data/data';

const PAGINATION_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
];

const PAGE_SIZE_MEDIUM = 10;
const PAGE_SIZE_LARGE = 20;
const PAGE_SIZES = [PAGE_SIZE_FIVE, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];
const INITIAL_PAGE = 1;

export const PaginationSection = memo((): JSX.Element => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_FIVE);
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
      testId="grid-showcase-pagination"
      titleKey="gridShowcase.paginationTitle"
    >
      <DataGrid
        allowPaging={false}
        columns={PAGINATION_COLUMNS}
        data={pagedData}
        testId="grid-pagination"
      />
      <NativePagination currentPage={page} pageSize={pageSize} pageSizes={PAGE_SIZES} testId="sf-grid-pagination-default" totalItems={EMPLOYEES.length} totalPages={totalPages} onPageChange={handlePageChange} onPageSizeChange={handleSizeChange} />
      <CopyableCodeSnippet code='<DataGrid allowPaging={false} columns={columns} data={pagedData} />\n<NativePagination currentPage={page} pageSize={pageSize} pageSizes={PAGE_SIZES} totalItems={data.length} totalPages={totalPages} onPageChange={handlePageChange} onPageSizeChange={handleSizeChange} />' />
      <h4 className="text-md mt-4 font-semibold text-text-primary">{FM('showcase.sections.nativePaginationVariants')}</h4>
      <div className="space-y-3">
        <NativePagination currentPage={page} pageSize={pageSize} testId="sf-grid-pagination-nopagesize" totalItems={EMPLOYEES.length} totalPages={totalPages} variant={PaginationVariant.NoPageSize} onPageChange={handlePageChange} />
        <NativePagination currentPage={page} pageSize={pageSize} testId="sf-grid-pagination-compact" totalItems={EMPLOYEES.length} totalPages={totalPages} variant={PaginationVariant.Compact} onPageChange={handlePageChange} />
      </div>
    </ShowcaseSection>
  );
});

PaginationSection.displayName = 'PaginationSection';
