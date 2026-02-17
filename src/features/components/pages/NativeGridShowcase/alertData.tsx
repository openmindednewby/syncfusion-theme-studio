/**
 * SIEM security alert data re-exported for the native grid showcase.
 * Column definitions use the native TableColumn type with AlertBadge templates.
 */
import type { ReactNode } from 'react';

import { BadgeNativeVariant as BadgeVariant, TextAlign } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import { AlertBadge } from '@/features/components/shared/AlertBadge';
import { AlertBadgeAppearance } from '@/features/components/shared/alertBadgeAppearance';
import { TableActionMenu } from '@/features/components/shared/TableActionMenu';
import { FM } from '@/localization/helpers';

import {
  getSeverityVariant, getScoreVariant, getSlaVariant,
} from '../SyncfusionGridShowcase/sections/AlertBadgeTemplates';
import { SECURITY_ALERTS as TYPED_ALERTS } from '../SyncfusionGridShowcase/sections/alertData';

export type { SecurityAlert } from '../SyncfusionGridShowcase/sections/alertData';

// Column widths aligned with the Syncfusion grid
const COL_WIDTH_ID = 100;
const COL_WIDTH_SEVERITY = 110;
const COL_WIDTH_SCORE = 80;
const COL_WIDTH_STATUS = 120;
const COL_WIDTH_CORRELATION = 220;
const COL_WIDTH_DATE = 150;
const COL_WIDTH_ASSET = 140;
const COL_WIDTH_TACTIC = 120;
const COL_WIDTH_TECHNIQUE = 140;
const COL_WIDTH_ASSIGNEE = 120;
const COL_WIDTH_SLA_STATUS = 150;
const COL_WIDTH_AUTOMATION = 180;
const COL_WIDTH_ACTIONS = 120;

const ALERT_ACTIONS = [
  { labelKey: 'gridShowcase.ignoreAlerts', testId: 'alert-action-ignore' },
  { labelKey: 'gridShowcase.mergeAlerts', testId: 'alert-action-merge' },
  { labelKey: 'gridShowcase.raiseIncident', testId: 'alert-action-raise' },
  { labelKey: 'gridShowcase.addAlertFilter', testId: 'alert-action-add-filter' },
];

/** Alert data converted to Record<string, unknown> for TableNative compatibility */
export const SECURITY_ALERTS: Array<Record<string, unknown>> = TYPED_ALERTS.map(
  (alert) => ({ ...alert }),
);

function severityTemplate(row: Record<string, unknown>): ReactNode {
  const severity = String(row['severity'] ?? '');
  return <AlertBadge text={severity.toUpperCase()} variant={getSeverityVariant(severity)} />;
}

function scoreTemplate(row: Record<string, unknown>): ReactNode {
  const score = Number(row['score'] ?? 0);
  return <AlertBadge text={score.toFixed(1)} variant={getScoreVariant(score)} />;
}

function statusTemplate(row: Record<string, unknown>): ReactNode {
  return <span className="text-text-secondary">{String(row['status'] ?? '')}</span>;
}

function slaTemplate(row: Record<string, unknown>): ReactNode {
  const sla = String(row['slaStatus'] ?? '');
  const remaining = String(row['slaRemaining'] ?? '');
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <AlertBadge appearance={AlertBadgeAppearance.Outline} text={sla.toUpperCase()} variant={getSlaVariant(sla)} />
      <span className="text-xs text-text-muted">{remaining}</span>
    </div>
  );
}

function assigneeTemplate(row: Record<string, unknown>): ReactNode {
  const assignee = String(row['assignee'] ?? '');
  const isUnassigned = assignee === 'Unassigned';
  return (
    <span className={isUnassigned ? 'italic text-text-muted' : 'text-text-primary'}>
      {assignee}
    </span>
  );
}

function automationStatusTemplate(row: Record<string, unknown>): ReactNode {
  const status = String(row['automationStatus'] ?? '');
  let variant = BadgeVariant.Info;
  if (status.includes('Auto')) variant = BadgeVariant.Success;
  else if (status.includes('Pending')) variant = BadgeVariant.Warning;
  return <AlertBadge text={status.toUpperCase()} variant={variant} />;
}

function actionsTemplate(): ReactNode {
  return <TableActionMenu actions={ALERT_ACTIONS} />;
}

export const NATIVE_ALERT_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: FM('gridShowcase.alertId'), width: COL_WIDTH_ID },
  { field: 'severity', headerText: FM('gridShowcase.alertSeverity'), width: COL_WIDTH_SEVERITY, template: severityTemplate },
  { field: 'score', headerText: FM('gridShowcase.alertScore'), width: COL_WIDTH_SCORE, textAlign: TextAlign.Right, template: scoreTemplate },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS, template: statusTemplate },
  { field: 'correlationName', headerText: FM('gridShowcase.alertCorrelation'), width: COL_WIDTH_CORRELATION },
  { field: 'dateCreated', headerText: FM('gridShowcase.alertDateCreated'), width: COL_WIDTH_DATE },
  { field: 'affectedAsset', headerText: FM('gridShowcase.alertAsset'), width: COL_WIDTH_ASSET },
  { field: 'tactic', headerText: FM('gridShowcase.alertTactic'), width: COL_WIDTH_TACTIC },
  { field: 'technique', headerText: FM('gridShowcase.alertTechnique'), width: COL_WIDTH_TECHNIQUE },
  { field: 'assignee', headerText: FM('gridShowcase.alertAssignee'), width: COL_WIDTH_ASSIGNEE, template: assigneeTemplate },
  { field: 'slaStatus', headerText: FM('gridShowcase.alertSlaStatus'), width: COL_WIDTH_SLA_STATUS, template: slaTemplate },
  { field: 'automationStatus', headerText: FM('gridShowcase.alertAutomation'), width: COL_WIDTH_AUTOMATION, template: automationStatusTemplate },
  { field: 'actions', headerText: FM('gridShowcase.alertActions'), width: COL_WIDTH_ACTIONS, template: actionsTemplate },
];
