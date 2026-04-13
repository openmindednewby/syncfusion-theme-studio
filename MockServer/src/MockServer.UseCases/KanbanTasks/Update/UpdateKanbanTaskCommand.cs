using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.KanbanTasks.Update;

public record UpdateKanbanTaskCommand(
  int Id,
  string Title,
  string Summary,
  string Status,
  string Priority,
  string Assignee,
  string Tags,
  string Color,
  DateTime? DueDate) : IRequest<Result<KanbanTaskDto>>;
