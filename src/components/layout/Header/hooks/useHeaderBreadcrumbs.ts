import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils';

import type { BreadcrumbItem } from '../types';

export function useHeaderBreadcrumbs(): BreadcrumbItem[] {
  const { pathname } = useLocation();

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const dashboardIndex = segments.indexOf('dashboard');
    const crumbSegments =
      dashboardIndex >= 0 ? segments.slice(dashboardIndex + 1) : [];

    return crumbSegments.map((segment, index) => {
      const isLast = index === crumbSegments.length - 1;

      return {
        label: getSegmentLabel(segment),
        ...(isLast
          ? {}
          : { url: `/dashboard/${crumbSegments.slice(0, index + 1).join('/')}` }),
      };
    });
  }, [pathname]);
}

const SEGMENT_LABELS: Record<string, string> = {
  components: 'sidebar.nav.components',
  products: 'sidebar.nav.products',
  forms: 'sidebar.nav.forms',
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
  textdescription: 'menu.textDescription',
  externallink: 'menu.externalLink',
  sidebar: 'menu.sidebar',
  themetoggle: 'menu.themeToggle',
  navmenu: 'menu.navMenu',
};

function getSegmentLabel(segment: string): string {
  const i18nKey = SEGMENT_LABELS[segment];
  if (isValueDefined(i18nKey)) return FM(i18nKey);
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}