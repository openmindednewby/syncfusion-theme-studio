import { useState, type ReactNode, useId } from 'react';

import { FM } from '@/localization/helpers';

const ChevronDownIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

const ChevronRightIcon = (): JSX.Element => (
  <svg aria-hidden="true" className="h-4 w-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

interface CollapsibleSectionProps {
  children: ReactNode;
  defaultOpen?: boolean;
  title: string;
}

export const CollapsibleSection = ({
  children,
  defaultOpen = false,
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
    <div className="rounded border border-border bg-surface-sunken">
      <button
        aria-controls={regionId}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-surface"
        type="button"
        onClick={toggle}
      >
        <span className="text-xs font-medium capitalize text-text-primary">{title}</span>
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
      </button>
      {isOpen ? <div className="space-y-3 border-t border-border px-3 py-3" id={regionId} role="region">{children}</div> : null}
    </div>
  );
};
