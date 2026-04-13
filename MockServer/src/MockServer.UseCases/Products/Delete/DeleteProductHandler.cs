namespace MockServer.UseCases.Products.Delete;

public class DeleteProductHandler(IRepository<Product> repository)
  : IRequestHandler<DeleteProductCommand, Result>
{
  public async Task<Result> Handle(
    DeleteProductCommand request,
    CancellationToken cancellationToken)
  {
    var product = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (product is null) return Result.NotFound($"Product with id {request.Id} not found.");

    await repository.DeleteAsync(product, cancellationToken);
    return Result.Success();
  }
}
