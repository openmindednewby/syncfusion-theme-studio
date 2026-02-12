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
}
