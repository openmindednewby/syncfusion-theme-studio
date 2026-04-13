import { memo } from 'react';

import { FEATHER_ICON_ENTRIES } from '@/components/icons/featherIconEntries';
import { FM } from '@/localization/utils/helpers';

import FilterableIconGrid from './FilterableIconGrid';

const CODE = 'import { FeatherArrowRight, FeatherCheck } from \'@/components/icons\';\n\n<FeatherArrowRight />\n<FeatherCheck className="h-5 w-5 text-status-success" />';

const FeatherIconsSection = ({ filter }: { filter: string }): JSX.Element | null => (
  <FilterableIconGrid
    codeSnippet={CODE}
    description={FM('components.iconsShowcase.featherIconsDescription')}
    filter={filter}
    icons={FEATHER_ICON_ENTRIES}
    title={FM('components.iconsShowcase.featherIcons')}
  />
);

export default memo(FeatherIconsSection);
