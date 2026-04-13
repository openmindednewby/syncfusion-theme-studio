import { describe, it, expect } from 'vitest';

import { Permission } from '@/shared/permissions';

import { filterBottomNavItems, filterMainNavItems } from './sidebarFilterUtils';

import type { SubNavGroup, SubNavItem } from '../components/NavExpandableItem';
import type { SidebarExpandableItem, SidebarNavEntry, SidebarNavItem } from '../sidebarNavTypes';


// FM is globally mocked (setup.ts) to return the key as-is,
// so labelKey values double as the "translated" text for search matching.

function makeSimpleItem(overrides: Partial<SidebarNavItem> = {}): SidebarNavItem {
  return {
    id: 'test-item',
    labelKey: 'dashboard',
    testId: 'test-item',
    iconName: 'dashboard' as SidebarNavItem['iconName'],
    ...overrides,
  };
}

function makeExpandableItem(overrides: Partial<SidebarExpandableItem> = {}): SidebarExpandableItem {
  const childItem: SubNavItem = {
    path: '/products/list',
    labelKey: 'products.list',
    testId: 'products-list',
  };
  return {
    id: 'expandable',
    labelKey: 'products',
    testId: 'expandable',
    expandTestId: 'expandable-toggle',
    pathPrefix: '/products' as SidebarExpandableItem['pathPrefix'],
    iconName: 'box' as SidebarExpandableItem['iconName'],
    children: [childItem],
    ...overrides,
  };
}

describe('sidebarFilterUtils', () => {
  describe('filterMainNavItems', () => {
    it('returns all items when query is empty and no permissions required', () => {
      const items: SidebarNavEntry[] = [makeSimpleItem(), makeExpandableItem()];

      const result = filterMainNavItems(items, '');

      expect(result).toHaveLength(2);
    });

    it('filters out items requiring a permission not in user set', () => {
      const items: SidebarNavEntry[] = [
        makeSimpleItem({ requiredPermission: Permission.AdminAccess }),
        makeSimpleItem({ id: 'open', labelKey: 'open-item' }),
      ];

      const result = filterMainNavItems(items, '', [Permission.ViewDashboard]);

      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('open');
    });

    it('includes items when user has the required permission', () => {
      const items: SidebarNavEntry[] = [
        makeSimpleItem({ requiredPermission: Permission.ViewDashboard }),
      ];

      const result = filterMainNavItems(items, '', [Permission.ViewDashboard]);

      expect(result).toHaveLength(1);
    });

    it('filters simple items by search query matching labelKey', () => {
      const items: SidebarNavEntry[] = [
        makeSimpleItem({ labelKey: 'dashboard' }),
        makeSimpleItem({ id: 'orders', labelKey: 'orders' }),
      ];

      const result = filterMainNavItems(items, 'dash');

      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('test-item');
    });

    it('search is case-insensitive', () => {
      const items: SidebarNavEntry[] = [
        makeSimpleItem({ labelKey: 'Dashboard' }),
      ];

      const result = filterMainNavItems(items, 'DASHBOARD');

      expect(result).toHaveLength(1);
    });

    it('includes expandable item when its labelKey matches the query', () => {
      const items: SidebarNavEntry[] = [makeExpandableItem({ labelKey: 'products' })];

      const result = filterMainNavItems(items, 'prod');

      expect(result).toHaveLength(1);
    });

    it('includes expandable item when a child labelKey matches the query', () => {
      const child: SubNavItem = {
        path: '/products/inventory',
        labelKey: 'inventory',
        testId: 'inventory',
      };
      const items: SidebarNavEntry[] = [
        makeExpandableItem({ labelKey: 'products', children: [child] }),
      ];

      const result = filterMainNavItems(items, 'inventory');

      expect(result).toHaveLength(1);
    });

    it('filters children of expandable items to only matching ones', () => {
      const child1: SubNavItem = { path: '/p/a', labelKey: 'alpha', testId: 'a' };
      const child2: SubNavItem = { path: '/p/b', labelKey: 'beta', testId: 'b' };
      const items: SidebarNavEntry[] = [
        makeExpandableItem({ labelKey: 'parent', children: [child1, child2] }),
      ];

      const result = filterMainNavItems(items, 'alph');

      expect(result).toHaveLength(1);
      const expandable = result[0] as SidebarExpandableItem;
      expect(expandable.children).toHaveLength(1);
      expect(expandable.children[0]!.labelKey).toBe('alpha');
    });

    it('returns empty array when nothing matches', () => {
      const items: SidebarNavEntry[] = [makeSimpleItem({ labelKey: 'dashboard' })];

      const result = filterMainNavItems(items, 'zzzzz');

      expect(result).toHaveLength(0);
    });
  });

  describe('filterBottomNavItems', () => {
    it('returns all items when query is empty', () => {
      const items: SidebarNavItem[] = [makeSimpleItem(), makeSimpleItem({ id: 'second' })];

      const result = filterBottomNavItems(items, '');

      expect(result).toHaveLength(2);
    });

    it('filters by permission', () => {
      const items: SidebarNavItem[] = [
        makeSimpleItem({ requiredPermission: Permission.ManageSettings }),
      ];

      const result = filterBottomNavItems(items, '', [Permission.ViewDashboard]);

      expect(result).toHaveLength(0);
    });

    it('filters by search query on labelKey', () => {
      const items: SidebarNavItem[] = [
        makeSimpleItem({ labelKey: 'settings' }),
        makeSimpleItem({ id: 'help', labelKey: 'help' }),
      ];

      const result = filterBottomNavItems(items, 'set');

      expect(result).toHaveLength(1);
    });
  });

  describe('filterMainNavItems with SubNavGroup children', () => {
    it('includes SubNavGroup when the group labelKey matches', () => {
      const subGroup: SubNavGroup = {
        labelKey: 'analytics',
        testId: 'analytics-group',
        expandTestId: 'analytics-expand',
        items: [{ path: '/a/reports', labelKey: 'reports', testId: 'reports' }],
      };
      const items: SidebarNavEntry[] = [
        makeExpandableItem({ labelKey: 'parent', children: [subGroup] }),
      ];

      const result = filterMainNavItems(items, 'analytics');

      expect(result).toHaveLength(1);
      const expandable = result[0] as SidebarExpandableItem;
      expect(expandable.children).toHaveLength(1);
    });

    it('filters SubNavGroup items when group label does not match but child does', () => {
      const subGroup: SubNavGroup = {
        labelKey: 'analytics',
        testId: 'analytics-group',
        expandTestId: 'analytics-expand',
        items: [
          { path: '/a/reports', labelKey: 'reports', testId: 'reports' },
          { path: '/a/logs', labelKey: 'logs', testId: 'logs' },
        ],
      };
      const items: SidebarNavEntry[] = [
        makeExpandableItem({ labelKey: 'parent', children: [subGroup] }),
      ];

      const result = filterMainNavItems(items, 'reports');

      expect(result).toHaveLength(1);
      const expandable = result[0] as SidebarExpandableItem;
      const filteredGroup = expandable.children[0] as SubNavGroup;
      expect(filteredGroup.items).toHaveLength(1);
      expect(filteredGroup.items[0]!.labelKey).toBe('reports');
    });
  });
});
