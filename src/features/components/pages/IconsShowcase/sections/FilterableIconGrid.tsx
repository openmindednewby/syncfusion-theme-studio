import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import type { IconProps } from '@/components/icons';
import { isValueDefined } from '@/utils';

import IconCard from './IconCard';

interface IconEntry {
  name: string;
  icon: (props: IconProps) => JSX.Element;
}

interface FilterableIconGridProps {
  title: string;
  description?: string;
  icons: readonly IconEntry[];
  filter: string;
  codeSnippet: string;
}

const FilterableIconGrid = ({
  title,
  description,
  icons,
  filter,
  codeSnippet,
}: FilterableIconGridProps): JSX.Element | null => {
  const filtered = useMemo(() => {
    if (filter === '') return icons;
    const lower = filter.toLowerCase();
    return icons.filter((entry) => entry.name.toLowerCase().includes(lower));
  }, [icons, filter]);

  if (filtered.length === 0) return null;

  const hasDescription = isValueDefined(description) && description !== '';
  const isFiltering = filter !== '';

  return (
    <section className="card space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      {hasDescription ? <p className="text-sm text-text-secondary">{description}</p> : null}
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {filtered.map((entry) => (
          <IconCard key={entry.name} icon={entry.icon} name={entry.name} />
        ))}
      </div>
      {isFiltering ? null : <CopyableCodeSnippet code={codeSnippet} />}
    </section>
  );
};

export default memo(FilterableIconGrid);
