using MockServer.UseCases.DTOs;
using MockServer.UseCases.GanttTasks.Create;

namespace MockServer.Web.GanttTasks;

public class Create(IMediator mediator) : Endpoint<CreateGanttTaskRequest, GanttTaskDto>
{
  public override void Configure()
  {
    Post("/gantt/tasks");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateGanttTaskRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new CreateGanttTaskCommand(
      req.TaskName, req.StartDate, req.EndDate, req.Duration,
      req.Progress, req.ParentTaskId, req.Dependencies,
      req.Assignee, req.Priority), ct);

    if (result.IsSuccess)
      await SendCreatedAtAsync<GetById>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateGanttTaskRequest(
  string TaskName,
  DateTime StartDate,
  DateTime EndDate,
  int Duration,
  int Progress,
  int? ParentTaskId,
  string? Dependencies,
  string Assignee,
  string Priority);
