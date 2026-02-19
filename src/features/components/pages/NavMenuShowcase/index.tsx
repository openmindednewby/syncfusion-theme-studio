import { CopyableCodeSnippet } from '@/components/common';
import { NavMenu } from '@/features/components/shared/NavMenu';
import type { NavMenuItem } from '@/features/components/shared/NavMenu';
import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

const BASIC_ITEMS: NavMenuItem[] = [
  { text: 'Home', icon: '\u2302' },
  { text: 'Dashboard', icon: '\u25A3' },
  { text: 'Analytics', icon: '\u2261', active: true },
  { text: 'Reports', icon: '\u2630' },
  { text: 'Settings', icon: '\u2699' },
];

const NESTED_ITEMS: NavMenuItem[] = [
  { text: 'Overview', icon: '\u2302' },
  { text: 'Products', icon: '\u25A3', children: [{ text: 'All Products' }, { text: 'Categories' }] },
  { text: 'Orders', icon: '\u2630', active: true },
  { text: 'Customers', icon: '\u263A' },
  { text: 'Analytics', icon: '\u2261', children: [{ text: 'Traffic' }, { text: 'Revenue' }] },
];

const NavMenuShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.NAV_MENU_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{FM('components.navMenuShowcase.title')}</h2>
        <p className="mt-1 text-text-secondary">{FM('components.navMenuShowcase.description')}</p>
      </div>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.navMenuShowcase.basicTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.navMenuShowcase.basicDescription')}</p>
        <NavMenu items={BASIC_ITEMS} testId="nav-menu-basic" />
        <CopyableCodeSnippet code={'<NavMenu items={[\n  { text: "Home", icon: "\\u2302" },\n  { text: "Analytics", icon: "\\u2261", active: true },\n]} />'} />
      </section>
      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">{FM('components.navMenuShowcase.nestedTitle')}</h3>
        <p className="text-sm text-text-secondary">{FM('components.navMenuShowcase.nestedDescription')}</p>
        <NavMenu items={NESTED_ITEMS} testId="nav-menu-nested" />
        <CopyableCodeSnippet code={'<NavMenu items={[\n  { text: "Products", icon: "\\u25A3", children: [...] },\n  { text: "Orders", icon: "\\u2630", active: true },\n]} />'} />
      </section>
    </div>
  </div>
);

export default NavMenuShowcase;
