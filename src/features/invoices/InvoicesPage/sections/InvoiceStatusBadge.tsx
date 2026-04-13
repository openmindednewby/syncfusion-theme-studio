import { InvoiceStatus } from '@/api/generated/mockserver/models';
import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils';

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus | undefined;
}

interface StatusConfig {
  labelKey: string;
  className: string;
}

const STATUS_CONFIG = new Map<number, StatusConfig>([
  [InvoiceStatus.Draft, { labelKey: 'invoices.status.draft', className: 'bg-surface-hover text-text-secondary' }],
  [InvoiceStatus.Sent, { labelKey: 'invoices.status.sent', className: 'bg-info-50 text-info-700' }],
  [InvoiceStatus.Paid, { labelKey: 'invoices.status.paid', className: 'bg-success-50 text-success-700' }],
  [InvoiceStatus.Overdue, { labelKey: 'invoices.status.overdue', className: 'bg-error-50 text-error-700' }],
  [InvoiceStatus.Cancelled, { labelKey: 'invoices.status.cancelled', className: 'bg-surface-hover text-text-muted' }],
]);

const EM_DASH = '—';

const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps): JSX.Element => {
  if (!isValueDefined(status)) return <span className="text-text-muted">{EM_DASH}</span>;
  const config = STATUS_CONFIG.get(status);
  if (!isValueDefined(config)) return <span className="text-text-muted">{EM_DASH}</span>;
  return (
    <PillBadge colorClass={config.className}>
      {FM(config.labelKey)}
    </PillBadge>
  );
};

export default InvoiceStatusBadge;
