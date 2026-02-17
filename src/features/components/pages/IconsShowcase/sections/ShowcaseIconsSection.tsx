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

import IconCard from './IconCard';

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

const ShowcaseIconsSection = (): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM('components.iconsShowcase.showcaseIcons')}
    </h3>
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {SHOWCASE_ICONS.map((entry) => (
        <IconCard key={entry.name} icon={entry.icon} name={entry.name} />
      ))}
    </div>
  </section>
);

export default memo(ShowcaseIconsSection);
