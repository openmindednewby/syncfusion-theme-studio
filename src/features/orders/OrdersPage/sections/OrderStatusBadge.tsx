import StatusBadgeNative from '@/components/ui/native/StatusBadgeNative';
import type { StatusConfig } from '@/components/ui/shared/statusBadgeTypes';

interface OrderStatusBadgeProps {
  status: string | undefined;
}

const STATUS_CONFIG = new Map<string, StatusConfig>([
  ['Pending', { labelKey: 'orders.status.pending', className: 'bg-warning-50 text-warning-700' }],
  ['Processing', { labelKey: 'orders.status.processing', className: 'bg-info-50 text-info-700' }],
  ['Shipped', { labelKey: 'orders.status.shipped', className: 'bg-primary-50 text-primary-700' }],
  ['Delivered', { labelKey: 'orders.status.delivered', className: 'bg-success-50 text-success-700' }],
  ['Cancelled', { labelKey: 'orders.status.cancelled', className: 'bg-surface-hover text-text-muted' }],
]);

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps): JSX.Element => (
  <StatusBadgeNative status={status} statusMap={STATUS_CONFIG} testId="order-status-badge" />
);

export default OrderStatusBadge;
