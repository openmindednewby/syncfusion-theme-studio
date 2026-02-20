/**
 * OrderSection - Orchestrates OrderForm with API data and recent orders list.
 *
 * Fetches users and products for dropdowns, handles order creation via mutation,
 * invalidates the orders list on success, and displays recent orders in a table.
 */
import { useCallback, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { OrderDto } from '@/api/generated/mockserver/models';
import {
  useMockServerWebOrdersCreate,
  useMockServerWebOrdersList,
  getMockServerWebOrdersListQueryKey,
} from '@/api/generated/mockserver/orders/orders';
import { useMockServerWebProductsList } from '@/api/generated/mockserver/products/products';
import { useMockServerWebUsersList } from '@/api/generated/mockserver/users/users';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { OrderForm } from '../../forms/OrderForm';

import type { OrderFormData } from '../../forms/OrderForm/schema';

const DROPDOWN_LIMIT = 100;
const RECENT_ORDERS_LIMIT = 5;
const SKIP_ZERO = 0;
const DECIMAL_PLACES = 2;
const DROPDOWN_PARAMS = { skip: SKIP_ZERO, limit: DROPDOWN_LIMIT } as const;
const ORDERS_PARAMS = { skip: SKIP_ZERO, limit: RECENT_ORDERS_LIMIT } as const;

function formatOrderDate(createdAt: string | undefined): string {
  if (!isValueDefined(createdAt)) return '';
  return new Date(createdAt).toLocaleDateString();
}

const RecentOrdersTable = ({ orders }: { orders: OrderDto[] }): JSX.Element => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left">
          <th className="px-3 py-2 font-medium text-text-primary">{FM('forms.order.columns.orderId')}</th>
          <th className="px-3 py-2 font-medium text-text-primary">{FM('forms.order.columns.userId')}</th>
          <th className="px-3 py-2 font-medium text-text-primary">{FM('forms.order.columns.itemsCount')}</th>
          <th className="px-3 py-2 font-medium text-text-primary">{FM('forms.order.columns.total')}</th>
          <th className="px-3 py-2 font-medium text-text-primary">{FM('forms.order.columns.status')}</th>
          <th className="px-3 py-2 font-medium text-text-primary">{FM('forms.order.columns.date')}</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b border-border">
            <td className="px-3 py-2 text-text-primary">{order.id}</td>
            <td className="px-3 py-2 text-text-secondary">{order.userId}</td>
            <td className="px-3 py-2 text-text-secondary">{order.items?.length ?? 0}</td>
            <td className="px-3 py-2 text-text-secondary">${(order.totalAmount ?? 0).toFixed(DECIMAL_PLACES)}</td>
            <td className="px-3 py-2 text-text-secondary">{order.status ?? ''}</td>
            <td className="px-3 py-2 text-text-secondary">{formatOrderDate(order.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const OrderSection = (): JSX.Element => {
  const queryClient = useQueryClient();

  const { data: usersResponse } = useMockServerWebUsersList(DROPDOWN_PARAMS);
  const { data: productsResponse } = useMockServerWebProductsList(DROPDOWN_PARAMS);
  const { data: ordersResponse } = useMockServerWebOrdersList(ORDERS_PARAMS);
  const createOrder = useMockServerWebOrdersCreate();

  const users = usersResponse?.data.items ?? [];
  const products = useMemo(() => productsResponse?.data.items ?? [], [productsResponse]);
  const recentOrders = ordersResponse?.data.items ?? [];

  const handleSubmit = useCallback(
    (formData: OrderFormData) => {
      const items = formData.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          productTitle: product?.title ?? '',
          quantity: item.quantity,
          unitPrice: product?.price ?? 0,
        };
      });

      createOrder.mutate(
        { data: { userId: formData.userId, items } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getMockServerWebOrdersListQueryKey() })
              .catch(() => undefined);
          },
        },
      );
    },
    [products, createOrder, queryClient],
  );

  return (
    <div className="space-y-6">
      <OrderForm
        isSubmitting={createOrder.isPending}
        products={products}
        users={users}
        onSubmit={handleSubmit}
      />

      {recentOrders.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium text-text-primary">
            {FM('forms.order.recentOrders')}
          </h4>
          <RecentOrdersTable orders={recentOrders} />
        </div>
      )}
    </div>
  );
};
