import { useState, useCallback } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { Button, Input, Select, DataGrid } from '@/components/ui';
import type { SelectOption } from '@/components/ui';

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

const SELECT_OPTIONS: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const ComponentsPage = (): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<string | number>('');
  const [isGridLoading, setIsGridLoading] = useState(false);

  const handleLoadingToggle = useCallback(() => {
    setIsGridLoading((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((args: { value?: string }) => {
    setInputValue(args.value ?? '');
  }, []);

  const handleSelectChange = useCallback((value: string | number) => {
    setSelectValue(value);
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Components</h2>

      {/* Syncfusion Buttons */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Syncfusion Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button testId="btn-primary" variant="primary">
            Primary
          </Button>
          <Button testId="btn-secondary" variant="secondary">
            Secondary
          </Button>
          <Button testId="btn-outline" variant="outline">
            Outline
          </Button>
          <Button testId="btn-ghost" variant="ghost">
            Ghost
          </Button>
          <Button testId="btn-danger" variant="danger">
            Danger
          </Button>
          <Button disabled testId="btn-disabled" variant="primary">
            Disabled
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button size="sm" testId="btn-sm" variant="primary">
            Small
          </Button>
          <Button size="md" testId="btn-md" variant="primary">
            Medium
          </Button>
          <Button size="lg" testId="btn-lg" variant="primary">
            Large
          </Button>
        </div>
      </section>

      {/* Syncfusion Inputs */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Syncfusion Inputs</h3>
        <div className="grid max-w-lg gap-4">
          <Input
            fullWidth
            helperText="Enter your full name"
            input={handleInputChange}
            label="Name"
            placeholder="John Doe"
            testId="input-name"
            value={inputValue}
          />
          <Input
            fullWidth
            label="Email"
            placeholder="john@example.com"
            testId="input-email"
            type="email"
          />
          <Input
            fullWidth
            enabled={false}
            label="Disabled Input"
            placeholder="Cannot type here"
            testId="input-disabled"
          />
          <Input
            fullWidth
            error="This field is required"
            label="Input with Error"
            placeholder="Something is wrong..."
            testId="input-error"
          />
        </div>
      </section>

      {/* Syncfusion Select */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">
          Syncfusion Select (Dropdown)
        </h3>
        <div className="grid max-w-lg gap-4">
          <Select
            fullWidth
            helperText="Select one of the options"
            label="Basic Select"
            options={SELECT_OPTIONS}
            testId="select-basic"
            value={selectValue}
            onChange={handleSelectChange}
          />
          <Select
            fullWidth
            error="Please select an option"
            label="Select with Error"
            options={SELECT_OPTIONS}
            testId="select-error"
          />
        </div>
      </section>

      {/* Syncfusion DataGrid */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Syncfusion DataGrid</h3>
        <div className="mb-4 flex gap-2">
          <Button testId="btn-toggle-loading" variant="secondary" onClick={handleLoadingToggle}>
            {isGridLoading ? 'Stop Loading' : 'Simulate Loading'}
          </Button>
        </div>
        <DataGrid
          columns={GRID_COLUMNS}
          data={SAMPLE_DATA}
          isLoading={isGridLoading}
          testId="data-grid-users"
        />
      </section>

      {/* Cards */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Cards</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card">
            <h4 className="font-medium text-text-primary">Default Card</h4>
            <p className="mt-1 text-sm text-text-secondary">
              This is a default card with surface background.
            </p>
          </div>
          <div className="card card-elevated">
            <h4 className="font-medium text-text-primary">Elevated Card</h4>
            <p className="mt-1 text-sm text-text-secondary">
              This card has a subtle shadow for elevation.
            </p>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="card">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">Badges</h3>
        <div className="flex flex-wrap gap-4">
          <span className="badge badge-success">Success</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-error">Error</span>
          <span className="badge badge-info">Info</span>
        </div>
      </section>
    </div>
  );
};

export default ComponentsPage;
