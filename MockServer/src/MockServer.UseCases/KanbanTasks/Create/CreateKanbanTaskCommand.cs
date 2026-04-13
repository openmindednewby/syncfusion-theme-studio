using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.KanbanTasks.Create;

public record CreateKanbanTaskCommand(
  string Title,
  string Summary,
  string Status,
  string Priority,
  string Assignee,
  string Tags,
  string Color,
  DateTime? DueDate) : IRequest<Result<KanbanTaskDto>>;
