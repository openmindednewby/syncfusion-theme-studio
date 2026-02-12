import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import {
  AggregatesSection,
  BasicGridSection,
  EditingSection,
  GroupingSection,
  PaginationSection,
  SelectionSection,
} from './sections';

const NativeGridShowcase = (): JSX.Element => (
  <div className="h-full overflow-y-auto p-6" data-testid={TestIds.NATIVE_GRID_SHOWCASE}>
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          {FM('components.gridShowcase.nativeTitle')}
        </h2>
        <p className="mt-1 text-text-secondary">
          {FM('components.gridShowcase.nativeDescription')}
        </p>
      </div>

      <BasicGridSection />
      <PaginationSection />
      <SelectionSection />
      <GroupingSection />
      <AggregatesSection />
      <EditingSection />
    </div>
  </div>
);

export default NativeGridShowcase;
