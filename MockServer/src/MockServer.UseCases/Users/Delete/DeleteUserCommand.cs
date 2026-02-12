namespace MockServer.UseCases.Users.Delete;

public record DeleteUserCommand(int Id) : IRequest<Result>;
