import { CopyableCodeSnippet } from '@/components/common';
import { FM } from '@/localization/utils/helpers';

import ColorCard from './ColorCard';
import { ColorSectionDemo } from './ColorSectionDemo';

import type { ColorSection as ColorSectionData } from '../data/colorSectionsData';

interface ColorSectionProps {
  section: ColorSectionData;
}

const ColorSection = ({ section }: ColorSectionProps): JSX.Element => (
  <section className="card space-y-4">
    <h3 className="text-lg font-semibold text-text-primary">
      {FM(section.titleKey)}
    </h3>
    <div className="flex flex-wrap gap-4">
      {section.cards.map((card) => (
        <ColorCard key={card.title} card={card} />
      ))}
    </div>
    <ColorSectionDemo cards={section.cards} titleKey={section.titleKey} />
    <CopyableCodeSnippet code={section.codeSnippet} />
  </section>
);

export default ColorSection;
