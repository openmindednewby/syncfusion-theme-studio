using MockServer.UseCases.DTOs;
using MockServer.UseCases.KanbanTasks.Update;

namespace MockServer.Web.KanbanTasks;

public class Update(IMediator mediator) : Endpoint<UpdateKanbanTaskRequest, KanbanTaskDto>
{
  public override void Configure()
  {
    Put("/kanban/tasks/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateKanbanTaskRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new UpdateKanbanTaskCommand(
      req.Id, req.Title, req.Summary, req.Status, req.Priority,
      req.Assignee, req.Tags, req.Color, req.DueDate), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateKanbanTaskRequest
{
  public int Id { get; init; }
  public string Title { get; init; } = string.Empty;
  public string Summary { get; init; } = string.Empty;
  public string Status { get; init; } = string.Empty;
  public string Priority { get; init; } = string.Empty;
  public string Assignee { get; init; } = string.Empty;
  public string Tags { get; init; } = string.Empty;
  public string Color { get; init; } = string.Empty;
  public DateTime? DueDate { get; init; }
}
