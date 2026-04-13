import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  AggregatesSection,
  AlertManagementSection,
  BasicGridSection,
  ThemeStudioDataGridSection,
  EditingSection,
  DataGridSpecSection,
  TableSpecSection,
  GroupingSection,
  InteractivePlaygroundSection,
  PaginationSection,
  SelectionSection,
  SelectionToolbarSection,
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

      <InteractivePlaygroundSection />
      <TableSpecSection />
      <DataGridSpecSection />
      <ThemeStudioDataGridSection />
      <AlertManagementSection />
      <BasicGridSection />
      <PaginationSection />
      <SelectionSection />
      <SelectionToolbarSection />
      <GroupingSection />
      <AggregatesSection />
      <EditingSection />
    </div>
  </div>
);

export default NativeGridShowcase;
