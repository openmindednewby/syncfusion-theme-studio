namespace MockServer.UseCases.DTOs;

public record GanttTaskDto(
  int Id,
  string TaskName,
  DateTime StartDate,
  DateTime EndDate,
  int Duration,
  int Progress,
  int? ParentTaskId,
  string? Dependencies,
  string Assignee,
  string Priority);
