/**
 * GroupingSection demonstrates column grouping with the drag-and-drop
 * group drop area, nested groups, and collapsible group rows.
 */
import { memo, useCallback, useState } from 'react';

import TableNative from '@/components/ui/TableNative';
import type { GroupingConfig } from '@/components/ui/TableNative';
import { FM } from '@/localization/helpers';
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
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.gridShowcase.sections.grouping')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.gridShowcase.sections.groupingDesc')}
        </p>
      </div>
      <TableNative
        ariaLabel={FM('components.gridShowcase.sections.grouping')}
        columns={EMPLOYEE_COLUMNS}
        data={EMPLOYEES}
        groupConfig={groupConfig}
        testId={TestIds.NATIVE_GRID_GROUPING}
        onGroupChange={handleGroupChange}
      />
    </section>
  );
});

GroupingSection.displayName = 'GroupingSection';
