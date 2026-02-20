import { memo } from 'react';

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowIcon,
  BoldIcon,
  ChartIcon,
  CopyIcon,
  CutIcon,
  DeleteIcon,
  FolderDemoIcon,
  HomeIcon,
  ItalicIcon,
  PasteIcon,
  RedoIcon,
  SaveIcon,
  SearchDemoIcon,
  SettingsDemoIcon,
  ShareDemoIcon,
  StarIcon,
  UnderlineIcon,
  UndoIcon,
} from '@/components/icons';
import { FM } from '@/localization/helpers';

import FilterableIconGrid from './FilterableIconGrid';

const SHOWCASE_ICONS = [
  { name: 'AlignCenterIcon', icon: AlignCenterIcon },
  { name: 'AlignLeftIcon', icon: AlignLeftIcon },
  { name: 'AlignRightIcon', icon: AlignRightIcon },
  { name: 'ArrowIcon', icon: ArrowIcon },
  { name: 'BoldIcon', icon: BoldIcon },
  { name: 'ChartIcon', icon: ChartIcon },
  { name: 'CopyIcon', icon: CopyIcon },
  { name: 'CutIcon', icon: CutIcon },
  { name: 'DeleteIcon', icon: DeleteIcon },
  { name: 'FolderDemoIcon', icon: FolderDemoIcon },
  { name: 'HomeIcon', icon: HomeIcon },
  { name: 'ItalicIcon', icon: ItalicIcon },
  { name: 'PasteIcon', icon: PasteIcon },
  { name: 'RedoIcon', icon: RedoIcon },
  { name: 'SaveIcon', icon: SaveIcon },
  { name: 'SearchDemoIcon', icon: SearchDemoIcon },
  { name: 'SettingsDemoIcon', icon: SettingsDemoIcon },
  { name: 'ShareDemoIcon', icon: ShareDemoIcon },
  { name: 'StarIcon', icon: StarIcon },
  { name: 'UnderlineIcon', icon: UnderlineIcon },
  { name: 'UndoIcon', icon: UndoIcon },
] as const;

const CODE = 'import { HomeIcon, SaveIcon, StarIcon } from \'@/components/icons\';\n\n<HomeIcon />\n<StarIcon className="h-5 w-5 text-warning-500" />';

const ShowcaseIconsSection = ({ filter }: { filter: string }): JSX.Element | null => (
  <FilterableIconGrid
    codeSnippet={CODE}
    filter={filter}
    icons={SHOWCASE_ICONS}
    title={FM('components.iconsShowcase.showcaseIcons')}
  />
);

export default memo(ShowcaseIconsSection);
