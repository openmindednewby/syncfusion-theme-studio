using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.GanttTasks.Create;

public record CreateGanttTaskCommand(
  string TaskName,
  DateTime StartDate,
  DateTime EndDate,
  int Duration,
  int Progress,
  int? ParentTaskId,
  string? Dependencies,
  string Assignee,
  string Priority) : IRequest<Result<GanttTaskDto>>;
