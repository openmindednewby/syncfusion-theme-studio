namespace MockServer.Infrastructure.Data;

public class EfRepository<T>(MockDbContext dbContext) : IRepository<T>
  where T : BaseEntity
{
  public async Task<T?> GetByIdAsync(int id, CancellationToken ct = default)
  {
    return await dbContext.Set<T>().FindAsync([id], cancellationToken: ct);
  }

  public async Task<List<T>> ListAsync(CancellationToken ct = default)
  {
    return await dbContext.Set<T>().OrderBy(e => e.Id).ToListAsync(ct);
  }

  public async Task<List<T>> ListAsync(int skip, int limit, CancellationToken ct = default)
  {
    return await dbContext.Set<T>()
      .OrderBy(e => e.Id)
      .Skip(skip)
      .Take(limit)
      .ToListAsync(ct);
  }

  public async Task<int> CountAsync(CancellationToken ct = default)
  {
    return await dbContext.Set<T>().CountAsync(ct);
  }

  public async Task<T> AddAsync(T entity, CancellationToken ct = default)
  {
    await dbContext.Set<T>().AddAsync(entity, ct);
    await dbContext.SaveChangesAsync(ct);
    return entity;
  }

  public async Task UpdateAsync(T entity, CancellationToken ct = default)
  {
    dbContext.Set<T>().Update(entity);
    await dbContext.SaveChangesAsync(ct);
  }

  public async Task DeleteAsync(T entity, CancellationToken ct = default)
  {
    dbContext.Set<T>().Remove(entity);
    await dbContext.SaveChangesAsync(ct);
  }
}
