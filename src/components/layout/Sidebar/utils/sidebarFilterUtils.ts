/**
 * Utility functions for filtering sidebar navigation items
 * by search query and user permissions.
 * Matches against translated label text (via FM) at all nesting levels.
 */
import { FM } from '@/localization/utils/helpers';
import { type Permission } from '@/shared/permissions';
import { isValueDefined } from '@/utils/is';

import { isSubNavGroup, type NavChild } from '../components/NavExpandableItem';
import {
  type SidebarExpandableItem,
  type SidebarNavEntry,
  type SidebarNavItem,
  isExpandableEntry,
} from '../sidebarNavData';

export function filterMainNavItems(
  items: SidebarNavEntry[],
  query: string,
  userPermissions: Permission[] = [],
): SidebarNavEntry[] {
  const permissionFiltered = items.filter((entry) =>
    hasPermission(entry.requiredPermission, userPermissions),
  );
  if (query === '') return permissionFiltered;
  return filterBySearch(permissionFiltered, query.toLowerCase());
}

export function filterBottomNavItems(
  items: SidebarNavItem[],
  query: string,
  userPermissions: Permission[] = [],
): SidebarNavItem[] {
  const permissionFiltered = items.filter((item) =>
    hasPermission(item.requiredPermission, userPermissions),
  );
  if (query === '') return permissionFiltered;
  const q = query.toLowerCase();
  return permissionFiltered.filter((item) =>
    FM(item.labelKey).toLowerCase().includes(q),
  );
}

function hasPermission(
  requiredPermission: Permission | undefined,
  userPermissions: Permission[],
): boolean {
  if (!isValueDefined(requiredPermission)) return true;
  return userPermissions.includes(requiredPermission);
}

function filterNavChildren(
  children: NavChild[],
  query: string,
): NavChild[] {
  return children.reduce<NavChild[]>((acc, child) => {
    if (isSubNavGroup(child)) {
      const groupLabel = FM(child.labelKey).toLowerCase();
      if (groupLabel.includes(query)) {
        acc.push(child);
        return acc;
      }
      const filteredItems = child.items.filter((item) =>
        FM(item.labelKey).toLowerCase().includes(query),
      );
      if (filteredItems.length > 0)
        acc.push({ ...child, items: filteredItems });
    } else if (FM(child.labelKey).toLowerCase().includes(query))
      acc.push(child);

    return acc;
  }, []);
}

function searchExpandableEntry(
  entry: SidebarExpandableItem,
  q: string,
  acc: SidebarNavEntry[],
): void {
  if (FM(entry.labelKey).toLowerCase().includes(q)) {
    acc.push(entry);
    return;
  }
  const filteredChildren = filterNavChildren(entry.children, q);
  if (filteredChildren.length > 0)
    acc.push({ ...entry, children: filteredChildren });
}

function filterBySearch(
  items: SidebarNavEntry[],
  q: string,
): SidebarNavEntry[] {
  return items.reduce<SidebarNavEntry[]>((acc, entry) => {
    if (!isExpandableEntry(entry)) {
      if (FM(entry.labelKey).toLowerCase().includes(q)) acc.push(entry);
      return acc;
    }
    searchExpandableEntry(entry, q, acc);
    return acc;
  }, []);
}
