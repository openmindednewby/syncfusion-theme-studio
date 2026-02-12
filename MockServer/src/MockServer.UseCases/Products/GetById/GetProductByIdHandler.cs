using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Products.GetById;

public class GetProductByIdHandler(IRepository<Product> repository)
  : IRequestHandler<GetProductByIdQuery, Result<ProductDto>>
{
  public async Task<Result<ProductDto>> Handle(
    GetProductByIdQuery request,
    CancellationToken cancellationToken)
  {
    var product = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (product is null) return Result.NotFound($"Product with id {request.Id} not found.");
    return Result.Success(DtoMapper.ToDto(product));
  }
}
