using MockServer.UseCases.DTOs;
using MockServer.UseCases.GanttTasks.List;

namespace MockServer.Web.GanttTasks;

public class List(IMediator mediator) : EndpointWithoutRequest<List<GanttTaskDto>>
{
  public override void Configure()
  {
    Get("/gantt/tasks");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListGanttTasksQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
