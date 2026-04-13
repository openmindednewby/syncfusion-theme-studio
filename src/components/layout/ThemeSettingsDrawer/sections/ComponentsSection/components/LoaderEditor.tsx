import { FM } from '@/localization/utils/helpers';
import type { LoaderConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { SidebarTextField } from './SidebarTextField';
import { ColorPicker } from '../../../components/ColorPicker';

interface LoaderEditorProps {
  config: LoaderConfig;
  onUpdate: (updates: Partial<LoaderConfig>) => void;
}

export const LoaderEditor = ({ config, onUpdate }: LoaderEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.loader.title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.loader.colorsSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.loader.spinnerColor')}
            value={config.spinnerColor}
            onChange={(v) => onUpdate({ spinnerColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.loader.trackColor')}
            value={config.trackColor}
            onChange={(v) => onUpdate({ trackColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.loader.iconColor')}
            value={config.iconColor}
            onChange={(v) => onUpdate({ iconColor: v })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.loader.dimensionsSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <SidebarTextField
            label={FM('themeSettings.components.loader.size')}
            placeholder="40px"
            value={config.size}
            onChange={(v) => onUpdate({ size: v })}
          />
          <SidebarTextField
            label={FM('themeSettings.components.loader.borderWidth')}
            placeholder="4px"
            value={config.borderWidth}
            onChange={(v) => onUpdate({ borderWidth: v })}
          />
          <SidebarTextField
            label={FM('themeSettings.components.loader.iconSize')}
            placeholder="20px"
            value={config.iconSize}
            onChange={(v) => onUpdate({ iconSize: v })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.loader.animationSection')}
        </p>
        <div className="pl-2">
          <SidebarTextField
            label={FM('themeSettings.components.loader.animationDuration')}
            placeholder="800ms"
            value={config.animationDuration}
            onChange={(v) => onUpdate({ animationDuration: v })}
          />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
