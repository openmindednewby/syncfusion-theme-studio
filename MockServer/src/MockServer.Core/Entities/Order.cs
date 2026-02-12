namespace MockServer.Core.Entities;

public class Order : BaseEntity
{
  public int UserId { get; set; }
  public OrderStatus Status { get; set; }
  public decimal TotalAmount { get; set; }
  public List<OrderItem> Items { get; set; } = [];
}
