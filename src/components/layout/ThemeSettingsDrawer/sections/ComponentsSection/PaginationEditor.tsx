import { FM } from '@/localization/helpers';
import type { PaginationConfig } from '@/stores/theme/types/paginationTypes';

import { CollapsibleSection } from './CollapsibleSection';
import { ColorPicker } from '../../ColorPicker';

interface PaginationEditorProps {
  config: PaginationConfig;
  onUpdate: (updates: Partial<PaginationConfig>) => void;
}

export const PaginationEditor = ({ config, onUpdate }: PaginationEditorProps): JSX.Element => (
  <CollapsibleSection title={FM('themeSettings.components.pagination.title')}>
    <ColorPicker
      label={FM('themeSettings.components.pagination.background')}
      value={config.background}
      onChange={(value) => onUpdate({ background: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.borderColor')}
      value={config.borderColor}
      onChange={(value) => onUpdate({ borderColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonBackground')}
      value={config.buttonBackground}
      onChange={(value) => onUpdate({ buttonBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonTextColor')}
      value={config.buttonTextColor}
      onChange={(value) => onUpdate({ buttonTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonHoverBackground')}
      value={config.buttonHoverBackground}
      onChange={(value) => onUpdate({ buttonHoverBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonHoverTextColor')}
      value={config.buttonHoverTextColor}
      onChange={(value) => onUpdate({ buttonHoverTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonActiveBackground')}
      value={config.buttonActiveBackground}
      onChange={(value) => onUpdate({ buttonActiveBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.buttonActiveTextColor')}
      value={config.buttonActiveTextColor}
      onChange={(value) => onUpdate({ buttonActiveTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.navTextColor')}
      value={config.navTextColor}
      onChange={(value) => onUpdate({ navTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.navDisabledColor')}
      value={config.navDisabledColor}
      onChange={(value) => onUpdate({ navDisabledColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.selectBackground')}
      value={config.selectBackground}
      onChange={(value) => onUpdate({ selectBackground: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.selectBorderColor')}
      value={config.selectBorderColor}
      onChange={(value) => onUpdate({ selectBorderColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.selectTextColor')}
      value={config.selectTextColor}
      onChange={(value) => onUpdate({ selectTextColor: value })}
    />
    <ColorPicker
      label={FM('themeSettings.components.pagination.infoTextColor')}
      value={config.infoTextColor}
      onChange={(value) => onUpdate({ infoTextColor: value })}
    />
  </CollapsibleSection>
);
