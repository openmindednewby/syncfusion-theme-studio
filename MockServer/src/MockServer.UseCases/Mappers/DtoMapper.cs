using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Mappers;

public static class DtoMapper
{
  public static ProductDto ToDto(Product product) =>
    new(
      product.Id,
      product.Title,
      product.Description,
      product.Price,
      product.DiscountPercentage,
      product.Rating,
      product.Stock,
      product.Brand,
      product.Category,
      product.Thumbnail,
      product.Images);

  public static UserDto ToDto(User user) =>
    new(
      user.Id,
      user.FirstName,
      user.LastName,
      user.Email,
      user.Phone,
      user.Username,
      user.BirthDate,
      user.Image,
      new AddressDto(
        user.Address.Street,
        user.Address.City,
        user.Address.State,
        user.Address.PostalCode,
        user.Address.Country));

  public static OrderDto ToDto(Order order) =>
    new(
      order.Id,
      order.UserId,
      order.Status.ToString(),
      order.TotalAmount,
      order.Items.Select(i => new OrderItemDto(
        i.ProductId,
        i.ProductTitle,
        i.Quantity,
        i.UnitPrice)).ToList(),
      order.CreatedAt);

  public static NotificationDto ToDto(Notification notification) =>
    new(
      notification.Id,
      notification.Type.ToString(),
      notification.Title,
      notification.Message,
      notification.IsRead,
      notification.CreatedAt);

  public static KanbanTaskDto ToDto(KanbanTask task) =>
    new(
      task.Id,
      task.Title,
      task.Summary,
      task.Status,
      task.Priority,
      task.Assignee,
      task.Tags,
      task.Color,
      task.CreatedAt,
      task.DueDate);

  public static GanttTaskDto ToDto(GanttTask ganttTask) =>
    new(
      ganttTask.Id,
      ganttTask.TaskName,
      ganttTask.StartDate,
      ganttTask.EndDate,
      ganttTask.Duration,
      ganttTask.Progress,
      ganttTask.ParentTaskId,
      ganttTask.Dependencies,
      ganttTask.Assignee,
      ganttTask.Priority);

  public static CalendarEventDto ToDto(CalendarEvent calendarEvent) =>
    new(
      calendarEvent.Id,
      calendarEvent.Title,
      calendarEvent.Description,
      calendarEvent.StartTime,
      calendarEvent.EndTime,
      calendarEvent.Location,
      calendarEvent.IsAllDay,
      calendarEvent.RecurrenceRule,
      calendarEvent.Category,
      calendarEvent.Color,
      calendarEvent.CreatedBy,
      calendarEvent.CreatedAt);

  public static AuditEntryDto ToDto(AuditEntry entry) =>
    new(
      entry.Id,
      entry.UserId,
      entry.UserName,
      entry.Action.ToString(),
      entry.EntityType,
      entry.EntityId,
      entry.Details,
      entry.Timestamp,
      entry.IpAddress);

  public static RoleDto ToDto(Role role) =>
    new(
      role.Id,
      role.Name,
      role.Description,
      role.IsBuiltIn,
      role.Permissions);

  public static SystemSettingsDto ToDto(Core.Entities.SystemSettings settings) =>
    new(
      settings.AppName,
      settings.Timezone,
      settings.DefaultLanguage,
      settings.DateFormat,
      settings.CurrencyFormat,
      settings.MinPasswordLength,
      settings.RequireUppercase,
      settings.RequireNumber,
      settings.RequireSpecialChar,
      settings.Enforce2FA,
      settings.SessionTimeoutMinutes,
      settings.MaxLoginAttempts,
      settings.SmtpHost,
      settings.SmtpPort,
      settings.SmtpUsername,
      settings.SmtpPassword,
      settings.FromAddress,
      settings.EnableTls,
      settings.EnableEmailNotifications,
      settings.EnableInAppNotifications,
      settings.EnableSmsNotifications,
      settings.AlertSeverityThreshold,
      settings.MaintenanceMode,
      settings.MaintenanceStart,
      settings.MaintenanceEnd);

  public static ChatChannelDto ToDto(ChatChannel channel) =>
    new(
      channel.Id,
      channel.Name,
      channel.Description,
      channel.Icon,
      channel.CreatedAt);

  public static ChatMessageDto ToDto(ChatMessage message) =>
    new(
      message.Id,
      message.ChannelId,
      message.SenderName,
      message.SenderAvatar,
      message.Content,
      message.Timestamp);

  public static OrganizationDto ToDto(Organization organization) =>
    new(
      organization.Id,
      organization.Name,
      organization.Slug,
      organization.LogoUrl,
      organization.Plan,
      organization.MemberCount);
}
