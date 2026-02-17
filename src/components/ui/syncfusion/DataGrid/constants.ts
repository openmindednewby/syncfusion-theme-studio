/**
 * DataGrid constants - default values, page sizes, popup positioning,
 * and configuration.
 */
import type { PageSettingsModel } from '@syncfusion/ej2-react-grids';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_COUNT = 5;
const PAGE_SIZE_SMALL = 20;
const PAGE_SIZE_MEDIUM = 50;
const PAGE_SIZE_LARGE = 100;

export const AVAILABLE_PAGE_SIZES = [
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_SMALL,
  PAGE_SIZE_MEDIUM,
  PAGE_SIZE_LARGE,
];

export const DEFAULT_PAGE_SETTINGS: PageSettingsModel = {
  pageSize: DEFAULT_PAGE_SIZE,
  pageCount: DEFAULT_PAGE_COUNT,
  pageSizes: AVAILABLE_PAGE_SIZES,
};

/** Approximate width of a single pager button in pixels. */
export const PAGER_BUTTON_APPROX_WIDTH = 40;

/** Approximate width of the pager side content (info bar + nav icons). */
export const PAGER_SIDE_CONTENT_APPROX_WIDTH = 260;

/** Minimum number of page buttons to show when responsive. */
export const MIN_RESPONSIVE_PAGE_COUNT = 3;

/** Separator used when parsing page size options from a string. */
export const PAGE_SIZE_OPTIONS_SEPARATOR = ',';

/** Delay in milliseconds before repositioning popups (0 = next microtask). */
export const POPUP_REPOSITION_DELAY_MS = 0;

/** Vertical gap in pixels between popup and its anchor element. */
export const POPUP_VERTICAL_GAP_PX = 4;

/** z-index for filter popup dialogs. */
export const FILTER_POPUP_Z_INDEX = '100001';

/** Minimum width for column menu sub-popups. */
export const MENU_SUBPOPUP_MIN_WIDTH_PX = 220;

/** z-index for column menu sub-popups. */
export const SUBMENU_POPUP_Z_INDEX = '100002';

/** z-index for filter operator dropdown popups. */
export const OPERATOR_POPUP_Z_INDEX = '100003';

/** Minimum height assumed for popup height calculations when actual size is unknown. */
export const POPUP_MIN_HEIGHT_PX = 120;

/** z-index for pager dropdown and column menu popups. */
export const COLUMN_MENU_Z_INDEX = '10000';

/** Delay before cleaning up zombie popups in milliseconds. */
export const ZOMBIE_CLEANUP_DELAY_MS = 100;

/** Longer delay for mutation-observer-triggered cleanup to avoid racing with initialization. */
export const ZOMBIE_CLEANUP_LONG_DELAY_MS = 500;

/** Maximum animation frames to attempt repositioning a filter popup. */
export const FILTER_REPOSITION_MAX_ATTEMPTS = 120;

/** Minimum consecutive frames the filter popup must be stable before stopping. */
export const FILTER_REPOSITION_MIN_FRAMES = 20;

/** Maximum animation frames to attempt repositioning a submenu popup. */
export const SUBMENU_REPOSITION_MAX_ATTEMPTS = 24;

/** Minimum consecutive frames a submenu popup must be stable. */
export const SUBMENU_REPOSITION_MIN_FRAMES = 4;

export { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_COUNT };
