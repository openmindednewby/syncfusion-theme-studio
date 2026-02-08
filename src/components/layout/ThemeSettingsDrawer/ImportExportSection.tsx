import { useState, type ChangeEvent } from 'react';

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
    <section className="space-y-3">
      <h4 className="text-sm font-semibold text-text-primary">
        {FM('themeSettings.importExport')}
      </h4>
      <div className="flex gap-2">
        <button
          aria-label={FM('themeSettings.exportTheme')}
          className="btn btn-primary flex-1 text-xs"
          data-testid={TestIds.THEME_EXPORT_BTN}
          type="button"
          onClick={handleExport}
        >
          {FM('themeSettings.export')}
        </button>
        <button
          aria-label={showImport ? FM('themeSettings.hideImport') : FM('themeSettings.showImport')}
          className="btn btn-secondary flex-1 text-xs"
          data-testid={TestIds.THEME_IMPORT_TOGGLE_BTN}
          type="button"
          onClick={toggleImport}
        >
          {showImport ? FM('common.cancel') : FM('themeSettings.import')}
        </button>
      </div>

      {showImport ? <div className="space-y-2">
          <textarea
            aria-label={FM('themeSettings.importJsonLabel')}
            className="input min-h-24 font-mono text-xs"
            data-testid={TestIds.THEME_IMPORT_TEXTAREA}
            placeholder={FM('themeSettings.importPlaceholder')}
            value={importJson}
            onChange={handleImportJsonChange}
          />
          {importError !== '' && <p className="text-xs text-error-500" data-testid={TestIds.THEME_IMPORT_ERROR}>{importError}</p>}
          <button
            aria-label={FM('themeSettings.importTheme')}
            className="btn btn-secondary w-full text-xs"
            data-testid={TestIds.THEME_IMPORT_BTN}
            disabled={isImportDisabled}
            type="button"
            onClick={handleImport}
          >
            {FM('themeSettings.importTheme')}
          </button>
        </div> : null}
    </section>
  );
};
