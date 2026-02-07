import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import {
  ButtonsSection,
  CardsSection,
  ColorsSection,
  DataGridSection,
  InputsSection,
} from './sections';

const ComponentsPage = (): JSX.Element => (
  <div className="space-y-8" data-testid={TestIds.SHOWCASE_GRID}>
    <h2 className="text-2xl font-bold text-text-primary">{FM('components.title')}</h2>

    {/* Colors */}
    <ColorsSection />

    {/* Buttons */}
    <ButtonsSection />

    {/* Inputs */}
    <InputsSection />

    {/* DataGrid */}
    <DataGridSection />

    {/* Cards and Badges */}
    <CardsSection />
  </div>
);

export default ComponentsPage;
