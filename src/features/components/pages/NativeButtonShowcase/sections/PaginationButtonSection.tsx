/**
 * PaginationButtonSection - Demonstrates themed pagination buttons.
 */
import { memo, useState, useCallback } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const PAGE_COUNT = 5;

export const PaginationButtonSection = memo((): JSX.Element => {
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = useCallback((page: number) => {
    setActivePage(page);
  }, []);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_PAGINATION_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.paginationButtons')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.paginationButtonsDesc')}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="flex items-center justify-center transition-colors"
          disabled={activePage === 1}
          style={{
            color: activePage === 1 ? 'var(--component-pagination-nav-disabled)' : 'var(--component-pagination-nav-text)',
            fontSize: 'var(--component-pagination-btn-font-size, 12px)',
            borderRadius: 'var(--component-pagination-btn-radius, 4px)',
            border: 'var(--component-pagination-btn-border-width, 1px) solid transparent',
            minHeight: '24px',
            minWidth: '24px',
            height: '24px',
            width: '24px',
          }}
          type="button"
          onClick={() => handlePageClick(Math.max(1, activePage - 1))}
        >
          {FM('components.buttonShowcase.paginationPrev')}
        </button>
        {Array.from({ length: PAGE_COUNT }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className="flex items-center justify-center font-medium transition-colors"
            style={{
              backgroundColor: activePage === page
                ? 'var(--component-pagination-btn-active-bg, rgb(var(--color-primary-500)))'
                : 'var(--component-pagination-btn-bg, transparent)',
              color: activePage === page
                ? 'var(--component-pagination-btn-active-text, #fff)'
                : 'var(--component-pagination-btn-text, rgb(var(--color-text-secondary)))',
              borderRadius: 'var(--component-pagination-btn-radius, 4px)',
              border: `var(--component-pagination-btn-border-width, 1px) solid ${
                activePage === page ? 'transparent' : 'var(--component-pagination-btn-border-color, rgb(223 223 223))'
              }`,
              fontSize: 'var(--component-pagination-btn-font-size, 12px)',
              minWidth: '24px',
              minHeight: '24px',
              height: '24px',
              padding: '0 10px',
            }}
            type="button"
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="flex items-center justify-center transition-colors"
          disabled={activePage === PAGE_COUNT}
          style={{
            color: activePage === PAGE_COUNT ? 'var(--component-pagination-nav-disabled)' : 'var(--component-pagination-nav-text)',
            fontSize: 'var(--component-pagination-btn-font-size, 12px)',
            borderRadius: 'var(--component-pagination-btn-radius, 4px)',
            border: 'var(--component-pagination-btn-border-width, 1px) solid transparent',
            minHeight: '24px',
            minWidth: '24px',
            height: '24px',
            width: '24px',
          }}
          type="button"
          onClick={() => handlePageClick(Math.min(PAGE_COUNT, activePage + 1))}
        >
          {FM('components.buttonShowcase.paginationNext')}
        </button>
      </div>
      <CopyableCodeSnippet code='<button className="pagination-btn pagination-btn-active">1</button>' />
    </section>
  );
});

PaginationButtonSection.displayName = 'PaginationButtonSection';
