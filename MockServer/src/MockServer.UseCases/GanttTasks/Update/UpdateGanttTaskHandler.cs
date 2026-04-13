using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.GanttTasks.Update;

public class UpdateGanttTaskHandler(IRepository<GanttTask> repository)
  : IRequestHandler<UpdateGanttTaskCommand, Result<GanttTaskDto>>
{
  public async Task<Result<GanttTaskDto>> Handle(
    UpdateGanttTaskCommand request,
    CancellationToken cancellationToken)
  {
    var task = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (task is null) return Result.NotFound($"GanttTask with id {request.Id} not found.");

    task.TaskName = request.TaskName;
    task.StartDate = request.StartDate;
    task.EndDate = request.EndDate;
    task.Duration = request.Duration;
    task.Progress = request.Progress;
    task.ParentTaskId = request.ParentTaskId;
    task.Dependencies = request.Dependencies;
    task.Assignee = request.Assignee;
    task.Priority = request.Priority;
    task.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(task, cancellationToken);
    return Result.Success(DtoMapper.ToDto(task));
  }
}
