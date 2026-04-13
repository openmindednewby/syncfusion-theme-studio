/**
 * Stock exchange trade order data re-exported for the native grid showcase.
 * Column definitions use the native TableColumn type with badge templates.
 */
import type { ReactNode } from 'react';

import { BadgeNativeVariant as BadgeVariant, TextAlign } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import {
  getPriorityVariant, getValueVariant, getSettlementVariant,
} from '@/features/alerts-incidents/pages/AlertsManagementPage/components/AlertBadgeTemplates';
import { TRADE_ORDERS as TYPED_ORDERS } from '@/features/alerts-incidents/pages/AlertsManagementPage/data/alertData';
import { AlertBadge } from '@/features/components/shared/AlertBadge';
import { AlertBadgeAppearance } from '@/features/components/shared/alertBadgeAppearance';
import { FM } from '@/localization/utils/helpers';


export type { TradeOrder } from '@/features/alerts-incidents/pages/AlertsManagementPage/data/alertData';

/** Order data converted to Record<string, unknown> for TableNative compatibility */
export const TRADE_ORDERS: Array<Record<string, unknown>> = TYPED_ORDERS.map(
  (order) => ({ ...order }),
);

function priorityTemplate(row: Record<string, unknown>): ReactNode {
  const priority = String(row['priority'] ?? '');
  return <AlertBadge text={priority.toUpperCase()} variant={getPriorityVariant(priority)} />;
}

function valueTemplate(row: Record<string, unknown>): ReactNode {
  const value = Number(row['value'] ?? 0);
  return <AlertBadge text={value.toFixed(1)} variant={getValueVariant(value)} />;
}

function statusTemplate(row: Record<string, unknown>): ReactNode {
  return <span className="text-text-secondary">{String(row['status'] ?? '')}</span>;
}

function settlementTemplate(row: Record<string, unknown>): ReactNode {
  const settlement = String(row['settlementStatus'] ?? '');
  const remaining = String(row['settlementRemaining'] ?? '');
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <AlertBadge appearance={AlertBadgeAppearance.Outline} text={settlement.toUpperCase()} variant={getSettlementVariant(settlement)} />
      <span className="text-xs text-text-muted">{remaining}</span>
    </div>
  );
}

function brokerTemplate(row: Record<string, unknown>): ReactNode {
  const broker = String(row['broker'] ?? '');
  const isUnassigned = broker === 'Unassigned';
  return (
    <span className={isUnassigned ? 'italic text-text-muted' : 'text-text-primary'}>
      {broker}
    </span>
  );
}

function executionMethodTemplate(row: Record<string, unknown>): ReactNode {
  const status = String(row['executionMethod'] ?? '');
  let variant = BadgeVariant.Info;
  if (status.includes('Auto')) variant = BadgeVariant.Success;
  else if (status.includes('Pending')) variant = BadgeVariant.Warning;
  return <AlertBadge text={status.toUpperCase()} variant={variant} />;
}

// Column widths aligned with the Syncfusion grid
const COL_WIDTH_ID = 100;
const COL_WIDTH_PRIORITY = 110;
const COL_WIDTH_VALUE = 80;
const COL_WIDTH_STATUS = 120;
const COL_WIDTH_TICKER = 220;
const COL_WIDTH_DATE = 150;
const COL_WIDTH_EXCHANGE = 140;
const COL_WIDTH_STRATEGY = 120;
const COL_WIDTH_ORDER_TYPE = 140;
const COL_WIDTH_BROKER = 120;
const COL_WIDTH_SETTLEMENT = 150;
const COL_WIDTH_EXECUTION = 180;
const COL_WIDTH_ACTIONS = 120;

export const NATIVE_ORDER_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: FM('gridShowcase.alertId'), width: COL_WIDTH_ID },
  { field: 'priority', headerText: FM('gridShowcase.alertSeverity'), width: COL_WIDTH_PRIORITY, template: priorityTemplate },
  { field: 'value', headerText: FM('gridShowcase.alertScore'), width: COL_WIDTH_VALUE, textAlign: TextAlign.Right, template: valueTemplate },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS, template: statusTemplate },
  { field: 'tickerSymbol', headerText: FM('gridShowcase.alertCorrelation'), width: COL_WIDTH_TICKER },
  { field: 'dateCreated', headerText: FM('gridShowcase.alertDateCreated'), width: COL_WIDTH_DATE },
  { field: 'exchange', headerText: FM('gridShowcase.alertAsset'), width: COL_WIDTH_EXCHANGE },
  { field: 'strategy', headerText: FM('gridShowcase.alertTactic'), width: COL_WIDTH_STRATEGY },
  { field: 'orderType', headerText: FM('gridShowcase.alertTechnique'), width: COL_WIDTH_ORDER_TYPE },
  { field: 'broker', headerText: FM('gridShowcase.alertAssignee'), width: COL_WIDTH_BROKER, template: brokerTemplate },
  { field: 'settlementStatus', headerText: FM('gridShowcase.alertSlaStatus'), width: COL_WIDTH_SETTLEMENT, template: settlementTemplate },
  { field: 'executionMethod', headerText: FM('gridShowcase.alertAutomation'), width: COL_WIDTH_EXECUTION, template: executionMethodTemplate },
  { field: 'actions', headerText: FM('gridShowcase.alertActions'), width: COL_WIDTH_ACTIONS },
];
