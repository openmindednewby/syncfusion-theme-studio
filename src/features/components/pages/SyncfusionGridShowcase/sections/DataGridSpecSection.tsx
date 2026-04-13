/**
 * DataGridSpecSection - Real DataGrid components at three density levels.
 * Demonstrates density props on the actual Syncfusion wrapper.
 */
import { memo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { GridDensity } from '@/components/ui/shared';
import { DataGrid } from '@/components/ui/syncfusion';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_STATUS,
  COL_WIDTH_DEPARTMENT,
} from '../data/data';

const FIGMA_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
];

const MEDIUM_SNIPPET = `<DataGrid density="medium" columns={columns} data={data} />`;
const LOW_SNIPPET = `<DataGrid density="low" columns={columns} data={data} />`;
const HIGH_SNIPPET = `<DataGrid density="high" columns={columns} data={data} />`;
const SELECTION_SNIPPET = `<DataGrid
  density="medium"
  columns={columns}
  data={data}
  selectionSettings={{ type: 'Multiple' }}
/>`;

export const DataGridSpecSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.designSpecDesc"
    testId="grid-showcase-figma-design"
    titleKey="gridShowcase.designSpecTitle"
  >
    <div className="space-y-6">
      {/* Medium density */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('gridShowcase.densityMedium')}
        </h4>
        <DataGrid
          columns={FIGMA_COLUMNS}
          data={EMPLOYEES}
          density={GridDensity.Medium}
          testId="figma-grid-medium"
        />
        <CopyableCodeSnippet code={MEDIUM_SNIPPET} testId="figma-grid-medium-snippet" />
      </div>

      {/* Low density */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('gridShowcase.densityLow')}
        </h4>
        <DataGrid
          columns={FIGMA_COLUMNS}
          data={EMPLOYEES}
          density={GridDensity.Low}
          testId="figma-grid-low"
        />
        <CopyableCodeSnippet code={LOW_SNIPPET} testId="figma-grid-low-snippet" />
      </div>

      {/* High density */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('gridShowcase.densityHigh')}
        </h4>
        <DataGrid
          columns={FIGMA_COLUMNS}
          data={EMPLOYEES}
          density={GridDensity.High}
          testId="figma-grid-high"
        />
        <CopyableCodeSnippet code={HIGH_SNIPPET} testId="figma-grid-high-snippet" />
      </div>

      {/* Selection variant */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary">
          {FM('gridShowcase.withSelection')}
        </h4>
        <DataGrid
          columns={FIGMA_COLUMNS}
          data={EMPLOYEES}
          density={GridDensity.Medium}
          selectionSettings={{ type: 'Multiple' }}
          testId="figma-grid-selection"
        />
        <CopyableCodeSnippet code={SELECTION_SNIPPET} testId="figma-grid-selection-snippet" />
      </div>
    </div>
  </ShowcaseSection>
));

DataGridSpecSection.displayName = 'DataGridSpecSection';
