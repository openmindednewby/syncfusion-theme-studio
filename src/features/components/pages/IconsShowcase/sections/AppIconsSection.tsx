import { memo } from 'react';

import {
  CyberWatchLogo,
  IconActivity,
  IconBarChart,
  IconBell,
  IconChevronLeft,
  IconCog,
  IconDashboard,
  IconDownload,
  IconFilter,
  IconFolder,
  IconFormInput,
  IconGlobe,
  IconKey,
  IconLayout,
  IconMessageSquare,
  IconMoreVertical,
  IconPalette,
  IconPieChart,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconShieldAlert,
  IconShieldCheck,
  IconSignal,
  IconStore,
  IconUser,
  IconWrench,
  IconZap,
} from '@/components/icons';
import { FM } from '@/localization/utils/helpers';

import FilterableIconGrid from './FilterableIconGrid';

const APP_ICONS = [
  { name: 'CyberWatchLogo', icon: CyberWatchLogo },
  { name: 'IconActivity', icon: IconActivity },
  { name: 'IconBarChart', icon: IconBarChart },
  { name: 'IconBell', icon: IconBell },
  { name: 'IconChevronLeft', icon: IconChevronLeft },
  { name: 'IconCog', icon: IconCog },
  { name: 'IconDashboard', icon: IconDashboard },
  { name: 'IconDownload', icon: IconDownload },
  { name: 'IconFilter', icon: IconFilter },
  { name: 'IconFolder', icon: IconFolder },
  { name: 'IconFormInput', icon: IconFormInput },
  { name: 'IconGlobe', icon: IconGlobe },
  { name: 'IconKey', icon: IconKey },
  { name: 'IconLayout', icon: IconLayout },
  { name: 'IconMessageSquare', icon: IconMessageSquare },
  { name: 'IconMoreVertical', icon: IconMoreVertical },
  { name: 'IconPalette', icon: IconPalette },
  { name: 'IconPieChart', icon: IconPieChart },
  { name: 'IconRefresh', icon: IconRefresh },
  { name: 'IconSearch', icon: IconSearch },
  { name: 'IconSettings', icon: IconSettings },
  { name: 'IconShieldAlert', icon: IconShieldAlert },
  { name: 'IconShieldCheck', icon: IconShieldCheck },
  { name: 'IconSignal', icon: IconSignal },
  { name: 'IconStore', icon: IconStore },
  { name: 'IconUser', icon: IconUser },
  { name: 'IconWrench', icon: IconWrench },
  { name: 'IconZap', icon: IconZap },
] as const;

const CODE = 'import { IconBell, IconSearch, IconUser } from \'@/components/icons\';\n\n<IconBell />\n<IconSearch className="h-5 w-5" />\n<IconUser className="h-6 w-6 text-primary-400" />';

const AppIconsSection = ({ filter }: { filter: string }): JSX.Element | null => (
  <FilterableIconGrid
    codeSnippet={CODE}
    filter={filter}
    icons={APP_ICONS}
    title={FM('components.iconsShowcase.appIcons')}
  />
);

export default memo(AppIconsSection);
