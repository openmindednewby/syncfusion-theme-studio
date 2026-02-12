using MockServer.UseCases.Products.Create;

namespace MockServer.UnitTests.Products;

public class CreateProductHandlerTests
{
  private readonly IRepository<Product> _repository = Substitute.For<IRepository<Product>>();

  [Fact]
  public async Task Handle_ValidCommand_ReturnsCreatedProduct()
  {
    // Arrange
    _repository.AddAsync(Arg.Any<Product>(), Arg.Any<CancellationToken>())
      .Returns(ci =>
      {
        var p = ci.Arg<Product>();
        p.Id = 1;
        return p;
      });

    var handler = new CreateProductHandler(_repository);
    var command = new CreateProductCommand(
      "New Product", "Description", 29.99m, 5m, 4.5m, 100,
      "Brand", "Category", "thumb.jpg", ["img1.jpg"]);

    // Act
    var result = await handler.Handle(command, CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Id.Should().Be(1);
    result.Value.Title.Should().Be("New Product");
    result.Value.Price.Should().Be(29.99m);
    await _repository.Received(1).AddAsync(Arg.Any<Product>(), Arg.Any<CancellationToken>());
  }
}
