using MockServer.UseCases.DTOs;
using MockServer.UseCases.GanttTasks.List;

namespace MockServer.Web.GanttTasks;

public class GetById(IMediator mediator) : Endpoint<GetByIdRequest, GanttTaskDto>
{
  public override void Configure()
  {
    Get("/gantt/tasks/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new ListGanttTasksQuery(), ct);
    if (!result.IsSuccess) { await SendNotFoundAsync(ct); return; }
    var task = result.Value.Find(t => t.Id == req.Id);
    if (task is null) { await SendNotFoundAsync(ct); return; }
    await SendOkAsync(task, ct);
  }
}

public record GetByIdRequest
{
  public int Id { get; init; }
}
