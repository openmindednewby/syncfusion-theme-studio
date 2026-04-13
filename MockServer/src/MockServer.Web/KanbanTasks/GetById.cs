using MockServer.UseCases.DTOs;
using MockServer.UseCases.KanbanTasks.List;

namespace MockServer.Web.KanbanTasks;

public class GetById(IMediator mediator) : Endpoint<GetKanbanTaskByIdRequest, KanbanTaskDto>
{
  public override void Configure()
  {
    Get("/kanban/tasks/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetKanbanTaskByIdRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new ListKanbanTasksQuery(), ct);
    if (!result.IsSuccess) { await SendNotFoundAsync(ct); return; }

    var task = result.Value.FirstOrDefault(t => t.Id == req.Id);
    if (task is null) { await SendNotFoundAsync(ct); return; }

    await SendOkAsync(task, ct);
  }
}

public record GetKanbanTaskByIdRequest
{
  public int Id { get; init; }
}
