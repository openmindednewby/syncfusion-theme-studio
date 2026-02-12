using MockServer.UseCases.DTOs;
using MockServer.UseCases.Products.Update;

namespace MockServer.Web.Products;

public class Update(IMediator mediator) : Endpoint<UpdateProductRequest, ProductDto>
{
  public override void Configure()
  {
    Put("/products/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UpdateProductRequest req, CancellationToken ct)
  {
    var result = await mediator.Send(new UpdateProductCommand(
      req.Id, req.Title, req.Description, req.Price, req.DiscountPercentage,
      req.Rating, req.Stock, req.Brand, req.Category,
      req.Thumbnail, req.Images), ct);

    if (result.IsSuccess) await SendOkAsync(result.Value, ct);
    else await SendNotFoundAsync(ct);
  }
}

public record UpdateProductRequest
{
  public int Id { get; init; }
  public string Title { get; init; } = string.Empty;
  public string Description { get; init; } = string.Empty;
  public decimal Price { get; init; }
  public decimal DiscountPercentage { get; init; }
  public decimal Rating { get; init; }
  public int Stock { get; init; }
  public string Brand { get; init; } = string.Empty;
  public string Category { get; init; } = string.Empty;
  public string Thumbnail { get; init; } = string.Empty;
  public List<string> Images { get; init; } = [];
}
