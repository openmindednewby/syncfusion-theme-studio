import { FM } from '@/localization/helpers';
import type { DataGridConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { TextInputRow } from '../../TextInputRow';

interface DataGridColumnRowEditorProps {
  config: DataGridConfig;
  onUpdate: (updates: Partial<DataGridConfig>) => void;
}

const ALIGN_OPTIONS = [
  { value: 'left', labelKey: 'themeSettings.components.dataGrid.alignLeft' },
  { value: 'center', labelKey: 'themeSettings.components.dataGrid.alignCenter' },
  { value: 'right', labelKey: 'themeSettings.components.dataGrid.alignRight' },
] as const;

const VERTICAL_ALIGN_OPTIONS = [
  { value: 'top', labelKey: 'themeSettings.components.dataGrid.alignTop' },
  { value: 'middle', labelKey: 'themeSettings.components.dataGrid.alignMiddle' },
  { value: 'bottom', labelKey: 'themeSettings.components.dataGrid.alignBottom' },
] as const;

const ROW_HEIGHT_COMPACT = '36px';
const ROW_HEIGHT_DEFAULT = '42px';
const ROW_HEIGHT_COMFORTABLE = '52px';

const ROW_HEIGHT_OPTIONS = [
  { value: ROW_HEIGHT_COMPACT, labelKey: 'themeSettings.components.dataGrid.heightCompact' },
  { value: ROW_HEIGHT_DEFAULT, labelKey: 'themeSettings.components.dataGrid.heightDefault' },
  { value: ROW_HEIGHT_COMFORTABLE, labelKey: 'themeSettings.components.dataGrid.heightComfortable' },
] as const;

const SELECT_CLASSES =
  'w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none';

export const DataGridColumnRowEditor = ({
  config,
  onUpdate,
}: DataGridColumnRowEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.dataGrid.columnRowSection')}>
    <div className="space-y-2">
      {/* Default Text Align */}
      <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
        <span className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.dataGrid.defaultTextAlign')}
        </span>
        <select
          aria-label={FM('themeSettings.components.dataGrid.defaultTextAlign')}
          className={SELECT_CLASSES}
          value={config.defaultTextAlign}
          onChange={(e) => onUpdate({ defaultTextAlign: e.target.value })}
        >
          {ALIGN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
          ))}
        </select>
      </div>

      {/* Header Text Align */}
      <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
        <span className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.dataGrid.headerTextAlign')}
        </span>
        <select
          aria-label={FM('themeSettings.components.dataGrid.headerTextAlign')}
          className={SELECT_CLASSES}
          value={config.headerTextAlign}
          onChange={(e) => onUpdate({ headerTextAlign: e.target.value })}
        >
          {ALIGN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
          ))}
        </select>
      </div>

      {/* Default Vertical Align */}
      <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
        <span className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.dataGrid.defaultVerticalAlign')}
        </span>
        <select
          aria-label={FM('themeSettings.components.dataGrid.defaultVerticalAlign')}
          className={SELECT_CLASSES}
          value={config.defaultVerticalAlign}
          onChange={(e) => onUpdate({ defaultVerticalAlign: e.target.value })}
        >
          {VERTICAL_ALIGN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
          ))}
        </select>
      </div>

      {/* Header Vertical Align */}
      <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
        <span className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.dataGrid.headerVerticalAlign')}
        </span>
        <select
          aria-label={FM('themeSettings.components.dataGrid.headerVerticalAlign')}
          className={SELECT_CLASSES}
          value={config.headerVerticalAlign}
          onChange={(e) => onUpdate({ headerVerticalAlign: e.target.value })}
        >
          {VERTICAL_ALIGN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
          ))}
        </select>
      </div>

      {/* Header Text Padding */}
      <TextInputRow
        label={FM('themeSettings.components.dataGrid.headerTextPadding')}
        value={config.headerTextPadding}
        onChange={(value) => onUpdate({ headerTextPadding: value })}
      />

      {/* Cell Padding */}
      <TextInputRow
        label={FM('themeSettings.components.dataGrid.cellPadding')}
        value={config.cellPadding}
        onChange={(value) => onUpdate({ cellPadding: value })}
      />

      {/* Row Height */}
      <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
        <span className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.dataGrid.rowHeight')}
        </span>
        <select
          aria-label={FM('themeSettings.components.dataGrid.rowHeight')}
          className={SELECT_CLASSES}
          value={config.rowHeight}
          onChange={(e) => onUpdate({ rowHeight: e.target.value })}
        >
          {ROW_HEIGHT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
          ))}
        </select>
      </div>
    </div>
  </CollapsibleSection>
);
