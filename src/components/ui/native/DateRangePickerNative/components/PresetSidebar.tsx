import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';

import { CUSTOM_RANGE_ID, PRESET_RANGES } from '../constants';

import type { PresetRange } from '../types';

interface PresetSidebarProps {
  activePreset: string;
  onSelectPreset: (preset: PresetRange) => void;
  onCustomRange: () => void;
}

const PresetSidebar = memo(({ activePreset, onSelectPreset, onCustomRange }: PresetSidebarProps): JSX.Element => (
  <div className="native-daterange-sidebar">
    {PRESET_RANGES.map((preset) => (
      <button
        key={preset.id}
        className={cn('native-daterange-preset', activePreset === preset.id && 'native-daterange-preset--active')}
        type="button"
        onClick={() => onSelectPreset(preset)}
      >
        {FM(preset.labelKey)}
      </button>
    ))}
    <button
      className={cn('native-daterange-preset', activePreset === CUSTOM_RANGE_ID && 'native-daterange-preset--active')}
      type="button"
      onClick={onCustomRange}
    >
      {FM('components.datepickerShowcase.presets.customRange')}
    </button>
  </div>
));

PresetSidebar.displayName = 'PresetSidebar';

export default PresetSidebar;
