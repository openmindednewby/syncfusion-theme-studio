namespace MockServer.UseCases.Notifications.UnreadCount;

public class UnreadNotificationCountHandler(IRepository<Notification> repository)
  : IRequestHandler<UnreadNotificationCountQuery, Result<int>>
{
  public async Task<Result<int>> Handle(
    UnreadNotificationCountQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var unreadCount = all.Count(n => !n.IsRead);
    return Result.Success(unreadCount);
  }
}
