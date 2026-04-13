using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.GanttTasks.Update;

public record UpdateGanttTaskCommand(
  int Id,
  string TaskName,
  DateTime StartDate,
  DateTime EndDate,
  int Duration,
  int Progress,
  int? ParentTaskId,
  string? Dependencies,
  string Assignee,
  string Priority) : IRequest<Result<GanttTaskDto>>;
