import { FM } from '@/localization/utils/helpers';
import type { SkeletonLoaderConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { SidebarTextField } from './SidebarTextField';
import { ColorPicker } from '../../../components/ColorPicker';

interface SkeletonLoaderEditorProps {
  config: SkeletonLoaderConfig;
  onUpdate: (updates: Partial<SkeletonLoaderConfig>) => void;
}

export const SkeletonLoaderEditor = ({ config, onUpdate }: SkeletonLoaderEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.skeletonLoader.title')}>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.skeletonLoader.colorsSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.skeletonLoader.baseColor')}
            value={config.baseColor}
            onChange={(v) => onUpdate({ baseColor: v })}
          />
          <ColorPicker
            label={FM('themeSettings.components.skeletonLoader.shimmerColor')}
            value={config.shimmerColor}
            onChange={(v) => onUpdate({ shimmerColor: v })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.skeletonLoader.dimensionsSection')}
        </p>
        <div className="grid grid-cols-2 gap-2 pl-2">
          <SidebarTextField
            label={FM('themeSettings.components.skeletonLoader.borderRadius')}
            placeholder="4px"
            value={config.borderRadius}
            onChange={(v) => onUpdate({ borderRadius: v })}
          />
          <SidebarTextField
            label={FM('themeSettings.components.skeletonLoader.animationDuration')}
            placeholder="1.5s"
            value={config.animationDuration}
            onChange={(v) => onUpdate({ animationDuration: v })}
          />
        </div>
      </div>
    </div>
  </CollapsibleSection>
);
