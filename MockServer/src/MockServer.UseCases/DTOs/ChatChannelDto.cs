namespace MockServer.UseCases.DTOs;

public record ChatChannelDto(
  int Id,
  string Name,
  string Description,
  string Icon,
  DateTime CreatedAt);
