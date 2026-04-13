using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.GanttTasks.Create;

public class CreateGanttTaskHandler(IRepository<GanttTask> repository)
  : IRequestHandler<CreateGanttTaskCommand, Result<GanttTaskDto>>
{
  public async Task<Result<GanttTaskDto>> Handle(
    CreateGanttTaskCommand request,
    CancellationToken cancellationToken)
  {
    var task = new GanttTask
    {
      TaskName = request.TaskName,
      StartDate = request.StartDate,
      EndDate = request.EndDate,
      Duration = request.Duration,
      Progress = request.Progress,
      ParentTaskId = request.ParentTaskId,
      Dependencies = request.Dependencies,
      Assignee = request.Assignee,
      Priority = request.Priority
    };

    var created = await repository.AddAsync(task, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
