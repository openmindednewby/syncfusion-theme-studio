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
  WandIcon,
} from '@/components/icons';
import { FM } from '@/localization/helpers';

import IconCard from './IconCard';

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
  { name: 'WandIcon', icon: WandIcon },
] as const;

const SettingsIconsSection = (): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.iconsShowcase.settingsIcons')}
    </h3>
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {SETTINGS_ICONS.map((entry) => (
        <IconCard key={entry.name} icon={entry.icon} name={entry.name} />
      ))}
    </div>
  </section>
);

export default memo(SettingsIconsSection);
