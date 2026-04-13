/**
 * GroupingSection demonstrates column grouping with the drag-and-drop
 * group drop area, nested groups, and collapsible group rows.
 */
import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative } from '@/components/ui/native';
import type { GroupingConfig } from '@/components/ui/native';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

const INITIAL_GROUP_COLUMNS = ['department'];

export const GroupingSection = memo((): JSX.Element => {
  const [groupCols, setGroupCols] = useState<string[]>(INITIAL_GROUP_COLUMNS);

  const handleGroupChange = useCallback((columns: string[]) => {
    setGroupCols(columns);
  }, []);

  const groupConfig: GroupingConfig = {
    columns: groupCols,
    showDropArea: true,
  };

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.groupingDescription"
      testId="native-grid-showcase-grouping"
      titleKey="gridShowcase.groupingTitle"
    >
      <TableNative
        ariaLabel={FM('components.gridShowcase.sections.grouping')}
        columns={EMPLOYEE_COLUMNS}
        data={EMPLOYEES}
        groupConfig={groupConfig}
        testId={TestIds.NATIVE_GRID_GROUPING}
        onGroupChange={handleGroupChange}
      />
      <CopyableCodeSnippet code='<TableNative columns={columns} data={data} groupConfig={{ columns: ["department"], showDropArea: true }} />' />
    </ShowcaseSection>
  );
});

GroupingSection.displayName = 'GroupingSection';
