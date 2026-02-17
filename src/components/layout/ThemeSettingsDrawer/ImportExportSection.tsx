import { useState, type ChangeEvent } from 'react';

import { ExportIcon, ImportIcon, CheckIcon, ShareSectionIcon } from '@/components/icons';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useThemeStore } from '@/stores/useThemeStore';

export const ImportExportSection = (): JSX.Element => {
  const { theme, exportTheme, importTheme } = useThemeStore();
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleExport = (): void => {
    const json = exportTheme();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `theme-${theme.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (): void => {
    setImportError('');
    const success = importTheme(importJson);
    if (success) {
      setImportJson('');
      setShowImport(false);
    } else setImportError(FM('themeSettings.importError'));
  };

  const handleImportJsonChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setImportJson(e.target.value);
  };

  const toggleImport = (): void => {
    setShowImport((prev) => !prev);
    setImportError('');
    setImportJson('');
  };

  const isImportDisabled = importJson.trim() === '';

  return (
    <section className="theme-section space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
          <ShareSectionIcon />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-text-primary">
            {FM('themeSettings.importExport')}
          </h4>
          <p className="text-xs text-text-muted">
            {FM('themeSettings.importExportDesc')}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          aria-label={FM('themeSettings.exportTheme')}
          className="theme-action-btn flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-800 hover:shadow-md active:scale-[0.98]"
          data-testid={TestIds.THEME_EXPORT_BTN}
          type="button"
          onClick={handleExport}
        >
          <ExportIcon />
          {FM('themeSettings.export')}
        </button>
        <button
          aria-label={showImport ? FM('themeSettings.hideImport') : FM('themeSettings.showImport')}
          className={`
            theme-action-btn flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]
            ${
              showImport
                ? 'border-error-300 bg-error-50 text-error-600 hover:bg-error-100'
                : 'border-border bg-surface-elevated text-text-secondary hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600'
            }
          `}
          data-testid={TestIds.THEME_IMPORT_TOGGLE_BTN}
          type="button"
          onClick={toggleImport}
        >
          <ImportIcon />
          {showImport ? FM('common.cancel') : FM('themeSettings.import')}
        </button>
      </div>

      {/* Import Panel */}
      {showImport ? (
        <div className="import-panel animate-in slide-in-from-top-2 space-y-3 rounded-xl border border-border bg-surface-elevated/50 p-4 duration-200">
          <textarea
            aria-label={FM('themeSettings.importJsonLabel')}
            className="import-textarea w-full resize-none rounded-lg border border-border bg-surface p-3 font-mono text-xs text-text-primary transition-all duration-200 placeholder:text-text-muted focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            data-testid={TestIds.THEME_IMPORT_TEXTAREA}
            placeholder={FM('themeSettings.importPlaceholder')}
            rows={5}
            value={importJson}
            onChange={handleImportJsonChange}
          />

          {importError !== '' && (
            <div className="flex items-center gap-2 rounded-lg bg-error-50 px-3 py-2 text-xs text-error-600">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span data-testid={TestIds.THEME_IMPORT_ERROR}>{importError}</span>
            </div>
          )}

          <button
            aria-label={FM('themeSettings.importTheme')}
            className="import-btn flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
            data-testid={TestIds.THEME_IMPORT_BTN}
            disabled={isImportDisabled}
            type="button"
            onClick={handleImport}
          >
            <CheckIcon />
            {FM('themeSettings.importTheme')}
          </button>
        </div>
      ) : null}
    </section>
  );
};
