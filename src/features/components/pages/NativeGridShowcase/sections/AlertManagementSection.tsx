/**
 * Alert Management section for Native Grid: SIEM-style table with
 * shift leader bar, KPI cards, toolbar, checkbox selection, and badge formatting.
 */
import { memo } from 'react';

import { TableNative } from '@/components/ui/native';
import type { SelectionConfig } from '@/components/ui/native';
import type { GridConfig } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { AlertKpiCards } from '../../SyncfusionGridShowcase/sections/AlertKpiCards';
import { AlertShiftLeader } from '../../SyncfusionGridShowcase/sections/AlertShiftLeader';
import { AlertToolbar } from '../../SyncfusionGridShowcase/sections/AlertToolbar';
import { SECURITY_ALERTS, NATIVE_ALERT_COLUMNS } from '../alertData';

const PAGE_SIZE = 10;

const ALERT_GRID_CONFIG: GridConfig = {
  filter: { enabled: false },
  pagination: { enabled: true, pageSize: PAGE_SIZE },
};

const ALERT_SELECTION: SelectionConfig = {
  type: 'Multiple',
  mode: 'Row',
  checkbox: true,
};

export const AlertManagementSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.gridShowcase.sections.alertManagement')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.gridShowcase.sections.alertManagementDesc')}
      </p>
    </div>
    <AlertShiftLeader />
    <AlertKpiCards />
    <AlertToolbar />
    <TableNative
      hoverable
      striped
      ariaLabel={FM('components.gridShowcase.sections.alertManagement')}
      columns={NATIVE_ALERT_COLUMNS}
      data={SECURITY_ALERTS}
      gridConfig={ALERT_GRID_CONFIG}
      selectionConfig={ALERT_SELECTION}
      testId={TestIds.NATIVE_GRID_ALERT_MANAGEMENT}
    />
  </section>
));

AlertManagementSection.displayName = 'AlertManagementSection';
