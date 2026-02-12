/**
 * Page number generation with ellipsis for pagination controls.
 */

const ELLIPSIS = -1;
const VISIBLE_PAGES = 5;
const EDGE_THRESHOLD = 3;
const EDGE_OFFSET = 2;
const PAGE_OFFSET = 1;

export type PageItem = number;
export { ELLIPSIS };

/**
 * Generate an array of page numbers with ellipsis markers.
 *
 * @param currentPage - 1-based current page
 * @param totalPages - Total number of pages
 * @returns Array of page numbers (1-based) or ELLIPSIS (-1)
 */
export function generatePageNumbers(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= VISIBLE_PAGES) 
    return Array.from({ length: totalPages }, (_, i) => i + PAGE_OFFSET);
  

  const pages: PageItem[] = [PAGE_OFFSET];

  if (currentPage <= EDGE_THRESHOLD) {
    for (let i = EDGE_OFFSET; i <= EDGE_THRESHOLD + PAGE_OFFSET; i++) pages.push(i);
    pages.push(ELLIPSIS, totalPages);
  } else if (currentPage >= totalPages - EDGE_OFFSET) {
    pages.push(ELLIPSIS);
    for (let i = totalPages - EDGE_THRESHOLD; i <= totalPages; i++) pages.push(i);
  } else 
    pages.push(ELLIPSIS, currentPage - PAGE_OFFSET, currentPage, currentPage + PAGE_OFFSET, ELLIPSIS, totalPages);
  

  return pages;
}
