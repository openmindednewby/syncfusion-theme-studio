import type { Customer } from '@/api/generated/mockserver/models';
import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import PillBadge from '@/components/ui/native/PillBadge';
import { DeleteButton } from '@/components/ui/native/TableActionButtons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

export interface CustomerWithId extends Customer {
  id: number;
}

interface CustomersTableProps {
  customers: CustomerWithId[];
  onDelete: (id: number) => void;
}

const formatDate = (d?: string): string =>
  isValueDefined(d) ? new Date(d).toLocaleDateString() : '\u2014';

const COLUMN_KEYS = [
  'customers.column.name',
  'customers.column.email',
  'customers.column.company',
  'customers.column.phone',
  'customers.column.status',
  'customers.column.created',
  'customers.column.actions',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

const CustomersTable = ({ customers, onDelete }: CustomersTableProps): JSX.Element => {
  if (customers.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">{FM('customers.empty')}</div>
    );

  return (
    <BusinessTableShell resultCount={customers.length} testId={TestIds.CUSTOMERS_TABLE}>
      <table className="w-full min-w-[800px] text-sm">
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
          {customers.map((c, idx) => (
            <tr
              key={c.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">
                {c.firstName} {c.lastName}
              </td>
              <td className="px-4 py-3 text-text-secondary">{c.email}</td>
              <td className="px-4 py-3 text-text-secondary">{c.companyName ?? '\u2014'}</td>
              <td className="px-4 py-3 text-text-muted">{c.phone ?? '\u2014'}</td>
              <td className="px-4 py-3">
                <PillBadge colorClass={c.isActive === true ? 'bg-success-50 text-success-700' : 'bg-surface-hover text-text-muted'}>
                  {c.isActive === true
                    ? FM('customers.status.active')
                    : FM('customers.status.inactive')}
                </PillBadge>
              </td>
              <td className="px-4 py-3 text-text-muted">{formatDate(c.createdAt)}</td>
              <td className="px-4 py-3">
                <DeleteButton
                  confirmKey="customers.deleteConfirm"
                  testIdPrefix={`customer-${String(c.id)}`}
                  onDelete={() => onDelete(c.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default CustomersTable;
