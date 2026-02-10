import { FM } from '@/localization/helpers';
import type { FlexAlign, FlexBoxConfig, FlexDirection, FlexJustify, FlexWrap } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';
import { TextInputRow } from '../../TextInputRow';

interface FlexBoxEditorProps {
  config: FlexBoxConfig;
  onUpdate: (updates: Partial<FlexBoxConfig>) => void;
}

const DIRECTION_OPTIONS: Array<{ value: FlexDirection; labelKey: string }> = [
  { value: 'row', labelKey: 'themeSettings.components.flexBox.directionRow' },
  { value: 'column', labelKey: 'themeSettings.components.flexBox.directionColumn' },
  { value: 'row-reverse', labelKey: 'themeSettings.components.flexBox.directionRowReverse' },
  { value: 'column-reverse', labelKey: 'themeSettings.components.flexBox.directionColumnReverse' },
];

const WRAP_OPTIONS: Array<{ value: FlexWrap; labelKey: string }> = [
  { value: 'nowrap', labelKey: 'themeSettings.components.flexBox.wrapNone' },
  { value: 'wrap', labelKey: 'themeSettings.components.flexBox.wrapWrap' },
  { value: 'wrap-reverse', labelKey: 'themeSettings.components.flexBox.wrapReverse' },
];

const JUSTIFY_OPTIONS: Array<{ value: FlexJustify; labelKey: string }> = [
  { value: 'flex-start', labelKey: 'themeSettings.components.flexBox.justifyStart' },
  { value: 'center', labelKey: 'themeSettings.components.flexBox.justifyCenter' },
  { value: 'flex-end', labelKey: 'themeSettings.components.flexBox.justifyEnd' },
  { value: 'space-between', labelKey: 'themeSettings.components.flexBox.justifySpaceBetween' },
  { value: 'space-around', labelKey: 'themeSettings.components.flexBox.justifySpaceAround' },
  { value: 'space-evenly', labelKey: 'themeSettings.components.flexBox.justifySpaceEvenly' },
];

const ALIGN_OPTIONS: Array<{ value: FlexAlign; labelKey: string }> = [
  { value: 'flex-start', labelKey: 'themeSettings.components.flexBox.alignStart' },
  { value: 'center', labelKey: 'themeSettings.components.flexBox.alignCenter' },
  { value: 'flex-end', labelKey: 'themeSettings.components.flexBox.alignEnd' },
  { value: 'stretch', labelKey: 'themeSettings.components.flexBox.alignStretch' },
  { value: 'baseline', labelKey: 'themeSettings.components.flexBox.alignBaseline' },
];

const DIRECTION_MAP = new Map<string, FlexDirection>(DIRECTION_OPTIONS.map((o) => [o.value, o.value]));
const WRAP_MAP = new Map<string, FlexWrap>(WRAP_OPTIONS.map((o) => [o.value, o.value]));
const JUSTIFY_MAP = new Map<string, FlexJustify>(JUSTIFY_OPTIONS.map((o) => [o.value, o.value]));
const ALIGN_MAP = new Map<string, FlexAlign>(ALIGN_OPTIONS.map((o) => [o.value, o.value]));

export const FlexBoxEditor = ({ config, onUpdate }: FlexBoxEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.flexBox.title')}>
    <div className="space-y-4">
      {/* Container Styling */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.flexBox.containerSection')}
        </p>
        <ColorPicker
          label={FM('themeSettings.components.flexBox.containerBackground')}
          value={config.containerBackground}
          onChange={(value) => onUpdate({ containerBackground: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.flexBox.containerBorderColor')}
          value={config.containerBorderColor}
          onChange={(value) => onUpdate({ containerBorderColor: value })}
        />
        <TextInputRow
          label={FM('themeSettings.components.flexBox.containerBorderRadius')}
          value={config.containerBorderRadius}
          onChange={(value) => onUpdate({ containerBorderRadius: value })}
        />
        <TextInputRow
          label={FM('themeSettings.components.flexBox.containerPadding')}
          value={config.containerPadding}
          onChange={(value) => onUpdate({ containerPadding: value })}
        />
      </div>

      {/* Flex Behavior */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.flexBox.behaviorSection')}
        </p>
        <TextInputRow
          label={FM('themeSettings.components.flexBox.gap')}
          value={config.gap}
          onChange={(value) => onUpdate({ gap: value })}
        />
        <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
          <span className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.flexBox.direction')}
          </span>
          <select
            aria-label={FM('themeSettings.components.flexBox.direction')}
            className="w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
            value={config.direction}
            onChange={(e) => onUpdate({ direction: DIRECTION_MAP.get(e.target.value) ?? 'row' })}
          >
            {DIRECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
          <span className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.flexBox.wrap')}
          </span>
          <select
            aria-label={FM('themeSettings.components.flexBox.wrap')}
            className="w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
            value={config.wrap}
            onChange={(e) => onUpdate({ wrap: WRAP_MAP.get(e.target.value) ?? 'wrap' })}
          >
            {WRAP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
          <span className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.flexBox.justifyContent')}
          </span>
          <select
            aria-label={FM('themeSettings.components.flexBox.justifyContent')}
            className="w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
            value={config.justifyContent}
            onChange={(e) => onUpdate({ justifyContent: JUSTIFY_MAP.get(e.target.value) ?? 'flex-start' })}
          >
            {JUSTIFY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2 rounded bg-surface-sunken px-3 py-2">
          <span className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.flexBox.alignItems')}
          </span>
          <select
            aria-label={FM('themeSettings.components.flexBox.alignItems')}
            className="w-32 rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary focus:border-primary-500 focus:outline-none"
            value={config.alignItems}
            onChange={(e) => onUpdate({ alignItems: ALIGN_MAP.get(e.target.value) ?? 'stretch' })}
          >
            {ALIGN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{FM(opt.labelKey)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Item Styling */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.flexBox.itemSection')}
        </p>
        <ColorPicker
          label={FM('themeSettings.components.flexBox.itemBackground')}
          value={config.itemBackground}
          onChange={(value) => onUpdate({ itemBackground: value })}
        />
        <ColorPicker
          label={FM('themeSettings.components.flexBox.itemBorderColor')}
          value={config.itemBorderColor}
          onChange={(value) => onUpdate({ itemBorderColor: value })}
        />
        <TextInputRow
          label={FM('themeSettings.components.flexBox.itemBorderRadius')}
          value={config.itemBorderRadius}
          onChange={(value) => onUpdate({ itemBorderRadius: value })}
        />
        <TextInputRow
          label={FM('themeSettings.components.flexBox.itemPadding')}
          value={config.itemPadding}
          onChange={(value) => onUpdate({ itemPadding: value })}
        />
      </div>
    </div>
  </CollapsibleSection>
);
