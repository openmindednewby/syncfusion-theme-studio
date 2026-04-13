
import * as FeatherA from './FeatherIconsA';
import * as FeatherB from './FeatherIconsB';
import * as FeatherC1 from './FeatherIconsC1';
import * as FeatherC2 from './FeatherIconsC2';
import * as FeatherD from './FeatherIconsD';
import * as FeatherE from './FeatherIconsE';
import * as FeatherF from './FeatherIconsF';
import * as FeatherG from './FeatherIconsG';
import * as FeatherH from './FeatherIconsH';
import * as FeatherI from './FeatherIconsI';
import * as FeatherL from './FeatherIconsL';
import * as FeatherM from './FeatherIconsM';
import * as FeatherN from './FeatherIconsN';
import * as FeatherO from './FeatherIconsO';
import * as FeatherP from './FeatherIconsP';
import * as FeatherR from './FeatherIconsR';
import * as FeatherS1 from './FeatherIconsS1';
import * as FeatherS2 from './FeatherIconsS2';
import * as FeatherT from './FeatherIconsT';
import * as FeatherU from './FeatherIconsU';
import * as FeatherV from './FeatherIconsV';
import * as FeatherW from './FeatherIconsW';
import * as FeatherX from './FeatherIconsX';
import * as FeatherY from './FeatherIconsY';
import * as FeatherZ from './FeatherIconsZ';

import type { IconProps } from './types';

type IconComponent = (props: IconProps) => JSX.Element;

interface IconEntry {
  name: string;
  icon: IconComponent;
}

const ICON_PREFIX = 'Icon';

type IconModule = Record<string, IconComponent>;

const modules: IconModule[] = [
  FeatherA, FeatherB, FeatherC1, FeatherC2, FeatherD,
  FeatherE, FeatherF, FeatherG, FeatherH, FeatherI,
  FeatherL, FeatherM, FeatherN, FeatherO, FeatherP,
  FeatherR, FeatherS1, FeatherS2, FeatherT, FeatherU,
  FeatherV, FeatherW, FeatherX, FeatherY, FeatherZ,
];

export const FEATHER_ICON_ENTRIES: IconEntry[] = modules
  .flatMap((mod) =>
    Object.entries(mod)
      .filter(([key]) => key.startsWith(ICON_PREFIX))
      .map(([name, icon]) => ({ name, icon })),
  )
  .sort((a, b) => a.name.localeCompare(b.name));
