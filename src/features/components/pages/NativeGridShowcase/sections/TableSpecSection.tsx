/**
 * TableSpecSection — All 6 table component variants (scale x selection).
 * Uses pixel-perfect themeOverrides from API extraction.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import TableNative from '@/components/ui/native/TableNative';
import {
  FIGMA_SCALE_L_OVERRIDES,
  FIGMA_SCALE_S_OVERRIDES,
  GridDensity,
} from '@/components/ui/shared';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';
import type { DataGridConfig } from '@/stores/theme/types';
import { isValueDefined } from '@/utils/is';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const buildSnippet = (density: string, overrides?: string, sel?: boolean): string =>
  [
    '<TableNative',
    `  density="${density}"`,
    '  columns={columns}',
    '  data={data}',
    ...(isValueDefined(overrides) ? [`  themeOverrides={${overrides}}`] : []),
    ...(sel === true ? ["  selectionConfig={{ type: 'Multiple', checkbox: true }}"] : []),
    '/>',
  ].join('\n');

const FIGMA_ROW_COUNT = 9;

const SCALE_S: Partial<DataGridConfig> = { ...FIGMA_SCALE_S_OVERRIDES };
const SCALE_L: Partial<DataGridConfig> = { ...FIGMA_SCALE_L_OVERRIDES };

const SELECTION = { type: 'Multiple' as const, checkbox: true };

interface VariantBlockProps {
  labelKey: string;
  density: GridDensity;
  testId: string;
  snippet: string;
  overrides?: Partial<DataGridConfig>;
  selection?: boolean;
}

const VariantBlock = memo(
  ({ labelKey, density, overrides, testId, snippet, selection }: VariantBlockProps) => (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-text-primary">{FM(labelKey)}</h4>
      <TableNative
        columns={EMPLOYEE_COLUMNS}
        data={EMPLOYEES.slice(0, FIGMA_ROW_COUNT)}
        density={density}
        testId={testId}
        {...(isValueDefined(overrides) ? { themeOverrides: overrides } : {})}
        {...(selection === true ? { selectionConfig: SELECTION } : {})}
      />
      <CopyableCodeSnippet code={snippet} testId={`${testId}-snippet`} />
    </div>
  ),
);
VariantBlock.displayName = 'VariantBlock';

const PRESET_S = 'FIGMA_SCALE_S_OVERRIDES';
const PRESET_L = 'FIGMA_SCALE_L_OVERRIDES';

const VARIANTS: VariantBlockProps[] = [
  {
    labelKey: 'gridShowcase.scaleMediumNoSel',
    density: GridDensity.Medium,
    testId: 'native-figma-spec-m-nosel',
    snippet: buildSnippet('medium'),
  },
  {
    labelKey: 'gridShowcase.scaleMediumSel',
    density: GridDensity.Medium,
    testId: 'native-figma-spec-m-sel',
    snippet: buildSnippet('medium', undefined, true),
    selection: true,
  },
  {
    labelKey: 'gridShowcase.scaleSmallNoSel',
    density: GridDensity.High,
    overrides: SCALE_S,
    testId: 'native-figma-spec-s-nosel',
    snippet: buildSnippet('high', PRESET_S),
  },
  {
    labelKey: 'gridShowcase.scaleSmallSel',
    density: GridDensity.High,
    overrides: SCALE_S,
    testId: 'native-figma-spec-s-sel',
    snippet: buildSnippet('high', PRESET_S, true),
    selection: true,
  },
  {
    labelKey: 'gridShowcase.scaleLargeNoSel',
    density: GridDensity.Low,
    overrides: SCALE_L,
    testId: 'native-figma-spec-l-nosel',
    snippet: buildSnippet('low', PRESET_L),
  },
  {
    labelKey: 'gridShowcase.scaleLargeSel',
    density: GridDensity.Low,
    overrides: SCALE_L,
    testId: 'native-figma-spec-l-sel',
    snippet: buildSnippet('low', PRESET_L, true),
    selection: true,
  },
];

export const TableSpecSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.tableSpecDesc"
    testId="native-grid-showcase-figma-table-spec"
    titleKey="gridShowcase.tableSpecTitle"
  >
    <div className="space-y-8">
      {VARIANTS.map((v) => (
        <VariantBlock key={v.testId} {...v} />
      ))}
    </div>
  </ShowcaseSection>
));

TableSpecSection.displayName = 'TableSpecSection';
