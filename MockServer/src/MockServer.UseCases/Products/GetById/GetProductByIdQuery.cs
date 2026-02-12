using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Products.GetById;

public record GetProductByIdQuery(int Id) : IRequest<Result<ProductDto>>;
