import * as Custom from './CustomIcons';

import type { IconProps } from './types';

type IconComponent = (props: IconProps) => JSX.Element;

interface IconEntry {
  name: string;
  icon: IconComponent;
}

const ICON_PREFIX = 'Icon';

type IconModule = Record<string, IconComponent>;

const customModule: IconModule = Custom;

export const CUSTOM_ICON_ENTRIES: IconEntry[] = Object.entries(customModule)
  .filter(([key]) => key.startsWith(ICON_PREFIX))
  .map(([name, icon]) => ({ name, icon }))
  .sort((a, b) => a.name.localeCompare(b.name));
