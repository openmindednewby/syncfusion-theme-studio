import type { Invoice } from '@/api/generated/mockserver/models';
import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import { DeleteButton } from '@/components/ui/native/TableActionButtons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import InvoiceStatusBadge from './InvoiceStatusBadge';

export interface InvoiceWithId extends Invoice {
  id: number;
}

export function formatCurrency(amount?: number): string {
  return isValueDefined(amount) ? `$${amount.toFixed(2)}` : '\u2014';
}

const formatDate = (d?: string): string =>
  isValueDefined(d) ? new Date(d).toLocaleDateString() : '\u2014';

const COLUMN_KEYS = [
  'invoices.column.invoiceNumber',
  'invoices.column.status',
  'invoices.column.issueDate',
  'invoices.column.dueDate',
  'invoices.column.total',
  'invoices.column.actions',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

interface InvoicesTableProps {
  invoices: InvoiceWithId[];
  onDelete: (id: number) => void;
}

const InvoicesTable = ({ invoices, onDelete }: InvoicesTableProps): JSX.Element => {
  if (invoices.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">{FM('invoices.empty')}</div>
    );

  return (
    <BusinessTableShell resultCount={invoices.length} testId={TestIds.INVOICES_TABLE}>
      <table className="w-full min-w-[640px] text-sm">
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
          {invoices.map((inv, idx) => (
            <tr
              key={inv.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">{inv.invoiceNumber}</td>
              <td className="px-4 py-3">
                <InvoiceStatusBadge status={inv.status} />
              </td>
              <td className="px-4 py-3 text-text-muted">{formatDate(inv.issueDate)}</td>
              <td className="px-4 py-3 text-text-muted">{formatDate(inv.dueDate)}</td>
              <td className="px-4 py-3 font-medium text-text-primary">
                {formatCurrency(inv.totalAmount)}
              </td>
              <td className="px-4 py-3">
                <DeleteButton
                  confirmKey="invoices.deleteConfirm"
                  testIdPrefix={`invoice-${String(inv.id)}`}
                  onDelete={() => onDelete(inv.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default InvoicesTable;
