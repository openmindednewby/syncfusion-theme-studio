using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Notifications.List;

public record ListNotificationsQuery : IRequest<Result<List<NotificationDto>>>;
