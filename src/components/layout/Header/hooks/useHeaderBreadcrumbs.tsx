import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { IconHome } from '@/components/icons';
import type { BreadcrumbItem } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

export function useHeaderBreadcrumbs(): BreadcrumbItem[] {
  const { pathname } = useLocation();

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    const homeItem: BreadcrumbItem = {
      text: FM('header.home'),
      url: RoutePath.Dashboard,
      icon: <IconHome className="h-4 w-4" />,
      testId: TestIds.HEADER_BREADCRUMB_HOME,
      ariaLabel: FM('header.home'),
    };

    if (segments.length === 0) return [homeItem];

    // Skip leading "dashboard" segment — the home icon already represents it
    const skipCount = segments[0] === 'dashboard' ? 1 : 0;
    const displaySegments = segments.slice(skipCount);
    if (displaySegments.length === 0) return [homeItem];

    const pathItems = displaySegments.map((segment, index): BreadcrumbItem => {
      const isLast = index === displaySegments.length - 1;

      if (isLast) return { text: getSegmentLabel(segment) };
      return {
        text: getSegmentLabel(segment),
        url: `/${segments.slice(0, skipCount + index + 1).join('/')}`,
      };
    });

    return [homeItem, ...pathItems];
  }, [pathname]);
}

const SEGMENT_LABELS: Record<string, string> = {
  // Top-level sections
  dashboard: 'sidebar.nav.dashboard',
  products: 'sidebar.nav.products',
  components: 'sidebar.nav.components',
  forms: 'sidebar.nav.forms',

  // Dashboard children
  home: 'sidebar.nav.dashboardOverview',
  overview: 'sidebar.nav.dashboardOverview',
  metrics: 'sidebar.nav.dashboardMetrics',
  kpis: 'sidebar.nav.dashboardKpis',

  // Component library
  native: 'menu.native',
  syncfusion: 'menu.syncfusion',
  button: 'menu.button',
  input: 'menu.input',
  select: 'menu.select',
  checkbox: 'menu.checkbox',
  datepicker: 'menu.datepicker',
  dialog: 'menu.dialog',
  alert: 'menu.alert',
  alertbadge: 'menu.alertBadge',
  flexbox: 'menu.flexBox',
  grid: 'menu.grid',
  toast: 'menu.toast',
  toggle: 'menu.toggle',
  toolbar: 'menu.toolbar',
  menu: 'menu.menu',
  accordion: 'menu.accordion',
  breadcrumb: 'menu.breadcrumb',
  tabs: 'menu.tabs',
  timeline: 'menu.timeline',
  tag: 'menu.tag',
  badge: 'menu.badge',
  avatar: 'menu.avatar',
  card: 'menu.card',
  chip: 'menu.chip',
  progressbar: 'menu.progressbar',
  tooltip: 'menu.tooltip',
  icons: 'menu.icons',
  colors: 'menu.colors',
  textdescription: 'menu.textDescription',
  externallink: 'menu.externalLink',
  sidebar: 'menu.sidebar',
  themetoggle: 'menu.themeToggle',
  navmenu: 'menu.navMenu',
  searchpanel: 'menu.searchPanel',
  skeletonloader: 'menu.skeletonLoader',

  // Maps
  maps: 'sidebar.nav.maps',

  // Gantt
  gantt: 'sidebar.nav.gantt',

  // Editor
  editor: 'sidebar.nav.editor',


  // Business section
  customers: 'sidebar.nav.customers',
  invoices: 'sidebar.nav.invoices',
  orders: 'sidebar.nav.orders',
  inventory: 'sidebar.nav.inventory',
  settings: 'sidebar.nav.settings',

  // SIEM features
  'alerts-incidents': 'sidebar.nav.alertsIncidents',
  'alerts-management': 'sidebar.nav.alertsManagement',
  'incidents-management': 'sidebar.nav.incidentsManagement',
  marketplace: 'sidebar.nav.marketplace',

  // Admin Hub
  admin: 'sidebar.nav.adminHub',
  'user-management': 'sidebar.subNav.userManagement',
  'role-management': 'sidebar.subNav.roleManagement',
  'theme-editor': 'sidebar.subNav.themeEditor',
  'system-settings': 'sidebar.subNav.systemSettings',
  integrations: 'sidebar.subNav.integrations',
  plugins: 'sidebar.subNav.plugins',
  documentation: 'sidebar.subNav.documentation',
  support: 'sidebar.subNav.support',
};

function getSegmentLabel(segment: string): string {
  const i18nKey = SEGMENT_LABELS[segment];
  if (isValueDefined(i18nKey)) return FM(i18nKey);
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
