using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.GanttTasks.List;

public class ListGanttTasksHandler(IRepository<GanttTask> repository)
  : IRequestHandler<ListGanttTasksQuery, Result<List<GanttTaskDto>>>
{
  public async Task<Result<List<GanttTaskDto>>> Handle(
    ListGanttTasksQuery request,
    CancellationToken cancellationToken)
  {
    var items = await repository.ListAsync(cancellationToken);
    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
