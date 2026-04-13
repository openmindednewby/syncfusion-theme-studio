using MockServer.UseCases.DTOs;
using MockServer.UseCases.Products.Create;

namespace MockServer.Web.Products;

public class Create(IMediator mediator) : Endpoint<CreateProductRequest, ProductDto>
{
  public override void Configure()
  {
    Post("/products");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CreateProductRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new CreateProductCommand(
      req.Title, req.Description, req.Price, req.DiscountPercentage,
      req.Rating, req.Stock, req.Brand, req.Category,
      req.Thumbnail, req.Images), ct);

    if (result.IsSuccess) await SendCreatedAtAsync<GetById>(new { result.Value.Id }, result.Value, cancellation: ct);
  }
}

public record CreateProductRequest(
  string Title,
  string Description,
  decimal Price,
  decimal DiscountPercentage,
  decimal Rating,
  int Stock,
  string Brand,
  string Category,
  string Thumbnail,
  List<string> Images);
