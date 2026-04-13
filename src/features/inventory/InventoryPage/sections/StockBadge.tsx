import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';

interface StockBadgeProps {
  qty?: number;
  reorderLevel?: number;
}

export function getStockStatus(qty: number, reorderLevel: number): 'outOfStock' | 'lowStock' | 'inStock' {
  if (qty === 0) return 'outOfStock';
  if (qty <= reorderLevel) return 'lowStock';
  return 'inStock';
}

const STOCK_CONFIG = {
  outOfStock: {
    labelKey: 'inventory.stockStatus.outOfStock',
    className: 'bg-error-50 text-error-700',
  },
  lowStock: {
    labelKey: 'inventory.stockStatus.lowStock',
    className: 'bg-warning-50 text-warning-700',
  },
  inStock: {
    labelKey: 'inventory.stockStatus.inStock',
    className: 'bg-success-50 text-success-700',
  },
} as const;

const StockBadge = ({ qty = 0, reorderLevel = 0 }: StockBadgeProps): JSX.Element => {
  const status = getStockStatus(qty, reorderLevel);
  const config = STOCK_CONFIG[status];
  return (
    <PillBadge colorClass={config.className}>
      {FM(config.labelKey)}
    </PillBadge>
  );
};

export default StockBadge;
