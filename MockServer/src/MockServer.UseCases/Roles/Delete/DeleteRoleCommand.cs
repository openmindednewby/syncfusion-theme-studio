namespace MockServer.UseCases.Roles.Delete;

public record DeleteRoleCommand(int Id) : IRequest<Result>;
