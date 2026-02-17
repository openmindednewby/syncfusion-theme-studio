import { FM } from '@/localization/helpers';
import type { SidebarComponentConfig } from '@/stores/theme/types';


import { AnimationSubsection } from './AnimationSubsection';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface SidebarEditorProps {
  config: SidebarComponentConfig;
  onUpdate: (updates: Partial<SidebarComponentConfig>) => void;
}

const TEXT_INPUT_CLASS = 'w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary';

export const SidebarEditor = ({ config, onUpdate }: SidebarEditorProps): JSX.Element => {
  return (
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
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.fontSize')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="14px"
              type="text"
              value={config.fontSize}
              onChange={(e) => onUpdate({ fontSize: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.fontWeight')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="500"
              type="text"
              value={config.fontWeight}
              onChange={(e) => onUpdate({ fontWeight: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Icons Subsection */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.sidebar.iconsTitle')}
        </p>
        <div className="space-y-2 pl-2">
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.iconSize')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="18px"
              type="text"
              value={config.iconSize}
              onChange={(e) => onUpdate({ iconSize: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.iconStrokeWidth')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="1.8"
              type="text"
              value={config.iconStrokeWidth}
              onChange={(e) => onUpdate({ iconStrokeWidth: e.target.value })}
            />
          </div>
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
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.expandAnimationDuration')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              disabled={!config.expandAnimationEnabled}
              placeholder="200ms"
              type="text"
              value={config.expandAnimationDuration}
              onChange={(e) => onUpdate({ expandAnimationDuration: e.target.value })}
            />
          </div>
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

      {/* Search Input Subsection */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-secondary">
          {FM('themeSettings.components.sidebar.searchTitle')}
        </p>
        <div className="space-y-2 pl-2">
          <ColorPicker
            label={FM('themeSettings.components.sidebar.searchTextColor')}
            value={config.searchTextColor}
            onChange={(value) => onUpdate({ searchTextColor: value })}
          />
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchBackground')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="rgba(0, 0, 0, 0.3)"
              type="text"
              value={config.searchBackground}
              onChange={(e) => onUpdate({ searchBackground: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchBorder')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="rgba(255, 255, 255, 0.1)"
              type="text"
              value={config.searchBorder}
              onChange={(e) => onUpdate({ searchBorder: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchPlaceholderColor')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="rgba(209, 213, 219, 0.5)"
              type="text"
              value={config.searchPlaceholderColor}
              onChange={(e) => onUpdate({ searchPlaceholderColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchFocusBackground')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="rgba(0, 0, 0, 0.4)"
              type="text"
              value={config.searchFocusBackground}
              onChange={(e) => onUpdate({ searchFocusBackground: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchFocusBorder')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="rgba(255, 255, 255, 0.2)"
              type="text"
              value={config.searchFocusBorder}
              onChange={(e) => onUpdate({ searchFocusBorder: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchBorderRadius')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="8px"
              type="text"
              value={config.searchBorderRadius}
              onChange={(e) => onUpdate({ searchBorderRadius: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchFontSize')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="13px"
              type="text"
              value={config.searchFontSize}
              onChange={(e) => onUpdate({ searchFontSize: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.sidebar.searchPadding')}
            </label>
            <input
              className={TEXT_INPUT_CLASS}
              placeholder="8px 12px 8px 36px"
              type="text"
              value={config.searchPadding}
              onChange={(e) => onUpdate({ searchPadding: e.target.value })}
            />
          </div>
        </div>
      </div>

      <AnimationSubsection
        animationDuration={config.transitionDuration}
        showEffectSelector={false}
        onDurationChange={(duration) => onUpdate({ transitionDuration: duration })}
      />
    </CollapsibleSection>
  );
};
