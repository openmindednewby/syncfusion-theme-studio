import { FM } from '@/localization/utils/helpers';
import type { SliderConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { SidebarTextField } from './SidebarTextField';
import { ColorPicker } from '../../../components/ColorPicker';

interface SliderEditorProps {
  config: SliderConfig;
  onUpdate: (updates: Partial<SliderConfig>) => void;
}

export const SliderEditor = ({ config, onUpdate }: SliderEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.slider.title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.slider.colorsSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.slider.trackBg')}
            value={config.trackBg}
            onChange={(v) => onUpdate({ trackBg: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.fillColor')}
            value={config.fillColor}
            onChange={(v) => onUpdate({ fillColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.thumbColor')}
            value={config.thumbColor}
            onChange={(v) => onUpdate({ thumbColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.thumbHoverColor')}
            value={config.thumbHoverColor}
            onChange={(v) => onUpdate({ thumbHoverColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.thumbActiveColor')}
            value={config.thumbActiveColor}
            onChange={(v) => onUpdate({ thumbActiveColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.focusRingColor')}
            value={config.focusRingColor}
            onChange={(v) => onUpdate({ focusRingColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.tickColor')}
            value={config.tickColor}
            onChange={(v) => onUpdate({ tickColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.tooltipBg')}
            value={config.tooltipBg}
            onChange={(v) => onUpdate({ tooltipBg: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.slider.tooltipText')}
            value={config.tooltipText}
            onChange={(v) => onUpdate({ tooltipText: v })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.slider.opacitySection')}
        </p>
        <div className="pl-2">
          <SidebarTextField
            label={FM('themeSettings.components.slider.disabledOpacity')}
            placeholder="0.5"
            value={config.disabledOpacity}
            onChange={(v) => onUpdate({ disabledOpacity: v })}
          />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
