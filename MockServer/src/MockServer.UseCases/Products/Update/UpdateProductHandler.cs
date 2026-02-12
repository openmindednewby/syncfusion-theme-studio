using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Products.Update;

public class UpdateProductHandler(IRepository<Product> repository)
  : IRequestHandler<UpdateProductCommand, Result<ProductDto>>
{
  public async Task<Result<ProductDto>> Handle(
    UpdateProductCommand request,
    CancellationToken cancellationToken)
  {
    var product = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (product is null) return Result.NotFound($"Product with id {request.Id} not found.");

    product.Title = request.Title;
    product.Description = request.Description;
    product.Price = request.Price;
    product.DiscountPercentage = request.DiscountPercentage;
    product.Rating = request.Rating;
    product.Stock = request.Stock;
    product.Brand = request.Brand;
    product.Category = request.Category;
    product.Thumbnail = request.Thumbnail;
    product.Images = request.Images;
    product.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(product, cancellationToken);
    return Result.Success(DtoMapper.ToDto(product));
  }
}
