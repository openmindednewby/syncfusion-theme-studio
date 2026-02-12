using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Products.ListByCategory;

public record ListProductsByCategoryQuery(string Category) : IRequest<Result<List<ProductDto>>>;
