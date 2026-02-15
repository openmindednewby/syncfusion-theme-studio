/**
 * SIEM security alert data re-exported for the native grid showcase.
 * Column definitions use the native TableColumn type.
 */
import { TextAlign } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import { FM } from '@/localization/helpers';

import { SECURITY_ALERTS as TYPED_ALERTS } from '../SyncfusionGridShowcase/sections/alertData';

export type { SecurityAlert } from '../SyncfusionGridShowcase/sections/alertData';

const COL_WIDTH_ID = 100;
const COL_WIDTH_NARROW = 90;
const COL_WIDTH_MEDIUM = 130;
const COL_WIDTH_WIDE = 180;
const COL_WIDTH_DATE = 150;
const COL_WIDTH_ACTIONS = 120;

/** Alert data converted to Record<string, unknown> for TableNative compatibility */
export const SECURITY_ALERTS: Array<Record<string, unknown>> = TYPED_ALERTS.map(
  (alert) => ({ ...alert }),
);

export const NATIVE_ALERT_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: FM('gridShowcase.alertId'), width: COL_WIDTH_ID },
  { field: 'severity', headerText: FM('gridShowcase.alertSeverity'), width: COL_WIDTH_MEDIUM },
  { field: 'score', headerText: FM('gridShowcase.alertScore'), width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_MEDIUM },
  { field: 'correlationName', headerText: FM('gridShowcase.alertCorrelation'), minWidth: COL_WIDTH_WIDE },
  { field: 'dateCreated', headerText: FM('gridShowcase.alertDateCreated'), width: COL_WIDTH_DATE },
  { field: 'affectedAsset', headerText: FM('gridShowcase.alertAsset'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'tactic', headerText: FM('gridShowcase.alertTactic'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'technique', headerText: FM('gridShowcase.alertTechnique'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'assignee', headerText: FM('gridShowcase.alertAssignee'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'slaStatus', headerText: FM('gridShowcase.alertSlaStatus'), width: COL_WIDTH_MEDIUM },
  { field: 'automationStatus', headerText: FM('gridShowcase.alertAutomation'), width: COL_WIDTH_WIDE },
  { field: 'actions', headerText: FM('gridShowcase.alertActions'), width: COL_WIDTH_ACTIONS },
];
