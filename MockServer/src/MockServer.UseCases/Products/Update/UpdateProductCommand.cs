using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Products.Update;

public record UpdateProductCommand(
  int Id,
  string Title,
  string Description,
  decimal Price,
  decimal DiscountPercentage,
  decimal Rating,
  int Stock,
  string Brand,
  string Category,
  string Thumbnail,
  List<string> Images) : IRequest<Result<ProductDto>>;
