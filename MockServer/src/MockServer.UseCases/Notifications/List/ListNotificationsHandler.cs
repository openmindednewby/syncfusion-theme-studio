using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Notifications.List;

public class ListNotificationsHandler(IRepository<Notification> repository)
  : IRequestHandler<ListNotificationsQuery, Result<List<NotificationDto>>>
{
  public async Task<Result<List<NotificationDto>>> Handle(
    ListNotificationsQuery request,
    CancellationToken cancellationToken)
  {
    var notifications = await repository.ListAsync(cancellationToken);
    var dtos = notifications.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
