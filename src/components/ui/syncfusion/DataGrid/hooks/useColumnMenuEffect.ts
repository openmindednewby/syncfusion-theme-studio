/* eslint-disable max-lines, smart-max-lines/smart-max-lines -- Effect hook with shared mutable closure state cannot be meaningfully decomposed further */
/**
 * Effect hook for column menu and filter popup repositioning.
 *
 * Manages pointer/focus/scroll event listeners and a MutationObserver
 * that keep Syncfusion column menus, filter dialogs, and dropdown
 * popups positioned correctly with CSS `position: fixed`.
 */
import { useEffect, useRef } from 'react';

import { isValueDefined } from '@/utils/is';

import {
  FILTER_REPOSITION_MAX_ATTEMPTS,
  FILTER_REPOSITION_MIN_FRAMES,
  POPUP_REPOSITION_DELAY_MS,
  SUBMENU_REPOSITION_MAX_ATTEMPTS,
  SUBMENU_REPOSITION_MIN_FRAMES,
  ZOMBIE_CLEANUP_DELAY_MS,
  ZOMBIE_CLEANUP_LONG_DELAY_MS,
} from '../constants';
import {
  cleanupZombies,
  getActiveSubmenuAnchor,
  getColumnMenuPopupFromMenuItem,
  getFilterAnchorFromMenuItem,
  getMenuSidePreferenceFromPopup,
  getSubmenuAnchorFromMenuItem,
  repositionColumnMenuPopup,
  repositionColumnSubmenuPopup,
  repositionFilterDropdownPopups,
  repositionFilterPopup,
  repositionGridContextMenuPopup,
} from '../utils/popupPositioning';

import type { ResolvedGridFeatures } from '../types';

/** Mutable state container for popup tracking across event handlers. */
interface PopupTrackingState {
  columnMenuTrigger: HTMLElement | null;
  filterAnchor: DOMRect | null;
  submenuAnchor: HTMLElement | null;
  openToLeft: boolean | undefined;
}

/** Check if a DOM mutation added a dropdown popup. */
function mutationAddedDropdown(mutation: MutationRecord): boolean {
  if (mutation.type !== 'childList') return false;
  const addedNodes = Array.from(mutation.addedNodes).filter(
    (node): node is HTMLElement => node instanceof HTMLElement,
  );
  const hasDirectDropdown = addedNodes.some(
    (node) =>
      isValueDefined(node.matches) &&
      (node.matches('.e-ddl.e-popup') || node.matches('.e-autocomplete.e-popup')),
  );
  const hasNestedDropdown = addedNodes.some(
    (node) =>
      isValueDefined(node.querySelector) &&
      isValueDefined(node.querySelector('.e-ddl.e-popup, .e-autocomplete.e-popup')),
  );
  return hasDirectDropdown || hasNestedDropdown;
}

/** Check if a DOM mutation changed attributes on a managed popup. */
function mutationChangedPopupAttribute(mutation: MutationRecord): {
  shouldReposition: boolean;
  shouldCleanup: boolean;
} {
  if (mutation.type !== 'attributes' || !(mutation.target instanceof HTMLElement))
    return { shouldReposition: false, shouldCleanup: false };

  const el = mutation.target;
  const shouldCleanup = el.matches(
    '.e-grid-menu.e-contextmenu-wrapper, .e-dialog.e-filter-popup, .e-ddl.e-popup',
  );
  const shouldReposition = el.matches('.e-ddl.e-popup, .e-autocomplete.e-popup');
  return { shouldReposition, shouldCleanup };
}

/**
 * Effect hook that sets up event listeners for repositioning column menu,
 * filter, submenu, and context menu popups in the DataGrid.
 */
export function useColumnMenuEffect(
  features: ResolvedGridFeatures,
  wrapperRef: React.RefObject<HTMLDivElement>,
): void {
  const trackingRef = useRef<PopupTrackingState>({
    columnMenuTrigger: null,
    filterAnchor: null,
    submenuAnchor: null,
    openToLeft: undefined,
  });

  useEffect(() => {
    const isActive = features.columnMenu || features.filtering;
    if (!isActive || !isValueDefined(wrapperRef.current)) return;

    const root = wrapperRef.current;
    const tracking = trackingRef.current;
    let hoverRafId: number | null = null;
    let filterRafId: number | null = null;
    let filterDropdownRafId: number | null = null;
    let contextMenuRafId: number | null = null;
    let submenuRafId: number | null = null;
    let queuedHoverAnchor: HTMLElement | null = null;

    // -- Scheduling helpers ------------------------------------------------

    const scheduleFilterReposition = (anchor: DOMRect): void => {
      let attempt = 0;
      let successCount = 0;
      const tick = (): void => {
        attempt += 1;
        const positioned = repositionFilterPopup(anchor, tracking.openToLeft);
        if (positioned) successCount += 1;
        const done = attempt >= FILTER_REPOSITION_MAX_ATTEMPTS
          || (positioned && successCount >= FILTER_REPOSITION_MIN_FRAMES);
        if (done) { filterRafId = null; return; }
        filterRafId = requestAnimationFrame(tick);
      };
      if (isValueDefined(filterRafId)) cancelAnimationFrame(filterRafId);
      filterRafId = requestAnimationFrame(tick);
    };

    const scheduleSubmenuReposition = (anchor: HTMLElement): void => {
      let attempt = 0;
      let successCount = 0;
      const tick = (): void => {
        attempt += 1;
        const positioned = repositionColumnSubmenuPopup(anchor);
        if (positioned) successCount += 1;
        const done = attempt >= SUBMENU_REPOSITION_MAX_ATTEMPTS
          || (positioned && successCount >= SUBMENU_REPOSITION_MIN_FRAMES);
        if (done) { submenuRafId = null; return; }
        submenuRafId = requestAnimationFrame(tick);
      };
      if (isValueDefined(submenuRafId)) cancelAnimationFrame(submenuRafId);
      submenuRafId = requestAnimationFrame(tick);
    };

    const scheduleDropdownReposition = (): void => {
      let attempt = 0;
      let successCount = 0;
      const tick = (): void => {
        attempt += 1;
        const positioned = repositionFilterDropdownPopups();
        if (positioned) successCount += 1;
        const done = attempt >= SUBMENU_REPOSITION_MAX_ATTEMPTS
          || (positioned && successCount >= SUBMENU_REPOSITION_MIN_FRAMES);
        if (done) { filterDropdownRafId = null; return; }
        filterDropdownRafId = requestAnimationFrame(tick);
      };
      if (isValueDefined(filterDropdownRafId))
        cancelAnimationFrame(filterDropdownRafId);
      filterDropdownRafId = requestAnimationFrame(tick);
    };

    const scheduleContextMenuReposition = (): void => {
      let attempt = 0;
      let successCount = 0;
      const tick = (): void => {
        attempt += 1;
        const positioned = repositionGridContextMenuPopup();
        if (positioned) successCount += 1;
        const done = attempt >= SUBMENU_REPOSITION_MAX_ATTEMPTS
          || (positioned && successCount >= SUBMENU_REPOSITION_MIN_FRAMES);
        if (done) { contextMenuRafId = null; return; }
        contextMenuRafId = requestAnimationFrame(tick);
      };
      if (isValueDefined(contextMenuRafId))
        cancelAnimationFrame(contextMenuRafId);
      contextMenuRafId = requestAnimationFrame(tick);
    };

    // -- Event handlers ----------------------------------------------------

    const onGridPointerDown = (event: Event): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLElement>('.e-columnmenu');
      if (!isValueDefined(trigger)) return;
      tracking.columnMenuTrigger = trigger;
      setTimeout(() => {
        const openToLeft = repositionColumnMenuPopup(trigger);
        if (isValueDefined(openToLeft)) tracking.openToLeft = openToLeft;
      }, POPUP_REPOSITION_DELAY_MS);
      requestAnimationFrame(() => {
        const openToLeft = repositionColumnMenuPopup(trigger);
        if (isValueDefined(openToLeft)) tracking.openToLeft = openToLeft;
      });
    };

    const handleMenuItemClick = (target: Element): void => {
      const menuItem = target.closest<HTMLElement>('.e-grid-menu .e-menu-item');
      if (!isValueDefined(menuItem)) return;
      const menuPopup = getColumnMenuPopupFromMenuItem(menuItem);
      if (!isValueDefined(menuPopup)) return;
      tracking.openToLeft = getMenuSidePreferenceFromPopup(menuPopup);

      const filterAnchor = getFilterAnchorFromMenuItem(menuItem);
      if (isValueDefined(filterAnchor)) {
        const filterAnchorRect = filterAnchor.getBoundingClientRect();
        tracking.filterAnchor = filterAnchorRect;
        setTimeout(() => scheduleFilterReposition(filterAnchorRect), POPUP_REPOSITION_DELAY_MS);
        scheduleFilterReposition(filterAnchorRect);
      }

      const submenuAnchor = getSubmenuAnchorFromMenuItem(menuItem);
      if (isValueDefined(submenuAnchor)) {
        tracking.submenuAnchor = submenuAnchor;
        setTimeout(() => scheduleSubmenuReposition(submenuAnchor), POPUP_REPOSITION_DELAY_MS);
        scheduleSubmenuReposition(submenuAnchor);
      }
    };

    const onDocumentPointerDown = (event: Event): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (isValueDefined(target.closest('.e-grid .e-rowcell, .e-grid .e-headercell')))
        setTimeout(() => scheduleContextMenuReposition(), POPUP_REPOSITION_DELAY_MS);
      if (isValueDefined(target.closest('.e-dialog.e-flmenu .e-control-wrapper'))) {
        setTimeout(() => scheduleDropdownReposition(), POPUP_REPOSITION_DELAY_MS);
        scheduleDropdownReposition();
      }
      setTimeout(() => cleanupZombies(), ZOMBIE_CLEANUP_DELAY_MS);
      handleMenuItemClick(target);
    };

    const onDocumentPointerOver = (event: Event): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const menuItem = target.closest<HTMLElement>('.e-grid-menu .e-menu-item');
      if (!isValueDefined(menuItem)) return;
      const menuPopup = getColumnMenuPopupFromMenuItem(menuItem);
      if (!isValueDefined(menuPopup)) return;
      tracking.openToLeft = getMenuSidePreferenceFromPopup(menuPopup);

      const filterAnchor = getFilterAnchorFromMenuItem(menuItem);
      if (isValueDefined(filterAnchor)) {
        const rect = filterAnchor.getBoundingClientRect();
        tracking.filterAnchor = rect;
        scheduleFilterReposition(rect);
      }

      const submenuAnchor = getSubmenuAnchorFromMenuItem(menuItem);
      if (!isValueDefined(submenuAnchor)) return;
      tracking.submenuAnchor = submenuAnchor;
      queuedHoverAnchor = submenuAnchor;
      if (isValueDefined(hoverRafId)) return;
      hoverRafId = requestAnimationFrame(() => {
        hoverRafId = null;
        if (!isValueDefined(queuedHoverAnchor)) return;
        scheduleSubmenuReposition(queuedHoverAnchor);
      });
    };

    const onWindowMove = (): void => {
      const trigger = tracking.columnMenuTrigger;
      if (isValueDefined(trigger)) {
        const openToLeft = repositionColumnMenuPopup(trigger);
        if (isValueDefined(openToLeft)) tracking.openToLeft = openToLeft;
      }
      const submenuAnchor = tracking.submenuAnchor ?? getActiveSubmenuAnchor();
      if (isValueDefined(submenuAnchor)) {
        tracking.submenuAnchor = submenuAnchor;
        scheduleSubmenuReposition(submenuAnchor);
      }
      if (isValueDefined(tracking.filterAnchor))
        repositionFilterPopup(tracking.filterAnchor, tracking.openToLeft);
      scheduleDropdownReposition();
      scheduleContextMenuReposition();
      cleanupZombies();
    };

    const onDocumentFocusIn = (event: Event): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!isValueDefined(target.closest('.e-dialog.e-flmenu .e-control-wrapper')))
        return;
      scheduleDropdownReposition();
    };

    const onDocumentContextMenu = (): void => {
      setTimeout(() => scheduleContextMenuReposition(), POPUP_REPOSITION_DELAY_MS);
      scheduleContextMenuReposition();
    };

    // -- MutationObserver --------------------------------------------------

    const observer = new MutationObserver((mutations) => {
      let shouldReposition = false;
      let shouldCleanup = false;

      for (const mutation of mutations) {
        if (mutationAddedDropdown(mutation)) shouldReposition = true;
        if (mutation.type === 'childList' && mutation.removedNodes.length > 0)
          shouldCleanup = true;
        const attrResult = mutationChangedPopupAttribute(mutation);
        if (attrResult.shouldReposition) shouldReposition = true;
        if (attrResult.shouldCleanup) shouldCleanup = true;
      }

      if (shouldCleanup)
        setTimeout(() => cleanupZombies(), ZOMBIE_CLEANUP_LONG_DELAY_MS);
      if (shouldReposition) scheduleDropdownReposition();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    // -- Attach listeners --------------------------------------------------

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
      observer.disconnect();
      if (isValueDefined(hoverRafId)) cancelAnimationFrame(hoverRafId);
      if (isValueDefined(filterRafId)) cancelAnimationFrame(filterRafId);
      if (isValueDefined(filterDropdownRafId)) cancelAnimationFrame(filterDropdownRafId);
      if (isValueDefined(contextMenuRafId)) cancelAnimationFrame(contextMenuRafId);
      if (isValueDefined(submenuRafId)) cancelAnimationFrame(submenuRafId);
    };
  }, [features.columnMenu, features.filtering, wrapperRef, trackingRef]);
}
