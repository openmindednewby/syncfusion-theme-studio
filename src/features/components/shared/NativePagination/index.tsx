import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, ReactNode } from 'react';

import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';
import { isValueDefined } from '@/utils/is';

import {
  CONTAINER_STYLE, INFO_STYLE, INPUT_STYLE, LABEL_STYLE,
  NAV_BTN_DISABLED_STYLE, NAV_BTN_STYLE,
  SELECT_DROPDOWN_STYLE, SELECT_OPTION_ACTIVE_STYLE, SELECT_OPTION_STYLE, SELECT_TRIGGER_STYLE, SELECT_WRAPPER_STYLE,
  SEPARATOR_STYLE,
} from './styles';
import { PaginationVariant } from './types';

const IconFirstPage = (): JSX.Element => (
  <svg fill="currentColor" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.386 6l4.346 4.453a.876.876 0 0 1-.018 1.234.862.862 0 0 1-1.224-.04L5.524 6.636a.904.904 0 0 1 0-1.272L10.49.275a.862.862 0 0 1 1.224-.04.876.876 0 0 1 .018 1.234L7.386 6zm-5.267 0L6.465 10.453a.876.876 0 0 1-.018 1.234.862.862 0 0 1-1.224-.04L.257 6.636a.904.904 0 0 1 0-1.272L5.223.275a.862.862 0 0 1 1.224-.04.876.876 0 0 1 .018 1.234L2.119 6z" />
  </svg>
);

const IconLastPage = (): JSX.Element => (
  <svg fill="currentColor" height="12" style={{ transform: 'rotate(180deg)' }} viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.386 6l4.346 4.453a.876.876 0 0 1-.018 1.234.862.862 0 0 1-1.224-.04L5.524 6.636a.904.904 0 0 1 0-1.272L10.49.275a.862.862 0 0 1 1.224-.04.876.876 0 0 1 .018 1.234L7.386 6zm-5.267 0L6.465 10.453a.876.876 0 0 1-.018 1.234.862.862 0 0 1-1.224-.04L.257 6.636a.904.904 0 0 1 0-1.272L5.223.275a.862.862 0 0 1 1.224-.04.876.876 0 0 1 .018 1.234L2.119 6z" />
  </svg>
);

const IconPrevPage = (): JSX.Element => (
  <svg fill="currentColor" height="10" viewBox="0 0 8 13" width="7" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.16 6.65C-0.05 6.46-0.05 6.12 0.16 5.92L6.42 0.13C6.74-0.16 7.26 0.07 7.26 0.5V12.07C7.26 12.51 6.74 12.74 6.42 12.44L0.16 6.65Z" />
  </svg>
);

const IconNextPage = (): JSX.Element => (
  <svg fill="currentColor" height="10" viewBox="0 0 8 13" width="7" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.1 6.65C7.32 6.46 7.32 6.12 7.1 5.92L0.84 0.13C0.52-0.16 0 0.07 0 0.5V12.07C0 12.51 0.52 12.74 0.84 12.44L7.1 6.65Z" />
  </svg>
);

const IconChevronDown = (): JSX.Element => (
  <svg fill="currentColor" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const NavButton = ({ ariaLabel, children, disabled, onClick }: { ariaLabel: string; children: ReactNode; disabled: boolean; onClick: () => void }): JSX.Element => (
  <button aria-label={ariaLabel} disabled={disabled} style={disabled ? NAV_BTN_DISABLED_STYLE : NAV_BTN_STYLE} type="button" onClick={onClick}>
    {children}
  </button>
);

interface NativePaginationProps {
  variant?: PaginationVariant;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  pageSizes?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  testId?: string;
}

const MIN_PAGE = 1;

const NativePagination = memo(({
  variant = PaginationVariant.Default,
  currentPage, totalPages, pageSize, totalItems, pageSizes,
  onPageChange, onPageSizeChange, testId,
}: NativePaginationProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(String(currentPage));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setInputValue(String(currentPage)); }, [currentPage]);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent): void => {
      const ref = dropdownRef.current;
      const isOutsideClick = isValueDefined(ref) && e.target instanceof Node && !ref.contains(e.target);
      if (isOutsideClick) setIsDropdownOpen(false);
    };
    const handleEscapeKey = (e: globalThis.KeyboardEvent): void => { if (e.key === 'Escape') setIsDropdownOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', handleEscapeKey); };
  }, [isDropdownOpen]);

  const isFirst = currentPage <= MIN_PAGE;
  const isLast = currentPage >= totalPages;
  const showPageSize = variant !== PaginationVariant.NoPageSize;
  const isCompact = variant === PaginationVariant.Compact;

  const goFirst = useCallback(() => { if (!isFirst) onPageChange(MIN_PAGE); }, [isFirst, onPageChange]);
  const goPrev = useCallback(() => { if (!isFirst) onPageChange(currentPage - 1); }, [isFirst, currentPage, onPageChange]);
  const goNext = useCallback(() => { if (!isLast) onPageChange(currentPage + 1); }, [isLast, currentPage, onPageChange]);
  const goLast = useCallback(() => { if (!isLast) onPageChange(totalPages); }, [isLast, totalPages, onPageChange]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value); }, []);

  const commitPage = useCallback(() => {
    const parsed = parseInt(inputValue, 10);
    const isValidPage = !isNaN(parsed) && parsed >= MIN_PAGE && parsed <= totalPages;
    if (isValidPage) onPageChange(parsed);
    else setInputValue(String(currentPage));
  }, [inputValue, totalPages, currentPage, onPageChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') commitPage(); }, [commitPage]);
  const toggleDropdown = useCallback(() => { setIsDropdownOpen((prev) => !prev); }, []);
  const selectSize = useCallback((size: number) => { onPageSizeChange?.(size); setIsDropdownOpen(false); }, [onPageSizeChange]);

  const displayStart = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const displayEnd = Math.min(currentPage * pageSize, totalItems);
  const pageLabel = FM('components.pagination.page');
  const ofLabel = FM('components.pagination.of');
  const pageSizeLabel = FM('components.pagination.pageSize');
  const firstPageLabel = FM('components.pagination.firstPage');
  const prevPageLabel = FM('components.pagination.previousPage');
  const nextPageLabel = FM('components.pagination.nextPage');
  const lastPageLabel = FM('components.pagination.lastPage');
  const pageInputLabel = FM('components.pagination.pageInput');
  const pageSizeSelectLabel = FM('components.pagination.pageSizeSelect');
  const displayingText = `${FM('components.pagination.displaying')} ${displayStart}-${displayEnd} ${ofLabel} ${totalItems}`;

  return (
    <div data-testid={testId ?? ComponentTestIds.NATIVE_PAGINATION_SECTION} style={CONTAINER_STYLE}>
      {isCompact ? renderCompactNav() : renderFullNav()}
      <div style={SEPARATOR_STYLE} />
      {showPageSize ? renderPageSize() : null}
      {showPageSize ? <div style={SEPARATOR_STYLE} /> : null}
      <span style={INFO_STYLE}>{displayingText}</span>
    </div>
  );

  function renderFullNav(): JSX.Element {
    return (
      <>
        <NavButton ariaLabel={firstPageLabel} disabled={isFirst} onClick={goFirst}><IconFirstPage /></NavButton>
        <NavButton ariaLabel={prevPageLabel} disabled={isFirst} onClick={goPrev}><IconPrevPage /></NavButton>
        <div style={SEPARATOR_STYLE} />
        <span style={LABEL_STYLE}>{pageLabel}</span>
        <input aria-label={pageInputLabel} style={INPUT_STYLE} type="text" value={inputValue} onBlur={commitPage} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <span style={LABEL_STYLE}>{ofLabel} {totalPages}</span>
        <div style={SEPARATOR_STYLE} />
        <NavButton ariaLabel={nextPageLabel} disabled={isLast} onClick={goNext}><IconNextPage /></NavButton>
        <NavButton ariaLabel={lastPageLabel} disabled={isLast} onClick={goLast}><IconLastPage /></NavButton>
      </>
    );
  }

  function renderCompactNav(): JSX.Element {
    return (
      <>
        <span style={LABEL_STYLE}>{pageLabel}</span>
        <span style={LABEL_STYLE}>{currentPage} {ofLabel} {totalPages}</span>
        <div style={SEPARATOR_STYLE} />
        <NavButton ariaLabel={firstPageLabel} disabled={isFirst} onClick={goFirst}><IconFirstPage /></NavButton>
        <NavButton ariaLabel={prevPageLabel} disabled={isFirst} onClick={goPrev}><IconPrevPage /></NavButton>
        <NavButton ariaLabel={nextPageLabel} disabled={isLast} onClick={goNext}><IconNextPage /></NavButton>
        <NavButton ariaLabel={lastPageLabel} disabled={isLast} onClick={goLast}><IconLastPage /></NavButton>
      </>
    );
  }

  function renderPageSize(): JSX.Element {
    const sizes = pageSizes ?? [pageSize];
    return (
      <>
        <span style={LABEL_STYLE}>{pageSizeLabel}</span>
        {isCompact
          ? <span style={LABEL_STYLE}>{pageSize}</span>
          : (
            <div ref={dropdownRef} style={SELECT_WRAPPER_STYLE}>
              <button aria-expanded={isDropdownOpen} aria-haspopup="listbox" aria-label={pageSizeSelectLabel} style={SELECT_TRIGGER_STYLE} type="button" onClick={toggleDropdown}>
                <span>{pageSize}</span>
                <IconChevronDown />
              </button>
              {isDropdownOpen ? (
                <div role="listbox" style={SELECT_DROPDOWN_STYLE}>
                  {sizes.map((s) => (
                    <div key={s} aria-selected={s === pageSize} role="option" style={s === pageSize ? SELECT_OPTION_ACTIVE_STYLE : SELECT_OPTION_STYLE} tabIndex={0} onClick={() => selectSize(s)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSize(s); } }}>
                      {s}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
      </>
    );
  }
});

NativePagination.displayName = 'NativePagination';

export { NativePagination };
export type { NativePaginationProps };
