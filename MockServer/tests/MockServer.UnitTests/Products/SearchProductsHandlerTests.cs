using MockServer.UseCases.Products.Search;

namespace MockServer.UnitTests.Products;

public class SearchProductsHandlerTests
{
  private readonly IRepository<Product> _repository = Substitute.For<IRepository<Product>>();

  [Fact]
  public async Task Handle_MatchingQuery_ReturnsFilteredProducts()
  {
    // Arrange
    var products = new List<Product>
    {
      new() { Id = 1, Title = "iPhone 15", Description = "Apple phone", Brand = "Apple", Category = "Electronics" },
      new() { Id = 2, Title = "Samsung Galaxy", Description = "Samsung phone", Brand = "Samsung", Category = "Electronics" },
      new() { Id = 3, Title = "Nike Shoes", Description = "Running shoes", Brand = "Nike", Category = "Clothing" }
    };
    _repository.ListAsync(Arg.Any<CancellationToken>()).Returns(products);

    var handler = new SearchProductsHandler(_repository);

    // Act
    var result = await handler.Handle(new SearchProductsQuery("apple"), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().HaveCount(1);
    result.Value[0].Title.Should().Be("iPhone 15");
  }

  [Fact]
  public async Task Handle_NoMatch_ReturnsEmptyList()
  {
    // Arrange
    var products = new List<Product>
    {
      new() { Id = 1, Title = "iPhone", Description = "Phone", Brand = "Apple", Category = "Electronics" }
    };
    _repository.ListAsync(Arg.Any<CancellationToken>()).Returns(products);

    var handler = new SearchProductsHandler(_repository);

    // Act
    var result = await handler.Handle(new SearchProductsQuery("nonexistent"), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().BeEmpty();
  }

  [Fact]
  public async Task Handle_CaseInsensitive_ReturnsMatch()
  {
    // Arrange
    var products = new List<Product>
    {
      new() { Id = 1, Title = "MacBook Pro", Description = "Laptop", Brand = "Apple", Category = "Electronics" }
    };
    _repository.ListAsync(Arg.Any<CancellationToken>()).Returns(products);

    var handler = new SearchProductsHandler(_repository);

    // Act
    var result = await handler.Handle(new SearchProductsQuery("MACBOOK"), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().HaveCount(1);
  }
}
