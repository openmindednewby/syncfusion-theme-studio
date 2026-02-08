import { memo, useState, useCallback, useEffect } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { Button, DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';
import { loadSyncfusionCss } from '@/utils';

// Sample data for the DataGrid
interface SampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const SAMPLE_DATA: SampleData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Pending' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Inactive' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

const ID_WIDTH = 80;
const NAME_WIDTH = 150;
const EMAIL_WIDTH = 200;
const ROLE_WIDTH = 120;
const STATUS_WIDTH = 100;

const GRID_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: 'ID', width: ID_WIDTH, textAlign: 'Right' },
  { field: 'name', headerText: 'Name', width: NAME_WIDTH },
  { field: 'email', headerText: 'Email', width: EMAIL_WIDTH },
  { field: 'role', headerText: 'Role', width: ROLE_WIDTH },
  { field: 'status', headerText: 'Status', width: STATUS_WIDTH },
];

export const DataGridSection = memo((): JSX.Element => {
  const [isGridLoading, setIsGridLoading] = useState(false);

  // Load grid CSS on mount
  useEffect(() => {
    loadSyncfusionCss('grids').catch(() => {});
  }, []);

  const handleLoadingToggle = useCallback(() => {
    setIsGridLoading((prev) => !prev);
  }, []);

  const loadingButtonLabel = isGridLoading
    ? FM('components.grid.stopLoading')
    : FM('components.grid.toggleLoading');

  return (
    <section className="card">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {FM('components.sections.dataGrid')}
      </h3>
      <div className="mb-4 flex gap-2">
        <Button testId="btn-toggle-loading" variant="secondary" onClick={handleLoadingToggle}>
          {loadingButtonLabel}
        </Button>
      </div>
      <DataGrid
        columns={GRID_COLUMNS}
        data={SAMPLE_DATA}
        isLoading={isGridLoading}
        testId="data-grid-users"
      />
    </section>
  );
});

DataGridSection.displayName = 'DataGridSection';
