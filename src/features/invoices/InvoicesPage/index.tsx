import { memo, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { InvoiceStatus } from '@/api/generated/mockserver/models';
import {
  getMockServerWebGeneratedSampleApiEndpointsGetInvoicesQueryKey,
  useMockServerWebGeneratedSampleApiEndpointsCreateInvoice,
  useMockServerWebGeneratedSampleApiEndpointsDeleteInvoice,
  useMockServerWebGeneratedSampleApiEndpointsGetInvoices,
} from '@/api/generated/mockserver/sample/sample';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import { InvoiceDialog, InvoicesTable } from './sections';

import type { InvoiceWithId } from './sections';

const QUERY_PARAMS = { skip: 0, limit: 25 };
const ALL_STATUS = -1 as const;

type StatusFilter = typeof InvoiceStatus[keyof typeof InvoiceStatus] | typeof ALL_STATUS;

export function filterByStatus(
  invoices: InvoiceWithId[],
  statusFilter: StatusFilter,
): InvoiceWithId[] {
  if (statusFilter === ALL_STATUS) return invoices;
  return invoices.filter((inv) => inv.status === statusFilter);
}

const STATUS_OPTIONS: Array<{ label: string; value: StatusFilter }> = [
  { label: 'invoices.allStatuses', value: ALL_STATUS },
  { label: 'invoices.status.draft', value: InvoiceStatus.Draft },
  { label: 'invoices.status.sent', value: InvoiceStatus.Sent },
  { label: 'invoices.status.paid', value: InvoiceStatus.Paid },
  { label: 'invoices.status.overdue', value: InvoiceStatus.Overdue },
  { label: 'invoices.status.cancelled', value: InvoiceStatus.Cancelled },
];

const InvoicesPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL_STATUS);
  const [showDialog, setShowDialog] = useState(false);

  const { data: response, isLoading } =
    useMockServerWebGeneratedSampleApiEndpointsGetInvoices(QUERY_PARAMS);
  const createMutation = useMockServerWebGeneratedSampleApiEndpointsCreateInvoice();
  const deleteMutation = useMockServerWebGeneratedSampleApiEndpointsDeleteInvoice();

  const allInvoices = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- backend returns id but generated model omits it
      (response?.data.items ?? []) as unknown as InvoiceWithId[],
    [response?.data.items],
  );
  const filtered = useMemo(
    () => filterByStatus(allInvoices, statusFilter),
    [allInvoices, statusFilter],
  );

  const invalidate = (): void => {
    queryClient
      .invalidateQueries({
        queryKey: getMockServerWebGeneratedSampleApiEndpointsGetInvoicesQueryKey(QUERY_PARAMS),
      })
      .catch(() => undefined);
  };

  const handleSave = (invoice: Parameters<typeof createMutation.mutate>[0]['data']): void => {
    createMutation.mutate(
      { data: invoice },
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
    <div className="space-y-4" data-testid={TestIds.INVOICES_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('invoices.title')}</h1>
        <button
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid={TestIds.INVOICES_ADD_BTN}
          type="button"
          onClick={() => setShowDialog(true)}
        >
          {FM('invoices.add')}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <select
          aria-label={FM('invoices.allStatuses')}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={statusFilter}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            const valid = STATUS_OPTIONS.find((opt) => opt.value === parsed);
            if (isValueDefined(valid)) setStatusFilter(valid.value);
          }}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {FM(opt.label)}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <InvoicesTable invoices={filtered} onDelete={handleDelete} />
        </div>
      )}
      {showDialog ? <InvoiceDialog onClose={() => setShowDialog(false)} onSave={handleSave} /> : null}
    </div>
  );
});

InvoicesPage.displayName = 'InvoicesPage';

export default InvoicesPage;
