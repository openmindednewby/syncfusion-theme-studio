/**
 * Pagination controls for the native table.
 * Shows page buttons with ellipsis, prev/next, and page size selector.
 * All colors are driven by --component-pagination-* CSS variables.
 */
import { memo, useCallback, useMemo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';

import { generatePageNumbers, ELLIPSIS } from './utils';

const PAGE_SIZE_DEFAULT = 10;
const PAGE_SIZE_SMALL = 25;
const PAGE_SIZE_MEDIUM = 50;
const PAGE_SIZE_LARGE = 100;
const DEFAULT_PAGE_SIZES = [PAGE_SIZE_DEFAULT, PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];

const PREV_ARROW = '\u2039';
const NEXT_ARROW = '\u203A';
const FIRST_ARROW = '\u00AB';
const LAST_ARROW = '\u00BB';
const ELLIPSIS_TEXT = '...';

interface Props {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizes?: number[];
  totalItems: number;
  pageCount?: number;
  showFirstLastButtons?: boolean;
  showPageInfo?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizes = DEFAULT_PAGE_SIZES,
  totalItems,
  pageCount,
  showFirstLastButtons = true,
  showPageInfo = true,
  onPageChange,
  onPageSizeChange,
}: Props): JSX.Element => {
  const pages = useMemo(
    () => generatePageNumbers(currentPage, totalPages, pageCount),
    [currentPage, totalPages, pageCount],
  );

  const handleFirst = useCallback(() => {
    if (currentPage > 1) onPageChange(1);
  }, [currentPage, onPageChange]);

  const handlePrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  const handleLast = useCallback(() => {
    if (currentPage < totalPages) onPageChange(totalPages);
  }, [currentPage, totalPages, onPageChange]);

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onPageSizeChange(Number(e.target.value));
    },
    [onPageSizeChange],
  );

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div
      className="pagination-bar flex flex-wrap items-center justify-between gap-4 px-4 py-3"
      data-testid="table-pagination"
    >
      <div className="flex items-center gap-2 text-xs pagination-info">
        <span>{FM('table.rowsPerPage')}</span>
        <select
          aria-label={FM('table.rowsPerPage')}
          className="pagination-select"
          data-testid="page-size-select"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>
          {String(startItem)}-{String(endItem)} / {String(totalItems)}
        </span>
        {showPageInfo ? (
          <span data-testid="pagination-page-info">
            {FM('table.pageInfo', String(currentPage), String(totalPages))}
          </span>
        ) : null}
      </div>

      <nav aria-label={FM('table.pagination')} className="flex items-center gap-1">
        {showFirstLastButtons ? (
          <button
            aria-label={FM('table.first')}
            className={cn('pagination-btn pagination-nav')}
            data-testid="pagination-first"
            disabled={isFirstPage}
            type="button"
            onClick={handleFirst}
          >
            {FIRST_ARROW}
          </button>
        ) : null}
        <button
          aria-label={FM('table.previous')}
          className={cn('pagination-btn pagination-nav')}
          data-testid="pagination-prev"
          disabled={isFirstPage}
          type="button"
          onClick={handlePrev}
        >
          {PREV_ARROW}
        </button>

        {pages.map((page, idx) => {
          if (page === ELLIPSIS)
            return (
              <span key={`ellipsis-${String(idx)}`} className="px-1 text-xs pagination-info">
                {ELLIPSIS_TEXT}
              </span>
            );

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              className={cn('pagination-btn', isActive && 'pagination-btn-active')}
              data-testid={`pagination-page-${String(page)}`}
              type="button"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          aria-label={FM('table.next')}
          className={cn('pagination-btn pagination-nav')}
          data-testid="pagination-next"
          disabled={isLastPage}
          type="button"
          onClick={handleNext}
        >
          {NEXT_ARROW}
        </button>
        {showFirstLastButtons ? (
          <button
            aria-label={FM('table.last')}
            className={cn('pagination-btn pagination-nav')}
            data-testid="pagination-last"
            disabled={isLastPage}
            type="button"
            onClick={handleLast}
          >
            {LAST_ARROW}
          </button>
        ) : null}
      </nav>
    </div>
  );
};

export default memo(TablePagination);
