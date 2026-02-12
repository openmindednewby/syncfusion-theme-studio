using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Users.Create;

public class CreateUserHandler(IRepository<User> repository)
  : IRequestHandler<CreateUserCommand, Result<UserDto>>
{
  public async Task<Result<UserDto>> Handle(
    CreateUserCommand request,
    CancellationToken cancellationToken)
  {
    var user = new User
    {
      FirstName = request.FirstName,
      LastName = request.LastName,
      Email = request.Email,
      Phone = request.Phone,
      Username = request.Username,
      BirthDate = request.BirthDate,
      Image = request.Image,
      Address = new Address
      {
        Street = request.Address.Street,
        City = request.Address.City,
        State = request.Address.State,
        PostalCode = request.Address.PostalCode,
        Country = request.Address.Country
      }
    };

    var created = await repository.AddAsync(user, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
