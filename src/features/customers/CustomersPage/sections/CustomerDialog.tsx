import { useCallback, useState } from 'react';

import type { Customer } from '@/api/generated/mockserver/models';
import FormDialogNative from '@/components/ui/native/FormDialogNative';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface CustomerDialogProps {
  isOpen: boolean;
  onSave: (customer: Customer) => void;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-sm font-medium text-text-secondary';

const CustomerDialog = ({ isOpen, onSave, onClose }: CustomerDialogProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSave = useCallback((): void => {
    onSave({ firstName, lastName, email, phone, companyName, isActive: true });
  }, [firstName, lastName, email, phone, companyName, onSave]);

  return (
    <FormDialogNative
      isOpen={isOpen}
      testId={TestIds.CUSTOMERS_DIALOG}
      title={FM('customers.dialog.title')}
      onCancel={onClose}
      onSave={handleSave}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL_CLASS} htmlFor="customer-first-name">{FM('customers.dialog.firstName')}</label>
          <input
            required
            className={INPUT_CLASS}
            id="customer-first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="customer-last-name">{FM('customers.dialog.lastName')}</label>
          <input
            required
            className={INPUT_CLASS}
            id="customer-last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="customer-email">{FM('customers.dialog.email')}</label>
        <input
          required
          className={INPUT_CLASS}
          id="customer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="customer-phone">{FM('customers.dialog.phone')}</label>
        <input
          className={INPUT_CLASS}
          id="customer-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="customer-company">{FM('customers.dialog.company')}</label>
        <input
          className={INPUT_CLASS}
          id="customer-company"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
    </FormDialogNative>
  );
};

export default CustomerDialog;
