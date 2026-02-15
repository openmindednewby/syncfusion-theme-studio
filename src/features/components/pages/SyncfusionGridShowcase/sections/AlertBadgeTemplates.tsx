/**
 * Badge template functions for security alert grid columns.
 * Template functions return JSX for Syncfusion ColumnDirective rendering.
 * Class-resolution helpers are exported separately for unit testing.
 */
import { FM } from '@/localization/helpers';

const SEVERITY_CLASSES: Record<string, string> = {
  Critical: 'badge badge-error',
  High: 'badge badge-warning',
  Medium: 'badge badge-info',
  Low: 'badge badge-success',
  Informational: 'badge badge-success',
};

const SLA_CLASSES: Record<string, string> = {
  'Within SLA': 'badge badge-success',
  'At Risk': 'badge badge-warning',
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
  return <span className={getSeverityClass(data.severity)}>{data.severity ?? ''}</span>;
}

export function statusTemplate(data: TemplateData): JSX.Element {
  return <span className="text-text-secondary">{data.status ?? ''}</span>;
}

export function slaTemplate(data: TemplateData): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={getSlaClass(data.slaStatus)}>{data.slaStatus ?? ''}</span>
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
      {String(data.score ?? 0)}
    </span>
  );
}

export function actionsTemplate(): JSX.Element {
  return (
    <div className="flex items-center gap-1">
      <button
        className="btn-ghost rounded border border-border-default px-2 py-1 text-xs text-text-secondary hover:text-text-primary"
        data-testid="alert-action-view"
        type="button"
      >
        {FM('gridShowcase.view')}
      </button>
      <button
        className="px-1 py-1 text-text-muted hover:text-text-primary"
        data-testid="alert-action-more"
        type="button"
      >
        &#8942;
      </button>
    </div>
  );
}
