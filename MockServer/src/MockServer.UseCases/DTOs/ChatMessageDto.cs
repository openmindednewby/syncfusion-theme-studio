namespace MockServer.UseCases.DTOs;

public record ChatMessageDto(
  int Id,
  int ChannelId,
  string SenderName,
  string SenderAvatar,
  string Content,
  DateTime Timestamp);
