import { FM } from '@/localization/utils/helpers';
import type { DatePickerConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../../components/ColorPicker';
import { EditorTextInput } from '../../../components/EditorTextInput';

interface DatePickerEditorProps {
  config: DatePickerConfig;
  onUpdate: (updates: Partial<DatePickerConfig>) => void;
}

type CfgKey = keyof DatePickerConfig;

const t = (key: string): string => FM(`themeSettings.components.datePicker.${key}`);

const ColorRow = ({ keys, config, onUpdate }: {
  keys: CfgKey[]; config: DatePickerConfig; onUpdate: (u: Partial<DatePickerConfig>) => void;
}): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-2 pl-2">
      {keys.map((k) => (
        <ColorPicker key={k} label={t(k)} value={config[k]} onChange={(v) => onUpdate({ [k]: v })} />
      ))}
    </div>
  );
};

const Group = ({ label, keys, config, onUpdate }: {
  label: string; keys: CfgKey[]; config: DatePickerConfig; onUpdate: (u: Partial<DatePickerConfig>) => void;
}): JSX.Element => {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">{t(label)}</p>
      <ColorRow config={config} keys={keys} onUpdate={onUpdate} />
    </div>
  );
};

const TEXT_TYPOGRAPHY_KEYS: CfgKey[] = [
  'calendarFontFamily', 'headerFontSize', 'headerFontWeight',
  'dayFontSize', 'dayFontWeight', 'weekDayFontSize',
  'weekDayFontWeight', 'inputFontSize', 'labelFontSize',
];

const TEXT_SIZING_KEYS: CfgKey[] = [
  'panelWidth', 'panelPadding', 'panelBorderRadius',
  'dayCellSize', 'headerHeight', 'headerPadding', 'navButtonSize', 'inputHeight',
];

const TextGroup = ({ label, keys, config, onUpdate }: {
  label: string; keys: CfgKey[]; config: DatePickerConfig; onUpdate: (u: Partial<DatePickerConfig>) => void;
}): JSX.Element => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-text-secondary">{t(label)}</p>
    <div className="grid grid-cols-2 gap-2 pl-2">
      {keys.map((k) => (
        <EditorTextInput key={k} label={t(k)} value={config[k]} onChange={(v) => onUpdate({ [k]: v })} />
      ))}
    </div>
  </div>
);

export const DatePickerEditor = ({ config, onUpdate }: DatePickerEditorProps): JSX.Element => (
  <CollapsibleSection title={t('title')}>
    <div className="space-y-4">
      <Group config={config} keys={['labelColor']} label="labelSection" onUpdate={onUpdate} />
      <Group config={config} keys={['background', 'textColor', 'iconColor', 'placeholderColor']} label="inputSection" onUpdate={onUpdate} />
      <Group config={config} keys={['borderDefault', 'borderHover', 'borderFocus', 'borderError', 'focusRingColor']} label="borderSection" onUpdate={onUpdate} />
      <Group config={config} keys={['calendarBackground', 'calendarBorderColor', 'calendarHeaderBackground', 'calendarHeaderTextColor']} label="calendarPopupSection" onUpdate={onUpdate} />
      <Group config={config} keys={['weekHeaderBorderColor', 'weekDayLabelColor']} label="weekHeaderSection" onUpdate={onUpdate} />
      <Group config={config} keys={['dayTextColor', 'navArrowColor', 'calendarCellHoverBackground', 'calendarOtherMonthTextColor']} label="dayCellsSection" onUpdate={onUpdate} />
      <Group config={config} keys={['calendarSelectedBackground', 'calendarSelectedTextColor', 'calendarTodayBorderColor', 'selectedBorderColor']} label="selectionSection" onUpdate={onUpdate} />
      <Group config={config} keys={['rangeBackground', 'rangeTextColor', 'rangeSeparatorBackground', 'rangeSeparatorBorderColor', 'rangeSeparatorIconColor']} label="rangeSection" onUpdate={onUpdate} />
      <TextGroup config={config} keys={TEXT_TYPOGRAPHY_KEYS} label="typographySection" onUpdate={onUpdate} />
      <TextGroup config={config} keys={TEXT_SIZING_KEYS} label="sizingSection" onUpdate={onUpdate} />
    </div>
  </CollapsibleSection>
);
