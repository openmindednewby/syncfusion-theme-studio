import type { InventoryItem } from '@/api/generated/mockserver/models';
import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import { DeleteButton } from '@/components/ui/native/TableActionButtons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import StockBadge from './StockBadge';

export interface InventoryItemWithId extends InventoryItem {
  id: number;
}

interface InventoryTableProps {
  items: InventoryItemWithId[];
  onDelete: (id: number) => void;
}

const COLUMN_KEYS = [
  'inventory.column.sku',
  'inventory.column.name',
  'inventory.column.category',
  'inventory.column.unitPrice',
  'inventory.column.qty',
  'inventory.column.reorderAt',
  'inventory.column.stock',
  'inventory.column.actions',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

const InventoryTable = ({ items, onDelete }: InventoryTableProps): JSX.Element => {
  if (items.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">{FM('inventory.empty')}</div>
    );

  return (
    <BusinessTableShell resultCount={items.length} testId={TestIds.INVENTORY_TABLE}>
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
          {items.map((item, idx) => (
            <tr
              key={item.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">{item.sku ?? '\u2014'}</td>
              <td className="px-4 py-3 text-text-primary">{item.name ?? '\u2014'}</td>
              <td className="px-4 py-3 text-text-secondary">{item.category ?? '\u2014'}</td>
              <td className="px-4 py-3 text-text-secondary">
                {isValueDefined(item.unitPrice) ? `$${item.unitPrice.toFixed(2)}` : '\u2014'}
              </td>
              <td className="px-4 py-3 text-text-secondary">{item.quantityInStock ?? 0}</td>
              <td className="px-4 py-3 text-text-muted">{item.reorderLevel ?? 0}</td>
              <td className="px-4 py-3">
                <StockBadge
                  qty={item.quantityInStock ?? 0}
                  reorderLevel={item.reorderLevel ?? 0}
                />
              </td>
              <td className="px-4 py-3">
                <DeleteButton
                  confirmKey="inventory.deleteConfirm"
                  testIdPrefix={`inventory-${String(item.id)}`}
                  onDelete={() => onDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default InventoryTable;
