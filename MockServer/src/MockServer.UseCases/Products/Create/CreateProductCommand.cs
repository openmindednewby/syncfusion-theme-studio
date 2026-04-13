using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Products.Create;

public record CreateProductCommand(
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
