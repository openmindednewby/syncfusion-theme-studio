import { memo, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  getMockServerWebGeneratedSampleApiEndpointsGetCustomersQueryKey,
  useMockServerWebGeneratedSampleApiEndpointsCreateCustomer,
  useMockServerWebGeneratedSampleApiEndpointsDeleteCustomer,
  useMockServerWebGeneratedSampleApiEndpointsGetCustomers,
} from '@/api/generated/mockserver/sample/sample';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { CustomerDialog, CustomersTable } from './sections';

import type { CustomerWithId } from './sections';

export function filterCustomers(customers: CustomerWithId[], search: string): CustomerWithId[] {
  if (search.trim() === '') return customers;
  const q = search.toLowerCase();
  return customers.filter(
    (c) =>
      (c.firstName ?? '').toLowerCase().includes(q) ||
      (c.lastName ?? '').toLowerCase().includes(q) ||
      (c.email ?? '').toLowerCase().includes(q) ||
      (c.companyName ?? '').toLowerCase().includes(q),
  );
}

const QUERY_PARAMS = { skip: 0, limit: 25 };

const INPUT_CLASS =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

const CustomersPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const { data: response, isLoading } =
    useMockServerWebGeneratedSampleApiEndpointsGetCustomers(QUERY_PARAMS);
  const createMutation = useMockServerWebGeneratedSampleApiEndpointsCreateCustomer();
  const deleteMutation = useMockServerWebGeneratedSampleApiEndpointsDeleteCustomer();

  const allCustomers = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- backend returns id but generated model omits it
      (response?.data.items ?? []) as unknown as CustomerWithId[],
    [response?.data.items],
  );
  const filtered = useMemo(() => filterCustomers(allCustomers, search), [allCustomers, search]);

  const invalidate = (): void => {
    queryClient
      .invalidateQueries({
        queryKey: getMockServerWebGeneratedSampleApiEndpointsGetCustomersQueryKey(QUERY_PARAMS),
      })
      .catch(() => undefined);
  };

  const handleSave = (customer: Parameters<typeof createMutation.mutate>[0]['data']): void => {
    createMutation.mutate(
      { data: customer },
      {
        onSuccess: () => {
          invalidate();
          setShowDialog(false);
        },
      },
    );
  };

  const handleDelete = (id: number): void => {
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="space-y-4" data-testid={TestIds.CUSTOMERS_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('customers.title')}</h1>
        <button
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid={TestIds.CUSTOMERS_ADD_BTN}
          type="button"
          onClick={() => setShowDialog(true)}
        >
          {FM('customers.add')}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input
          aria-label={FM('customers.search')}
          className={INPUT_CLASS}
          placeholder={FM('customers.search')}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <CustomersTable customers={filtered} onDelete={handleDelete} />
        </div>
      )}
      <CustomerDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onSave={handleSave} />
    </div>
  );
});

CustomersPage.displayName = 'CustomersPage';

export default CustomersPage;
