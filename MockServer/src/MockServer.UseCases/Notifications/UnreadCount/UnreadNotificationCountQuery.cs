namespace MockServer.UseCases.Notifications.UnreadCount;

public record UnreadNotificationCountQuery : IRequest<Result<int>>;
