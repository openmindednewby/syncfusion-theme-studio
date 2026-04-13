using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.KanbanTasks.List;

public class ListKanbanTasksHandler(IRepository<KanbanTask> repository)
  : IRequestHandler<ListKanbanTasksQuery, Result<List<KanbanTaskDto>>>
{
  public async Task<Result<List<KanbanTaskDto>>> Handle(
    ListKanbanTasksQuery request,
    CancellationToken cancellationToken)
  {
    var items = await repository.ListAsync(cancellationToken);
    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
