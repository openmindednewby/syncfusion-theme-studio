namespace MockServer.UseCases.Products.ListCategories;

public record ListProductCategoriesQuery : IRequest<Result<List<string>>>;
