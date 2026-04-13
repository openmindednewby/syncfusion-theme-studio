using MockServer.UseCases.Users.GetById;

namespace MockServer.UnitTests.Users;

public class GetUserByIdHandlerTests
{
  private readonly IRepository<User> _repository = Substitute.For<IRepository<User>>();

  [Fact]
  public async Task Handle_WhenUserExists_ReturnsUser()
  {
    // Arrange
    var user = new User
    {
      Id = 1,
      FirstName = "John",
      LastName = "Doe",
      Email = "john@example.com",
      Username = "jdoe",
      Address = new Address { City = "NYC", Country = "USA" }
    };
    _repository.GetByIdAsync(1, Arg.Any<CancellationToken>()).Returns(user);

    var handler = new GetUserByIdHandler(_repository);

    // Act
    var result = await handler.Handle(new GetUserByIdQuery(1), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeTrue();
    result.Value.FirstName.Should().Be("John");
    result.Value.Address.City.Should().Be("NYC");
  }

  [Fact]
  public async Task Handle_WhenUserNotFound_ReturnsNotFound()
  {
    // Arrange
    _repository.GetByIdAsync(999, Arg.Any<CancellationToken>()).Returns((User?)null);

    var handler = new GetUserByIdHandler(_repository);

    // Act
    var result = await handler.Handle(new GetUserByIdQuery(999), CancellationToken.None);

    // Assert
    result.IsSuccess.Should().BeFalse();
    result.Status.Should().Be(Ardalis.Result.ResultStatus.NotFound);
  }
}
