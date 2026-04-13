using MockServer.UseCases.DTOs;
using MockServer.UseCases.KanbanTasks.List;

namespace MockServer.Web.KanbanTasks;

public class List(IMediator mediator) : EndpointWithoutRequest<List<KanbanTaskDto>>
{
  public override void Configure()
  {
    Get("/kanban/tasks");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var result = await mediator.Send(new ListKanbanTasksQuery(), ct);
    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
  }
}
