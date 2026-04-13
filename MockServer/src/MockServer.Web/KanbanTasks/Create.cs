using MockServer.UseCases.DTOs;
using MockServer.UseCases.KanbanTasks.Create;

namespace MockServer.Web.KanbanTasks;

public class Create(IMediator mediator) : Endpoint<CreateKanbanTaskRequest, KanbanTaskDto>
{
  public override void Configure()
  {
    Post("/kanban/tasks");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateKanbanTaskRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new CreateKanbanTaskCommand(
      req.Title, req.Summary, req.Status, req.Priority,
      req.Assignee, req.Tags, req.Color, req.DueDate), ct);

    if (result.IsSuccess) await SendCreatedAtAsync<GetById>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateKanbanTaskRequest(
  string Title,
  string Summary,
  string Status,
  string Priority,
  string Assignee,
  string Tags,
  string Color,
  DateTime? DueDate);
