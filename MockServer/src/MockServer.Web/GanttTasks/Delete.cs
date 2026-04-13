using MockServer.UseCases.GanttTasks.Delete;

namespace MockServer.Web.GanttTasks;

public class Delete(IMediator mediator) : Endpoint<DeleteGanttTaskRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/gantt/tasks/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteGanttTaskRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteGanttTaskCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else await SendNotFoundAsync(ct);
  }
}

public record DeleteGanttTaskRequest
{
  public int Id { get; init; }
}
