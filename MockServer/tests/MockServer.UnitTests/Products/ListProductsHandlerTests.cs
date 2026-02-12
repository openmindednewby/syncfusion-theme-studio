using MockServer.UseCases.Products.List;

namespace MockServer.UnitTests.Products;

public class ListProductsHandlerTests
{
  private readonly IRepository<Product> _repository = Substitute.For<IRepository<Product>>();

  [Fact]
  public async Task Handle_WhenProductsExist_ReturnsPaginatedList()
  {
    // Arrange
    var products = new List<Product>
    {
      new() { Id = 1, Title = "Product A", Price = 10m, Brand = "BrandA", Category = "Cat1" },
      new() { Id = 2, Title = "Product B", Price = 20m, Brand = "BrandB", Category = "Cat2" }
    };
    _repository.CountAsync(Arg.Any<CancellationToken>()).Returns(2);
    _repository.ListAsync(0, 30, Arg.Any<CancellationToken>()).Returns(products);

    var handler = new ListProductsHandler(_repository);

    // Act
    var result = await handler.Handle(new ListProductsQuery(), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Items.Should().HaveCount(2);
    result.Value.Total.Should().Be(2);
    result.Value.Skip.Should().Be(0);
    result.Value.Limit.Should().Be(30);
  }

  [Fact]
  public async Task Handle_WhenNoProducts_ReturnsEmptyList()
  {
    // Arrange
    _repository.CountAsync(Arg.Any<CancellationToken>()).Returns(0);
    _repository.ListAsync(0, 30, Arg.Any<CancellationToken>()).Returns([]);

    var handler = new ListProductsHandler(_repository);

    // Act
    var result = await handler.Handle(new ListProductsQuery(), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Items.Should().BeEmpty();
    result.Value.Total.Should().Be(0);
  }

  [Fact]
  public async Task Handle_WithPagination_PassesSkipAndLimit()
  {
    // Arrange
    _repository.CountAsync(Arg.Any<CancellationToken>()).Returns(50);
    _repository.ListAsync(10, 5, Arg.Any<CancellationToken>()).Returns([]);

    var handler = new ListProductsHandler(_repository);

    // Act
    var result = await handler.Handle(new ListProductsQuery(10, 5), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Skip.Should().Be(10);
    result.Value.Limit.Should().Be(5);
    await _repository.Received(1).ListAsync(10, 5, Arg.Any<CancellationToken>());
  }
}
