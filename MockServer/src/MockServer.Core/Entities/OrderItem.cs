namespace MockServer.Core.Entities;

public class OrderItem
{
  public int ProductId { get; set; }
  public string ProductTitle { get; set; } = string.Empty;
  public int Quantity { get; set; }
  public decimal UnitPrice { get; set; }
}
