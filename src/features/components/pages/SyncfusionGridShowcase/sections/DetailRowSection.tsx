/**
 * Detail row section: expandable child rows showing employee details.
 */
import { memo, useCallback } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_ROLE,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_STATUS,
  GRID_HEIGHT_TALL,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

import type { Employee } from './data';

const DETAIL_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
];

export const DetailRowSection = memo((): JSX.Element => {
  const detailTemplate = useCallback(
    (data: Employee): JSX.Element => (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-text-primary">{FM('common.email')}: </span>
            <span className="text-text-secondary">{data.email}</span>
          </div>
          <div>
            <span className="font-semibold text-text-primary">{FM('gridShowcase.salary')}: </span>
            <span className="text-text-secondary">
              ${data.salary.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="font-semibold text-text-primary">{FM('gridShowcase.hireDate')}: </span>
            <span className="text-text-secondary">{data.hireDate}</span>
          </div>
          <div>
            <span className="font-semibold text-text-primary">{FM('gridShowcase.country')}: </span>
            <span className="text-text-secondary">{data.country}</span>
          </div>
        </div>
      </div>
    ),
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.detailRowDescription"
      testId="grid-showcase-detail-row"
      titleKey="gridShowcase.detailRowTitle"
    >
      <DataGrid
        columns={DETAIL_COLUMNS}
        data={EMPLOYEES}
        detailTemplate={detailTemplate}
        height={GRID_HEIGHT_TALL}
        testId="grid-detail-row"
      />
      <CopyableCodeSnippet code='<DataGrid columns={columns} data={data} detailTemplate={detailTemplate} />' />
    </ShowcaseSection>
  );
});

DetailRowSection.displayName = 'DetailRowSection';
