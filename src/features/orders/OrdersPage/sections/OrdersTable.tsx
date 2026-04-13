import type { OrderDto } from '@/api/generated/mockserver/models';
import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import { DeleteButton } from '@/components/ui/native/TableActionButtons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import OrderStatusBadge from './OrderStatusBadge';

export interface OrderWithId extends OrderDto {
  id: number;
}

export function formatCurrency(amount?: number): string {
  return isValueDefined(amount) ? `$${amount.toFixed(2)}` : '\u2014';
}

const formatDate = (d?: string): string =>
  isValueDefined(d) ? new Date(d).toLocaleDateString() : '\u2014';

const COLUMN_KEYS = [
  'orders.column.orderId',
  'orders.column.userId',
  'orders.column.status',
  'orders.column.items',
  'orders.column.total',
  'orders.column.created',
  'orders.column.actions',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

interface OrdersTableProps {
  orders: OrderWithId[];
  onDelete: (id: number) => void;
}

const OrdersTable = ({ orders, onDelete }: OrdersTableProps): JSX.Element => {
  if (orders.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">{FM('orders.empty')}</div>
    );

  return (
    <BusinessTableShell resultCount={orders.length} testId={TestIds.ORDERS_TABLE}>
      <table className="w-full min-w-[700px] text-sm">
        <thead className={HEADER_CLASSES}>
          <tr className="border-b border-border bg-surface-hover">
            {COLUMN_KEYS.map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {FM(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order, idx) => (
            <tr
              key={order.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">#{order.id}</td>
              <td className="px-4 py-3 text-text-secondary">{order.userId ?? '\u2014'}</td>
              <td className="px-4 py-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3 text-text-secondary">{order.items?.length ?? 0}</td>
              <td className="px-4 py-3 font-medium text-text-primary">
                {formatCurrency(order.totalAmount)}
              </td>
              <td className="px-4 py-3 text-text-muted">{formatDate(order.createdAt)}</td>
              <td className="px-4 py-3">
                <DeleteButton
                  confirmKey="orders.deleteConfirm"
                  testIdPrefix={`order-${String(order.id)}`}
                  onDelete={() => onDelete(order.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default OrdersTable;
