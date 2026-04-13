using MockServer.UseCases.KanbanTasks.Delete;

namespace MockServer.Web.KanbanTasks;

public class Delete(IMediator mediator) : Endpoint<DeleteKanbanTaskRequest>
{
  public override void Configure()
  {
    Verbs(Http.DELETE);
    Routes("/kanban/tasks/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(DeleteKanbanTaskRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new DeleteKanbanTaskCommand(req.Id), ct);
    if (result.IsSuccess) await SendNoContentAsync(ct);
    else await SendNotFoundAsync(ct);
  }
}

public record DeleteKanbanTaskRequest
{
  public int Id { get; init; }
}
