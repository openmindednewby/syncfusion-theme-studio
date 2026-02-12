using MockServer.UseCases.DTOs;
using MockServer.UseCases.Orders.Create;

namespace MockServer.UnitTests.Orders;

public class CreateOrderHandlerTests
{
  private readonly IRepository<Order> _repository = Substitute.For<IRepository<Order>>();

  [Fact]
  public async Task Handle_ValidCommand_CreatesOrderWithCorrectTotal()
  {
    // Arrange
    _repository.AddAsync(Arg.Any<Order>(), Arg.Any<CancellationToken>())
      .Returns(ci =>
      {
        var o = ci.Arg<Order>();
        o.Id = 1;
        return o;
      });

    var handler = new CreateOrderHandler(_repository);
    var items = new List<OrderItemDto>
    {
      new(1, "Product A", 2, 50.00m),
      new(2, "Product B", 1, 30.00m)
    };

    // Act
    var result = await handler.Handle(new CreateOrderCommand(1, items), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.TotalAmount.Should().Be(130.00m);
    result.Value.Status.Should().Be("Pending");
    result.Value.Items.Should().HaveCount(2);
  }

  [Fact]
  public async Task Handle_EmptyItems_CreatesOrderWithZeroTotal()
  {
    // Arrange
    _repository.AddAsync(Arg.Any<Order>(), Arg.Any<CancellationToken>())
      .Returns(ci =>
      {
        var o = ci.Arg<Order>();
        o.Id = 1;
        return o;
      });

    var handler = new CreateOrderHandler(_repository);

    // Act
    var result = await handler.Handle(new CreateOrderCommand(1, []), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.TotalAmount.Should().Be(0);
  }
}
