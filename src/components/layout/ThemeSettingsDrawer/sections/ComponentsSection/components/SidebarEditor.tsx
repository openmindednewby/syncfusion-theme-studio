import { FM } from '@/localization/utils/helpers';
import type { SidebarComponentConfig } from '@/stores/theme/types';

import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { SearchInputSubsection } from './SearchInputSubsection';
import { SidebarTextField } from './SidebarTextField';
import { ColorPicker } from '../../../components/ColorPicker';

interface SidebarEditorProps {
  config: SidebarComponentConfig;
  onUpdate: (updates: Partial<SidebarComponentConfig>) => void;
}

export const SidebarEditor = ({ config, onUpdate }: SidebarEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.sidebar.title')}>
    <ColorPicker
      label={FM('themeSettings.components.sidebar.background')}
      value={config.background}
      onChange={(value) => onUpdate({ background: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.sidebar.textColor')}
      value={config.textColor}
      onChange={(value) => onUpdate({ textColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.sidebar.activeItemBg')}
      value={config.activeItemBackground}
      onChange={(value) => onUpdate({ activeItemBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.sidebar.activeItemText')}
      value={config.activeItemTextColor}
      onChange={(value) => onUpdate({ activeItemTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.sidebar.hoverItemBg')}
      value={config.hoverItemBackground}
      onChange={(value) => onUpdate({ hoverItemBackground: value })}
    />

    {/* Typography Subsection */}
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.components.sidebar.typographyTitle')}
      </p>
      <div className="space-y-2 pl-2">
        <SidebarTextField
          label={FM('themeSettings.components.sidebar.fontSize')}
          placeholder="14px"
          value={config.fontSize}
          onChange={(value) => onUpdate({ fontSize: value })}
        />
        <SidebarTextField
          label={FM('themeSettings.components.sidebar.fontWeight')}
          placeholder="500"
          value={config.fontWeight}
          onChange={(value) => onUpdate({ fontWeight: value })}
        />
      </div>
    </div>

    {/* Icons Subsection */}
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.components.sidebar.iconsTitle')}
      </p>
      <div className="space-y-2 pl-2">
        <SidebarTextField
          label={FM('themeSettings.components.sidebar.iconSize')}
          placeholder="18px"
          value={config.iconSize}
          onChange={(value) => onUpdate({ iconSize: value })}
        />
        <SidebarTextField
          label={FM('themeSettings.components.sidebar.iconStrokeWidth')}
          placeholder="1.8"
          value={config.iconStrokeWidth}
          onChange={(value) => onUpdate({ iconStrokeWidth: value })}
        />
      </div>
    </div>

    {/* Expand/Collapse Animation Subsection */}
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.components.sidebar.expandAnimationTitle')}
      </p>
      <div className="space-y-2 pl-2">
        <label className="flex items-center gap-2 text-xs text-text-muted">
          <input
            checked={config.expandAnimationEnabled}
            type="checkbox"
            onChange={(e) => onUpdate({ expandAnimationEnabled: e.target.checked })}
          />
          {FM('themeSettings.components.sidebar.expandAnimationEnabled')}
        </label>
        <SidebarTextField
          disabled={!config.expandAnimationEnabled}
          label={FM('themeSettings.components.sidebar.expandAnimationDuration')}
          placeholder="200ms"
          value={config.expandAnimationDuration}
          onChange={(value) => onUpdate({ expandAnimationDuration: value })}
        />
      </div>
    </div>

    {/* Search Highlight Subsection */}
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.components.sidebar.searchHighlightTitle')}
      </p>
      <div className="space-y-2 pl-2">
        <ColorPicker
          label={FM('themeSettings.components.sidebar.searchHighlightColor')}
          value={config.searchHighlightColor}
          onChange={(value) => onUpdate({ searchHighlightColor: value })}
        />
        <SidebarTextField
          label={FM('themeSettings.components.sidebar.searchHighlightScale')}
          placeholder="1.05"
          value={config.searchHighlightScale}
          onChange={(value) => onUpdate({ searchHighlightScale: value })}
        />
      </div>
    </div>

    {/* Scrollbar Subsection */}
    <div className="space-y-2">
      <p className="text-xs font-medium text-text-secondary">
        {FM('themeSettings.components.sidebar.scrollbarTitle')}
      </p>
      <div className="space-y-2 pl-2">
        <label className="flex items-center gap-2 text-xs text-text-muted">
          <input
            checked={config.showScrollbar}
            type="checkbox"
            onChange={(e) => onUpdate({ showScrollbar: e.target.checked })}
          />
          {FM('themeSettings.components.sidebar.showScrollbar')}
        </label>
      </div>
    </div>

    <SearchInputSubsection config={config} onUpdate={onUpdate} />

    <AnimationSubsection
      animationDuration={config.transitionDuration}
      showEffectSelector={false}
      onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
    />
  </CollapsibleSection>
);
