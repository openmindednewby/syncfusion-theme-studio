import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

import ColorSection from './components/ColorSection';
import NeutralStrip from './components/NeutralStrip';
import { COLOR_SECTIONS } from './data/colorSectionsData';

const ColorsShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={ComponentTestIds.COLORS_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.colorsShowcase.title')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.colorsShowcase.description')}
        </p>
      </div>

      {COLOR_SECTIONS.map((section) => (
        <ColorSection key={section.titleKey} section={section} />
      ))}

      <NeutralStrip />
    </div>
  </div>
);

export default ColorsShowcase;
