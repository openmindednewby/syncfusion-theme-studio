/**
 * Syncfusion DataGrid Showcase page.
 *
 * Demonstrates all DataGrid features: sorting, filtering, grouping,
 * editing, selection, column features, aggregates, toolbar, context menu,
 * detail rows, drag-and-drop, and virtualization.
 */
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  AlertManagementSection,
  BasicGridSection,
  PaginationSection,
  GroupingSection,
  EditingSection,
  SelectionSection,
  ColumnFeaturesSection,
  AggregatesSection,
  ToolbarSection,
  DetailRowSection,
  DragDropSection,
  VirtualizationSection,
} from './sections';

const SyncfusionGridShowcase = (): JSX.Element => (
  <div className="space-y-8" data-testid={TestIds.SYNCFUSION_GRID_SHOWCASE}>
    <div>
      <h2 className="text-2xl font-bold text-text-primary">
        {FM('components.gridShowcase.syncfusionTitle')}
      </h2>
      <p className="mt-1 text-text-secondary">
        {FM('components.gridShowcase.syncfusionDescription')}
      </p>
    </div>

    <AlertManagementSection />
    <BasicGridSection />
    <PaginationSection />
    <GroupingSection />
    <EditingSection />
    <SelectionSection />
    <ColumnFeaturesSection />
    <AggregatesSection />
    <ToolbarSection />
    <DetailRowSection />
    <DragDropSection />
    <VirtualizationSection />
  </div>
);

export default SyncfusionGridShowcase;
