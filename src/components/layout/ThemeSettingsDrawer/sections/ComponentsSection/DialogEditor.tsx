import { FM } from '@/localization/helpers';
import type { DialogConfig } from '@/stores/theme/types';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface DialogEditorProps {
  config: DialogConfig;
  onUpdate: (updates: Partial<DialogConfig>) => void;
}

export const DialogEditor = ({ config, onUpdate }: DialogEditorProps): JSX.Element => {
  return (
    <CollapsibleSection title={FM('themeSettings.components.dialog.title')}>
      <div className="space-y-4">
        {/* Backdrop Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.dialog.backdropSection')}
          </p>
          <div className="space-y-2 pl-2">
            <div className="space-y-1">
              <label className="text-xs text-text-muted">
                {FM('themeSettings.components.dialog.backdropColor')}
              </label>
              <input
                className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
                type="text"
                value={config.backdropColor}
                onChange={(e) => onUpdate({ backdropColor: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-text-muted">
                {FM('themeSettings.components.dialog.backdropBlur')}
              </label>
              <input
                className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
                type="text"
                value={config.backdropBlur}
                onChange={(e) => onUpdate({ backdropBlur: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Content Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.dialog.contentSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.dialog.contentBackground')}
              value={config.contentBackground}
              onChange={(value) => onUpdate({ contentBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.dialog.borderColor')}
              value={config.borderColor}
              onChange={(value) => onUpdate({ borderColor: value })}
            />
          </div>
          <div className="space-y-1 pl-2">
            <label className="text-xs text-text-muted">
              {FM('themeSettings.components.dialog.shadow')}
            </label>
            <input
              className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
              type="text"
              value={config.shadow}
              onChange={(e) => onUpdate({ shadow: e.target.value })}
            />
          </div>
        </div>

        {/* Header Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.dialog.headerSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.dialog.headerBackground')}
              value={config.headerBackground}
              onChange={(value) => onUpdate({ headerBackground: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.dialog.headerTextColor')}
              value={config.headerTextColor}
              onChange={(value) => onUpdate({ headerTextColor: value })}
            />
          </div>
        </div>

        {/* Footer Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.dialog.footerSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.dialog.footerBackground')}
              value={config.footerBackground}
              onChange={(value) => onUpdate({ footerBackground: value })}
            />
          </div>
        </div>

        {/* Close Button Styling */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">
            {FM('themeSettings.components.dialog.closeButtonSection')}
          </p>
          <div className="grid grid-cols-2 gap-2 pl-2">
            <ColorPicker
              label={FM('themeSettings.components.dialog.closeButtonColor')}
              value={config.closeButtonColor}
              onChange={(value) => onUpdate({ closeButtonColor: value })}
            />
            <ColorPicker
              label={FM('themeSettings.components.dialog.closeButtonHoverBackground')}
              value={config.closeButtonHoverBackground}
              onChange={(value) => onUpdate({ closeButtonHoverBackground: value })}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
