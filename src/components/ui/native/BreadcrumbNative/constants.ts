/** Layout constants from Figma design specs. */

export const BREADCRUMB_GAP_PX = 8;
export const BREADCRUMB_FONT_SIZE_PX = 12;
export const BREADCRUMB_LINE_HEIGHT_PX = 14;
export const BREADCRUMB_FONT_FAMILY = "'Fira Sans', sans-serif";
export const HOME_ICON_CONTAINER_SIZE_PX = 24;
export const HOME_ICON_PADDING_PX = 2;
export const HOME_ICON_BORDER_RADIUS_PX = 2;
export const SEPARATOR_PADDING = '4px 8px';
export const INNER_ITEM_PADDING = '0 8px';
export const ITEM_HEIGHT_PX = 24;

/** CSS variable references for themed breadcrumb colors. */
export const VAR_TEXT = 'var(--component-breadcrumb-text)';
export const VAR_ACTIVE = 'var(--component-breadcrumb-active-text)';
export const VAR_HOVER = 'var(--component-breadcrumb-hover-text)';
export const VAR_SEPARATOR = 'var(--component-breadcrumb-separator)';
export const VAR_ICON = 'var(--component-breadcrumb-icon)';
export const VAR_TRANSITION = 'var(--component-breadcrumb-transition)';

export const ELLIPSIS_CHAR = '\u2026';

/**
 * Compute visible items when collapsing middle breadcrumb segments.
 * Returns first item + ellipsis placeholder + last (maxItems-1) items.
 */
export function computeVisibleItems<T>(
  items: T[],
  maxItems: number,
): { visibleItems: T[]; isCollapsed: boolean; collapsedCount: number } {
  const shouldCollapse = maxItems > 0 && items.length > maxItems;
  if (!shouldCollapse) return { visibleItems: items, isCollapsed: false, collapsedCount: 0 };

  const tailCount = maxItems - 1;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- items.length > maxItems >= 1, so items[0] exists
  const first = items[0]!;
  const tail = items.slice(items.length - tailCount);
  const collapsedCount = items.length - 1 - tailCount;

  return { visibleItems: [first, ...tail], isCollapsed: true, collapsedCount };
}
