/**
 * DataGrid constants - default values, page sizes, and configuration.
 */
import type { PageSettingsModel } from '@syncfusion/ej2-react-grids';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_COUNT = 5;
const PAGE_SIZE_SMALL = 25;
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

export { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_COUNT };
