using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Products.Search;

public record SearchProductsQuery(string Query) : IRequest<Result<List<ProductDto>>>;
