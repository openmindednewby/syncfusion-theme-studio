import { useMemo, useRef, useState } from 'react';

import type { CreateOrderRequest, OrderItemDto } from '@/api/generated/mockserver/models';
import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface OrderDialogProps {
  onSave: (order: CreateOrderRequest) => void;
  onClose: () => void;
}

interface KeyedOrderItem extends OrderItemDto {
  key: number;
}

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-sm font-medium text-text-secondary';
const INITIAL_KEY = 1;

const createEmptyItem = (key: number): KeyedOrderItem => ({
  key,
  productTitle: '',
  quantity: 1,
  unitPrice: 0,
});

const OrderDialog = ({ onSave, onClose }: OrderDialogProps): JSX.Element => {
  const nextKey = useRef(INITIAL_KEY + 1);
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<KeyedOrderItem[]>([createEmptyItem(INITIAL_KEY)]);

  const dialogOptions = useMemo(() => ({ isOpen: true, onClose }), [onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  const handleItemChange = (key: number, field: keyof OrderItemDto, value: string): void => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item;
        if (field === 'quantity' || field === 'unitPrice') return { ...item, [field]: Number(value) };
        return { ...item, [field]: value };
      }),
    );
  };

  const handleAddItem = (): void => {
    const key = nextKey.current;
    nextKey.current += 1;
    setItems((prev) => [...prev, createEmptyItem(key)]);
  };

  const handleRemoveItem = (key: number): void => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const orderItems: OrderItemDto[] = items.map(({ productTitle, quantity, unitPrice }) => ({
      productTitle: productTitle ?? '',
      quantity: quantity ?? 0,
      unitPrice: unitPrice ?? 0,
    }));
    onSave({ userId: Number(userId), items: orderItems });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={TestIds.ORDERS_DIALOG}
      {...backdropProps}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-surface p-6 shadow-xl"
        {...dialogProps}
      >
        <h2
          className="mb-4 text-lg font-semibold text-text-primary"
          id={titleId}
        >
          {FM('orders.dialog.title')}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={LABEL_CLASS}>{FM('orders.dialog.userId')}</label>
            <input
              required
              className={INPUT_CLASS}
              min="1"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className={LABEL_CLASS}>{FM('orders.dialog.items')}</label>
              <button
                className="text-xs text-primary-600 hover:text-primary-700"
                type="button"
                onClick={handleAddItem}
              >
                {FM('orders.dialog.addItem')}
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.key} className="flex items-end gap-2">
                  <div className="flex-1">
                    <input
                      required
                      className={INPUT_CLASS}
                      placeholder={FM('orders.dialog.productName')}
                      type="text"
                      value={item.productTitle ?? ''}
                      onChange={(e) => handleItemChange(item.key, 'productTitle', e.target.value)}
                    />
                  </div>
                  <div className="w-20">
                    <input
                      required
                      className={INPUT_CLASS}
                      min="1"
                      placeholder={FM('orders.dialog.qty')}
                      type="number"
                      value={item.quantity ?? ''}
                      onChange={(e) => handleItemChange(item.key, 'quantity', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <input
                      required
                      className={INPUT_CLASS}
                      min="0"
                      placeholder={FM('orders.dialog.price')}
                      step="0.01"
                      type="number"
                      value={item.unitPrice ?? ''}
                      onChange={(e) => handleItemChange(item.key, 'unitPrice', e.target.value)}
                    />
                  </div>
                  {items.length > 1 ? (
                    <button
                      className="text-xs text-red-500 hover:text-red-700"
                      type="button"
                      onClick={() => handleRemoveItem(item.key)}
                    >
                      {FM('common.delete')}
                    </button>
                  ) : null}
                </div>
              ))}
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

export default OrderDialog;
