import { useState } from 'react';

import type { FindPetsByStatusStatus, Pet } from '@/api/generated/models';
import { useFindPetsByStatus } from '@/api/generated/pet/pet';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';


type PetStatus = FindPetsByStatusStatus;

const BADGE_SUCCESS = 'badge-success';
const BADGE_WARNING = 'badge-warning';
const BADGE_ERROR = 'badge-error';
const BADGE_INFO = 'badge-info';

function getStatusBadge(status: string | undefined): string {
  switch (status) {
    case 'available':
      return BADGE_SUCCESS;
    case 'pending':
      return BADGE_WARNING;
    case 'sold':
      return BADGE_ERROR;
    case undefined:
      return BADGE_INFO;
    default:
      return BADGE_INFO;
  }
}

function getCategoryName(pet: Pet): string {
  return pet.category?.name ?? 'Unknown';
}

interface StatusFilterProps {
  selectedStatus: PetStatus;
  onStatusChange: (status: PetStatus) => void;
}

const StatusFilter = ({ selectedStatus, onStatusChange }: StatusFilterProps): JSX.Element => {
  const statuses: PetStatus[] = ['available', 'pending', 'sold'];

  return (
    <div className="flex gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          className={`btn ${selectedStatus === status ? 'btn-primary' : 'btn-secondary'}`}
          type="button"
          onClick={() => onStatusChange(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps): JSX.Element => {
  return (
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
      <p className="text-lg font-medium text-text-primary">Failed to load pets</p>
      <p className="mt-1 text-sm text-text-muted">{message}</p>
      <button className="btn btn-primary mt-4" type="button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

interface EmptyStateProps {
  status: PetStatus;
}

const EmptyState = ({ status }: EmptyStateProps): JSX.Element => {
  return (
    <div className="card p-6 text-center">
      <p className="text-lg font-medium text-text-primary">No pets found</p>
      <p className="mt-1 text-sm text-text-muted">
        There are no {status} pets at the moment.
      </p>
    </div>
  );
}

interface PetsTableProps {
  pets: Pet[];
}

const PetsTable = ({ pets }: PetsTableProps): JSX.Element => {
  return (
    <div className="card p-0">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Status</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 text-sm text-text-primary">{pet.id}</td>
              <td className="px-4 py-3 text-sm font-medium text-text-primary">{pet.name}</td>
              <td className="px-4 py-3 text-sm text-text-secondary">{getCategoryName(pet)}</td>
              <td className="px-4 py-3">
                <span className={`badge ${getStatusBadge(pet.status)}`}>{pet.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PetsListPage = (): JSX.Element => {
  const [selectedStatus, setSelectedStatus] = useState<PetStatus>('available');

  const { data: pets, isLoading, isError, error, refetch } = useFindPetsByStatus({
    status: selectedStatus,
  });

  const errorMessage = isValueDefined(error) ? String(error) : 'An unexpected error occurred';
  const hasPets = isNotEmptyArray(pets);
  const showEmptyState = !isLoading && !isError && !hasPets;
  const showPetsTable = !isLoading && !isError && hasPets;

  const handleRetry = async (): Promise<void> => {
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Pets</h2>
        <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      </div>

      {isLoading ? <LoadingSpinner /> : null}

      {isError ? <ErrorMessage message={errorMessage} onRetry={handleRetry} /> : null}

      {showEmptyState ? <EmptyState status={selectedStatus} /> : null}

      {showPetsTable ? <PetsTable pets={pets} /> : null}
    </div>
  );
};

export default PetsListPage;
