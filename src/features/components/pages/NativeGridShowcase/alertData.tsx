/**
 * SIEM security alert data re-exported for the native grid showcase.
 * Column definitions use the native TableColumn type with AlertBadge templates.
 */
import type { ReactNode } from 'react';

import { TextAlign } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import { AlertBadge } from '@/features/components/shared/AlertBadge';
import { AlertBadgeAppearance } from '@/features/components/shared/alertBadgeAppearance';
import { FM } from '@/localization/helpers';

import {
  getSeverityVariant, getScoreVariant, getSlaVariant,
} from '../SyncfusionGridShowcase/sections/AlertBadgeTemplates';
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

function severityTemplate(row: Record<string, unknown>): ReactNode {
  const severity = String(row['severity'] ?? '');
  return <AlertBadge text={severity.toUpperCase()} variant={getSeverityVariant(severity)} />;
}

function scoreTemplate(row: Record<string, unknown>): ReactNode {
  const score = Number(row['score'] ?? 0);
  return <AlertBadge text={score.toFixed(1)} variant={getScoreVariant(score)} />;
}

function slaTemplate(row: Record<string, unknown>): ReactNode {
  const sla = String(row['slaStatus'] ?? '');
  return <AlertBadge appearance={AlertBadgeAppearance.Outline} text={sla.toUpperCase()} variant={getSlaVariant(sla)} />;
}

export const NATIVE_ALERT_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: FM('gridShowcase.alertId'), width: COL_WIDTH_ID },
  { field: 'severity', headerText: FM('gridShowcase.alertSeverity'), width: COL_WIDTH_MEDIUM, template: severityTemplate },
  { field: 'score', headerText: FM('gridShowcase.alertScore'), width: COL_WIDTH_NARROW, textAlign: TextAlign.Right, template: scoreTemplate },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_MEDIUM },
  { field: 'correlationName', headerText: FM('gridShowcase.alertCorrelation'), minWidth: COL_WIDTH_WIDE },
  { field: 'dateCreated', headerText: FM('gridShowcase.alertDateCreated'), width: COL_WIDTH_DATE },
  { field: 'affectedAsset', headerText: FM('gridShowcase.alertAsset'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'tactic', headerText: FM('gridShowcase.alertTactic'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'technique', headerText: FM('gridShowcase.alertTechnique'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'assignee', headerText: FM('gridShowcase.alertAssignee'), minWidth: COL_WIDTH_MEDIUM },
  { field: 'slaStatus', headerText: FM('gridShowcase.alertSlaStatus'), width: COL_WIDTH_MEDIUM, template: slaTemplate },
  { field: 'automationStatus', headerText: FM('gridShowcase.alertAutomation'), width: COL_WIDTH_WIDE },
  { field: 'actions', headerText: FM('gridShowcase.alertActions'), width: COL_WIDTH_ACTIONS },
];
