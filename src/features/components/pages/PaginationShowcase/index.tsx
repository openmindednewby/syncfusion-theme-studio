import { useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { NativePagination } from '@/features/components/shared/NativePagination';
import { PaginationVariant } from '@/features/components/shared/NativePagination/types';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined } from '@/utils';

const TOTAL_ITEMS = 150;
const PAGE_SIZE_SMALL = 5;
const PAGE_SIZE_MEDIUM = 10;
const PAGE_SIZE_LARGE = 20;
const PAGE_SIZES = [PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];
const INITIAL_PAGE = 1;

interface VariantSection {
  variant?: PaginationVariant;
  titleKey: string;
  testId: string;
  showPageSize: boolean;
  snippet: string;
}

const VARIANT_SECTIONS: VariantSection[] = [
  { titleKey: 'showcase.sections.defaultVariant', testId: 'pagination-default', showPageSize: true, snippet: '<NativePagination currentPage={1} totalPages={30} pageSize={5} totalItems={150} pageSizes={[5,10,20]} onPageChange={fn} onPageSizeChange={fn} />' },
  { variant: PaginationVariant.NoPageSize, titleKey: 'showcase.sections.noPageSizeVariant', testId: 'pagination-no-pagesize', showPageSize: false, snippet: '<NativePagination variant={PaginationVariant.NoPageSize} currentPage={1} totalPages={30} pageSize={5} totalItems={150} onPageChange={fn} />' },
  { variant: PaginationVariant.Compact, titleKey: 'showcase.sections.compactVariant', testId: 'pagination-compact', showPageSize: false, snippet: '<NativePagination variant={PaginationVariant.Compact} currentPage={1} totalPages={30} pageSize={5} totalItems={150} onPageChange={fn} />' },
];

const PaginationShowcase = (): JSX.Element => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_SMALL);
  const totalPages = Math.ceil(TOTAL_ITEMS / pageSize);

  const handlePageChange = useCallback((p: number) => setPage(p), []);
  const handlePageSizeChange = useCallback((s: number) => { setPageSize(s); setPage(INITIAL_PAGE); }, []);

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.PAGINATION_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{FM('components.paginationShowcase.title')}</h2>
          <p className="mt-1 text-text-secondary">{FM('components.paginationShowcase.description')}</p>
        </div>
        {VARIANT_SECTIONS.map((s) => (
          <section key={s.testId} className="card space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">{FM(s.titleKey)}</h3>
            <NativePagination
              currentPage={page}
              pageSize={pageSize}
              testId={s.testId}
              totalItems={TOTAL_ITEMS}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              {...(isValueDefined(s.variant) && { variant: s.variant })}
              {...(s.showPageSize && { pageSizes: PAGE_SIZES, onPageSizeChange: handlePageSizeChange })}
            />
            <CopyableCodeSnippet code={s.snippet} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default PaginationShowcase;
