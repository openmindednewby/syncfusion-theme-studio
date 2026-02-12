using MockServer.UseCases.Products.Delete;

namespace MockServer.UnitTests.Products;

public class DeleteProductHandlerTests
{
  private readonly IRepository<Product> _repository = Substitute.For<IRepository<Product>>();

  [Fact]
  public async Task Handle_WhenProductExists_DeletesAndReturnsSuccess()
  {
    // Arrange
    var product = new Product { Id = 1, Title = "To Delete" };
    _repository.GetByIdAsync(1, Arg.Any<CancellationToken>()).Returns(product);

    var handler = new DeleteProductHandler(_repository);

    // Act
    var result = await handler.Handle(new DeleteProductCommand(1), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    await _repository.Received(1).DeleteAsync(product, Arg.Any<CancellationToken>());
  }

  [Fact]
  public async Task Handle_WhenProductNotFound_ReturnsNotFound()
  {
    // Arrange
    _repository.GetByIdAsync(999, Arg.Any<CancellationToken>()).Returns((Product?)null);

    var handler = new DeleteProductHandler(_repository);

    // Act
    var result = await handler.Handle(new DeleteProductCommand(999), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeFalse();
    result.Status.Should().Be(Ardalis.Result.ResultStatus.NotFound);
  }
}
