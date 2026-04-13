import { memo, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  getMockServerWebOrdersListQueryKey,
  useMockServerWebOrdersCreate,
  useMockServerWebOrdersDelete,
  useMockServerWebOrdersList,
} from '@/api/generated/mockserver/orders/orders';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { OrderDialog, OrdersTable } from './sections';

import type { OrderWithId } from './sections';

const QUERY_PARAMS = { skip: 0, limit: 25 };
const ALL_STATUS = '';

const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'orders.allStatuses', value: ALL_STATUS },
  { label: 'orders.status.pending', value: 'Pending' },
  { label: 'orders.status.processing', value: 'Processing' },
  { label: 'orders.status.shipped', value: 'Shipped' },
  { label: 'orders.status.delivered', value: 'Delivered' },
  { label: 'orders.status.cancelled', value: 'Cancelled' },
];

export function filterByStatus(orders: OrderWithId[], statusFilter: string): OrderWithId[] {
  if (statusFilter === ALL_STATUS) return orders;
  return orders.filter((o) => o.status === statusFilter);
}

const OrdersPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState(ALL_STATUS);
  const [showDialog, setShowDialog] = useState(false);

  const { data: response, isLoading } = useMockServerWebOrdersList(QUERY_PARAMS);
  const createMutation = useMockServerWebOrdersCreate();
  const deleteMutation = useMockServerWebOrdersDelete();

  const allOrders = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- backend returns id but generated model marks it optional
      (response?.data.items ?? []) as unknown as OrderWithId[],
    [response?.data.items],
  );
  const filtered = useMemo(
    () => filterByStatus(allOrders, statusFilter),
    [allOrders, statusFilter],
  );

  const invalidate = (): void => {
    queryClient
      .invalidateQueries({
        queryKey: getMockServerWebOrdersListQueryKey(QUERY_PARAMS),
      })
      .catch(() => undefined);
  };

  const handleSave = (order: Parameters<typeof createMutation.mutate>[0]['data']): void => {
    createMutation.mutate(
      { data: order },
      {
        onSuccess: () => {
          invalidate();
          setShowDialog(false);
        },
      },
    );
  };

  const handleDelete = (id: number): void => {
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="space-y-4" data-testid={TestIds.ORDERS_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('orders.title')}</h1>
        <button
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid={TestIds.ORDERS_ADD_BTN}
          type="button"
          onClick={() => setShowDialog(true)}
        >
          {FM('orders.add')}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <select
          aria-label={FM('orders.allStatuses')}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {FM(opt.label)}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <OrdersTable orders={filtered} onDelete={handleDelete} />
        </div>
      )}
      {showDialog ? <OrderDialog onClose={() => setShowDialog(false)} onSave={handleSave} /> : null}
    </div>
  );
});

OrdersPage.displayName = 'OrdersPage';

export default OrdersPage;
