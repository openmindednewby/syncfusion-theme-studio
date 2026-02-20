/**
 * Navigation data configuration for the sidebar.
 * Matches the Figma mainSideBar.png design with themed SIEM menu items.
 */
import { RoutePath, RoutePrefix } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';

import { IconName } from './utils/iconName';
import { COMPONENTS_CHILDREN } from './utils/sidebarComponentGroups';
import {
  FORMS_CHILDREN,
  PRODUCTS_CHILDREN,
  ALERTS_CHILDREN,
  ATTACK_SURFACE_CHILDREN,
  COMPLIANCE_CHILDREN,
  PERFORMANCE_CHILDREN,
  THREAT_INTEL_CHILDREN,
} from './utils/sidebarNavChildren';
import { THREAT_DETECTION_CHILDREN } from './utils/sidebarThreatDetectionGroups';
import { SubNavId } from './utils/subNavId';

import type { NavChild } from './components/NavExpandableItem';

/** A simple (non-expandable) nav item */
export interface SidebarNavItem {
  id: string;
  labelKey: string;
  testId: string;
  path?: string;
  iconName: IconName;
  subNavId?: SubNavId;
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
}

export type SidebarNavEntry = SidebarNavItem | SidebarExpandableItem;

export function isExpandableEntry(
  entry: SidebarNavEntry,
): entry is SidebarExpandableItem {
  return 'children' in entry;
}

export const MAIN_NAV_ITEMS: SidebarNavEntry[] = [
  {
    id: 'dashboard',
    labelKey: 'sidebar.nav.dashboard',
    testId: TestIds.NAV_HOME,
    path: RoutePath.Dashboard,
    iconName: IconName.Dashboard,
  },
  {
    id: 'products',
    labelKey: 'sidebar.nav.products',
    testId: TestIds.NAV_PRODUCTS,
    expandTestId: TestIds.NAV_PRODUCTS_EXPAND,
    pathPrefix: RoutePrefix.Products,
    iconName: IconName.Folder,
    children: PRODUCTS_CHILDREN,
  },
  {
    id: 'forms',
    labelKey: 'sidebar.nav.forms',
    testId: TestIds.NAV_FORMS,
    expandTestId: TestIds.NAV_FORMS_EXPAND,
    pathPrefix: RoutePrefix.Forms,
    iconName: IconName.FormInput,
    children: FORMS_CHILDREN,
  },
  {
    id: 'components',
    labelKey: 'sidebar.nav.components',
    testId: TestIds.NAV_COMPONENTS,
    expandTestId: TestIds.NAV_COMPONENTS_EXPAND,
    pathPrefix: RoutePrefix.Components,
    iconName: IconName.Layout,
    children: COMPONENTS_CHILDREN,
  },
  {
    id: 'user-rank',
    labelKey: 'sidebar.nav.userRank',
    testId: TestIds.NAV_USER_RANK,
    path: RoutePath.NotImplemented,
    iconName: IconName.User,
  },
  {
    id: 'real-time-analysis',
    labelKey: 'sidebar.nav.realTimeAnalysis',
    testId: TestIds.NAV_REAL_TIME_ANALYSIS,
    path: RoutePath.NotImplemented,
    iconName: IconName.Activity,
  },
  {
    id: 'threat-detection',
    labelKey: 'sidebar.nav.threatDetection',
    testId: TestIds.NAV_THREAT_DETECTION,
    expandTestId: TestIds.NAV_THREAT_DETECTION_EXPAND,
    pathPrefix: RoutePrefix.ThreatDetection,
    iconName: IconName.ShieldAlert,
    children: THREAT_DETECTION_CHILDREN,
  },
  {
    id: 'alerts-incidents',
    labelKey: 'sidebar.nav.alertsIncidents',
    testId: TestIds.NAV_ALERTS_INCIDENTS,
    expandTestId: TestIds.NAV_ALERTS_EXPAND,
    pathPrefix: RoutePrefix.ComponentsGrid,
    iconName: IconName.Bell,
    children: ALERTS_CHILDREN,
  },
  {
    id: 'attack-surface',
    labelKey: 'sidebar.nav.attackSurface',
    testId: TestIds.NAV_ATTACK_SURFACE,
    expandTestId: TestIds.NAV_ATTACK_SURFACE_EXPAND,
    pathPrefix: RoutePrefix.ComponentsButton,
    iconName: IconName.Globe,
    children: ATTACK_SURFACE_CHILDREN,
  },
  {
    id: 'threat-intel',
    labelKey: 'sidebar.nav.threatIntelligence',
    testId: TestIds.NAV_THREAT_INTEL,
    expandTestId: TestIds.NAV_THREAT_INTEL_EXPAND,
    pathPrefix: RoutePrefix.ComponentsInput,
    iconName: IconName.Signal,
    children: THREAT_INTEL_CHILDREN,
  },
  {
    id: 'performance',
    labelKey: 'sidebar.nav.performance',
    testId: TestIds.NAV_PERFORMANCE,
    expandTestId: TestIds.NAV_PERFORMANCE_EXPAND,
    pathPrefix: RoutePrefix.ComponentsSelect,
    iconName: IconName.Zap,
    children: PERFORMANCE_CHILDREN,
  },
  {
    id: 'compliance',
    labelKey: 'sidebar.nav.compliance',
    testId: TestIds.NAV_COMPLIANCE,
    expandTestId: TestIds.NAV_COMPLIANCE_EXPAND,
    pathPrefix: RoutePrefix.ComponentsCheckbox,
    iconName: IconName.ShieldCheck,
    children: COMPLIANCE_CHILDREN,
  },
  {
    id: 'analytics',
    labelKey: 'sidebar.nav.analyticsReporting',
    testId: TestIds.NAV_ANALYTICS,
    path: RoutePath.NotImplemented,
    iconName: IconName.BarChart,
  },
  {
    id: 'soar',
    labelKey: 'sidebar.nav.soar',
    testId: TestIds.NAV_SOAR,
    path: RoutePath.NotImplemented,
    iconName: IconName.Cog,
  },
];

export const BOTTOM_NAV_ITEMS: SidebarNavItem[] = [
  {
    id: 'admin-hub',
    labelKey: 'sidebar.nav.adminHub',
    testId: TestIds.NAV_ADMIN_HUB,
    iconName: IconName.Settings,
    subNavId: SubNavId.AdminHub,
  },
  {
    id: 'marketplace',
    labelKey: 'sidebar.nav.marketplace',
    testId: TestIds.NAV_MARKETPLACE,
    path: RoutePath.NotImplemented,
    iconName: IconName.Store,
  },
];
