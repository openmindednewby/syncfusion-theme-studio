/** Feature-specific test IDs — extracted to keep testIds.ts under the line limit. */
export const FeatureTestIds = {
  // AI Assistant
  AI_PANEL: 'ai-panel',
  AI_TOGGLE_BTN: 'ai-toggle-btn',
  AI_CLOSE_BTN: 'ai-close-btn',
  AI_CLEAR_BTN: 'ai-clear-btn',
  AI_BACKDROP: 'ai-backdrop',
  AI_MESSAGE_LIST: 'ai-message-list',
  AI_MESSAGE_BUBBLE: 'ai-message-bubble',
  AI_INPUT: 'ai-input',
  AI_SEND_BTN: 'ai-send-btn',
  AI_TYPING_INDICATOR: 'ai-typing-indicator',
  AI_SUGGESTIONS: 'ai-suggestions',
  AI_SUGGESTION_CHIP: 'ai-suggestion-chip',

  // PWA
  PWA_UPDATE_PROMPT: 'pwa-update-prompt',
  PWA_UPDATE_BUTTON: 'pwa-update-button',
  PWA_DISMISS_BUTTON: 'pwa-dismiss-button',
  PWA_INSTALL_PROMPT: 'pwa-install-prompt',
  PWA_INSTALL_BUTTON: 'pwa-install-button',
  PWA_INSTALL_DISMISS: 'pwa-install-dismiss',
  OFFLINE_INDICATOR: 'offline-indicator',

  // Data Export
  EXPORT_TOOLBAR: 'export-toolbar',
  EXPORT_CSV_BTN: 'export-csv-btn',
  EXPORT_EXCEL_BTN: 'export-excel-btn',
  EXPORT_PDF_BTN: 'export-pdf-btn',

  // Diagram Page
  NAV_DIAGRAM: 'nav-diagram',
  DIAGRAM_PAGE: 'diagram-page',
  DIAGRAM_CANVAS: 'diagram-canvas',
  DIAGRAM_PALETTE: 'diagram-palette',
  DIAGRAM_TOOLBAR: 'diagram-toolbar',
  DIAGRAM_TEMPLATE_PICKER: 'diagram-template-picker',
  DIAGRAM_TEMPLATE_CARD: 'diagram-template-card',
  DIAGRAM_UNDO_BTN: 'diagram-undo-btn',
  DIAGRAM_REDO_BTN: 'diagram-redo-btn',
  DIAGRAM_ZOOM_IN_BTN: 'diagram-zoom-in-btn',
  DIAGRAM_ZOOM_OUT_BTN: 'diagram-zoom-out-btn',
  DIAGRAM_FIT_BTN: 'diagram-fit-btn',
  DIAGRAM_EXPORT_PNG_BTN: 'diagram-export-png-btn',
  DIAGRAM_EXPORT_SVG_BTN: 'diagram-export-svg-btn',
  DIAGRAM_CLEAR_BTN: 'diagram-clear-btn',

  // Spreadsheet Page
  NAV_SPREADSHEET: 'nav-spreadsheet',
  SPREADSHEET_PAGE: 'spreadsheet-page',
  SPREADSHEET_VIEW: 'spreadsheet-view',
  SPREADSHEET_SHEET_SELECTOR: 'spreadsheet-sheet-selector',
  SPREADSHEET_SHEET_BTN: 'spreadsheet-sheet-btn',

} as const;
