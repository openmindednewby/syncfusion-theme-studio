using MockServer.UseCases.DTOs;
using MockServer.UseCases.GanttTasks.Update;

namespace MockServer.Web.GanttTasks;

public class Update(IMediator mediator) : Endpoint<UpdateGanttTaskRequest, GanttTaskDto>
{
  public override void Configure()
  {
    Put("/gantt/tasks/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateGanttTaskRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new UpdateGanttTaskCommand(
      req.Id, req.TaskName, req.StartDate, req.EndDate, req.Duration,
      req.Progress, req.ParentTaskId, req.Dependencies,
      req.Assignee, req.Priority), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateGanttTaskRequest
{
  public int Id { get; init; }
  public string TaskName { get; init; } = string.Empty;
  public DateTime StartDate { get; init; }
  public DateTime EndDate { get; init; }
  public int Duration { get; init; }
  public int Progress { get; init; }
  public int? ParentTaskId { get; init; }
  public string? Dependencies { get; init; }
  public string Assignee { get; init; } = string.Empty;
  public string Priority { get; init; } = string.Empty;
}
