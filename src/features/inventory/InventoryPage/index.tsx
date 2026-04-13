import { memo, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  getMockServerWebGeneratedSampleApiEndpointsGetInventoryItemsQueryKey,
  useMockServerWebGeneratedSampleApiEndpointsCreateInventoryItem,
  useMockServerWebGeneratedSampleApiEndpointsDeleteInventoryItem,
  useMockServerWebGeneratedSampleApiEndpointsGetInventoryItems,
} from '@/api/generated/mockserver/sample/sample';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import { InventoryDialog, InventoryTable } from './sections';

import type { InventoryItemWithId } from './sections';

export function filterInventory(
  items: InventoryItemWithId[],
  search: string,
  category: string,
): InventoryItemWithId[] {
  let result = items;
  if (category !== '')
    result = result.filter((item) => (item.category ?? '') === category);

  if (search.trim() !== '') {
    const q = search.toLowerCase();
    result = result.filter(
      (item) =>
        (item.sku ?? '').toLowerCase().includes(q) ||
        (item.name ?? '').toLowerCase().includes(q),
    );
  }
  return result;
}

export function getCategories(items: InventoryItemWithId[]): string[] {
  const cats = new Set<string>();
  items.forEach((item) => {
    const cat = item.category;
    if (isValueDefined(cat) && cat !== '') cats.add(cat);
  });
  return Array.from(cats).sort();
}

const QUERY_PARAMS = { skip: 0, limit: 25 };

const INPUT_CLASS =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

const InventoryPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const { data: response, isLoading } =
    useMockServerWebGeneratedSampleApiEndpointsGetInventoryItems(QUERY_PARAMS);
  const createMutation = useMockServerWebGeneratedSampleApiEndpointsCreateInventoryItem();
  const deleteMutation = useMockServerWebGeneratedSampleApiEndpointsDeleteInventoryItem();

  const allItems = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- backend returns id but generated model omits it
      (response?.data.items ?? []) as unknown as InventoryItemWithId[],
    [response?.data.items],
  );
  const categories = useMemo(() => getCategories(allItems), [allItems]);
  const filtered = useMemo(
    () => filterInventory(allItems, search, categoryFilter),
    [allItems, search, categoryFilter],
  );

  const invalidate = (): void => {
    queryClient
      .invalidateQueries({
        queryKey:
          getMockServerWebGeneratedSampleApiEndpointsGetInventoryItemsQueryKey(QUERY_PARAMS),
      })
      .catch(() => undefined);
  };

  const handleSave = (item: Parameters<typeof createMutation.mutate>[0]['data']): void => {
    createMutation.mutate(
      { data: item },
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
    <div className="space-y-4" data-testid={TestIds.INVENTORY_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{FM('inventory.title')}</h1>
        <button
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid={TestIds.INVENTORY_ADD_BTN}
          type="button"
          onClick={() => setShowDialog(true)}
        >
          {FM('inventory.add')}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          aria-label={FM('inventory.search')}
          className={INPUT_CLASS}
          placeholder={FM('inventory.search')}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          aria-label={FM('inventory.allCategories')}
          className={INPUT_CLASS}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">{FM('inventory.allCategories')}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="py-12 text-center text-text-muted">{FM('common.loading')}</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <InventoryTable items={filtered} onDelete={handleDelete} />
        </div>
      )}
      {showDialog ? <InventoryDialog onClose={() => setShowDialog(false)} onSave={handleSave} /> : null}
    </div>
  );
});

InventoryPage.displayName = 'InventoryPage';

export default InventoryPage;
