import { RoutePath } from '@/app/routePaths';
import { IconChevronRight, IconHome } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import type { BreadcrumbItem } from '../types';

interface Props {
  readonly items: BreadcrumbItem[];
  readonly onNavigate: (url: string) => void;
}

export const HeaderBreadcrumb = ({ items, onNavigate }: Props): JSX.Element => (
  <nav
    aria-label={FM('header.breadcrumb')}
    className="flex items-center gap-1.5 text-sm"
    data-testid={TestIds.HEADER_BREADCRUMB_NAV}
  >
    <button
      aria-label={FM('header.home')}
      className="sidebar-item rounded-md p-1 hover:bg-[color:var(--component-sidebar-hover-bg)]"
      data-testid={TestIds.HEADER_BREADCRUMB_HOME}
      type="button"
      onClick={() => onNavigate(RoutePath.Dashboard)}
    >
      <IconHome className="h-4 w-4" />
    </button>

    {items.map((item) => {
      const { url } = item;
      return (
      <span key={item.label} className="flex items-center gap-1.5">
        <IconChevronRight className="h-3.5 w-3.5 text-text-secondary" />
        {isValueDefined(url) && (
          <button
            className="sidebar-item rounded-md px-1 hover:text-[color:var(--component-sidebar-active-text)] hover:bg-[color:var(--component-sidebar-hover-bg)]"
            type="button"
            onClick={() => onNavigate(url)}
          >
            {item.label}
          </button>
        )}
        {!isValueDefined(url) && (
          <span
            aria-current="page"
            className="font-medium text-[color:var(--component-header-text-color)]"
          >
            {item.label}
          </span>
        )}
      </span>
      );
    })}
  </nav>
);
