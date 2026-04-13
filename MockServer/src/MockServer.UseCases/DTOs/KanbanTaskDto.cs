namespace MockServer.UseCases.DTOs;

public record KanbanTaskDto(
  int Id,
  string Title,
  string Summary,
  string Status,
  string Priority,
  string Assignee,
  string Tags,
  string Color,
  DateTime CreatedAt,
  DateTime? DueDate);
