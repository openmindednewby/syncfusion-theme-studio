/**
 * ThemeStudioDataGridSection - Real TableNative grids styled with light and dark presets.
 * Demonstrates themeOverrides props for ThemeStudio dark theme palette.
 */
import { memo, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import TableNative from '@/components/ui/native/TableNative';
import { GridDensity, FIGMA_DARK_PRESET } from '@/components/ui/shared';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const FIGMA_ROW_COUNT = 9;

const LIGHT_SNIPPET = `<TableNative density="medium" columns={columns} data={data} />`;

const DARK_SNIPPET = `<TableNative
  density="medium"
  columns={columns}
  data={data}
  themeOverrides={FIGMA_DARK_PRESET}
/>`;

const DARK_SELECTION_SNIPPET = `<TableNative
  density="medium"
  columns={columns}
  data={data}
  themeOverrides={FIGMA_DARK_PRESET}
  selectionConfig={{ type: 'Multiple', checkbox: true }}
/>`;

export const ThemeStudioDataGridSection = memo((): JSX.Element => {
  const data = useMemo(() => EMPLOYEES.slice(0, FIGMA_ROW_COUNT), []);

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.themeStudioDesc"
      testId="native-grid-showcase-themestudio"
      titleKey="gridShowcase.themeStudioTitle"
    >
      <div className="space-y-6">
        {/* Light variant */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.densityMedium')} {FM('gridShowcase.labelSeparator')} {FM('gridShowcase.lightLabel')}
          </h4>
          <TableNative
            columns={EMPLOYEE_COLUMNS}
            data={data}
            density={GridDensity.Medium}
            testId="native-themestudio-light"
          />
          <CopyableCodeSnippet code={LIGHT_SNIPPET} testId="native-themestudio-light-snippet" />
        </div>

        {/* Dark (ThemeStudio) variant */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.densityMedium')} {FM('gridShowcase.labelSeparator')} {FM('gridShowcase.themeStudioDarkLabel')}
          </h4>
          <div className="rounded-md bg-gray-900 p-4">
            <TableNative
              columns={EMPLOYEE_COLUMNS}
              data={data}
              density={GridDensity.Medium}
              testId="native-themestudio-dark"
              themeOverrides={FIGMA_DARK_PRESET}
            />
          </div>
          <CopyableCodeSnippet code={DARK_SNIPPET} testId="native-themestudio-dark-snippet" />
        </div>

        {/* Dark with selection */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">
            {FM('gridShowcase.themeStudioDarkLabel')} {FM('gridShowcase.labelSeparator')} {FM('gridShowcase.withSelection')}
          </h4>
          <div className="rounded-md bg-gray-900 p-4">
            <TableNative
              columns={EMPLOYEE_COLUMNS}
              data={data}
              density={GridDensity.Medium}
              selectionConfig={{ type: 'Multiple', checkbox: true }}
              testId="native-themestudio-dark-selection"
              themeOverrides={FIGMA_DARK_PRESET}
            />
          </div>
          <CopyableCodeSnippet code={DARK_SELECTION_SNIPPET} testId="native-themestudio-dark-selection-snippet" />
        </div>
      </div>
    </ShowcaseSection>
  );
});

ThemeStudioDataGridSection.displayName = 'ThemeStudioDataGridSection';
