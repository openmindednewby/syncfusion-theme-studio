import { useMemo, useState } from 'react';

import type { InventoryItem } from '@/api/generated/mockserver/models';
import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface InventoryDialogProps {
  onSave: (item: InventoryItem) => void;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-sm font-medium text-text-secondary';

const InventoryDialog = ({ onSave, onClose }: InventoryDialogProps): JSX.Element => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [qty, setQty] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');

  const dialogOptions = useMemo(() => ({ isOpen: true, onClose }), [onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave({
      sku,
      name,
      category,
      unitPrice: Number(unitPrice),
      quantityInStock: Number(qty),
      reorderLevel: Number(reorderLevel),
      isActive: true,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={TestIds.INVENTORY_DIALOG}
      {...backdropProps}
    >
      <div
        className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl"
        {...dialogProps}
      >
        <h2
          className="mb-4 text-lg font-semibold text-text-primary"
          id={titleId}
        >
          {FM('inventory.dialog.title')}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>{FM('inventory.dialog.sku')}</label>
              <input
                required
                className={INPUT_CLASS}
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>{FM('inventory.dialog.name')}</label>
              <input
                required
                className={INPUT_CLASS}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={LABEL_CLASS}>{FM('inventory.dialog.category')}</label>
            <input
              className={INPUT_CLASS}
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={LABEL_CLASS}>{FM('inventory.dialog.unitPrice')}</label>
              <input
                required
                className={INPUT_CLASS}
                min="0"
                step="0.01"
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>{FM('inventory.dialog.qty')}</label>
              <input
                required
                className={INPUT_CLASS}
                min="0"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>{FM('inventory.dialog.reorderLevel')}</label>
              <input
                required
                className={INPUT_CLASS}
                min="0"
                type="number"
                value={reorderLevel}
                onChange={(e) => setReorderLevel(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              className="rounded-md px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover"
              type="button"
              onClick={onClose}
            >
              {FM('common.cancel')}
            </button>
            <button
              className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
              type="submit"
            >
              {FM('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryDialog;
