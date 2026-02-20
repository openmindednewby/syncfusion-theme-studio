import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

interface SidebarNavItem {
  icon: string;
  label: string;
  active?: boolean;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { icon: '\u2302', label: 'Dashboard' },
  { icon: '\u2261', label: 'Analytics', active: true },
  { icon: '\u2630', label: 'Reports' },
  { icon: '\u263A', label: 'Customers' },
  { icon: '\u2699', label: 'Settings' },
];

const NAV_CODE = [
  '.sidebar { background: var(--component-sidebar-background); }',
  '.sidebar-item:hover { background: var(--component-sidebar-hover-bg); }',
  '.sidebar-item.active {',
  '  background: var(--component-sidebar-active-bg);',
  '  color: var(--component-sidebar-active-text);',
  '}',
].join('\n');

const SEARCH_CODE = [
  '.sidebar-search {',
  '  background: var(--component-sidebar-search-bg);',
  '  border: 1px solid var(--component-sidebar-search-border);',
  '  color: var(--component-sidebar-search-text);',
  '}',
  '.sidebar-search:focus {',
  '  background: var(--component-sidebar-search-focus-bg);',
  '  border-color: var(--component-sidebar-search-focus-border);',
  '}',
].join('\n');

const SCOPED_STYLES = `
.sb-demo { background: var(--component-sidebar-background); border-color: var(--component-sidebar-border-right); }
.sb-demo-item { color: var(--component-sidebar-text-color); font-size: var(--component-sidebar-font-size); font-weight: var(--component-sidebar-font-weight); }
.sb-demo-item:hover { background: var(--component-sidebar-hover-bg); }
.sb-demo-item[data-active="true"] { background: var(--component-sidebar-active-bg); color: var(--component-sidebar-active-text); }
.sb-demo-item[data-active="true"]:hover { background: var(--component-sidebar-active-bg); }
.sb-demo-icon { font-size: var(--component-sidebar-icon-size, 18px); }
.sb-demo-search { background: var(--component-sidebar-search-bg); border: 1px solid var(--component-sidebar-search-border); border-radius: var(--component-sidebar-search-radius); color: var(--component-sidebar-search-text); font-size: var(--component-sidebar-search-font-size); padding: var(--component-sidebar-search-padding); }
.sb-demo-search:focus { background: var(--component-sidebar-search-focus-bg); border-color: var(--component-sidebar-search-focus-border); outline: none; }
`;

const SidebarShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.SIDEBAR_SHOWCASE}>
    <style dangerouslySetInnerHTML={{ __html: SCOPED_STYLES }} />
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.sidebarShowcase.title')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.sidebarShowcase.description')}
        </p>
      </div>

      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.sidebarShowcase.navigationTitle')}
        </h3>
        <p className="text-sm text-text-secondary">
          {FM('components.sidebarShowcase.navigationDescription')}
        </p>
        <div className="sb-demo w-64 rounded-lg border">
          <nav className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="sb-demo-item flex cursor-default items-center gap-3 px-4 py-2.5 transition-colors"
                data-active={item.active === true}
              >
                <span className="sb-demo-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
        <CopyableCodeSnippet code={NAV_CODE} />
      </section>

      <section className="card space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.sidebarShowcase.searchTitle')}
        </h3>
        <p className="text-sm text-text-secondary">
          {FM('components.sidebarShowcase.searchDescription')}
        </p>
        <div className="sb-demo w-64 rounded-lg border p-3">
          <input
            className="sb-demo-search w-full"
            placeholder="Search..."
            type="text"
          />
        </div>
        <CopyableCodeSnippet code={SEARCH_CODE} />
      </section>
    </div>
  </div>
);

export default SidebarShowcase;
