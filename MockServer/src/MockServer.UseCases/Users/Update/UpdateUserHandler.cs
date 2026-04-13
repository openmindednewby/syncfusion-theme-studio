using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Users.Update;

public class UpdateUserHandler(IRepository<User> repository)
  : IRequestHandler<UpdateUserCommand, Result<UserDto>>
{
  public async Task<Result<UserDto>> Handle(
    UpdateUserCommand request,
    CancellationToken cancellationToken)
  {
    var user = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (user is null) return Result.NotFound($"User with id {request.Id} not found.");

    user.FirstName = request.FirstName;
    user.LastName = request.LastName;
    user.Email = request.Email;
    user.Phone = request.Phone;
    user.Username = request.Username;
    user.BirthDate = request.BirthDate;
    user.Image = request.Image;
    user.Address = new Address
    {
      Street = request.Address.Street,
      City = request.Address.City,
      State = request.Address.State,
      PostalCode = request.Address.PostalCode,
      Country = request.Address.Country
    };
    user.UpdatedAt = DateTime.UtcNow;

    await repository.UpdateAsync(user, cancellationToken);
    return Result.Success(DtoMapper.ToDto(user));
  }
}
