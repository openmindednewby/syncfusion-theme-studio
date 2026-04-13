/**
 * ThemeStudioDataGridSection - Real DataGrid components with light and dark presets.
 * Demonstrates themeOverrides props for ThemeStudio dark theme palette.
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

const LIGHT_SNIPPET = `<DataGrid density="medium" columns={columns} data={data} />`;

const DARK_SNIPPET = `<DataGrid density="medium" columns={columns} data={data} />`;

const DARK_SELECTION_SNIPPET = `<DataGrid
  density="medium"
  columns={columns}
  data={data}
  selectionSettings={{ type: 'Multiple' }}
/>`;

export const ThemeStudioDataGridSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.themeStudioDesc"
    testId="grid-showcase-themestudio"
    titleKey="gridShowcase.themeStudioTitle"
  >
    <div className="space-y-6">
      {/* Light variant */}
      <div className="space-y-2">
        <span className="text-xs text-text-secondary">
          {FM('gridShowcase.densityMedium')} {FM('gridShowcase.labelSeparator')} {FM('gridShowcase.lightLabel')}
        </span>
        <DataGrid
          columns={FIGMA_COLUMNS}
          data={EMPLOYEES}
          density={GridDensity.Medium}
          testId="themestudio-grid-light"
        />
        <CopyableCodeSnippet code={LIGHT_SNIPPET} testId="themestudio-grid-light-snippet" />
      </div>

      {/* Dark (ThemeStudio) variant */}
      <div className="space-y-2">
        <span className="text-xs text-text-secondary">
          {FM('gridShowcase.densityMedium')} {FM('gridShowcase.labelSeparator')} {FM('gridShowcase.themeStudioDarkLabel')}
        </span>
        <div className="rounded-md bg-gray-900 p-4">
          <DataGrid
            columns={FIGMA_COLUMNS}
            data={EMPLOYEES}
            density={GridDensity.Medium}
            testId="themestudio-grid-dark"
          />
        </div>
        <CopyableCodeSnippet code={DARK_SNIPPET} testId="themestudio-grid-dark-snippet" />
      </div>

      {/* Dark with selection */}
      <div className="space-y-2">
        <span className="text-xs text-text-secondary">
          {FM('gridShowcase.themeStudioDarkLabel')} {FM('gridShowcase.labelSeparator')} {FM('gridShowcase.withSelection')}
        </span>
        <div className="rounded-md bg-gray-900 p-4">
          <DataGrid
            columns={FIGMA_COLUMNS}
            data={EMPLOYEES}
            density={GridDensity.Medium}
            selectionSettings={{ type: 'Multiple' }}
            testId="themestudio-grid-dark-selection"
          />
        </div>
        <CopyableCodeSnippet code={DARK_SELECTION_SNIPPET} testId="themestudio-grid-dark-selection-snippet" />
      </div>
    </div>
  </ShowcaseSection>
));

ThemeStudioDataGridSection.displayName = 'ThemeStudioDataGridSection';
