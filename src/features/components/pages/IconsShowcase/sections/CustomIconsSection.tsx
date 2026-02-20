import { memo } from 'react';

import { CUSTOM_ICON_ENTRIES } from '@/components/icons/customIconEntries';
import { FM } from '@/localization/helpers';

import FilterableIconGrid from './FilterableIconGrid';

const CODE = 'import { CUSTOM_ICON_ENTRIES } from \'@/components/icons/customIconEntries\';\n\nconst { icon: MyIcon } = CUSTOM_ICON_ENTRIES[0];\n<MyIcon className="h-5 w-5" />';

const CustomIconsSection = ({ filter }: { filter: string }): JSX.Element | null => (
  <FilterableIconGrid
    codeSnippet={CODE}
    description={FM('components.iconsShowcase.customIconsDescription')}
    filter={filter}
    icons={CUSTOM_ICON_ENTRIES}
    title={FM('components.iconsShowcase.customIcons')}
  />
);

export default memo(CustomIconsSection);
