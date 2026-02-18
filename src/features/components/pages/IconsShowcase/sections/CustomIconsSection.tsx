import { memo } from 'react';

import { CUSTOM_ICON_ENTRIES } from '@/components/icons/customIconEntries';
import { FM } from '@/localization/helpers';

import IconCard from './IconCard';

const CustomIconsSection = (): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.iconsShowcase.customIcons')}
    </h3>
    <p className="text-sm text-text-secondary">
      {FM('components.iconsShowcase.customIconsDescription')}
    </p>
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {CUSTOM_ICON_ENTRIES.map((entry) => (
        <IconCard key={entry.name} icon={entry.icon} name={entry.name} />
      ))}
    </div>
  </section>
);

export default memo(CustomIconsSection);
