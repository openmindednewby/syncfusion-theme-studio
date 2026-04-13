/**
 * Maps AlertDto (API response) to TradeOrder (grid display shape).
 * Domain: Stock exchange trade orders.
 */
import type { AlertDto } from '@/api/generated/mockserver/models';
import type { TradeOrder } from '@/features/alerts-incidents/pages/AlertsManagementPage/data/alertData';
import { isValueDefined } from '@/utils/is';

const PRIORITY_MAP: Record<number, string> = {
  1: 'Informational',
  2: 'Low',
  3: 'Medium',
  4: 'High',
  5: 'Critical',
};

const STATUS_MAP: Record<number, string> = {
  1: 'Open',
  4: 'Filled',
  8: 'Partial',
  12: 'Cancelled',
  16: 'Expired',
};

const EXECUTION_TYPE_MAP: Record<number, string> = {
  0: 'Manual Review',
  1: 'Auto-Executed',
  2: 'Auto-Routed',
};

const EXECUTION_STATUS_PENDING = 0;
const DELAY_THRESHOLD = 0.75;
const PAD_WIDTH = 2;
const MS_PER_MINUTE = 60000;

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(PAD_WIDTH, '0');
  const month = String(d.getMonth() + 1).padStart(PAD_WIDTH, '0');
  return `${day}/${month}/${String(d.getFullYear())}`;
}

function deriveSettlementStatus(dto: AlertDto): { settlementStatus: string; settlementRemaining: string } {
  const settlement = dto.slaStatusVM;
  const expiration = settlement?.expirationMinutesFromCreation ?? 0;
  const dateStr = settlement?.dateCreated ?? '';

  if (expiration === 0 || dateStr === '')
    return { settlementStatus: 'On Schedule', settlementRemaining: '' };

  const created = new Date(dateStr).getTime();
  const expiresAt = created + expiration * MS_PER_MINUTE;
  const remaining = Math.round((expiresAt - created) / MS_PER_MINUTE);

  if (remaining <= 0) return { settlementStatus: 'Overdue', settlementRemaining: 'Overdue' };

  const delayThreshold = expiration * (settlement?.atRiskPercentage ?? DELAY_THRESHOLD);
  if (remaining <= delayThreshold)
    return { settlementStatus: 'Delayed', settlementRemaining: `${String(remaining)} min remaining` };

  return { settlementStatus: 'On Schedule', settlementRemaining: `${String(remaining)} min remaining` };
}

function deriveExecutionMethod(dto: AlertDto): string {
  const exec = dto.automationStatusVM;
  if (!isValueDefined(exec)) return 'Pending';
  if (exec.automationStatus === EXECUTION_STATUS_PENDING) return 'Pending';
  return EXECUTION_TYPE_MAP[exec.automationType ?? 0] ?? 'Manual Review';
}

export function mapOrderDtoToTradeOrder(dto: AlertDto): TradeOrder {
  const { settlementStatus, settlementRemaining } = deriveSettlementStatus(dto);

  return {
    id: dto.alertId ?? 0,
    priority: PRIORITY_MAP[dto.severity ?? 1] ?? 'Informational',
    value: dto.score ?? 0,
    status: STATUS_MAP[dto.status ?? 1] ?? 'Open',
    tickerSymbol: dto.correlationRuleName ?? '',
    dateCreated: isValueDefined(dto.dateCreated) && dto.dateCreated !== '' ? formatDate(dto.dateCreated) : '',
    exchange: dto.affectedAssets?.[0] ?? '',
    strategy: dto.tactic ?? '',
    orderType: dto.technique ?? '',
    broker: dto.assignee ?? 'Unassigned',
    settlementStatus,
    settlementRemaining,
    executionMethod: deriveExecutionMethod(dto),
  };
}
