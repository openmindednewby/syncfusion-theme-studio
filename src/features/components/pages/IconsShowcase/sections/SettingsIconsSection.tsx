import { memo } from 'react';

import {
  CheckIcon,
  ChevronDownIcon,
  DrawerMoonIcon,
  DrawerSunIcon,
  ExportIcon,
  GridIcon,
  IconCogDetailed,
  ImportIcon,
  LayoutSectionIcon,
  PuzzleIcon,
  ResetIcon,
  SettingsPaletteIcon,
  ShareSectionIcon,
  SlidersIcon,
  SwatchesIcon,
  TableIcon,
  TextIcon,
  ThemeMoonIcon,
  ThemeSunIcon,
  WandIcon,
} from '@/components/icons';
import { FM } from '@/localization/helpers';

import FilterableIconGrid from './FilterableIconGrid';

const SETTINGS_ICONS = [
  { name: 'CheckIcon', icon: CheckIcon },
  { name: 'ChevronDownIcon', icon: ChevronDownIcon },
  { name: 'DrawerMoonIcon', icon: DrawerMoonIcon },
  { name: 'DrawerSunIcon', icon: DrawerSunIcon },
  { name: 'ExportIcon', icon: ExportIcon },
  { name: 'GridIcon', icon: GridIcon },
  { name: 'IconCogDetailed', icon: IconCogDetailed },
  { name: 'ImportIcon', icon: ImportIcon },
  { name: 'LayoutSectionIcon', icon: LayoutSectionIcon },
  { name: 'PuzzleIcon', icon: PuzzleIcon },
  { name: 'ResetIcon', icon: ResetIcon },
  { name: 'SettingsPaletteIcon', icon: SettingsPaletteIcon },
  { name: 'ShareSectionIcon', icon: ShareSectionIcon },
  { name: 'SlidersIcon', icon: SlidersIcon },
  { name: 'SwatchesIcon', icon: SwatchesIcon },
  { name: 'TableIcon', icon: TableIcon },
  { name: 'TextIcon', icon: TextIcon },
  { name: 'ThemeMoonIcon', icon: ThemeMoonIcon },
  { name: 'ThemeSunIcon', icon: ThemeSunIcon },
  { name: 'WandIcon', icon: WandIcon },
] as const;

const CODE = 'import { CheckIcon, WandIcon, ExportIcon } from \'@/components/icons\';\n\n<WandIcon />\n<ExportIcon className="h-5 w-5" />';

const SettingsIconsSection = ({ filter }: { filter: string }): JSX.Element | null => (
  <FilterableIconGrid
    codeSnippet={CODE}
    filter={filter}
    icons={SETTINGS_ICONS}
    title={FM('components.iconsShowcase.settingsIcons')}
  />
);

export default memo(SettingsIconsSection);
