using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Products.Create;

public class CreateProductHandler(IRepository<Product> repository)
  : IRequestHandler<CreateProductCommand, Result<ProductDto>>
{
  public async Task<Result<ProductDto>> Handle(
    CreateProductCommand request,
    CancellationToken cancellationToken)
  {
    var product = new Product
    {
      Title = request.Title,
      Description = request.Description,
      Price = request.Price,
      DiscountPercentage = request.DiscountPercentage,
      Rating = request.Rating,
      Stock = request.Stock,
      Brand = request.Brand,
      Category = request.Category,
      Thumbnail = request.Thumbnail,
      Images = request.Images
    };

    var created = await repository.AddAsync(product, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
