import { FM } from '@/localization/helpers';
import type { DatePickerConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DatePickerEditorProps {
  config: DatePickerConfig;
  onUpdate: (updates: Partial<DatePickerConfig>) => void;
}

export const DatePickerEditor = ({ config, onUpdate }: DatePickerEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.datePicker.title')}>
      <div className="space-y-4">
        {/* Input Field Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.datePicker.inputSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.datePicker.background')}
              value={config.background}
              onChange={(value) => onUpdate({ background: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.textColor')}
              value={config.textColor}
              onChange={(value) => onUpdate({ textColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.iconColor')}
              value={config.iconColor}
              onChange={(value) => onUpdate({ iconColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.placeholderColor')}
              value={config.placeholderColor}
              onChange={(value) => onUpdate({ placeholderColor: value })}
            />
          </div>
        </div>

        {/* Border States */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.datePicker.borderSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.datePicker.borderDefault')}
              value={config.borderDefault}
              onChange={(value) => onUpdate({ borderDefault: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.borderHover')}
              value={config.borderHover}
              onChange={(value) => onUpdate({ borderHover: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.borderFocus')}
              value={config.borderFocus}
              onChange={(value) => onUpdate({ borderFocus: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.borderError')}
              value={config.borderError}
              onChange={(value) => onUpdate({ borderError: value })}
            />
          </div>
        </div>

        {/* Calendar Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.datePicker.calendarSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarBackground')}
              value={config.calendarBackground}
              onChange={(value) => onUpdate({ calendarBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarHeaderBackground')}
              value={config.calendarHeaderBackground}
              onChange={(value) => onUpdate({ calendarHeaderBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarHeaderTextColor')}
              value={config.calendarHeaderTextColor}
              onChange={(value) => onUpdate({ calendarHeaderTextColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarCellHoverBackground')}
              value={config.calendarCellHoverBackground}
              onChange={(value) => onUpdate({ calendarCellHoverBackground: value })}
            />
          </div>
        </div>

        {/* Selection Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.datePicker.selectionSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarSelectedBackground')}
              value={config.calendarSelectedBackground}
              onChange={(value) => onUpdate({ calendarSelectedBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarSelectedTextColor')}
              value={config.calendarSelectedTextColor}
              onChange={(value) => onUpdate({ calendarSelectedTextColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarTodayBorderColor')}
              value={config.calendarTodayBorderColor}
              onChange={(value) => onUpdate({ calendarTodayBorderColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.datePicker.calendarOtherMonthTextColor')}
              value={config.calendarOtherMonthTextColor}
              onChange={(value) => onUpdate({ calendarOtherMonthTextColor: value })}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
