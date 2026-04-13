namespace MockServer.UseCases.Products.Delete;

public record DeleteProductCommand(int Id) : IRequest<Result>;
