using MockServer.Core.Entities;

namespace MockServer.Core.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
  Task<T?> GetByIdAsync(int id, CancellationToken ct = default);
  Task<List<T>> ListAsync(CancellationToken ct = default);
  Task<List<T>> ListAsync(int skip, int limit, CancellationToken ct = default);
  Task<int> CountAsync(CancellationToken ct = default);
  Task<T> AddAsync(T entity, CancellationToken ct = default);
  Task UpdateAsync(T entity, CancellationToken ct = default);
  Task DeleteAsync(T entity, CancellationToken ct = default);
}
