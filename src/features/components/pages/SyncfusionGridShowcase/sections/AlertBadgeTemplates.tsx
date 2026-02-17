/**
 * Badge template functions for security alert grid columns.
 * Template functions return JSX for Syncfusion ColumnDirective rendering.
 * Variant-resolution helpers are exported separately for unit testing.
 */
import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';
import { AlertBadge } from '@/features/components/shared/AlertBadge';
import { AlertBadgeAppearance } from '@/features/components/shared/alertBadgeAppearance';
import { TableActionMenu } from '@/features/components/shared/TableActionMenu';

const SEVERITY_VARIANTS: Record<string, BadgeVariant> = {
  Critical: BadgeVariant.Error,
  High: BadgeVariant.Warning,
  Medium: BadgeVariant.Info,
  Low: BadgeVariant.Success,
  Informational: BadgeVariant.Success,
};

const SLA_VARIANTS: Record<string, BadgeVariant> = {
  'Within SLA': BadgeVariant.Success,
  'At Risk': BadgeVariant.Error,
  Breached: BadgeVariant.Error,
};

const SCORE_HIGH = 80;
const SCORE_MEDIUM = 50;

interface TemplateData {
  severity?: string;
  status?: string;
  slaStatus?: string;
  slaRemaining?: string;
  score?: number;
  assignee?: string;
  automationStatus?: string;
}

/** Pure variant-resolution helpers (exported for unit testing) */
export function getSeverityVariant(severity?: string): BadgeVariant {
  return SEVERITY_VARIANTS[severity ?? ''] ?? BadgeVariant.Info;
}

export function getSlaVariant(slaStatus?: string): BadgeVariant {
  return SLA_VARIANTS[slaStatus ?? ''] ?? BadgeVariant.Info;
}

export function getScoreVariant(score?: number): BadgeVariant {
  const s = score ?? 0;
  if (s >= SCORE_HIGH) return BadgeVariant.Error;
  if (s >= SCORE_MEDIUM) return BadgeVariant.Warning;
  return BadgeVariant.Success;
}

/** Syncfusion column template functions (return JSX) */
export function severityTemplate(data: TemplateData): JSX.Element {
  const text = (data.severity ?? '').toUpperCase();
  return <AlertBadge text={text} variant={getSeverityVariant(data.severity)} />;
}

export function statusTemplate(data: TemplateData): JSX.Element {
  return <span className="text-text-secondary">{data.status ?? ''}</span>;
}

export function slaTemplate(data: TemplateData): JSX.Element {
  const text = (data.slaStatus ?? '').toUpperCase();
  return (
    <div className="flex flex-col gap-0.5">
      <AlertBadge appearance={AlertBadgeAppearance.Outline} text={text} variant={getSlaVariant(data.slaStatus)} />
      <span className="text-xs text-text-muted">{data.slaRemaining ?? ''}</span>
    </div>
  );
}

export function scoreTemplate(data: TemplateData): JSX.Element {
  const text = (data.score ?? 0).toFixed(1);
  return <AlertBadge text={text} variant={getScoreVariant(data.score)} />;
}

const ALERT_ACTIONS = [
  { labelKey: 'gridShowcase.ignoreAlerts', testId: 'alert-action-ignore' },
  { labelKey: 'gridShowcase.mergeAlerts', testId: 'alert-action-merge' },
  { labelKey: 'gridShowcase.raiseIncident', testId: 'alert-action-raise' },
  { labelKey: 'gridShowcase.addAlertFilter', testId: 'alert-action-add-filter' },
];

export function actionsTemplate(): JSX.Element {
  return <TableActionMenu actions={ALERT_ACTIONS} />;
}

export function assigneeTemplate(data: TemplateData): JSX.Element {
  const isUnassigned = data.assignee === 'Unassigned';
  return (
    <span className={isUnassigned ? 'italic text-text-muted' : 'text-text-primary'}>
      {data.assignee ?? ''}
    </span>
  );
}

export function automationStatusTemplate(data: TemplateData): JSX.Element {
  const status = data.automationStatus ?? '';
  let variant = BadgeVariant.Info;

  if (status.includes('Auto')) variant = BadgeVariant.Success;
  else if (status.includes('Pending')) variant = BadgeVariant.Warning;

  return <AlertBadge text={status.toUpperCase()} variant={variant} />;
}
