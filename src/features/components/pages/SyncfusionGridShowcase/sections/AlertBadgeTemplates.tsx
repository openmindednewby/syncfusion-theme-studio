/**
 * Badge template functions for security alert grid columns.
 * Template functions return JSX for Syncfusion ColumnDirective rendering.
 * Class-resolution helpers are exported separately for unit testing.
 */
import { TableActionMenu } from '@/features/components/shared/TableActionMenu';

const SEVERITY_CLASSES: Record<string, string> = {
  Critical: 'badge badge-error',
  High: 'badge badge-warning',
  Medium: 'badge badge-info',
  Low: 'badge badge-success',
  Informational: 'badge badge-success',
};

const SLA_CLASSES: Record<string, string> = {
  'Within SLA': 'badge badge-success',
  'At Risk': 'badge badge-error',
  Breached: 'badge badge-error',
};

const DEFAULT_BADGE_CLASS = 'badge badge-info';

const SCORE_HIGH = 80;
const SCORE_MEDIUM = 50;
const SCORE_CIRCLE_SIZE = 32;
const SCORE_FONT_SIZE = '0.7rem';

interface TemplateData {
  severity?: string;
  status?: string;
  slaStatus?: string;
  slaRemaining?: string;
  score?: number;
}

/** Pure class-resolution helpers (exported for unit testing) */
export function getSeverityClass(severity?: string): string {
  return SEVERITY_CLASSES[severity ?? ''] ?? DEFAULT_BADGE_CLASS;
}

export function getSlaClass(slaStatus?: string): string {
  return SLA_CLASSES[slaStatus ?? ''] ?? DEFAULT_BADGE_CLASS;
}

export function getScoreClass(score?: number): string {
  const s = score ?? 0;
  if (s >= SCORE_HIGH) return 'badge badge-error';
  if (s >= SCORE_MEDIUM) return 'badge badge-warning';
  return 'badge badge-success';
}

/** Syncfusion column template functions (return JSX) */
export function severityTemplate(data: TemplateData): JSX.Element {
  return <span className={`${getSeverityClass(data.severity)} uppercase`}>{data.severity ?? ''}</span>;
}

export function statusTemplate(data: TemplateData): JSX.Element {
  return <span className="text-text-secondary">{data.status ?? ''}</span>;
}

export function slaTemplate(data: TemplateData): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`${getSlaClass(data.slaStatus)} uppercase`}>{data.slaStatus ?? ''}</span>
      <span className="text-xs text-text-muted">{data.slaRemaining ?? ''}</span>
    </div>
  );
}

export function scoreTemplate(data: TemplateData): JSX.Element {
  return (
    <span
      className={getScoreClass(data.score)}
      style={{
        borderRadius: '50%',
        width: `${String(SCORE_CIRCLE_SIZE)}px`,
        height: `${String(SCORE_CIRCLE_SIZE)}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: SCORE_FONT_SIZE,
      }}
    >
      {(data.score ?? 0).toFixed(1)}
    </span>
  );
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
