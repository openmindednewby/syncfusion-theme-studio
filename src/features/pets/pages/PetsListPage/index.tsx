import { useState, useCallback, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import type { FindPetsByStatusStatus, Pet } from '@/api/generated/models';
import { useFindPetsByStatus } from '@/api/generated/pet/pet';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button, DataGrid } from '@/components/ui';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

type PetStatus = FindPetsByStatusStatus;

const STATUSES: PetStatus[] = ['available', 'pending', 'sold'];
const ID_WIDTH = 100;
const NAME_WIDTH = 200;
const CATEGORY_WIDTH = 150;
const STATUS_WIDTH = 120;
const TAGS_WIDTH = 200;

interface StatusFilterProps {
  selectedStatus: PetStatus;
  onStatusChange: (status: PetStatus) => void;
}

function getStatusLabel(status: PetStatus): string {
  switch (status) {
    case 'available':
      return FM('pets.status.available');
    case 'pending':
      return FM('pets.status.pending');
    case 'sold':
      return FM('pets.status.sold');
    default:
      return status;
  }
}

const StatusFilter = ({ selectedStatus, onStatusChange }: StatusFilterProps): JSX.Element => (
  <div className="flex gap-2" data-testid={TestIds.PETS_STATUS_FILTER}>
    {STATUSES.map((status) => {
      const isSelected = selectedStatus === status;
      const variant = isSelected ? 'primary' : 'secondary';

      return (
        <Button
          key={status}
          testId={`status-filter-${status}`}
          variant={variant}
          onClick={() => onStatusChange(status)}
        >
          {getStatusLabel(status)}
        </Button>
      );
    })}
  </div>
);

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps): JSX.Element => (
  <div className="card p-6 text-center">
    <div className="mb-4 text-error-500">
      <svg
        className="mx-auto h-12 w-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </div>
    <p className="text-lg font-medium text-text-primary">{FM('pets.failedToLoad')}</p>
    <p className="mt-1 text-sm text-text-muted">{message}</p>
    <Button className="mt-4" testId="btn-retry" variant="primary" onClick={onRetry}>
      {FM('common.tryAgain')}
    </Button>
  </div>
);

interface EmptyStateProps {
  status: PetStatus;
}

const EmptyState = ({ status }: EmptyStateProps): JSX.Element => (
  <div className="card p-6 text-center">
    <p className="text-lg font-medium text-text-primary">{FM('pets.noPetsFound')}</p>
    <p className="mt-1 text-sm text-text-muted">{FM('pets.noPetsWithStatus', status)}</p>
  </div>
);

/** Transform pet data for grid display */
function transformPetForGrid(pet: Pet): Record<string, unknown> {
  const categoryName = pet.category?.name ?? FM('common.unknown');
  const tagsList = isNotEmptyArray(pet.tags)
    ? pet.tags.map((tag) => tag.name ?? '').join(', ')
    : '-';

  return {
    id: pet.id,
    name: pet.name,
    category: categoryName,
    status: pet.status ?? 'unknown',
    tags: tagsList,
  };
}

const PetsListPage = (): JSX.Element => {
  const [selectedStatus, setSelectedStatus] = useState<PetStatus>('available');

  const {
    data: pets,
    isLoading,
    isError,
    error,
    refetch,
  } = useFindPetsByStatus({
    status: selectedStatus,
  });

  const handleRetry = useCallback(async (): Promise<void> => {
    await refetch();
  }, [refetch]);

  const gridColumns: ColumnModel[] = useMemo(
    () => [
      { field: 'id', headerText: FM('common.id'), width: ID_WIDTH, textAlign: 'Right' },
      { field: 'name', headerText: FM('common.name'), width: NAME_WIDTH },
      { field: 'category', headerText: FM('common.category'), width: CATEGORY_WIDTH },
      { field: 'status', headerText: FM('common.status'), width: STATUS_WIDTH },
      { field: 'tags', headerText: FM('common.tags'), width: TAGS_WIDTH },
    ],
    [],
  );

  const gridData = useMemo(() => {
    if (!isNotEmptyArray(pets)) return [];
    return pets.map(transformPetForGrid);
  }, [pets]);

  const errorMessage = isValueDefined(error) ? String(error) : 'An unexpected error occurred';
  const hasPets = isNotEmptyArray(pets);
  const showEmptyState = !isLoading && !isError && !hasPets;
  const showDataGrid = !isLoading && !isError && hasPets;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">{FM('pets.title')}</h2>
        <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      </div>

      {isLoading ? <LoadingSpinner /> : null}

      {isError ? <ErrorMessage message={errorMessage} onRetry={handleRetry} /> : null}

      {showEmptyState ? <EmptyState status={selectedStatus} /> : null}

      {showDataGrid ? (
        <div className="card p-0">
          <DataGrid
            allowFiltering
            columns={gridColumns}
            data={gridData}
            emptyText={`No ${selectedStatus} pets found`}
            height="400"
            testId={TestIds.PETS_GRID}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PetsListPage;
