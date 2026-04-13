/**
 * Prevents unwanted page scroll when clicking a Syncfusion DataGrid.
 *
 * Syncfusion's FocusStrategy.setFocusedElement calls element.focus() inside
 * setTimeout(0) without { preventScroll: true }, causing the browser to
 * jump to the focused cell. When multiple grids exist on the same page,
 * the focus cascades across all of them, scrolling by hundreds of pixels.
 *
 * Fix: monkey-patch HTMLElement.prototype.focus so that any focus() call
 * targeting an element inside a Syncfusion grid (`.e-grid`) automatically
 * includes { preventScroll: true }. This is applied once at module load.
 */

const originalFocus = HTMLElement.prototype.focus;

HTMLElement.prototype.focus = function patchedFocus(options?: FocusOptions): void {
  if (this.closest('.e-grid')) 
    originalFocus.call(this, { ...options, preventScroll: true });
   else 
    originalFocus.call(this, options);
  
};
