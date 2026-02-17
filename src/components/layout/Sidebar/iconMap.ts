/**
 * Maps IconName enum values to icon components.
 */
import {
  IconDashboard,
  IconFolder,
  IconUser,
  IconActivity,
  IconShieldAlert,
  IconBell,
  IconGlobe,
  IconZap,
  IconSignal,
  IconShieldCheck,
  IconBarChart,
  IconCog,
  IconSettings,
  IconStore,
  IconKey,
  IconWrench,
  IconPalette,
  IconFilter,
  IconRefresh,
  IconDownload,
  IconMoreVertical,
  IconLayout,
  IconMessageSquare,
  IconPieChart,
  IconFormInput,
} from '@/components/icons';

import { IconName } from './iconName';

type IconComponent = (props: { className?: string }) => JSX.Element;

const ICON_MAP: Record<IconName, IconComponent> = {
  [IconName.Dashboard]: IconDashboard,
  [IconName.Folder]: IconFolder,
  [IconName.User]: IconUser,
  [IconName.Activity]: IconActivity,
  [IconName.ShieldAlert]: IconShieldAlert,
  [IconName.Bell]: IconBell,
  [IconName.Globe]: IconGlobe,
  [IconName.Zap]: IconZap,
  [IconName.Signal]: IconSignal,
  [IconName.ShieldCheck]: IconShieldCheck,
  [IconName.BarChart]: IconBarChart,
  [IconName.Cog]: IconCog,
  [IconName.Settings]: IconSettings,
  [IconName.Store]: IconStore,
  [IconName.Key]: IconKey,
  [IconName.Wrench]: IconWrench,
  [IconName.Palette]: IconPalette,
  [IconName.Filter]: IconFilter,
  [IconName.Refresh]: IconRefresh,
  [IconName.Download]: IconDownload,
  [IconName.MoreVertical]: IconMoreVertical,
  [IconName.Layout]: IconLayout,
  [IconName.MessageSquare]: IconMessageSquare,
  [IconName.PieChart]: IconPieChart,
  [IconName.FormInput]: IconFormInput,
};

export function getIcon(name: IconName): IconComponent {
  return ICON_MAP[name];
}
