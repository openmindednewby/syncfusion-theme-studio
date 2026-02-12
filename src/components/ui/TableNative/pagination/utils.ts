/**
 * Page number generation with ellipsis for pagination controls.
 */

const ELLIPSIS = -1;
const DEFAULT_PAGE_COUNT = 5;
const PAGE_OFFSET = 1;

export type PageItem = number;
export { ELLIPSIS };

/**
 * Generate an array of page numbers with ellipsis markers.
 *
 * @param currentPage - 1-based current page
 * @param totalPages - Total number of pages
 * @param pageCount - Max visible page buttons before ellipsis (default: 5)
 * @returns Array of page numbers (1-based) or ELLIPSIS (-1)
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  pageCount: number = DEFAULT_PAGE_COUNT,
): PageItem[] {
  if (totalPages <= pageCount)
    return Array.from({ length: totalPages }, (_, i) => i + PAGE_OFFSET);

  const edgeThreshold = Math.ceil(pageCount / 2);
  const edgeOffset = Math.floor(pageCount / 2);
  const edgeEndCount = pageCount - 2;

  const pages: PageItem[] = [PAGE_OFFSET];

  if (currentPage <= edgeThreshold) {
    for (let i = 2; i <= edgeEndCount + PAGE_OFFSET; i++) pages.push(i);
    pages.push(ELLIPSIS, totalPages);
  } else if (currentPage >= totalPages - edgeOffset) {
    pages.push(ELLIPSIS);
    for (let i = totalPages - edgeEndCount; i <= totalPages; i++) pages.push(i);
  } else
    pages.push(ELLIPSIS, currentPage - PAGE_OFFSET, currentPage, currentPage + PAGE_OFFSET, ELLIPSIS, totalPages);

  return pages;
}
