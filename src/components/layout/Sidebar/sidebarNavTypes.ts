import type { RoutePrefix } from '@/app/routePaths';
import type { Permission } from '@/shared/permissions';

import type { NavChild } from './components/NavExpandableItem';
import type { IconName } from './utils/iconName';
import type { SubNavId } from './utils/subNavId';

/** A simple (non-expandable) nav item */
export interface SidebarNavItem {
  id: string;
  labelKey: string;
  testId: string;
  path?: string;
  iconName: IconName;
  subNavId?: SubNavId;
  requiredPermission?: Permission;
}

/** An expandable nav item with children */
export interface SidebarExpandableItem {
  id: string;
  labelKey: string;
  testId: string;
  expandTestId: string;
  pathPrefix: RoutePrefix;
  iconName: IconName;
  children: NavChild[];
  requiredPermission?: Permission;
}

export type SidebarNavEntry = SidebarNavItem | SidebarExpandableItem;

export function isExpandableEntry(
  entry: SidebarNavEntry,
): entry is SidebarExpandableItem {
  return 'children' in entry;
}
