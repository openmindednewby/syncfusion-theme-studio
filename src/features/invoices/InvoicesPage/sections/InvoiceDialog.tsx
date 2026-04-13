import { useMemo, useState } from 'react';

import { InvoiceStatus } from '@/api/generated/mockserver/models';
import type { Invoice } from '@/api/generated/mockserver/models';
import { useDialog } from '@/hooks/useDialog';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface InvoiceDialogProps {
  onSave: (invoice: Invoice) => void;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-sm font-medium text-text-secondary';

const InvoiceDialog = ({ onSave, onClose }: InvoiceDialogProps): JSX.Element => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [notes, setNotes] = useState('');

  const dialogOptions = useMemo(() => ({ isOpen: true, onClose }), [onClose]);
  const { backdropProps, dialogProps, titleId } = useDialog(dialogOptions);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave({
      invoiceNumber,
      issueDate,
      dueDate,
      totalAmount: Number(totalAmount),
      notes,
      status: InvoiceStatus.Draft,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid={TestIds.INVOICES_DIALOG}
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
          {FM('invoices.dialog.title')}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={LABEL_CLASS}>{FM('invoices.dialog.invoiceNumber')}</label>
            <input
              required
              className={INPUT_CLASS}
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>{FM('invoices.dialog.issueDate')}</label>
              <input
                required
                className={INPUT_CLASS}
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>{FM('invoices.dialog.dueDate')}</label>
              <input
                required
                className={INPUT_CLASS}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={LABEL_CLASS}>{FM('invoices.dialog.total')}</label>
            <input
              required
              className={INPUT_CLASS}
              min="0"
              step="0.01"
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>{FM('invoices.dialog.notes')}</label>
            <input
              className={INPUT_CLASS}
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
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

export default InvoiceDialog;
