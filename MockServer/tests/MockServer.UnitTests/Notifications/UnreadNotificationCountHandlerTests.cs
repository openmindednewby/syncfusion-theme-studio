using MockServer.UseCases.Notifications.UnreadCount;

namespace MockServer.UnitTests.Notifications;

public class UnreadNotificationCountHandlerTests
{
  private readonly IRepository<Notification> _repository = Substitute.For<IRepository<Notification>>();

  [Fact]
  public async Task Handle_MixedReadUnread_ReturnsCorrectCount()
  {
    // Arrange
    var notifications = new List<Notification>
    {
      new() { Id = 1, IsRead = true },
      new() { Id = 2, IsRead = false },
      new() { Id = 3, IsRead = false },
      new() { Id = 4, IsRead = true }
    };
    _repository.ListAsync(Arg.Any<CancellationToken>()).Returns(notifications);

    var handler = new UnreadNotificationCountHandler(_repository);

    // Act
    var result = await handler.Handle(new UnreadNotificationCountQuery(), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().Be(2);
  }

  [Fact]
  public async Task Handle_AllRead_ReturnsZero()
  {
    // Arrange
    var notifications = new List<Notification>
    {
      new() { Id = 1, IsRead = true },
      new() { Id = 2, IsRead = true }
    };
    _repository.ListAsync(Arg.Any<CancellationToken>()).Returns(notifications);

    var handler = new UnreadNotificationCountHandler(_repository);

    // Act
    var result = await handler.Handle(new UnreadNotificationCountQuery(), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().Be(0);
  }

  [Fact]
  public async Task Handle_Empty_ReturnsZero()
  {
    // Arrange
    _repository.ListAsync(Arg.Any<CancellationToken>()).Returns([]);

    var handler = new UnreadNotificationCountHandler(_repository);

    // Act
    var result = await handler.Handle(new UnreadNotificationCountQuery(), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.Should().Be(0);
  }
}
