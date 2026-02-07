export default function PetsListPage(): JSX.Element {
  // TODO: Integrate with Petstore API via Orval-generated hooks
  const mockPets = [
    { id: 1, name: 'Buddy', status: 'available', category: 'Dogs' },
    { id: 2, name: 'Whiskers', status: 'pending', category: 'Cats' },
    { id: 3, name: 'Goldie', status: 'available', category: 'Fish' },
    { id: 4, name: 'Rex', status: 'sold', category: 'Dogs' },
  ];

  const getStatusBadge = (status: string): string => {
    switch (status) {
      case 'available':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'sold':
        return 'badge-error';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Pets</h2>
        <button type="button" className="btn btn-primary">
          Add Pet
        </button>
      </div>

      <div className="card p-0">
        <p className="border-b border-border p-4 text-sm text-text-muted">
          TODO: Replace with Syncfusion DataGrid after npm install
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {mockPets.map((pet) => (
              <tr key={pet.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-sm text-text-primary">{pet.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-text-primary">{pet.name}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{pet.category}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${getStatusBadge(pet.status)}`}>{pet.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
