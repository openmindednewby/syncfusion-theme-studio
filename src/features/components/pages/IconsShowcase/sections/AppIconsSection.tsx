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
import { FM } from '@/localization/helpers';

import IconCard from './IconCard';

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

const AppIconsSection = (): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.iconsShowcase.appIcons')}
    </h3>
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {APP_ICONS.map((entry) => (
        <IconCard key={entry.name} icon={entry.icon} name={entry.name} />
      ))}
    </div>
  </section>
);

export default memo(AppIconsSection);
