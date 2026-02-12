namespace MockServer.Core.Entities;

public class Product : BaseEntity
{
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public decimal Price { get; set; }
  public decimal DiscountPercentage { get; set; }
  public decimal Rating { get; set; }
  public int Stock { get; set; }
  public string Brand { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public string Thumbnail { get; set; } = string.Empty;
  public List<string> Images { get; set; } = [];
}
