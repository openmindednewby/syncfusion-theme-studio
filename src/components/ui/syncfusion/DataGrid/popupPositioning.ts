/* eslint-disable max-lines -- Single cohesive module of pure DOM popup positioning functions */
/**
 * Pure DOM utility functions for positioning Syncfusion DataGrid popups.
 *
 * These functions handle repositioning of filter dialogs, column menus,
 * column submenus, pager dropdowns, and context menus so they render
 * with fixed positioning relative to the viewport. They contain zero
 * React dependencies and operate exclusively on HTMLElement / DOMRect.
 */
import { isValueDefined } from '@/utils/is';

import {
  COLUMN_MENU_Z_INDEX,
  FILTER_POPUP_Z_INDEX,
  MENU_SUBPOPUP_MIN_WIDTH_PX,
  OPERATOR_POPUP_Z_INDEX,
  POPUP_MIN_HEIGHT_PX,
  POPUP_VERTICAL_GAP_PX,
  SUBMENU_POPUP_Z_INDEX,
} from './constants';

/** Union type for popup anchoring: either a live element or a captured rect. */
type PopupAnchor = HTMLElement | DOMRect;

/** Options for applying fixed popup positioning. */
interface FixedPopupStyleOptions {
  element: HTMLElement;
  left: number;
  top: number;
  minWidth: number | undefined;
  zIndex: string;
}

// ---------------------------------------------------------------------------
// Low-level style helpers
// ---------------------------------------------------------------------------

function setStyleIfChanged(
  element: HTMLElement,
  property: string,
  value: string,
): void {
  if (element.style.getPropertyValue(property) === value) return;
  element.style.setProperty(property, value, 'important');
}

/** Measure element width using getBoundingClientRect with offsetWidth fallback. */
function measureWidth(rect: DOMRect, element: HTMLElement): number {
  return rect.width !== 0 ? rect.width : element.offsetWidth;
}

/** Measure element height using getBoundingClientRect with offsetHeight fallback. */
function measureHeight(rect: DOMRect, element: HTMLElement): number {
  return rect.height !== 0 ? rect.height : element.offsetHeight;
}

/**
 * Apply fixed-position styling to a popup element so it escapes any
 * ancestor overflow clipping.
 */
function applyFixedPopupStyle(opts: FixedPopupStyleOptions): void {
  setStyleIfChanged(opts.element, 'position', 'fixed');
  setStyleIfChanged(opts.element, 'left', `${Math.round(opts.left)}px`);
  setStyleIfChanged(opts.element, 'top', `${Math.round(opts.top)}px`);
  if (isValueDefined(opts.minWidth))
    setStyleIfChanged(opts.element, 'min-width', `${Math.round(opts.minWidth)}px`);

  setStyleIfChanged(opts.element, 'z-index', opts.zIndex);
}

/** Events to intercept for popup protection. */
const PROTECTED_EVENTS = ['pointerdown', 'mousedown', 'click', 'mouseup', 'pointerup'];

/** Check whether an event target should be allowed to bubble. */
function shouldEventBubble(target: HTMLElement): boolean {
  const isFilterButton = isValueDefined(target.closest('.e-filterbtn, .e-clearbtn'));
  const isTriggerItem = isValueDefined(
    target.closest('.e-menu-item.e-filter-item, .e-menu-item[aria-haspopup="true"]'),
  );
  return isFilterButton || isTriggerItem;
}

/** Install selective stopPropagation on a popup to protect it from parent close listeners. */
function applyPopupProtection(element: HTMLElement): void {
  if (element.hasAttribute('data-sf-stop-prop')) return;

  const stopProp = (e: Event): void => {
    if (!(e.target instanceof HTMLElement)) return;
    if (!shouldEventBubble(e.target)) e.stopPropagation();
  };

  for (const eventName of PROTECTED_EVENTS)
    element.addEventListener(eventName, stopProp, { capture: false, passive: false });

  element.setAttribute('data-sf-stop-prop', 'true');
}

// ---------------------------------------------------------------------------
// Popup visibility helpers
// ---------------------------------------------------------------------------

function isPopupVisible(element: HTMLElement): boolean {
  if (!element.isConnected) return false;
  const isAriaHidden = element.getAttribute('aria-hidden') === 'true';
  const isDisplayNoneInline = element.style.display === 'none';
  if (isAriaHidden || isDisplayNoneInline) return false;

  const hasOpenClass = element.classList.contains('e-popup-open');
  const hasShowClass = element.classList.contains('e-popup-show');
  if (hasOpenClass || hasShowClass) return true;

  const style = getComputedStyle(element);
  const isComputedHidden = style.display === 'none';
  const isEffectivelyHidden =
    isComputedHidden || style.visibility === 'hidden' || Number(style.opacity) === 0;
  if (isEffectivelyHidden) return false;

  return style.visibility === 'visible' || element.offsetHeight > 0;
}

function getVisibleElement(selectors: string): HTMLElement | undefined {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(selectors),
  );
  return candidates.reverse().find((element) => isPopupVisible(element));
}

// ---------------------------------------------------------------------------
// Column menu helpers
// ---------------------------------------------------------------------------

function isColumnMenuPopup(element: HTMLElement): boolean {
  return isValueDefined(
    element.querySelector('ul[id$="_columnmenu"], ul[id$="_cmenu"]'),
  );
}

function getVisibleColumnMenuPopup(): HTMLElement | undefined {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.e-grid-menu.e-contextmenu-wrapper, .e-grid-menu.e-popup, .e-grid-menu',
    ),
  );
  return candidates.find(
    (element) => isPopupVisible(element) && isColumnMenuPopup(element),
  );
}

function getVisibleGridContextMenuList(): HTMLElement | undefined {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.e-grid-menu.e-contextmenu-wrapper ul[id$="_cmenu"]',
    ),
  );
  return candidates.find(
    (element) =>
      isPopupVisible(element) &&
      getComputedStyle(element).display !== 'none',
  );
}

export function getColumnMenuPopupFromMenuItem(
  menuItem: HTMLElement,
): HTMLElement | undefined {
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
  return rect.left > window.innerWidth - rect.right;
}

export function getMenuSidePreferenceFromPopup(
  menuPopup: HTMLElement,
): boolean {
  if (menuPopup.classList.contains('sf-submenu-left')) return true;
  if (menuPopup.classList.contains('sf-submenu-right')) return false;
  const rect = menuPopup.getBoundingClientRect();
  return rect.left > window.innerWidth - rect.right;
}

// ---------------------------------------------------------------------------
// Menu item interrogation helpers
// ---------------------------------------------------------------------------

export function getFilterAnchorFromMenuItem(
  menuItem: HTMLElement,
): HTMLElement | undefined {
  if (menuItem.classList.contains('e-menu-caret-icon')) return undefined;
  const hasFilterIcon = isValueDefined(
    menuItem.querySelector('.e-icon-filter, .e-filter-icon, .e-filter'),
  );
  if (hasFilterIcon) return menuItem;
  const rawLabel = menuItem.textContent;
  const label = isValueDefined(rawLabel) ? rawLabel.trim().toLowerCase() : '';
  return label === 'filter' ? menuItem : undefined;
}

export function getSubmenuAnchorFromMenuItem(
  menuItem: HTMLElement,
): HTMLElement | undefined {
  if (menuItem.classList.contains('e-menu-caret-icon')) return menuItem;
  return isValueDefined(menuItem.querySelector('.e-caret'))
    ? menuItem
    : undefined;
}

export function getActiveSubmenuAnchor(): HTMLElement | undefined {
  const activeItems = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.e-grid-menu .e-menu-item.e-focused, .e-grid-menu .e-menu-item.e-selected',
    ),
  );
  return activeItems.find((item) => {
    if (!isValueDefined(getSubmenuAnchorFromMenuItem(item))) return false;
    return isValueDefined(getColumnMenuPopupFromMenuItem(item));
  });
}

// ---------------------------------------------------------------------------
// Geometric positioning helpers
// ---------------------------------------------------------------------------

function resolveHorizontalPosition(
  anchorRect: DOMRect,
  popupWidth: number,
): { left: number; openToLeft: boolean } {
  const spaceRight = window.innerWidth - anchorRect.right;
  const spaceLeft = anchorRect.left;
  const requiredSpace = popupWidth + POPUP_VERTICAL_GAP_PX;

  let openToLeft: boolean;
  if (spaceRight >= requiredSpace) openToLeft = false;
  else if (spaceLeft >= requiredSpace) openToLeft = true;
  else openToLeft = spaceLeft > spaceRight;

  const unclamped = openToLeft
    ? anchorRect.left - requiredSpace
    : anchorRect.right + POPUP_VERTICAL_GAP_PX;
  const maxLeft = Math.max(
    POPUP_VERTICAL_GAP_PX,
    window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX,
  );
  return {
    left: Math.min(Math.max(POPUP_VERTICAL_GAP_PX, unclamped), maxLeft),
    openToLeft,
  };
}

function resolveVerticalPosition(
  anchorRect: DOMRect,
  popupHeight: number,
): number {
  const maxTop = Math.max(
    POPUP_VERTICAL_GAP_PX,
    window.innerHeight - popupHeight - POPUP_VERTICAL_GAP_PX,
  );
  return Math.min(Math.max(POPUP_VERTICAL_GAP_PX, anchorRect.top), maxTop);
}

function resolveAnchorRect(anchor: PopupAnchor): DOMRect | undefined {
  if (anchor instanceof DOMRect) return anchor;
  if (!anchor.isConnected) return undefined;
  return anchor.getBoundingClientRect();
}

// ---------------------------------------------------------------------------
// Filter popup
// ---------------------------------------------------------------------------

function getVisibleFilterPopup(): HTMLElement | undefined {
  return getVisibleElement(
    '.e-dialog.e-filter-popup.e-popup-open[role="dialog"]:not(.e-ddl),' +
      ' .e-flmenu.e-dialog.e-filter-popup[role="dialog"]:not(.e-ddl),' +
      ' .e-col-menu.e-dialog.e-filter-popup[role="dialog"]:not(.e-ddl)',
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Remove orphaned hidden popup elements that Syncfusion left behind.
 * Only prunes popups that are both hidden AND have been previously processed
 * (have the `data-sf-stop-prop` attribute), so newly-initializing popups are safe.
 */
export function cleanupZombies(): void {
  const zombies = Array.from(document.body.children).filter(
    (node): node is HTMLElement => {
      if (!(node instanceof HTMLElement)) return false;

      const isManagedPopup = node.matches(
        '.e-grid-menu.e-contextmenu-wrapper, .e-dialog.e-filter-popup',
      );
      if (!isManagedPopup) return false;

      const isDisplayNone =
        node.style.display === 'none' ||
        getComputedStyle(node).display === 'none';
      const isAriaHidden =
        node.getAttribute('aria-hidden') === 'true' ||
        node.classList.contains('e-popup-close');
      const isHidden = isDisplayNone && isAriaHidden;

      return isHidden && node.hasAttribute('data-sf-stop-prop');
    },
  );

  for (const zombie of zombies) zombie.remove();
}

/**
 * Reposition the pager "page size" dropdown so it renders fixed
 * relative to the viewport.
 */
export function repositionPagerDropdownPopup(root: HTMLDivElement): void {
  const input = root.querySelector<HTMLInputElement>(
    '.e-pager .e-pagerdropdown input.e-input[aria-controls]',
  );
  const wrapper = root.querySelector<HTMLElement>(
    '.e-pager .e-pagerdropdown .e-ddl.e-control-wrapper',
  );
  const popupId = input?.getAttribute('aria-controls');
  const hasRequiredElements =
    isValueDefined(input) && isValueDefined(wrapper);
  const hasValidPopupId = isValueDefined(popupId) && popupId !== '';
  if (!hasRequiredElements || !hasValidPopupId) return;

  const popup = document.getElementById(popupId);
  if (!isValueDefined(popup) || !popup.classList.contains('e-popup-open'))
    return;

  if (popup.parentElement !== document.body) document.body.appendChild(popup);

  const rect = wrapper.getBoundingClientRect();
  applyFixedPopupStyle({
    element: popup,
    left: rect.left,
    top: rect.bottom + POPUP_VERTICAL_GAP_PX,
    minWidth: rect.width,
    zIndex: COLUMN_MENU_Z_INDEX,
  });
}

/** Try to find the anchor element for a filter dropdown popup. */
function findFilterDropdownAnchor(
  popup: HTMLElement,
  anchorId: string,
): HTMLElement | undefined {
  let anchor = document.getElementById(anchorId);

  if (!isValueDefined(anchor))
    anchor = document.querySelector<HTMLElement>(
      `[aria-controls="${popup.id}"]`,
    );

  if (!isValueDefined(anchor)) {
    const visibleFilterPopup = getVisibleFilterPopup();
    if (isValueDefined(visibleFilterPopup)) {
      const hasCssEscape =
        typeof CSS !== 'undefined' && isValueDefined(CSS.escape);
      const escapedId = hasCssEscape ? CSS.escape(anchorId) : anchorId;
      anchor =
        visibleFilterPopup.querySelector<HTMLElement>(`#${escapedId}`) ??
        visibleFilterPopup.querySelector<HTMLElement>(
          '.e-flm_optrdiv .e-ddl.e-control-wrapper',
        ) ??
        visibleFilterPopup.querySelector<HTMLElement>(
          '.e-flm_valuediv .e-control-wrapper',
        );
    }
  }

  return anchor ?? undefined;
}

/** Check if a popup matches any filter-related ID patterns. */
function isFilterRelatedPopup(popup: HTMLElement): boolean {
  const idMatchesFilter =
    popup.id.includes('-floptr') || popup.id.includes('-flvalue');
  const idMatchesValue = popup.id.includes('_flv');
  const hasFlmenuClass = popup.classList.contains('e-popup-flmenu');
  return idMatchesFilter || idMatchesValue || hasFlmenuClass;
}

/** Reposition a single filter dropdown popup. Returns true if positioned. */
function repositionSingleFilterDropdown(popup: HTMLElement): boolean {
  if (popup.id === '') return false;
  const anchorId =
    popup.getAttribute('aria-label') ?? popup.id.replace(/_popup$/, '');
  const anchor = findFilterDropdownAnchor(popup, anchorId);
  if (!isValueDefined(anchor)) return false;

  const wrapper = anchor.closest<HTMLElement>('.e-control-wrapper') ?? anchor;
  if (popup.parentElement !== document.body) document.body.appendChild(popup);

  const rect = wrapper.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;

  applyFixedPopupStyle({
    element: popup,
    left: rect.left,
    top: rect.bottom + POPUP_VERTICAL_GAP_PX,
    minWidth: rect.width,
    zIndex: OPERATOR_POPUP_Z_INDEX,
  });
  applyPopupProtection(popup);
  setStyleIfChanged(popup, 'margin-top', '0');
  return true;
}

const FILTER_DROPDOWN_SELECTOR =
  '.e-ddl.e-popup.e-popup-open,' +
  ' .e-autocomplete.e-popup.e-popup-open,' +
  ' .e-combobox.e-popup.e-popup-open';

/** Reposition all visible filter dropdown popups. Returns true if any was repositioned. */
export function repositionFilterDropdownPopups(): boolean {
  const popups = Array.from(
    document.querySelectorAll<HTMLElement>(FILTER_DROPDOWN_SELECTOR),
  ).filter(isFilterRelatedPopup);
  if (popups.length === 0) return false;
  return popups.some(repositionSingleFilterDropdown);
}

/** Measure popup dimensions with minimum bounds. */
function measurePopupDimensions(
  el: HTMLElement,
): { width: number; height: number; hasSize: boolean } {
  const rect = el.getBoundingClientRect();
  const width = Math.max(MENU_SUBPOPUP_MIN_WIDTH_PX, measureWidth(rect, el));
  const height = Math.max(POPUP_MIN_HEIGHT_PX, measureHeight(rect, el));
  const hasSize = measureWidth(rect, el) > 0 && measureHeight(rect, el) > 0;
  return { width, height, hasSize };
}

/** Reposition the filter dialog popup relative to a given anchor. */
export function repositionFilterPopup(
  anchor: PopupAnchor,
  preferredOpenToLeft?: boolean,
): boolean {
  const anchorRect = resolveAnchorRect(anchor);
  if (!isValueDefined(anchorRect)) return false;
  const filterPopup = getVisibleFilterPopup();
  if (!isValueDefined(filterPopup)) return false;

  if (filterPopup.parentElement !== document.body)
    document.body.appendChild(filterPopup);

  const { width, height, hasSize } = measurePopupDimensions(filterPopup);
  const left = resolveFilterPopupLeft(anchorRect, width, preferredOpenToLeft);
  const top = resolveVerticalPosition(anchorRect, height);

  applyFixedPopupStyle({
    element: filterPopup, left, top, minWidth: width,
    zIndex: FILTER_POPUP_Z_INDEX,
  });
  applyPopupProtection(filterPopup);
  return hasSize;
}

/** Flip the preferred side when the popup doesn't fit on the chosen side. */
function flipSideIfNeeded(
  preferred: boolean,
  anchorRect: DOMRect,
  requiredSpace: number,
): boolean {
  const spaceRight = window.innerWidth - anchorRect.right;
  const spaceLeft = anchorRect.left;

  const shouldFlipToRight =
    preferred && spaceLeft < requiredSpace && spaceRight >= requiredSpace;
  const shouldFlipToLeft =
    !preferred && spaceRight < requiredSpace && spaceLeft >= requiredSpace;

  if (shouldFlipToRight) return false;
  if (shouldFlipToLeft) return true;
  return preferred;
}

/** Compute the horizontal left position for a filter popup. */
function resolveFilterPopupLeft(
  anchorRect: DOMRect,
  popupWidth: number,
  preferredOpenToLeft?: boolean,
): number {
  const defaultHorizontal = resolveHorizontalPosition(anchorRect, popupWidth);
  const effectivePreference =
    preferredOpenToLeft ?? getColumnMenuSidePreferenceFromDom();
  if (!isValueDefined(effectivePreference)) return defaultHorizontal.left;

  const requiredSpace = popupWidth + POPUP_VERTICAL_GAP_PX;
  const openToLeft = flipSideIfNeeded(effectivePreference, anchorRect, requiredSpace);
  const unclamped = openToLeft
    ? anchorRect.left - requiredSpace
    : anchorRect.right + POPUP_VERTICAL_GAP_PX;
  const maxLeft = Math.max(
    POPUP_VERTICAL_GAP_PX,
    window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX,
  );
  return Math.min(Math.max(POPUP_VERTICAL_GAP_PX, unclamped), maxLeft);
}

/** Find the last visible submenu within a popup root, excluding the main list. */
function findVisibleSubmenu(
  popupRoot: HTMLElement,
  mainList: HTMLElement,
): HTMLElement | undefined {
  const submenus = Array.from(
    popupRoot.querySelectorAll<HTMLElement>('ul.e-menu-parent'),
  ).filter((ul) => ul !== mainList && isPopupVisible(ul));
  return submenus.length > 0 ? submenus[submenus.length - 1] : undefined;
}

/** Update submenu direction classes on the root popup wrapper. */
function updateSubmenuDirection(
  popupRoot: HTMLElement,
  openToLeft: boolean,
): void {
  const rootPopup = popupRoot.closest<HTMLElement>(
    '.e-grid-menu.e-contextmenu-wrapper',
  );
  if (!isValueDefined(rootPopup)) return;
  rootPopup.classList.toggle('sf-submenu-left', openToLeft);
  rootPopup.classList.toggle('sf-submenu-right', !openToLeft);
}

/** Reposition a column menu submenu popup relative to its anchor menu item. */
export function repositionColumnSubmenuPopup(
  anchorItem: HTMLElement,
): boolean {
  if (!anchorItem.isConnected) return false;
  const mainList = anchorItem.closest<HTMLElement>('ul.e-menu-parent');
  if (!isValueDefined(mainList)) return false;
  const popupRoot = mainList.closest<HTMLElement>('.e-grid-menu');
  if (!isValueDefined(popupRoot)) return false;

  const submenu = findVisibleSubmenu(popupRoot, mainList);
  if (!isValueDefined(submenu)) return false;

  const anchorRect = anchorItem.getBoundingClientRect();
  const { width, height } = measurePopupDimensions(submenu);
  const { left, openToLeft } = resolveHorizontalPosition(anchorRect, width);
  const top = resolveVerticalPosition(anchorRect, height);

  applyFixedPopupStyle({
    element: submenu, left, top,
    minWidth: width, zIndex: SUBMENU_POPUP_Z_INDEX,
  });
  updateSubmenuDirection(popupRoot, openToLeft);
  return true;
}

/**
 * Reposition the column menu popup relative to its header trigger button.
 *
 * @returns `true` if submenus should open to the left, `false` for right,
 *          or `undefined` if no visible column menu popup was found.
 */
export function repositionColumnMenuPopup(
  trigger: HTMLElement,
): boolean | undefined {
  const popup = getVisibleColumnMenuPopup();
  if (!isValueDefined(popup)) return undefined;

  // Do NOT move the column menu popup to document.body. Syncfusion's ColumnMenu
  // module relies on event delegation through the grid DOM to fire columnMenuClick
  // and handle built-in actions (AutoFit, Sort, Filter, etc.).

  const triggerRect = trigger.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();
  const popupWidth = measureWidth(popupRect, popup);
  const maxLeft = Math.max(
    0,
    window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX,
  );
  const targetLeft = Math.min(
    Math.max(POPUP_VERTICAL_GAP_PX, triggerRect.right - popupWidth),
    maxLeft,
  );

  applyFixedPopupStyle({
    element: popup,
    left: targetLeft,
    top: triggerRect.bottom + POPUP_VERTICAL_GAP_PX,
    minWidth: undefined,
    zIndex: COLUMN_MENU_Z_INDEX,
  });

  const spaceRight = window.innerWidth - (targetLeft + popupWidth);
  const openSubmenuLeft = targetLeft > spaceRight;
  popup.classList.toggle('sf-submenu-left', openSubmenuLeft);
  popup.classList.toggle('sf-submenu-right', !openSubmenuLeft);
  return openSubmenuLeft;
}

/** Apply static positioning styles to a context menu list element. */
function applyContextMenuListStyles(list: HTMLElement): void {
  setStyleIfChanged(list, 'position', 'static');
  setStyleIfChanged(list, 'display', 'block');
  setStyleIfChanged(list, 'z-index', COLUMN_MENU_Z_INDEX);
}

/** Reposition the grid context menu popup for fixed viewport positioning. */
export function repositionGridContextMenuPopup(): boolean {
  const list = getVisibleGridContextMenuList();
  if (!isValueDefined(list)) return false;
  const wrapper = list.closest<HTMLElement>('.e-grid-menu.e-contextmenu-wrapper');
  if (!isValueDefined(wrapper)) return false;

  const rect = list.getBoundingClientRect();
  const popupWidth = measureWidth(rect, list);
  if (popupWidth <= 0) return false;

  const maxLeft = Math.max(
    POPUP_VERTICAL_GAP_PX,
    window.innerWidth - popupWidth - POPUP_VERTICAL_GAP_PX,
  );
  const left = Math.min(Math.max(POPUP_VERTICAL_GAP_PX, rect.left), maxLeft);
  const top = Math.max(POPUP_VERTICAL_GAP_PX, rect.top);

  if (wrapper.parentElement !== document.body)
    document.body.appendChild(wrapper);

  applyFixedPopupStyle({
    element: wrapper, left, top,
    minWidth: popupWidth, zIndex: COLUMN_MENU_Z_INDEX,
  });
  applyContextMenuListStyles(list);
  return true;
}
