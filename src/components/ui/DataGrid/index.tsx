import { memo, useCallback } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Filter,
  Inject,
} from '@syncfusion/ej2-react-grids';
import type { PageSettingsModel, RowSelectEventArgs } from '@syncfusion/ej2-react-grids';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';


const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_SMALL = 25;
const PAGE_SIZE_MEDIUM = 50;
const PAGE_SIZE_LARGE = 100;
const AVAILABLE_PAGE_SIZES = [DEFAULT_PAGE_SIZE, PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE];

const DEFAULT_PAGE_SETTINGS: PageSettingsModel = {
  pageSize: DEFAULT_PAGE_SIZE,
  pageSizes: AVAILABLE_PAGE_SIZES,
};

interface Props<T extends object> {
  /** Data source for the grid */
  data: T[];
  /** Column definitions */
  columns: ColumnModel[];
  /** Enable pagination (default: true) */
  allowPaging?: boolean;
  /** Enable sorting (default: true) */
  allowSorting?: boolean;
  /** Enable filtering (default: false) */
  allowFiltering?: boolean;
  /** Page settings configuration */
  pageSettings?: PageSettingsModel;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Height of the grid */
  height?: string | number;
  /** Callback when a row is selected */
  onRowSelected?: (data: T) => void;
  /** Callback when a row is deselected */
  onRowDeselected?: (data: T) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state message */
  emptyText?: string;
}

const DataGridComponent = <T extends object>({
  data,
  columns,
  allowPaging = true,
  allowSorting = true,
  allowFiltering = false,
  pageSettings = DEFAULT_PAGE_SETTINGS,
  className,
  testId,
  height = 'auto',
  onRowSelected,
  onRowDeselected,
  isLoading = false,
  emptyText = 'No data available',
}: Props<T>): JSX.Element => {
  const handleRowSelected = useCallback(
    (args: RowSelectEventArgs) => {
      // Type assertion needed: Syncfusion returns Object type
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const rowData = args.data as T | undefined;
      if (isValueDefined(onRowSelected) && isValueDefined(rowData)) onRowSelected(rowData);
    },
    [onRowSelected],
  );

  const handleRowDeselected = useCallback(
    (args: RowSelectEventArgs) => {
      // Type assertion needed: Syncfusion returns Object type
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const rowData = args.data as T | undefined;
      if (isValueDefined(onRowDeselected) && isValueDefined(rowData)) onRowDeselected(rowData);
    },
    [onRowDeselected],
  );

  // Determine which features to inject
  const features = [];
  if (allowPaging) features.push(Page);
  if (allowSorting) features.push(Sort);
  if (allowFiltering) features.push(Filter);

  const renderEmptyRecord = (): JSX.Element => (
    <div className="py-8 text-center text-text-secondary">{emptyText}</div>
  );

  return (
    <div className={cn('relative', className)} data-testid={testId}>
      {isLoading ? <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/80">
          <div
            aria-label="Loading"
            className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"
            role="status"
          />
        </div> : null}
      <GridComponent
        allowFiltering={allowFiltering}
        allowPaging={allowPaging}
        allowSorting={allowSorting}
        dataSource={data}
        emptyRecordTemplate={renderEmptyRecord}
        height={height}
        pageSettings={pageSettings}
        rowDeselected={handleRowDeselected}
        rowSelected={handleRowSelected}
      >
        <ColumnsDirective>
          {columns.map((column) => (
            <ColumnDirective key={column.field} {...column} />
          ))}
        </ColumnsDirective>
        <Inject services={features} />
      </GridComponent>
    </div>
  );
};

// Memoize the component - type assertion needed for generic memo
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const DataGrid = memo(DataGridComponent) as typeof DataGridComponent;

export default DataGrid;
export type { Props as DataGridProps };
