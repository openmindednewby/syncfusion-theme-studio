/**
 * Badge template functions for trade order grid columns.
 * Template functions return JSX for Syncfusion ColumnDirective rendering.
 * Variant-resolution helpers are exported separately for unit testing.
 */
import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';
import { AlertBadge } from '@/features/components/shared/AlertBadge';
import { AlertBadgeAppearance } from '@/features/components/shared/alertBadgeAppearance';
import { TableActionMenu } from '@/features/components/shared/TableActionMenu';

/** Syncfusion column template functions (return JSX) */
export function priorityTemplate(data: TemplateData): JSX.Element {
  const text = (data.priority ?? '').toUpperCase();
  return <AlertBadge appearance={AlertBadgeAppearance.Solid} text={text} variant={getPriorityVariant(data.priority)} />;
}

export function statusTemplate(data: TemplateData): JSX.Element {
  return <span className="text-text-secondary">{data.status ?? ''}</span>;
}

export function settlementTemplate(data: TemplateData): JSX.Element {
  const text = (data.settlementStatus ?? '').toUpperCase();
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <AlertBadge appearance={AlertBadgeAppearance.Outline} text={text} variant={getSettlementVariant(data.settlementStatus)} />
      <span className="text-xs text-text-muted">{data.settlementRemaining ?? ''}</span>
    </div>
  );
}

export function valueTemplate(data: TemplateData): JSX.Element {
  const text = (data.value ?? 0).toFixed(1);
  return <AlertBadge appearance={AlertBadgeAppearance.Solid} text={text} variant={getValueVariant(data.value)} />;
}

interface TemplateData {
  priority?: string;
  status?: string;
  settlementStatus?: string;
  settlementRemaining?: string;
  value?: number;
  broker?: string;
  executionMethod?: string;
}

export function brokerTemplate(data: TemplateData): JSX.Element {
  const isUnassigned = data.broker === 'Unassigned';
  return (
    <span className={isUnassigned ? 'italic text-text-muted' : 'text-text-primary'}>
      {data.broker ?? ''}
    </span>
  );
}

export function executionMethodTemplate(data: TemplateData): JSX.Element {
  const status = data.executionMethod ?? '';
  let variant = BadgeVariant.Info;

  if (status.includes('Auto')) variant = BadgeVariant.Success;
  else if (status.includes('Pending')) variant = BadgeVariant.Warning;

  return <AlertBadge text={status.toUpperCase()} variant={variant} />;
}

const PRIORITY_VARIANTS: Record<string, BadgeVariant> = {
  Critical: BadgeVariant.Error,
  High: BadgeVariant.Warning,
  Medium: BadgeVariant.Info,
  Low: BadgeVariant.Success,
  Informational: BadgeVariant.Success,
};

/** Pure variant-resolution helpers (exported for unit testing) */
export function getPriorityVariant(priority?: string): BadgeVariant {
  return PRIORITY_VARIANTS[priority ?? ''] ?? BadgeVariant.Info;
}

const SETTLEMENT_VARIANTS: Record<string, BadgeVariant> = {
  'On Schedule': BadgeVariant.Success,
  Delayed: BadgeVariant.Error,
  Overdue: BadgeVariant.Error,
};

export function getSettlementVariant(settlementStatus?: string): BadgeVariant {
  return SETTLEMENT_VARIANTS[settlementStatus ?? ''] ?? BadgeVariant.Info;
}

const VALUE_HIGH = 80;
const VALUE_MEDIUM = 50;

export function getValueVariant(value?: number): BadgeVariant {
  const v = value ?? 0;
  if (v >= VALUE_HIGH) return BadgeVariant.Error;
  if (v >= VALUE_MEDIUM) return BadgeVariant.Warning;
  return BadgeVariant.Success;
}

const ORDER_ACTIONS = [
  { labelKey: 'gridShowcase.ignoreAlerts', testId: 'alert-action-ignore' },
  { labelKey: 'gridShowcase.mergeAlerts', testId: 'alert-action-merge' },
  { labelKey: 'gridShowcase.raiseIncident', testId: 'alert-action-raise' },
  { labelKey: 'gridShowcase.addAlertFilter', testId: 'alert-action-add-filter' },
];

export function actionsTemplate(): JSX.Element {
  return <TableActionMenu actions={ORDER_ACTIONS} />;
}
