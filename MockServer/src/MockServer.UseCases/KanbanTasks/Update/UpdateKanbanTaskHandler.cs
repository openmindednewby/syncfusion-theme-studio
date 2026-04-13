using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.KanbanTasks.Update;

public class UpdateKanbanTaskHandler(IRepository<KanbanTask> repository)
  : IRequestHandler<UpdateKanbanTaskCommand, Result<KanbanTaskDto>>
{
  public async Task<Result<KanbanTaskDto>> Handle(
    UpdateKanbanTaskCommand request,
    CancellationToken cancellationToken)
  {
    var task = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (task is null) return Result.NotFound($"KanbanTask with id {request.Id} not found.");

    task.Title = request.Title;
    task.Summary = request.Summary;
    task.Status = request.Status;
    task.Priority = request.Priority;
    task.Assignee = request.Assignee;
    task.Tags = request.Tags;
    task.Color = request.Color;
    task.DueDate = request.DueDate;
    task.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(task, cancellationToken);
    return Result.Success(DtoMapper.ToDto(task));
  }
}
