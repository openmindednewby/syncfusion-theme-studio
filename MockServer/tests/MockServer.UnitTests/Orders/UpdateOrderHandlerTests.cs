using MockServer.UseCases.Orders.Update;

namespace MockServer.UnitTests.Orders;

public class UpdateOrderHandlerTests
{
  private readonly IRepository<Order> _repository = Substitute.For<IRepository<Order>>();

  [Fact]
  public async Task Handle_ValidStatus_UpdatesOrderStatus()
  {
    // Arrange
    var order = new Order { Id = 1, Status = OrderStatus.Pending, TotalAmount = 100m };
    _repository.GetByIdAsync(1, Arg.Any<CancellationToken>()).Returns(order);

    var handler = new UpdateOrderHandler(_repository);

    // Act
    var result = await handler.Handle(new UpdateOrderCommand(1, "Shipped"), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Status.Should().Be("Shipped");
    await _repository.Received(1).UpdateAsync(order, Arg.Any<CancellationToken>());
  }

  [Fact]
  public async Task Handle_InvalidStatus_ReturnsInvalid()
  {
    // Arrange
    var order = new Order { Id = 1, Status = OrderStatus.Pending };
    _repository.GetByIdAsync(1, Arg.Any<CancellationToken>()).Returns(order);

    var handler = new UpdateOrderHandler(_repository);

    // Act
    var result = await handler.Handle(new UpdateOrderCommand(1, "InvalidStatus"), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeFalse();
    result.Status.Should().Be(Ardalis.Result.ResultStatus.Invalid);
  }

  [Fact]
  public async Task Handle_OrderNotFound_ReturnsNotFound()
  {
    // Arrange
    _repository.GetByIdAsync(999, Arg.Any<CancellationToken>()).Returns((Order?)null);

    var handler = new UpdateOrderHandler(_repository);

    // Act
    var result = await handler.Handle(new UpdateOrderCommand(999, "Shipped"), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeFalse();
    result.Status.Should().Be(Ardalis.Result.ResultStatus.NotFound);
  }
}
