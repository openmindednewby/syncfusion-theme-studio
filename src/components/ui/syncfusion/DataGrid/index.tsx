/* eslint-disable max-lines, smart-max-lines/smart-max-lines, max-params, no-restricted-syntax, @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/strict-boolean-expressions, no-magic-numbers, curly, @typescript-eslint/array-type, @typescript-eslint/no-unnecessary-condition */
/**
 * DataGrid - Theme-aware Syncfusion GridComponent wrapper.
 *
 * Provides a fully configurable data grid exposing ALL Syncfusion EJ2 Grid
 * features: pagination, sorting, filtering, grouping, aggregates, editing,
 * column resize/reorder/freeze, toolbar, context menu, detail rows,
 * row drag-and-drop, virtualization, clipboard, search, print, and export.
 *
 * All new props are optional; the existing API is fully backwards compatible.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/grid/getting-started | Syncfusion Grid docs}
 */
// Module-level CSS imports ensure styles are loaded synchronously with the JS
// chunk (before first render), preventing unstyled pager/grid flash. Since
// DataGrid is always lazy-loaded, this does not affect login page performance.
// Grid CSS: columns, rows, headers, sorting, filtering, grouping, editing, etc.
import '@syncfusion/ej2-react-grids/styles/tailwind.css';
// Pager CSS: pagination layout, page-number buttons, nav-icon glyph definitions
// (e-icon-first/prev/next/last), page-size dropdown, and info bar.
// The grid CSS does NOT include pager styles — they ship in ej2-navigations.
import '@syncfusion/ej2-navigations/styles/pager/tailwind.css';
// DO NOT import the context menu CSS here or it will break our custom menu styles. The context menu styles should only be imported in the Storybook stories where the context menu is used, to avoid unintended side effects on other parts of the app. See SyncfusionThemeStudio/src/stories/DataGrid.stories.tsx for an example of how to import the context menu CSS in a way that scopes it to the relevant stories.
// import '@syncfusion/ej2-react-navigations/styles/context-menu/tailwind.css';

import { memo, useEffect, useMemo, useRef, useState } from 'react';

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  AggregateColumnsDirective,
  AggregateColumnDirective,
  AggregatesDirective,
  AggregateDirective,
} from '@syncfusion/ej2-react-grids';

import { useSyncfusionDefaultSort } from '@/lib/grid/hooks/useSyncfusionDefaultSort';
import { useSyncfusionFilters } from '@/lib/grid/hooks/useSyncfusionFilters';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { AVAILABLE_PAGE_SIZES, DEFAULT_PAGE_SETTINGS } from './constants';
import { useGridCallbacks } from './useGridCallbacks';
import { computePageSettings, useGridFeatures } from './useGridFeatures';

import type { DataGridProps } from './types';

const PAGER_BUTTON_APPROX_WIDTH = 40;
const PAGER_SIDE_CONTENT_APPROX_WIDTH = 260;
const MIN_RESPONSIVE_PAGE_COUNT = 3;
const PAGE_SIZE_OPTIONS_SEPARATOR = ',';
const POPUP_REPOSITION_DELAY_MS = 0;
const POPUP_VERTICAL_GAP_PX = 4;
const FILTER_POPUP_Z_INDEX = '10001';
const MENU_SUBPOPUP_MIN_WIDTH_PX = 220;
const SUBMENU_POPUP_Z_INDEX = '10002';
type PopupAnchor = HTMLElement | DOMRect;

function setStyleIfChanged(element: HTMLElement, property: string, value: string): void {
  if (element.style.getPropertyValue(property) === value) return;
  element.style.setProperty(property, value, 'important');
}

function applyFixedPopupStyle(
  element: HTMLElement,
  left: number,
  top: number,
  minWidth: number | undefined,
  zIndex: string,
): void {
  setStyleIfChanged(element, 'position', 'fixed');
  setStyleIfChanged(element, 'left', `${Math.round(left)}px`);
  setStyleIfChanged(element, 'top', `${Math.round(top)}px`);
  if (isValueDefined(minWidth)) {
    setStyleIfChanged(element, 'min-width', `${Math.round(minWidth)}px`);
  }
  setStyleIfChanged(element, 'z-index', zIndex);
}

function isPopupVisible(element: HTMLElement): boolean {
  const style = getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
  return element.classList.contains('e-popup-open') || style.visibility === 'visible' || element.offsetHeight > 0;
}

function getVisibleElement(selectors: string): HTMLElement | undefined {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>(selectors));
  return candidates.find((element) => isPopupVisible(element));
}

function normalizePositiveInt(value: unknown, fallback: number): number {
  const n = typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parsePageSizeOptions(input: unknown): number[] {
  if (Array.isArray(input)) {
    const parsedArray = input
      .map((value) => Number.parseInt(String(value), 10))
      .filter((n) => Number.isFinite(n) && n > 0);
    return parsedArray.length > 0 ? Array.from(new Set(parsedArray)) : AVAILABLE_PAGE_SIZES;
  }

  if (typeof input !== 'string') return AVAILABLE_PAGE_SIZES;

  const parsed = input
    .split(PAGE_SIZE_OPTIONS_SEPARATOR)
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  return parsed.length > 0 ? Array.from(new Set(parsed)) : AVAILABLE_PAGE_SIZES;
}

function parsePageSizesFromSettings(input: boolean | (number | string)[] | undefined): number[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const parsed = input
    .map((value) => Number.parseInt(String(value), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  return parsed.length > 0 ? Array.from(new Set(parsed)) : undefined;
}

function normalizeResponsivePageCount(count: number): number {
  const bounded = Math.max(MIN_RESPONSIVE_PAGE_COUNT, count);
  return bounded % 2 === 0 ? bounded - 1 : bounded;
}

function repositionPagerDropdownPopup(root: HTMLDivElement): void {
  const input = root.querySelector<HTMLInputElement>('.e-pager .e-pagerdropdown input.e-input[aria-controls]');
  const wrapper = root.querySelector<HTMLElement>('.e-pager .e-pagerdropdown .e-ddl.e-control-wrapper');
  const popupId = input?.getAttribute('aria-controls');
  if (!isValueDefined(input) || !isValueDefined(wrapper) || !isValueDefined(popupId) || popupId === '') return;
  const popup = document.getElementById(popupId);
  if (!isValueDefined(popup) || !popup.classList.contains('e-popup-open')) return;

  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  const rect = wrapper.getBoundingClientRect();
  applyFixedPopupStyle(popup, rect.left, rect.bottom + POPUP_VERTICAL_GAP_PX, rect.width, '10000');
}

function isColumnMenuPopup(element: HTMLElement): boolean {
  return isValueDefined(element.querySelector('ul[id$="_columnmenu"], ul[id$="_cmenu"]'));
}

function getVisibleColumnMenuPopup(): HTMLElement | undefined {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('.e-grid-menu.e-contextmenu-wrapper, .e-grid-menu.e-popup, .e-grid-menu'),
  );
  return candidates.find((element) => isPopupVisible(element) && isColumnMenuPopup(element));
}

function getVisibleGridContextMenuList(): HTMLElement | undefined {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>('.e-grid-menu.e-contextmenu-wrapper ul[id$="_cmenu"]'));
  return candidates.find((element) => isPopupVisible(element) && getComputedStyle(element).display !== 'none');
}

function getColumnMenuPopupFromMenuItem(menuItem: HTMLElement): HTMLElement | undefined {
  const popup = menuItem.closest<HTMLElement>('.e-grid-menu');
  if (!isValueDefined(popup) || !isColumnMenuPopup(popup)) return undefined;
  return popup;
}

function getColumnMenuSidePreferenceFromDom(): boolean | undefined {
  const popup = getVisibleColumnMenuPopup();
  if (!isValueDefined(popup)) return undefined;
  if (popup.classList.contains('sf-submenu-left')) return true;
  if (popup.classList.contains('sf-submenu-right')) return false;
  const rect = popup.getBoundingClientRect();
  const spaceLeft = rect.left;
  const spaceRight = window.innerWidth - rect.right;
  return spaceLeft > spaceRight;
}

function getMenuSidePreferenceFromPopup(menuPopup: HTMLElement): boolean {
  if (menuPopup.classList.contains('sf-submenu-left')) return true;
  if (menuPopup.classList.contains('sf-submenu-right')) return false;
  const rect = menuPopup.getBoundingClientRect();
  const spaceLeft = rect.left;
  const spaceRight = window.innerWidth - rect.right;
  return spaceLeft > spaceRight;
}

function getFilterAnchorFromMenuItem(menuItem: HTMLElement): HTMLElement | undefined {
  if (menuItem.classList.contains('e-menu-caret-icon')) return undefined;
  const hasFilterIcon = isValueDefined(menuItem.querySelector('.e-icon-filter, .e-filter-icon, .e-filter'));
  if (hasFilterIcon) return menuItem;
  const label = menuItem.textContent?.trim().toLowerCase() ?? '';
  return label === 'filter' ? menuItem : undefined;
}

function getSubmenuAnchorFromMenuItem(menuItem: HTMLElement): HTMLElement | undefined {
  if (menuItem.classList.contains('e-menu-caret-icon')) return menuItem;
  const hasCaret = isValueDefined(menuItem.querySelector('.e-caret'));
  return hasCaret ? menuItem : undefined;
}

function getActiveSubmenuAnchor(): HTMLElement | undefined {
  const activeItems = Array.from(document.querySelectorAll<HTMLElement>('.e-grid-menu .e-menu-item.e-focused, .e-grid-menu .e-menu-item.e-selected'));
  return activeItems.find((item) => {
    if (!isValueDefined(getSubmenuAnchorFromMenuItem(item))) return false;
    return isValueDefined(getColumnMenuPopupFromMenuItem(item));
  });
}

function resolveHorizontalPosition(anchorRect: DOMRect, popupWidth: number): { left: number; openToLeft: boolean } {
  const spaceRight = window.innerWidth - anchorRect.right;
  const spaceLeft = anchorRect.left;
  const requiredSpace = popupWidth + POPUP_VERTICAL_GAP_PX;

  // Prefer a side that fully fits the popup first.
  let openToLeft: boolean;
  if (spaceRight >= requiredSpace) {
    openToLeft = false;
  } else if (spaceLeft >= requiredSpace) {
    openToLeft = true;
  } else {
    // If neither side fully fits, pick the larger side and clamp.
    openToLeft = spaceLeft > spaceRight;
  }

  const unclamped = openToLeft
    ? anchorRect.left - requiredSpace
    : anchorRect.right + POPUP_VERTICAL_GAP_PX;
  const maxLeft = Math.max(POPUP_VERTICAL_GAP_PX, window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX);
  return {
    left: Math.min(Math.max(POPUP_VERTICAL_GAP_PX, unclamped), maxLeft),
    openToLeft,
  };
}

function resolveVerticalPosition(anchorRect: DOMRect, popupHeight: number): number {
  const maxTop = Math.max(POPUP_VERTICAL_GAP_PX, window.innerHeight - popupHeight - POPUP_VERTICAL_GAP_PX);
  return Math.min(Math.max(POPUP_VERTICAL_GAP_PX, anchorRect.top), maxTop);
}

function resolveAnchorRect(anchor: PopupAnchor): DOMRect | undefined {
  if (anchor instanceof DOMRect) return anchor;
  if (!anchor.isConnected) return undefined;
  return anchor.getBoundingClientRect();
}

function getVisibleFilterPopup(): HTMLElement | undefined {
  return getVisibleElement(
    '.e-dialog.e-filter-popup.e-popup-open[role="dialog"], .e-flmenu.e-dialog.e-filter-popup[role="dialog"], .e-col-menu.e-dialog.e-filter-popup[role="dialog"]',
  );
}

function repositionFilterOperatorDropdownPopup(): boolean {
  const popup = getVisibleElement('.e-ddl.e-popup.e-popup-flmenu.e-popup-open[id$="-floptr_popup"]');
  if (!isValueDefined(popup) || popup.id === '') return false;
  const operatorInputId = popup.id.replace(/_popup$/, '');
  const operatorInput = document.getElementById(operatorInputId) as HTMLElement | null;
  if (!isValueDefined(operatorInput)) return false;
  const wrapper = operatorInput.closest<HTMLElement>('.e-ddl.e-control-wrapper');
  if (!isValueDefined(wrapper)) return false;

  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  const rect = wrapper.getBoundingClientRect();
  const absoluteLeft = rect.left + window.scrollX;
  const absoluteTop = rect.bottom + POPUP_VERTICAL_GAP_PX + window.scrollY;
  setStyleIfChanged(popup, 'position', 'absolute');
  setStyleIfChanged(popup, 'left', `${Math.round(absoluteLeft)}px`);
  setStyleIfChanged(popup, 'top', `${Math.round(absoluteTop)}px`);
  setStyleIfChanged(popup, 'min-width', `${Math.round(rect.width)}px`);
  setStyleIfChanged(popup, 'margin-top', '0');
  setStyleIfChanged(popup, 'z-index', '10003');
  return true;
}

function repositionFilterPopup(anchor: PopupAnchor, preferredOpenToLeft?: boolean): boolean {
  const anchorRect = resolveAnchorRect(anchor);
  if (!isValueDefined(anchorRect)) return false;
  const filterPopup = getVisibleFilterPopup();
  if (!isValueDefined(filterPopup)) return false;

  if (filterPopup.parentElement !== document.body) {
    document.body.appendChild(filterPopup);
  }

  const popupRect = filterPopup.getBoundingClientRect();
  
  // Use offsetWidth/Height if getBoundingClientRect returns zero (e.g. before first paint)
  const popupWidth = Math.max(MENU_SUBPOPUP_MIN_WIDTH_PX, popupRect.width || filterPopup.offsetWidth || 0);
  const popupHeight = Math.max(120, popupRect.height || filterPopup.offsetHeight || 0);
  
  const defaultHorizontal = resolveHorizontalPosition(anchorRect, popupWidth);
  let left = defaultHorizontal.left;
  const effectivePreferredOpenToLeft = preferredOpenToLeft
    ?? getColumnMenuSidePreferenceFromDom();
  if (isValueDefined(effectivePreferredOpenToLeft)) {
    const requiredSpace = popupWidth + POPUP_VERTICAL_GAP_PX;
    const unclamped = effectivePreferredOpenToLeft
      ? anchorRect.left - requiredSpace
      : anchorRect.right + POPUP_VERTICAL_GAP_PX;
    const maxLeft = Math.max(POPUP_VERTICAL_GAP_PX, window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX);
    left = Math.min(Math.max(POPUP_VERTICAL_GAP_PX, unclamped), maxLeft);
  }
  const top = resolveVerticalPosition(anchorRect, popupHeight);

  const absoluteLeft = left + window.scrollX;
  const absoluteTop = top + window.scrollY;
  setStyleIfChanged(filterPopup, 'position', 'absolute');
  setStyleIfChanged(filterPopup, 'left', `${Math.round(absoluteLeft)}px`);
  setStyleIfChanged(filterPopup, 'top', `${Math.round(absoluteTop)}px`);
  setStyleIfChanged(filterPopup, 'min-width', `${Math.round(popupWidth)}px`);
  setStyleIfChanged(filterPopup, 'z-index', FILTER_POPUP_Z_INDEX);
  
  // Return true only if we have a real size measurement, indicating it's "ready"
  return (popupRect.width > 0 && popupRect.height > 0) || (filterPopup.offsetWidth > 0 && filterPopup.offsetHeight > 0);
}

function repositionColumnSubmenuPopup(anchorItem: HTMLElement): boolean {
  if (!anchorItem.isConnected) return false;
  const mainList = anchorItem.closest('ul.e-menu-parent') as HTMLElement | null;
  if (!isValueDefined(mainList)) return false;
  const popupRoot = mainList.closest('.e-grid-menu') as HTMLElement | null;
  if (!isValueDefined(popupRoot)) return false;

  const visibleSubmenus = Array.from(popupRoot.querySelectorAll<HTMLElement>('ul.e-menu-parent'))
    .filter((ul) => ul !== mainList && isPopupVisible(ul));
  const submenu = visibleSubmenus.length > 0 ? visibleSubmenus[visibleSubmenus.length - 1] : undefined;
  if (!isValueDefined(submenu)) return false;

  const anchorRect = anchorItem.getBoundingClientRect();
  const submenuRect = submenu.getBoundingClientRect();
  const popupWidth = Math.max(MENU_SUBPOPUP_MIN_WIDTH_PX, submenuRect.width || submenu.offsetWidth || 0);
  const popupHeight = Math.max(120, submenuRect.height || submenu.offsetHeight || 0);
  const { left, openToLeft } = resolveHorizontalPosition(anchorRect, popupWidth);
  const top = resolveVerticalPosition(anchorRect, popupHeight);

  applyFixedPopupStyle(submenu, left, top, popupWidth, SUBMENU_POPUP_Z_INDEX);

  const rootPopup = popupRoot.closest('.e-grid-menu.e-contextmenu-wrapper');
  if (isValueDefined(rootPopup)) {
    rootPopup.classList.toggle('sf-submenu-left', openToLeft);
    rootPopup.classList.toggle('sf-submenu-right', !openToLeft);
  }
  return true;
}

function repositionColumnMenuPopup(trigger: HTMLElement): boolean | undefined {
  const popup = getVisibleColumnMenuPopup();
  if (!isValueDefined(popup)) return undefined;

  if (popup.parentElement !== document.body) {
    document.body.appendChild(popup);
  }

  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const popupWidth = popupRect.width || popup.offsetWidth || 0;
  const maxLeft = Math.max(0, window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX);
  const targetLeft = Math.min(Math.max(POPUP_VERTICAL_GAP_PX, triggerRect.right - popupWidth), maxLeft);

  applyFixedPopupStyle(popup, targetLeft, triggerRect.bottom + POPUP_VERTICAL_GAP_PX, undefined, '10000');

  // Tell nested submenus to open where there's more viewport space.
  const spaceRight = window.innerWidth - (targetLeft + popupWidth);
  const spaceLeft = targetLeft;
  const openSubmenuLeft = spaceLeft > spaceRight;
  popup.classList.toggle('sf-submenu-left', openSubmenuLeft);
  popup.classList.toggle('sf-submenu-right', !openSubmenuLeft);
  return openSubmenuLeft;
}

function repositionGridContextMenuPopup(): boolean {
  const list = getVisibleGridContextMenuList();
  if (!isValueDefined(list)) return false;
  const wrapper = list.closest<HTMLElement>('.e-grid-menu.e-contextmenu-wrapper');
  if (!isValueDefined(wrapper)) return false;

  const rect = list.getBoundingClientRect();
  const popupWidth = rect.width || list.offsetWidth || 0;
  if (popupWidth <= 0) return false;

  const maxLeft = Math.max(POPUP_VERTICAL_GAP_PX, window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX);
  const left = Math.min(Math.max(POPUP_VERTICAL_GAP_PX, rect.left), maxLeft);
  const top = Math.max(POPUP_VERTICAL_GAP_PX, rect.top);

  if (wrapper.parentElement !== document.body) {
    document.body.appendChild(wrapper);
  }

  applyFixedPopupStyle(wrapper, left, top, popupWidth, '10000');
  setStyleIfChanged(list, 'position', 'static');
  setStyleIfChanged(list, 'display', 'block');
  setStyleIfChanged(list, 'z-index', '10000');
  return true;
}

const DataGridComponent = <T extends object>(props: DataGridProps<T>): JSX.Element => {
  const {
    data,
    columns,
    gridConfig,
    pageSettings = DEFAULT_PAGE_SETTINGS,
    className,
    testId,
    height = 'auto',
    isLoading = false,
    emptyText = 'No data available',
    groupSettings,
    aggregates,
    selectionSettings,
    editSettings,
    frozenColumns,
    frozenRows,
    toolbar,
    contextMenuItems,
    detailTemplate,
    childGrid,
    rowDropSettings,
    searchSettings,
    rowHeight,
    gridRef: externalGridRef,
  } = props;

  const { mode, theme } = useThemeStore();
  const internalGridRef = useRef<GridComponent | undefined>(undefined);
  const gridRef = externalGridRef ?? internalGridRef;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const columnMenuTriggerRef = useRef<HTMLElement | null>(null);
  const columnMenuFilterAnchorRef = useRef<DOMRect | null>(null);
  const columnMenuSubmenuAnchorRef = useRef<HTMLElement | null>(null);
  const columnMenuOpenToLeftRef = useRef<boolean | undefined>(undefined);
  const [responsivePageCount, setResponsivePageCount] = useState<number | undefined>(undefined);

  const { features, services } = useGridFeatures(props);
  const callbacks = useGridCallbacks(props);

  useEffect(() => {
    if (!features.paging || !isValueDefined(wrapperRef.current) || !isValueDefined(globalThis.ResizeObserver)) return;
    const element = wrapperRef.current;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      const rawCount = Math.floor((width - PAGER_SIDE_CONTENT_APPROX_WIDTH) / PAGER_BUTTON_APPROX_WIDTH);
      setResponsivePageCount(normalizeResponsivePageCount(rawCount));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [features.paging]);

  useEffect(() => {
    if (!features.columnMenu || !isValueDefined(wrapperRef.current)) return;
    const root = wrapperRef.current;
    let hoverRafId: number | null = null;
    let filterRafId: number | null = null;
    let filterDropdownRafId: number | null = null;
    let contextMenuRafId: number | null = null;
    let submenuRafId: number | null = null;
    let filterDropdownObserver: MutationObserver | null = null;
    let queuedHoverAnchor: HTMLElement | null = null;

    const scheduleFilterPopupReposition = (anchor: DOMRect): void => {
      const MAX_ATTEMPTS = 120;
      const MIN_REPOSITION_FRAMES = 20;
      let attempt = 0;
      let successCount = 0;
      
      const tick = (): void => {
        attempt += 1;
        const positioned = repositionFilterPopup(anchor, columnMenuOpenToLeftRef.current);
        if (positioned) successCount += 1;

        // Stop if we hit max attempts OR if we've successfully positioned for long enough
        if (attempt >= MAX_ATTEMPTS || (positioned && successCount >= MIN_REPOSITION_FRAMES)) {
          filterRafId = null;
          return;
        }
        filterRafId = requestAnimationFrame(tick);
      };
      if (isValueDefined(filterRafId)) cancelAnimationFrame(filterRafId);
      filterRafId = requestAnimationFrame(tick);
    };

    const scheduleSubmenuPopupReposition = (anchor: HTMLElement): void => {
      const MAX_ATTEMPTS = 24;
      const MIN_STABLE_FRAMES = 4;
      let attempt = 0;
      let successCount = 0;

      const tick = (): void => {
        attempt += 1;
        const positioned = repositionColumnSubmenuPopup(anchor);
        if (positioned) successCount += 1;
        if (attempt >= MAX_ATTEMPTS || (positioned && successCount >= MIN_STABLE_FRAMES)) {
          submenuRafId = null;
          return;
        }
        submenuRafId = requestAnimationFrame(tick);
      };

      if (isValueDefined(submenuRafId)) cancelAnimationFrame(submenuRafId);
      submenuRafId = requestAnimationFrame(tick);
    };

    const scheduleFilterOperatorDropdownReposition = (): void => {
      const MAX_ATTEMPTS = 24;
      const MIN_STABLE_FRAMES = 4;
      let attempt = 0;
      let successCount = 0;

      const tick = (): void => {
        attempt += 1;
        const positioned = repositionFilterOperatorDropdownPopup();
        if (positioned) successCount += 1;
        if (attempt >= MAX_ATTEMPTS || (positioned && successCount >= MIN_STABLE_FRAMES)) {
          filterDropdownRafId = null;
          return;
        }
        filterDropdownRafId = requestAnimationFrame(tick);
      };

      if (isValueDefined(filterDropdownRafId)) cancelAnimationFrame(filterDropdownRafId);
      filterDropdownRafId = requestAnimationFrame(tick);
    };

    const scheduleGridContextMenuReposition = (): void => {
      const MAX_ATTEMPTS = 24;
      const MIN_STABLE_FRAMES = 4;
      let attempt = 0;
      let successCount = 0;

      const tick = (): void => {
        attempt += 1;
        const positioned = repositionGridContextMenuPopup();
        if (positioned) successCount += 1;
        if (attempt >= MAX_ATTEMPTS || (positioned && successCount >= MIN_STABLE_FRAMES)) {
          contextMenuRafId = null;
          return;
        }
        contextMenuRafId = requestAnimationFrame(tick);
      };

      if (isValueDefined(contextMenuRafId)) cancelAnimationFrame(contextMenuRafId);
      contextMenuRafId = requestAnimationFrame(tick);
    };

    const onGridPointerDown = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      const trigger = target.closest('.e-columnmenu') as HTMLElement | null;
      if (isValueDefined(trigger)) {
        columnMenuTriggerRef.current = trigger;
        setTimeout(() => {
          const openToLeft = repositionColumnMenuPopup(trigger);
          if (isValueDefined(openToLeft)) columnMenuOpenToLeftRef.current = openToLeft;
        }, POPUP_REPOSITION_DELAY_MS);
        requestAnimationFrame(() => {
          const openToLeft = repositionColumnMenuPopup(trigger);
          if (isValueDefined(openToLeft)) columnMenuOpenToLeftRef.current = openToLeft;
        });
      }
    };

    const onDocumentPointerDown = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      if (isValueDefined(target.closest('.e-grid .e-rowcell, .e-grid .e-headercell'))) {
        setTimeout(() => scheduleGridContextMenuReposition(), POPUP_REPOSITION_DELAY_MS);
      }
      if (isValueDefined(target.closest('.e-dialog.e-flmenu .e-flm_optrdiv .e-ddl.e-control-wrapper'))) {
        setTimeout(() => scheduleFilterOperatorDropdownReposition(), POPUP_REPOSITION_DELAY_MS);
        scheduleFilterOperatorDropdownReposition();
      }
      const menuItem = target.closest('.e-grid-menu .e-menu-item') as HTMLElement | null;
      if (!isValueDefined(menuItem)) return;
      const menuPopup = getColumnMenuPopupFromMenuItem(menuItem);
      if (!isValueDefined(menuPopup)) return;
      columnMenuOpenToLeftRef.current = getMenuSidePreferenceFromPopup(menuPopup);

      const filterAnchor = getFilterAnchorFromMenuItem(menuItem);
      if (isValueDefined(filterAnchor)) {
        const filterAnchorRect = filterAnchor.getBoundingClientRect();
        columnMenuFilterAnchorRef.current = filterAnchorRect;
        setTimeout(() => scheduleFilterPopupReposition(filterAnchorRect), POPUP_REPOSITION_DELAY_MS);
        scheduleFilterPopupReposition(filterAnchorRect);
      }

      const submenuAnchor = getSubmenuAnchorFromMenuItem(menuItem);
      if (isValueDefined(submenuAnchor)) {
        columnMenuSubmenuAnchorRef.current = submenuAnchor;
        setTimeout(() => scheduleSubmenuPopupReposition(submenuAnchor), POPUP_REPOSITION_DELAY_MS);
        scheduleSubmenuPopupReposition(submenuAnchor);
      }
    };

    const onDocumentPointerOver = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      const menuItem = target.closest('.e-grid-menu .e-menu-item') as HTMLElement | null;
      if (!isValueDefined(menuItem)) return;
      const menuPopup = getColumnMenuPopupFromMenuItem(menuItem);
      if (!isValueDefined(menuPopup)) return;
      columnMenuOpenToLeftRef.current = getMenuSidePreferenceFromPopup(menuPopup);

      const filterAnchor = getFilterAnchorFromMenuItem(menuItem);
      if (isValueDefined(filterAnchor)) {
        const filterAnchorRect = filterAnchor.getBoundingClientRect();
        columnMenuFilterAnchorRef.current = filterAnchorRect;
        scheduleFilterPopupReposition(filterAnchorRect);
      }

      const submenuAnchor = getSubmenuAnchorFromMenuItem(menuItem);
      if (!isValueDefined(submenuAnchor)) return;
      columnMenuSubmenuAnchorRef.current = submenuAnchor;
      queuedHoverAnchor = submenuAnchor;
      if (isValueDefined(hoverRafId)) return;
      hoverRafId = requestAnimationFrame(() => {
        hoverRafId = null;
        if (!isValueDefined(queuedHoverAnchor)) return;
        scheduleSubmenuPopupReposition(queuedHoverAnchor);
      });
    };

    const onWindowMove = (): void => {
      const trigger = columnMenuTriggerRef.current;
      if (isValueDefined(trigger)) {
        const openToLeft = repositionColumnMenuPopup(trigger);
        if (isValueDefined(openToLeft)) columnMenuOpenToLeftRef.current = openToLeft;
      }
      const submenuAnchor = columnMenuSubmenuAnchorRef.current ?? getActiveSubmenuAnchor();
      if (isValueDefined(submenuAnchor)) {
        columnMenuSubmenuAnchorRef.current = submenuAnchor;
        scheduleSubmenuPopupReposition(submenuAnchor);
      }
      const filterAnchor = columnMenuFilterAnchorRef.current;
      if (isValueDefined(filterAnchor)) {
        repositionFilterPopup(filterAnchor, columnMenuOpenToLeftRef.current);
      }
      scheduleFilterOperatorDropdownReposition();
      scheduleGridContextMenuReposition();
    };

    const onDocumentFocusIn = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      if (!isValueDefined(target.closest('.e-dialog.e-flmenu .e-flm_optrdiv .e-ddl.e-control-wrapper'))) return;
      scheduleFilterOperatorDropdownReposition();
    };

    const onDocumentContextMenu = (): void => {
      setTimeout(() => scheduleGridContextMenuReposition(), POPUP_REPOSITION_DELAY_MS);
      scheduleGridContextMenuReposition();
    };

    filterDropdownObserver = new MutationObserver((mutations) => {
      let shouldReposition = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes).filter((node): node is HTMLElement => node instanceof HTMLElement);
          if (addedNodes.some((node) => isValueDefined(node.matches) && node.matches('.e-ddl.e-popup.e-popup-flmenu[id$="-floptr_popup"]'))) {
            shouldReposition = true;
            break;
          }
          if (addedNodes.some((node) => isValueDefined(node.querySelector) && isValueDefined(node.querySelector('.e-ddl.e-popup.e-popup-flmenu[id$="-floptr_popup"]')))) {
            shouldReposition = true;
            break;
          }
        }
        if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
          if (mutation.target.matches('.e-ddl.e-popup.e-popup-flmenu[id$="-floptr_popup"]')) {
            shouldReposition = true;
            break;
          }
        }
      }
      if (!shouldReposition) return;
      scheduleFilterOperatorDropdownReposition();
    });
    filterDropdownObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    root.addEventListener('pointerdown', onGridPointerDown, true);
    document.addEventListener('pointerdown', onDocumentPointerDown, true);
    document.addEventListener('pointerover', onDocumentPointerOver, true);
    document.addEventListener('focusin', onDocumentFocusIn, true);
    document.addEventListener('contextmenu', onDocumentContextMenu, true);
    window.addEventListener('resize', onWindowMove);
    window.addEventListener('scroll', onWindowMove, true);
    return () => {
      root.removeEventListener('pointerdown', onGridPointerDown, true);
      document.removeEventListener('pointerdown', onDocumentPointerDown, true);
      document.removeEventListener('pointerover', onDocumentPointerOver, true);
      document.removeEventListener('focusin', onDocumentFocusIn, true);
      document.removeEventListener('contextmenu', onDocumentContextMenu, true);
      window.removeEventListener('resize', onWindowMove);
      window.removeEventListener('scroll', onWindowMove, true);
      filterDropdownObserver?.disconnect();
      if (isValueDefined(hoverRafId)) cancelAnimationFrame(hoverRafId);
      if (isValueDefined(filterRafId)) cancelAnimationFrame(filterRafId);
      if (isValueDefined(filterDropdownRafId)) cancelAnimationFrame(filterDropdownRafId);
      if (isValueDefined(contextMenuRafId)) cancelAnimationFrame(contextMenuRafId);
      if (isValueDefined(submenuRafId)) cancelAnimationFrame(submenuRafId);
    };
  }, [features.columnMenu]);

  useEffect(() => {
    if (!features.paging || !isValueDefined(wrapperRef.current)) return;
    const root = wrapperRef.current;
    const onPointerDown = (event: Event): void => {
      const target = event.target as Element | null;
      if (!isValueDefined(target)) return;
      if (!target.closest('.e-pager .e-pagerdropdown')) return;
      setTimeout(() => repositionPagerDropdownPopup(root), POPUP_REPOSITION_DELAY_MS);
      requestAnimationFrame(() => repositionPagerDropdownPopup(root));
    };

    const onWindowMove = (): void => {
      repositionPagerDropdownPopup(root);
    };

    root.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('resize', onWindowMove);
    window.addEventListener('scroll', onWindowMove, true);
    return () => {
      root.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('resize', onWindowMove);
      window.removeEventListener('scroll', onWindowMove, true);
    };
  }, [features.paging]);

  const themePageSettings = useMemo<{ pageSize: number; pageCount: number; pageSizes: number[] }>(() => {
    const dataGridTheme = theme.components?.[mode]?.dataGrid;
    const fallbackPageSize = DEFAULT_PAGE_SETTINGS.pageSize ?? 10;
    const defaultPageSize = normalizePositiveInt(dataGridTheme?.paginationDefaultPageSize, fallbackPageSize);
    const parsedSizes = parsePageSizeOptions(dataGridTheme?.paginationPageSizeOptions);
    const normalizedSizes = parsedSizes.includes(defaultPageSize)
      ? parsedSizes
      : [defaultPageSize, ...parsedSizes];
    return {
      pageSize: defaultPageSize,
      pageCount: DEFAULT_PAGE_SETTINGS.pageCount ?? 5,
      pageSizes: normalizedSizes,
    };
  }, [theme, mode]);

  const fallbackPageSettings = useMemo(() => {
    const merged = { ...themePageSettings };
    if (isValueDefined(pageSettings.pageSize)) merged.pageSize = pageSettings.pageSize;
    if (isValueDefined(pageSettings.pageCount)) merged.pageCount = pageSettings.pageCount;
    const parsedPageSizes = parsePageSizesFromSettings(pageSettings.pageSizes);
    if (isValueDefined(parsedPageSizes)) merged.pageSizes = parsedPageSizes;
    return merged;
  }, [themePageSettings, pageSettings.pageSize, pageSettings.pageCount, pageSettings.pageSizes]);

  const effectivePageSettings = useMemo(() => {
    const base = computePageSettings(gridConfig, fallbackPageSettings, features.paging, data.length);
    const hasExplicitPageCount = isValueDefined(pageSettings.pageCount) || isValueDefined(gridConfig?.pagination?.pageCount);
    if (!isValueDefined(responsivePageCount) || hasExplicitPageCount || !features.paging) return base;
    const pageSize = base.pageSize ?? fallbackPageSettings.pageSize ?? DEFAULT_PAGE_SETTINGS.pageSize ?? 10;
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const nextPageCount = Math.min(totalPages, responsivePageCount);
    if (base.pageCount === nextPageCount) return base;
    return { ...base, pageCount: nextPageCount };
  }, [gridConfig, pageSettings.pageCount, fallbackPageSettings, features.paging, data.length, responsivePageCount]);

  // Non-blocking filter/sort setup via gridConfig
  useSyncfusionFilters(gridRef, gridConfig?.filter);
  useSyncfusionDefaultSort(gridRef, gridConfig?.defaultSort);

  // Resolve aggregate rows from props or gridConfig
  const effectiveAggregates = aggregates ?? gridConfig?.aggregates;

  // Syncfusion Grid internally calls classList.add(cssClass) which cannot
  // handle space-separated strings. Pass only a single class token here and
  // apply 'sf-datagrid' to the wrapper div instead.
  const gridCssClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';

  const wrapperClass = cn(
    'sf-datagrid-wrapper sf-datagrid relative',
    isLoading && 'sf-datagrid-loading',
    className,
  );

  const renderEmptyRecord = (): JSX.Element => (
    <div className="sf-datagrid-empty py-8 text-center text-text-secondary">{emptyText}</div>
  );

  return (
    <div ref={wrapperRef} className={wrapperClass} data-testid={testId}>
      {isLoading ? (
        <div className="sf-datagrid-loader absolute inset-0 z-10 flex items-center justify-center bg-surface/80">
          <div
            aria-label="Loading"
            className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"
            role="status"
          />
        </div>
      ) : null}
      <GridComponent
        // eslint-disable-next-line react-compiler/react-compiler -- imperative ref assignment for Syncfusion
        ref={(g: GridComponent) => { gridRef.current = g; }}
        actionBegin={callbacks.handleActionBegin}
        actionComplete={callbacks.handleActionComplete}
        allowFiltering={features.filtering}
        allowGrouping={features.grouping}
        allowPaging={features.paging}
        allowReordering={features.reordering}
        allowResizing={features.resizing}
        allowRowDragAndDrop={features.rowDragDrop}
        allowSorting={features.sorting}
        allowTextWrap={props.allowTextWrap}
        childGrid={childGrid}
        contextMenuClick={callbacks.handleContextMenuClick}
        contextMenuItems={contextMenuItems}
        cssClass={gridCssClass}
        dataSource={data}
        detailTemplate={detailTemplate}
        editSettings={editSettings}
        emptyRecordTemplate={renderEmptyRecord}
        enableInfiniteScrolling={features.infiniteScroll}
        enableVirtualization={features.virtualization}
        filterSettings={props.filterSettings}
        frozenColumns={frozenColumns}
        frozenRows={frozenRows}
        groupSettings={groupSettings}
        height={height}
        pageSettings={effectivePageSettings}
        rowDeselected={callbacks.handleRowDeselected}
        rowDrag={callbacks.handleRowDrag}
        rowDrop={callbacks.handleRowDrop}
        rowDropSettings={rowDropSettings}
        rowHeight={rowHeight}
        rowSelected={callbacks.handleRowSelected}
        searchSettings={searchSettings}
        selectionSettings={selectionSettings}
        showColumnChooser={features.columnChooser}
        showColumnMenu={features.columnMenu}
        toolbar={toolbar}
        toolbarClick={callbacks.handleToolbarClick}
      >
        <ColumnsDirective>
          {columns.map((column) => (
            <ColumnDirective key={String(column.field)} {...column} />
          ))}
        </ColumnsDirective>
        {isNotEmptyArray(effectiveAggregates) && (
          <AggregatesDirective>
            {effectiveAggregates.map((row) => (
              <AggregateDirective key={row.columns.map((c) => c.field).join('-')}>
                <AggregateColumnsDirective>
                  {row.columns.map((col) => (
                    <AggregateColumnDirective
                      key={`${col.field}-${col.type}`}
                      columnName={col.field}
                      field={col.field}
                      footerTemplate={col.footerTemplate}
                      format={col.format}
                      groupFooterTemplate={col.groupFooterTemplate}
                      type={col.type}
                    />
                  ))}
                </AggregateColumnsDirective>
              </AggregateDirective>
            ))}
          </AggregatesDirective>
        )}
        <Inject services={services} />
      </GridComponent>
    </div>
  );
};

// Memoize the component - type assertion needed for generic memo
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;

export default DataGrid;
export type { DataGridProps };
