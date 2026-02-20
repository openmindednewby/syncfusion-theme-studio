/** Hook to compute effective page settings for the DataGrid. */
import { useMemo } from 'react';

import type { PageSettingsModel } from '@syncfusion/ej2-react-grids';

import type { GridConfig } from '@/lib/grid/types';
import type { DataGridConfig } from '@/stores/theme/types';
import { isValueDefined } from '@/utils/is';

import { computePageSettings } from './useGridFeatures';
import {
  computeThemePageSettings,
  mergeFallbackPageSettings,
} from '../utils/pageSettingsHelpers';

const FALLBACK_PAGE_SIZE = 10;

interface PageSettingsInput {
  gridConfig: GridConfig | undefined;
  pageSettings: PageSettingsModel;
  pagingEnabled: boolean;
  dataLength: number;
  responsivePageCount: number | undefined;
  dataGridTheme: DataGridConfig;
}

/** Apply responsive page count override to base settings when applicable. */
function applyResponsiveOverride(
  base: PageSettingsModel,
  responsivePageCount: number,
  dataLength: number,
): PageSettingsModel {
  const pageSize = base.pageSize ?? FALLBACK_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(dataLength / pageSize));
  const nextPageCount = Math.min(totalPages, responsivePageCount);
  if (base.pageCount === nextPageCount) return base;
  return { ...base, pageCount: nextPageCount };
}

/** Compute final effective page settings from theme, props, and responsive count. */
export function useGridPageSettings(input: PageSettingsInput): PageSettingsModel {
  const {
    gridConfig, pageSettings, pagingEnabled,
    dataLength, responsivePageCount, dataGridTheme,
  } = input;

  const themePageSettings = useMemo(
    () => computeThemePageSettings(dataGridTheme),
    [dataGridTheme],
  );
  const fallbackPageSettings = useMemo(
    () => mergeFallbackPageSettings(themePageSettings, pageSettings),
    [themePageSettings, pageSettings],
  );

  return useMemo(() => {
    const base = computePageSettings(
      gridConfig, fallbackPageSettings, pagingEnabled, dataLength,
    );
    const hasExplicitPageCount =
      isValueDefined(pageSettings.pageCount) ||
      isValueDefined(gridConfig?.pagination?.pageCount);
    const shouldUseResponsive =
      isValueDefined(responsivePageCount) && !hasExplicitPageCount;
    if (!shouldUseResponsive || !pagingEnabled) return base;
    return applyResponsiveOverride(base, responsivePageCount, dataLength);
  }, [
    gridConfig, pageSettings.pageCount, fallbackPageSettings,
    pagingEnabled, dataLength, responsivePageCount,
  ]);
}
