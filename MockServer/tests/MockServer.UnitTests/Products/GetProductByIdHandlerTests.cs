using MockServer.UseCases.Products.GetById;

namespace MockServer.UnitTests.Products;

public class GetProductByIdHandlerTests
{
  private readonly IRepository<Product> _repository = Substitute.For<IRepository<Product>>();

  [Fact]
  public async Task Handle_WhenProductExists_ReturnsProduct()
  {
    // Arrange
    var product = new Product
    {
      Id = 1,
      Title = "Test Product",
      Description = "Desc",
      Price = 99.99m,
      Brand = "TestBrand",
      Category = "TestCat"
    };
    _repository.GetByIdAsync(1, Arg.Any<CancellationToken>()).Returns(product);

    var handler = new GetProductByIdHandler(_repository);

    // Act
    var result = await handler.Handle(new GetProductByIdQuery(1), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Id.Should().Be(1);
    result.Value.Title.Should().Be("Test Product");
    result.Value.Price.Should().Be(99.99m);
  }

  [Fact]
  public async Task Handle_WhenProductNotFound_ReturnsNotFound()
  {
    // Arrange
    _repository.GetByIdAsync(999, Arg.Any<CancellationToken>()).Returns((Product?)null);

    var handler = new GetProductByIdHandler(_repository);

    // Act
    var result = await handler.Handle(new GetProductByIdQuery(999), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeFalse();
    result.Status.Should().Be(Ardalis.Result.ResultStatus.NotFound);
  }
}
