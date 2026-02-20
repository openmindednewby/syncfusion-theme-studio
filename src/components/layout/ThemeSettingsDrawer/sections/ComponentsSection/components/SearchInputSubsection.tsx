import { FM } from '@/localization/utils/helpers';
import type { SidebarComponentConfig } from '@/stores/theme/types';

import { SidebarTextField } from './SidebarTextField';
import { ColorPicker } from '../../../components/ColorPicker';

interface SearchInputSubsectionProps {
  config: SidebarComponentConfig;
  onUpdate: (updates: Partial<SidebarComponentConfig>) => void;
}

export const SearchInputSubsection = ({ config, onUpdate }: SearchInputSubsectionProps): JSX.Element => (
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
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchBackground')}
        placeholder="rgba(0, 0, 0, 0.3)"
        value={config.searchBackground}
        onChange={(value) => onUpdate({ searchBackground: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchBorder')}
        placeholder="rgba(255, 255, 255, 0.1)"
        value={config.searchBorder}
        onChange={(value) => onUpdate({ searchBorder: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchPlaceholderColor')}
        placeholder="rgba(209, 213, 219, 0.5)"
        value={config.searchPlaceholderColor}
        onChange={(value) => onUpdate({ searchPlaceholderColor: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchFocusBackground')}
        placeholder="rgba(0, 0, 0, 0.4)"
        value={config.searchFocusBackground}
        onChange={(value) => onUpdate({ searchFocusBackground: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchFocusBorder')}
        placeholder="rgba(255, 255, 255, 0.2)"
        value={config.searchFocusBorder}
        onChange={(value) => onUpdate({ searchFocusBorder: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchBorderRadius')}
        placeholder="8px"
        value={config.searchBorderRadius}
        onChange={(value) => onUpdate({ searchBorderRadius: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchFontSize')}
        placeholder="13px"
        value={config.searchFontSize}
        onChange={(value) => onUpdate({ searchFontSize: value })}
      />
      <SidebarTextField
        label={FM('themeSettings.components.sidebar.searchPadding')}
        placeholder="8px 12px 8px 36px"
        value={config.searchPadding}
        onChange={(value) => onUpdate({ searchPadding: value })}
      />
    </div>
  </div>
);
