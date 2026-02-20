/**
 * Utility functions for filtering sidebar navigation items by search query.
 * Matches against translated label text (via FM) at all nesting levels.
 */
import { FM } from '@/localization/utils/helpers';

import { isSubNavGroup, type NavChild } from '../components/NavExpandableItem';
import {
  type SidebarExpandableItem,
  type SidebarNavEntry,
  type SidebarNavItem,
  isExpandableEntry,
} from '../sidebarNavData';

function filterNavChildren(children: NavChild[], query: string): NavChild[] {
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

export function filterMainNavItems(
  items: SidebarNavEntry[],
  query: string,
): SidebarNavEntry[] {
  if (query === '') return items;
  const q = query.toLowerCase();

  return items.reduce<SidebarNavEntry[]>((acc, entry) => {
    const label = FM(entry.labelKey).toLowerCase();

    if (!isExpandableEntry(entry)) {
      if (label.includes(q)) acc.push(entry);
      return acc;
    }

    if (label.includes(q)) {
      acc.push(entry);
      return acc;
    }

    const filteredChildren = filterNavChildren(entry.children, q);
    if (filteredChildren.length > 0) {
      const narrowed: SidebarExpandableItem = { ...entry, children: filteredChildren };
      acc.push(narrowed);
    }

    return acc;
  }, []);
}

export function filterBottomNavItems(
  items: SidebarNavItem[],
  query: string,
): SidebarNavItem[] {
  if (query === '') return items;
  const q = query.toLowerCase();
  return items.filter((item) => FM(item.labelKey).toLowerCase().includes(q));
}
