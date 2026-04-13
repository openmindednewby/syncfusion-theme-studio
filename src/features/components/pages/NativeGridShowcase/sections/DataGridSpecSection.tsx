/**
 * DataGridSpecSection - Real TableNative grids at three density levels.
 * Demonstrates density props on the actual reusable component.
 */
import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import TableNative from '@/components/ui/native/TableNative';
import { GridDensity } from '@/components/ui/shared';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const FIGMA_ROW_COUNT = 9;

const MEDIUM_SNIPPET = `<TableNative density="medium" columns={columns} data={data} />`;

const LOW_SNIPPET = `<TableNative density="low" columns={columns} data={data} />`;

const HIGH_SNIPPET = `<TableNative density="high" columns={columns} data={data} />`;

const SELECTION_SNIPPET = `<TableNative
  density="medium"
  columns={columns}
  data={data}
  selectionConfig={{ type: 'Multiple', checkbox: true }}
/>`;

export const DataGridSpecSection = memo((): JSX.Element => {
  const data = useMemo(() => EMPLOYEES.slice(0, FIGMA_ROW_COUNT), []);

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.designSpecDesc"
      testId="native-grid-showcase-figma-design"
      titleKey="gridShowcase.designSpecTitle"
    >
      <div className="space-y-6">
        {/* Medium density */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.densityMedium')}
          </h4>
          <TableNative
            columns={EMPLOYEE_COLUMNS}
            data={data}
            density={GridDensity.Medium}
            testId="native-figma-grid-medium"
          />
          <CopyableCodeSnippet code={MEDIUM_SNIPPET} testId="native-figma-grid-medium-snippet" />
        </div>

        {/* Low density */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.densityLow')}
          </h4>
          <TableNative
            columns={EMPLOYEE_COLUMNS}
            data={data}
            density={GridDensity.Low}
            testId="native-figma-grid-low"
          />
          <CopyableCodeSnippet code={LOW_SNIPPET} testId="native-figma-grid-low-snippet" />
        </div>

        {/* High density */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.densityHigh')}
          </h4>
          <TableNative
            columns={EMPLOYEE_COLUMNS}
            data={data}
            density={GridDensity.High}
            testId="native-figma-grid-high"
          />
          <CopyableCodeSnippet code={HIGH_SNIPPET} testId="native-figma-grid-high-snippet" />
        </div>

        {/* Selection variant */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.withSelection')}
          </h4>
          <TableNative
            columns={EMPLOYEE_COLUMNS}
            data={data}
            density={GridDensity.Medium}
            selectionConfig={{ type: 'Multiple', checkbox: true }}
            testId="native-figma-grid-selection"
          />
          <CopyableCodeSnippet code={SELECTION_SNIPPET} testId="native-figma-grid-selection-snippet" />
        </div>
      </div>
    </ShowcaseSection>
  );
});

DataGridSpecSection.displayName = 'DataGridSpecSection';
