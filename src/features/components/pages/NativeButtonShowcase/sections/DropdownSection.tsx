/**
 * DropdownSection - Demonstrates chevrons, dropdown triggers, and menu items.
 */
import { memo, useState, useCallback, useEffect } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

export const DropdownSection = memo((): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (): void => setOpen(false);
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <section className="card space-y-4" data-testid={TestIds.NATIVE_DROPDOWN_SECTION}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.buttonShowcase.sections.dropdown')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.buttonShowcase.sections.dropdownDesc')}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {/* Dropdown trigger with chevron */}
        <div className="relative" role="presentation" onMouseDown={(e) => e.stopPropagation()}>
          <button
            aria-expanded={open}
            className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors"
            style={{
              borderColor: 'var(--component-select-border-default)',
              backgroundColor: 'var(--component-select-background)',
              color: 'var(--component-select-text-color)',
            }}
            type="button"
            onClick={toggleOpen}
          >
            {FM('components.buttonShowcase.dropdownTrigger')}
            <svg
              className="transition-transform"
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
              viewBox="0 0 24 24"
              width="16"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {open ? (
            <div
              className="absolute left-0 top-full z-10 mt-1 min-w-[160px] rounded-md border py-1"
              role="menu"
              style={{
                borderColor: 'var(--component-menu-popup-border)',
                backgroundColor: 'var(--component-menu-popup-bg)',
                boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)',
              }}
            >
              <button
                className="block w-full px-3 py-2 text-left text-sm transition-colors hover:opacity-80"
                role="menuitem"
                style={{ color: 'var(--component-menu-popup-text)' }}
                type="button"
              >
                {FM('components.buttonShowcase.dropdownItem1')}
              </button>
              <button
                className="block w-full px-3 py-2 text-left text-sm transition-colors hover:opacity-80"
                role="menuitem"
                style={{ color: 'var(--component-menu-popup-text)' }}
                type="button"
              >
                {FM('components.buttonShowcase.dropdownItem2')}
              </button>
              <button
                className="block w-full px-3 py-2 text-left text-sm transition-colors hover:opacity-80"
                role="menuitem"
                style={{ color: 'var(--component-menu-popup-text)' }}
                type="button"
              >
                {FM('components.buttonShowcase.dropdownItem3')}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
});

DropdownSection.displayName = 'DropdownSection';
