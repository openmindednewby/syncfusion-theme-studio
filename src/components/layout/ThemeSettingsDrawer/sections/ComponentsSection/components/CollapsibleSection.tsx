import { useState, type ReactNode, useId } from 'react';

import { ChevronDownIcon } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

interface CollapsibleSectionProps {
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  propertyCount?: number;
  title: string;
}

export const CollapsibleSection = ({
  children,
  defaultOpen = false,
  icon,
  propertyCount,
  title,
}: CollapsibleSectionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const regionId = useId();

  const toggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const ariaLabel = isOpen
    ? FM('accessibility.collapseSection', title)
    : FM('accessibility.expandSection', title);

  return (
    <div className="collapsible-section overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:border-primary-200">
      <button
        aria-controls={regionId}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="collapsible-header flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-surface-elevated"
        type="button"
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          {isValueDefined(icon) ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
              {icon}
            </div>
          ) : null}
          <div className="flex flex-col">
            <span className="text-sm font-medium capitalize text-text-primary">{title}</span>
            {isValueDefined(propertyCount) && (
              <span className="text-[10px] text-text-muted">
                {propertyCount} {FM('themeSettings.components.properties')}
              </span>
            )}
          </div>
        </div>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </div>
      </button>

      <div
        className={`collapsible-content transition-all duration-200 ease-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isOpen ? (
          <div
            className="space-y-3 border-t border-border bg-surface-elevated/30 px-4 py-4"
            id={regionId}
            role="region"
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};
